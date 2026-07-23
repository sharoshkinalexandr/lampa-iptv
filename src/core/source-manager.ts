import { LIMITS } from '../config';
import type {
  ChannelSource,
  ImportReport,
  PlaylistEntry,
  StoredState,
  XtreamAccount
} from '../types';
import { matchPlaylist } from './channel-matcher';
import { parseM3u } from './m3u-parser';
import { normalizeName, stableId } from './normalize';
import { isAllowedUrl, normalizeServerUrl } from './security';

function sourceFromEntry(
  entry: PlaylistEntry,
  priority: number,
  type: ChannelSource['type']
): ChannelSource {
  return {
    id: stableId('source', entry.url),
    type,
    url: entry.url,
    priority,
    public: false,
    official: false,
    requiresAuthorization:
      Boolean(entry.headers.authorization || entry.headers.cookie) ||
      /(?:[?&](?:token|key|auth|password|user|login)=|\/\/[^/]+@)/i.test(entry.url),
    headers: {
      userAgent: entry.headers.userAgent,
      referer: entry.headers.referer,
      origin: entry.headers.origin,
      authorization: entry.headers.authorization,
      cookie: entry.headers.cookie
    },
    status: 'unknown',
    enabled: true
  };
}

function mergeSource(state: StoredState, channelId: string, source: ChannelSource): boolean {
  const override = (state.channelOverrides[channelId] ??= {});
  const sources = (override.sources ??= []);
  const existing = sources.find((item) => item.url === source.url);
  if (existing) {
    Object.assign(existing, source, { priority: existing.priority });
    return false;
  }
  if (sources.length >= LIMITS.maxSourcesPerChannel) return false;
  source.priority = sources.length + 1;
  sources.push(source);
  return true;
}

export function importM3uText(
  state: StoredState,
  content: string,
  sourceName: string,
  baseUrl?: string
): ImportReport {
  const parsed = parseM3u(content, baseUrl);
  const { matched, report } = matchPlaylist(
    parsed.entries,
    sourceName,
    parsed.report.duplicateUrls,
    [...parsed.report.warnings, ...parsed.report.errors],
    state.manualMappings
  );
  let actuallyAdded = 0;
  for (const item of matched) {
    if (mergeSource(state, item.channelId, sourceFromEntry(item.entry, 1, 'm3u'))) {
      actuallyAdded += 1;
    }
  }
  report.matched = actuallyAdded;
  if (matched.length !== actuallyAdded) {
    report.warnings.push(
      `${matched.length - actuallyAdded} совпавших источников уже существовали или превысили лимит резервов.`
    );
  }
  state.lastImportReport = report;
  return report;
}

