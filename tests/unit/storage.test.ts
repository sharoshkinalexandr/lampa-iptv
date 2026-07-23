import { describe, expect, it } from 'vitest';

import {
  addHistory,
  createDefaultState,
  getRuntimeChannels,
  migrateState,
  toggleFavorite,
  updateOverride
} from '../../src/storage/storage';

describe('локальное состояние', () => {
  it('мигрирует старые данные и удаляет неизвестные идентификаторы', () => {
    const state = migrateState({
      schemaVersion: 1,
      preferences: { view: 'list', connectionTimeoutMs: 999_999 },
      favorites: ['ntv', 'ntv', 'unknown'],
      channelOverrides: {
        ntv: { number: 99 },
        unknown: { number: 1 }
      },
      history: [
        { channelId: 'unknown', watchedAt: 1 },
        { channelId: 'ntv', watchedAt: 2 }
      ]
    });

    expect(state.preferences.view).toBe('list');
    expect(state.preferences.dieselClientEnabled).toBe(false);
    expect(state.preferences.connectionTimeoutMs).toBe(60_000);
    expect(state.favorites).toEqual(['ntv']);
    expect(Object.keys(state.channelOverrides)).toEqual(['ntv']);
    expect(state.history).toEqual([{ channelId: 'ntv', watchedAt: 2 }]);
  });

  it('сохраняет явное согласие на сторонний клиент', () => {
    const state = migrateState({
      preferences: { dieselClientEnabled: true }
    });

    expect(state.preferences.dieselClientEnabled).toBe(true);
  });

  it('всегда строит только 28 runtime-каналов', () => {
    const state = createDefaultState();
    updateOverride(state, 'ntv', { number: 42 });
    updateOverride(state, 'unknown', { number: 1 });
    toggleFavorite(state, 'ntv');
    addHistory(state, 'ntv');

    const channels = getRuntimeChannels(state);
    expect(channels).toHaveLength(28);
    expect(channels.find((channel) => channel.id === 'ntv')).toMatchObject({
      effectiveNumber: 42,
      favorite: true
    });
    expect(state.lastChannelId).toBe('ntv');
  });
});
