import type { EpgProgram, RuntimeChannel, StoredState, XmltvResult } from '../types';
import { normalizeExact, normalizeName, stableId } from '../core/normalize';
import { fetchText } from '../core/source-manager';
import { cacheGet, cacheSet } from '../storage/indexed-db';
import { parseXmltv } from './xmltv-parser';

const memory = new Map<string, XmltvResult>();

function externalIdsForChannel(channel: RuntimeChannel, state: StoredState): string[] {
  const override = state.channelOverrides[channel.id] ?? {};
  return [
    override.epgId,
    channel.effectiveEpgId,
    channel.epgId,
    override.epgAlias,
    channel.name,
    ...channel.epgAliases
  ].filter((value): value is string => Boolean(value));
}

export function matchEpgPrograms(
  result: XmltvResult,
  channel: RuntimeChannel,
  state: StoredState
): EpgProgram[] {
  const knownExact = externalIdsForChannel(channel, state).map(normalizeExact);
  const knownNormalized = externalIdsForChannel(channel, state).map(normalizeName);
  const matchedExternalIds = new Set(
    result.channels
      .filter((external) => {
        if (knownExact.includes(normalizeExact(external.id))) return true;
        return external.names.some(
          (name) =>
            knownExact.includes(normalizeExact(name)) ||
            knownNormalized.includes(normalizeName(name))
        );
      })
      .map((external) => external.id)
  );
  if (channel.effectiveEpgId) matchedExternalIds.add(channel.effectiveEpgId);
  return result.programs
    .filter((program) => matchedExternalIds.has(program.channelId))
    .map((program) => ({ ...program, channelId: channel.id }));
}

export function nowAndNext(
  programs: EpgProgram[],
  now = Date.now()
): { current?: EpgProgram; next?: EpgProgram } {
  const currentIndex = programs.findIndex((program) => program.start <= now && program.stop > now);
  if (currentIndex >= 0) {
    return {
      current: programs[currentIndex],
      next: programs[currentIndex + 1]
    };
  }
  return {
    next: programs.find((program) => program.start > now)
  };
}

async function maybeDecompress(response: Response, url: string): Promise<string> {
  if (!/\.gz(?:$|[?#])/i.test(url)) return response.text();
  if (typeof DecompressionStream === 'undefined') {
    throw new Error('XMLTV.GZ не поддерживается этой платформой. Укажите несжатый XMLTV URL.');
  }
  if (!response.body) throw new Error('Пустой ответ XMLTV.GZ.');
  const decompressed = response.body.pipeThrough(new DecompressionStream('gzip'));
  return new Response(decompressed).text();
}

export async function loadXmltv(url: string, timeoutMs: number): Promise<XmltvResult> {
  const cacheKey = stableId('xmltv', url);
  const inMemory = memory.get(cacheKey);
  if (inMemory) return inMemory;
  const cached = await cacheGet<XmltvResult>(cacheKey);
  if (cached) {
    memory.set(cacheKey, cached);
    return cached;
  }

  let content: string;
  if (/\.gz(?:$|[?#])/i.test(url)) {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : undefined;
    const timeout = globalThis.setTimeout(() => controller?.abort(), timeoutMs);
    try {
      const response = await fetch(url, { signal: controller?.signal, credentials: 'omit' });
      if (!response.ok) throw new Error(`XMLTV вернул HTTP ${response.status}.`);
      content = await maybeDecompress(response, url);
    } finally {
      globalThis.clearTimeout(timeout);
    }
  } else {
    content = await fetchText(url, timeoutMs);
  }
  const parsed = parseXmltv(content);
  memory.set(cacheKey, parsed);
  await cacheSet(cacheKey, parsed, 12 * 60 * 60 * 1000);
  return parsed;
}

export function clearEpgMemory(): void {
  memory.clear();
}
