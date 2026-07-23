export type StreamStatus =
  | 'unknown'
  | 'online'
  | 'slow'
  | 'offline'
  | 'auth_required'
  | 'geo_restricted'
  | 'cors_unknown'
  | 'drm_required'
  | 'unsupported'
  | 'not_configured'
  | 'temporarily_unavailable';

export type DiscoveryStatus =
  | 'official_public_found'
  | 'authorized_provider_required'
  | 'user_url_required'
  | 'temporarily_unavailable'
  | 'not_verified';

export type SourceType = 'hls' | 'direct' | 'm3u' | 'xtream' | 'external_player';

export interface StreamHeaders {
  userAgent?: string;
  referer?: string;
  origin?: string;
  authorization?: string;
  cookie?: string;
}

export interface ChannelSource {
  id: string;
  type: SourceType;
  url: string;
  priority: number;
  public: boolean;
  official: boolean;
  requiresAuthorization: boolean;
  headers?: StreamHeaders;
  status: StreamStatus;
  responseTimeMs?: number;
  lastCheckedAt?: string;
  externalPlayer?: boolean;
  enabled?: boolean;
}

export interface ConfiguredChannel {
  id: string;
  number: number;
  name: string;
  category: string;
  adult: boolean;
  logo?: string;
  epgId?: string;
  epgAliases: string[];
  sources: ChannelSource[];
  discoveryStatus: DiscoveryStatus;
  officialSite?: string;
  officialLivePage?: string;
}

export interface ChannelOverride {
  number?: number;
  category?: string;
  hidden?: boolean;
  epgUrl?: string;
  epgId?: string;
  epgTimezone?: string;
  epgOffsetMinutes?: number;
  epgAlias?: string;
  sources?: ChannelSource[];
}

export interface HistoryEntry {
  channelId: string;
  watchedAt: number;
}

export interface AdultSettings {
  enabled: boolean;
  pinSalt?: string;
  pinHash?: string;
  unlockedUntil?: number;
}

export interface PluginPreferences {
  enabled: boolean;
  dieselClientEnabled: boolean;
  view: 'grid' | 'list';
  checkBeforePlay: boolean;
  autoFallback: boolean;
  connectionTimeoutMs: number;
  retries: number;
  lowPowerMode: boolean;
  showNumbers: boolean;
  showStatuses: boolean;
}

export interface XtreamAccount {
  id: string;
  name: string;
  server: string;
  username: string;
  password: string;
  enabled: boolean;
}

export interface StoredState {
  schemaVersion: number;
  preferences: PluginPreferences;
  channelOverrides: Record<string, ChannelOverride>;
  favorites: string[];
  history: HistoryEntry[];
  lastChannelId?: string;
  adult: AdultSettings;
  xtreamAccounts: XtreamAccount[];
  manualMappings: Record<string, string>;
  lastImportReport?: ImportReport;
  recentErrors: DiagnosticLogEntry[];
}

export interface PlaylistHeaders {
  userAgent?: string;
  referer?: string;
  origin?: string;
  authorization?: string;
  cookie?: string;
}

export interface PlaylistEntry {
  name: string;
  tvgId?: string;
  tvgName?: string;
  tvgLogo?: string;
  tvgChno?: number;
  group?: string;
  url: string;
  headers: PlaylistHeaders;
  catchup?: {
    type?: string;
    source?: string;
    days?: number;
  };
  attributes: Record<string, string>;
  line: number;
  raw: string;
}

export interface M3uParseReport {
  processedLines: number;
  foundChannels: number;
  skippedEntries: number;
  duplicateUrls: number;
  warnings: string[];
  errors: string[];
  epgUrls: string[];
}

export interface M3uParseResult {
  entries: PlaylistEntry[];
  report: M3uParseReport;
}

export type MatchReason = 'tvg-id' | 'tvg-name' | 'name' | 'alias' | 'normalized-name' | 'manual';

export interface MatchedPlaylistEntry {
  channelId: string;
  entry: PlaylistEntry;
  reason: MatchReason;
}

export interface ImportReport {
  importedAt: string;
  sourceName: string;
  parsed: number;
  matched: number;
  ignored: number;
  duplicateUrls: number;
  warnings: string[];
  matchedEntries: Array<{
    channelId: string;
    sourceName: string;
    reason: MatchReason;
  }>;
  ignoredEntries: Array<{
    name: string;
    tvgId?: string;
    line: number;
  }>;
}

export interface EpgProgram {
  channelId: string;
  start: number;
  stop: number;
  title: string;
  description?: string;
  category?: string;
  icon?: string;
  episode?: string;
  rating?: string;
}

export interface EpgChannel {
  id: string;
  names: string[];
  icon?: string;
}

export interface XmltvResult {
  channels: EpgChannel[];
  programs: EpgProgram[];
  warnings: string[];
}

export interface HealthResult {
  status: StreamStatus;
  responseTimeMs?: number;
  checkedAt: string;
  httpStatus?: number;
  detail: string;
}

export interface DiagnosticLogEntry {
  at: string;
  level: 'info' | 'warning' | 'error';
  message: string;
}

export interface RuntimeChannel extends ConfiguredChannel {
  favorite: boolean;
  hidden: boolean;
  effectiveNumber: number;
  effectiveCategory: string;
  effectiveEpgId?: string;
}

export interface LampaLike {
  [key: string]: any;
}

export interface PluginRuntime {
  Lampa: LampaLike;
  state: StoredState;
  saveState: () => void;
  refreshActive?: () => void;
}