export function addDirectSource(
  state: StoredState,
  channelId: string,
  value: string,
  options: {
    headers?: ChannelSource['headers'];
    externalPlayer?: boolean;
    priority?: number;
  } = {}
): ChannelSource {
  const trimmed = value.trim();
  if (trimmed.startsWith('#EXTINF:')) {
    const parsed = parseM3u(`#EXTM3U\n${trimmed}`);
    const entry = parsed.entries[0];
    if (!entry) throw new Error('В строке M3U не найден корректный URL.');
    const source = sourceFromEntry(entry, options.priority ?? 1, 'm3u');
    source.externalPlayer = options.externalPlayer;
    mergeSource(state, channelId, source);
    return source;
  }
  if (!isAllowedUrl(trimmed)) throw new Error('Разрешены только ссылки HTTP или HTTPS.');
  const source: ChannelSource = {
    id: stableId('source', trimmed),
    type: /\.m3u8(?:$|[?#])/i.test(trimmed) ? 'hls' : 'direct',
    url: trimmed,
    priority: options.priority ?? 1,
    public: false,
    official: false,
    requiresAuthorization: /(?:[?&](?:token|key|auth|password|user|login)=|\/\/[^/]+@)/i.test(
      trimmed
    ),
    headers: options.headers,
    status: 'unknown',
    externalPlayer: options.externalPlayer,
    enabled: true
  };
  mergeSource(state, channelId, source);
  return source;
}

export function setManualMapping(
  state: StoredState,
  playlistNameOrId: string,
  channelId: string
): void {
  state.manualMappings[normalizeName(playlistNameOrId)] = channelId;
}

export async function fetchText(
  url: string,
  timeoutMs: number,
  init: RequestInit = {}
): Promise<string> {
  if (!isAllowedUrl(url)) throw new Error('Разрешены только URL HTTP или HTTPS.');
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : undefined;
  const timeout = globalThis.setTimeout(() => controller?.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...init,
      signal: controller?.signal,
      credentials: 'omit',
      redirect: 'follow'
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    if (text.length > LIMITS.maxM3uBytes) throw new Error('Ответ превышает допустимый размер.');
    return text;
  } catch (error) {
    if ((error as Error).name === 'AbortError') throw new Error('Истекло время ожидания ответа.');
    if (error instanceof TypeError) {
      throw new Error('Источник недоступен из браузера: сеть или CORS. Попробуйте внешний плеер.');
    }
    throw error;
  } finally {
    globalThis.clearTimeout(timeout);
  }
}

export async function importRemoteM3u(
  state: StoredState,
  url: string,
  sourceName: string,
  timeoutMs: number
): Promise<ImportReport> {
  const content = await fetchText(url, timeoutMs);
  return importM3uText(state, content, sourceName, url);
}

function xtreamApiUrl(account: XtreamAccount, action: string): string {
  const server = normalizeServerUrl(account.server);
  const params = new URLSearchParams({
    username: account.username,
    password: account.password,
    action
  });
  return `${server}/player_api.php?${params.toString()}`;
}

export async function importXtream(
  state: StoredState,
  account: XtreamAccount,
  timeoutMs: number
): Promise<ImportReport> {
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : undefined;
  const timeout = globalThis.setTimeout(() => controller?.abort(), timeoutMs);
  try {
    const response = await fetch(xtreamApiUrl(account, 'get_live_streams'), {
      signal: controller?.signal,
      credentials: 'omit'
    });
    if (!response.ok) throw new Error(`Xtream вернул HTTP ${response.status}.`);
    const body = (await response.json()) as unknown;
    if (!Array.isArray(body)) throw new Error('Xtream вернул неожиданный формат live streams.');
    const server = normalizeServerUrl(account.server);
    const entries: PlaylistEntry[] = body
      .slice(0, LIMITS.maxM3uEntries)
      .map((item: any, index) => ({
        name: String(item.name ?? `Xtream ${index + 1}`),
        tvgId: typeof item.epg_channel_id === 'string' ? item.epg_channel_id : undefined,
        tvgName: typeof item.name === 'string' ? item.name : undefined,
        tvgLogo: typeof item.stream_icon === 'string' ? item.stream_icon : undefined,
        group: typeof item.category_name === 'string' ? item.category_name : undefined,
        url: `${server}/live/${encodeURIComponent(account.username)}/${encodeURIComponent(
          account.password
        )}/${encodeURIComponent(String(item.stream_id))}.m3u8`,
        headers: {},
        attributes: {},
        line: index + 1,
        raw: ''
      }));
    const { matched, report } = matchPlaylist(entries, account.name, 0, [], state.manualMappings);
    let actuallyAdded = 0;
    for (const item of matched) {
      if (mergeSource(state, item.channelId, sourceFromEntry(item.entry, 1, 'xtream'))) {
        actuallyAdded += 1;
      }
    }
    report.matched = actuallyAdded;
    state.xtreamAccounts = state.xtreamAccounts.filter((item) => item.id !== account.id);
    state.xtreamAccounts.push(account);
    state.lastImportReport = report;
    return report;
  } catch (error) {
    if ((error as Error).name === 'AbortError') throw new Error('Xtream: истекло время ожидания.');
    if (error instanceof TypeError) {
      throw new Error(
        'Xtream недоступен из браузера из-за сети или CORS. Проверьте его в официальном приложении провайдера.'
      );
    }
    throw error;
  } finally {
    globalThis.clearTimeout(timeout);
  }
}
