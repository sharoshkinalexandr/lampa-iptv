import { PLUGIN_INFO } from '../config';
import { CHANNEL_IDS } from '../config/channels';
import type { ChannelSource, StoredState } from '../types';
import { migrateState } from './storage';

export interface BackupEnvelope {
  format: 'lampa-iptv-backup';
  version: 1;
  createdAt: string;
  pluginVersion: string;
  includesSecrets: boolean;
  data: Partial<StoredState>;
}

function sourceWithoutSecrets(source: ChannelSource): ChannelSource {
  const secretUrl = /(?:[?&](?:token|key|auth|password|user|login)=|\/\/[^/]+@)/i.test(source.url);
  return {
    ...source,
    url: secretUrl ? '' : source.url,
    headers: source.headers
      ? {
          userAgent: source.headers.userAgent,
          origin: source.headers.origin
        }
      : undefined,
    requiresAuthorization: source.requiresAuthorization || secretUrl,
    status: secretUrl ? 'auth_required' : source.status
  };
}

export function createBackup(state: StoredState, includeSecrets = false): BackupEnvelope {
  const copy = structuredCloneSafe(state);
  if (!includeSecrets) {
    copy.xtreamAccounts = [];
    for (const override of Object.values(copy.channelOverrides)) {
      override.sources = override.sources?.map(sourceWithoutSecrets);
    }
  }
  copy.recentErrors = [];
  return {
    format: 'lampa-iptv-backup',
    version: 1,
    createdAt: new Date().toISOString(),
    pluginVersion: PLUGIN_INFO.version,
    includesSecrets: includeSecrets,
    data: copy
  };
}

function structuredCloneSafe<T>(value: T): T {
  if (typeof globalThis.structuredClone === 'function') return globalThis.structuredClone(value);
  return JSON.parse(JSON.stringify(value)) as T;
}

export function parseBackup(content: string): {
  state: StoredState;
  report: string[];
  includesSecrets: boolean;
} {
  if (content.length > 5 * 1024 * 1024) throw new Error('Файл резервной копии слишком большой.');
  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error('Резервная копия не является корректным JSON.');
  }
  if (!parsed || typeof parsed !== 'object')
    throw new Error('Некорректная структура резервной копии.');
  const envelope = parsed as Partial<BackupEnvelope>;
  if (envelope.format !== 'lampa-iptv-backup' || envelope.version !== 1 || !envelope.data) {
    throw new Error('Формат резервной копии не поддерживается.');
  }
  const state = migrateState(envelope.data);
  const configured = Object.entries(state.channelOverrides).filter(
    ([channelId, override]) => CHANNEL_IDS.has(channelId) && Boolean(override.sources?.length)
  ).length;
  return {
    state,
    includesSecrets: envelope.includesSecrets === true,
    report: [
      `Настроено каналов: ${configured}`,
      `Избранных каналов: ${state.favorites.length}`,
      `Записей истории: ${state.history.length}`,
      `Учётных записей Xtream: ${state.xtreamAccounts.length}`,
      `Секреты: ${envelope.includesSecrets ? 'присутствуют' : 'не включены'}`
    ]
  };
}
