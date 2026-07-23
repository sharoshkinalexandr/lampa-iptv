import { LIMITS, PLUGIN_INFO } from '../config';
import { CHANNELS, CHANNEL_IDS } from '../config/channels';
import type {
  ChannelOverride,
  ChannelSource,
  LampaLike,
  PluginPreferences,
  RuntimeChannel,
  StoredState
} from '../types';

const STORAGE_KEY = 'lampa_iptv_state';

export const DEFAULT_PREFERENCES: PluginPreferences = {
  enabled: true,
  dieselClientEnabled: false,
  view: 'grid',
  checkBeforePlay: false,
  autoFallback: true,
  connectionTimeoutMs: 12_000,
  retries: 2,
  lowPowerMode: false,
  showNumbers: true,
  showStatuses: true
};

export function createDefaultState(): StoredState {
  return {
    schemaVersion: PLUGIN_INFO.schemaVersion,
    preferences: { ...DEFAULT_PREFERENCES },
    channelOverrides: {},
    favorites: [],
    history: [],
    adult: {
      enabled: false
    },
    xtreamAccounts: [],
    manualMappings: {},
    recentErrors: []
  };
}

function safeObject(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function sanitizeSource(value: unknown): ChannelSource | undefined {
  const item = safeObject(value);
  if (typeof item.id !== 'string' || typeof item.url !== 'string') return undefined;
  if (!/^https?:\/\//i.test(item.url)) return undefined;
  return {
    id: item.id,
    type:
      item.type === 'direct' ||
      item.type === 'm3u' ||
      item.type === 'xtream' ||
      item.type === 'external_player'
        ? item.type
        : 'hls',
    url: item.url,
    priority: Number(item.priority) || 1,
    public: item.public === true,
    official: item.official === true,
    requiresAuthorization: item.requiresAuthorization !== false,
    headers: safeObject(item.headers) as ChannelSource['headers'],
    status: typeof item.status === 'string' ? (item.status as ChannelSource['status']) : 'unknown',
    responseTimeMs: typeof item.responseTimeMs === 'number' ? item.responseTimeMs : undefined,
    lastCheckedAt: typeof item.lastCheckedAt === 'string' ? item.lastCheckedAt : undefined,
    externalPlayer: item.externalPlayer === true,
    enabled: item.enabled !== false
  };
}

function sanitizeOverride(value: unknown): ChannelOverride {
  const item = safeObject(value);
  const sources = Array.isArray(item.sources)
    ? item.sources.map(sanitizeSource).filter((source): source is ChannelSource => Boolean(source))
    : undefined;
  return {
    number: typeof item.number === 'number' ? item.number : undefined,
    category: typeof item.category === 'string' ? item.category : undefined,
    hidden: item.hidden === true,
    epgUrl: typeof item.epgUrl === 'string' ? item.epgUrl : undefined,
    epgId: typeof item.epgId === 'string' ? item.epgId : undefined,
    epgTimezone: typeof item.epgTimezone === 'string' ? item.epgTimezone : undefined,
    epgOffsetMinutes: typeof item.epgOffsetMinutes === 'number' ? item.epgOffsetMinutes : undefined,
    epgAlias: typeof item.epgAlias === 'string' ? item.epgAlias : undefined,
    sources: sources?.slice(0, LIMITS.maxSourcesPerChannel)
  };
}

export function migrateState(value: unknown): StoredState {
  const input = safeObject(value);
  const state = createDefaultState();
  const preferences = safeObject(input.preferences);
  state.preferences = {
    ...state.preferences,
    ...preferences,
    enabled: preferences.enabled !== false,
    dieselClientEnabled: preferences.dieselClientEnabled === true,
    view: preferences.view === 'list' ? 'list' : 'grid',
    connectionTimeoutMs: Math.min(
      60_000,
      Math.max(3_000, Number(preferences.connectionTimeoutMs) || 12_000)
    ),
    retries: Math.min(5, Math.max(0, Number(preferences.retries) || 0))
  };

  const overrides = safeObject(input.channelOverrides);
  for (const [channelId, override] of Object.entries(overrides)) {
    if (CHANNEL_IDS.has(channelId)) state.channelOverrides[channelId] = sanitizeOverride(override);
  }

  state.favorites = Array.isArray(input.favorites)
    ? Array.from(
        new Set(
          input.favorites.filter(
            (id): id is string => typeof id === 'string' && CHANNEL_IDS.has(id)
          )
        )
      )
    : [];
  state.history = Array.isArray(input.history)
    ? input.history
        .filter(
          (item: any) =>
            item &&
            typeof item.channelId === 'string' &&
            CHANNEL_IDS.has(item.channelId) &&
            typeof item.watchedAt === 'number'
        )
        .slice(-LIMITS.maxHistory)
    : [];
  state.lastChannelId =
    typeof input.lastChannelId === 'string' && CHANNEL_IDS.has(input.lastChannelId)
      ? input.lastChannelId
      : undefined;

  const adult = safeObject(input.adult);
  state.adult = {
    enabled: adult.enabled === true,
    pinSalt: typeof adult.pinSalt === 'string' ? adult.pinSalt : undefined,
    pinHash: typeof adult.pinHash === 'string' ? adult.pinHash : undefined,
    unlockedUntil: typeof adult.unlockedUntil === 'number' ? adult.unlockedUntil : undefined
  };
  state.xtreamAccounts = Array.isArray(input.xtreamAccounts)
    ? input.xtreamAccounts
        .filter(
          (account: any) =>
            account &&
            typeof account.id === 'string' &&
            typeof account.server === 'string' &&
            typeof account.username === 'string' &&
            typeof account.password === 'string'
        )
        .map((account: any) => ({
          id: account.id,
          name: typeof account.name === 'string' ? account.name : 'Xtream',
          server: account.server,
          username: account.username,
          password: account.password,
          enabled: account.enabled !== false
        }))
    : [];
  state.manualMappings = Object.fromEntries(
    Object.entries(safeObject(input.manualMappings)).filter(
      ([, channelId]) => typeof channelId === 'string' && CHANNEL_IDS.has(channelId)
    )
  ) as Record<string, string>;
  state.lastImportReport =
    input.lastImportReport && typeof input.lastImportReport === 'object'
      ? (input.lastImportReport as StoredState['lastImportReport'])
      : undefined;
  state.recentErrors = Array.isArray(input.recentErrors)
    ? input.recentErrors.slice(-LIMITS.maxDiagnosticEntries)
    : [];
  state.schemaVersion = PLUGIN_INFO.schemaVersion;
  return state;
}

function parseStorageValue(value: unknown): unknown {
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}

export function loadState(Lampa?: LampaLike): StoredState {
  try {
    if (Lampa?.Storage?.get) {
      return migrateState(parseStorageValue(Lampa.Storage.get(STORAGE_KEY, '{}')));
    }
    return migrateState(parseStorageValue(globalThis.localStorage?.getItem(STORAGE_KEY) ?? '{}'));
  } catch {
    return createDefaultState();
  }
}

export function saveState(state: StoredState, Lampa?: LampaLike): void {
  const safe = migrateState(state);
  if (Lampa?.Storage?.set) {
    Lampa.Storage.set(STORAGE_KEY, safe);
    return;
  }
  globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(safe));
}

export function getChannelSources(state: StoredState, channelId: string): ChannelSource[] {
  const channel = CHANNELS.find((item) => item.id === channelId);
  const custom = state.channelOverrides[channelId]?.sources;
  return [...(custom ?? channel?.sources ?? [])]
    .filter((source) => source.enabled !== false)
    .sort((left, right) => left.priority - right.priority);
}

export function getRuntimeChannels(state: StoredState): RuntimeChannel[] {
  return CHANNELS.map((channel) => {
    const override = state.channelOverrides[channel.id] ?? {};
    return {
      ...channel,
      sources: getChannelSources(state, channel.id),
      favorite: state.favorites.includes(channel.id),
      hidden: override.hidden === true,
      effectiveNumber: override.number ?? channel.number,
      effectiveCategory: override.category ?? channel.category,
      effectiveEpgId: override.epgId ?? channel.epgId
    };
  }).sort((left, right) => left.effectiveNumber - right.effectiveNumber);
}

export function updateOverride(
  state: StoredState,
  channelId: string,
  change: Partial<ChannelOverride>
): void {
  if (!CHANNEL_IDS.has(channelId)) return;
  state.channelOverrides[channelId] = {
    ...(state.channelOverrides[channelId] ?? {}),
    ...change
  };
}

export function toggleFavorite(state: StoredState, channelId: string): boolean {
  if (!CHANNEL_IDS.has(channelId)) return false;
  const index = state.favorites.indexOf(channelId);
  if (index >= 0) state.favorites.splice(index, 1);
  else state.favorites.push(channelId);
  return index < 0;
}

export function addHistory(state: StoredState, channelId: string): void {
  if (!CHANNEL_IDS.has(channelId)) return;
  state.history = state.history.filter((item) => item.channelId !== channelId);
  state.history.push({ channelId, watchedAt: Date.now() });
  state.history = state.history.slice(-LIMITS.maxHistory);
  state.lastChannelId = channelId;
}
