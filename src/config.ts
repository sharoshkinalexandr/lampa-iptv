export const PLUGIN_INFO = {
  id: 'lampa_iptv',
  component: 'lampa_iptv',
  name: 'Lampa IPTV',
  version: '1.1.0',
  schemaVersion: 4
} as const;

export const DIESEL_CLIENT = {
  id: 'diesel_iptv',
  name: 'Дизель ТВ',
  scriptUrl: 'https://andreyurl54.github.io/diesel5/diesel.js',
  repositoryUrl: 'https://github.com/andreyurl54/diesel5'
} as const;

export const LIMITS = {
  maxM3uBytes: 20 * 1024 * 1024,
  maxM3uEntries: 50_000,
  maxXmltvBytes: 30 * 1024 * 1024,
  maxPrograms: 250_000,
  maxSourcesPerChannel: 3,
  maxHistory: 30,
  maxDiagnosticEntries: 100
} as const;

export const DEFAULT_TIMEOUT_MS = 12_000;
export const TEST_HLS_URL = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
