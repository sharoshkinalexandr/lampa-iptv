import { describe, expect, it } from 'vitest';

import { CHANNELS } from '../../src/config/channels';
import { matchPlaylist, matchPlaylistEntry } from '../../src/core/channel-matcher';
import type { PlaylistEntry } from '../../src/types';

function entry(name: string, tvgId?: string, tvgName?: string): PlaylistEntry {
  return {
    name,
    tvgId,
    tvgName,
    url: `https://provider.example.test/${encodeURIComponent(name)}.m3u8`,
    headers: {},
    attributes: {},
    line: 1,
    raw: ''
  };
}

describe('фиксированный реестр', () => {
  it('содержит ровно 28 уникальных каналов в заданной нумерации', () => {
    expect(CHANNELS).toHaveLength(28);
    expect(new Set(CHANNELS.map((channel) => channel.id)).size).toBe(28);
    expect(CHANNELS.map((channel) => channel.number)).toEqual(
      Array.from({ length: 28 }, (_, index) => index + 1)
    );
  });

  it('сопоставляет по tvg-id, точному имени и известному псевдониму', () => {
    expect(matchPlaylistEntry(entry('неважно', 'NTV.ru'))).toMatchObject({
      channelId: 'ntv',
      reason: 'tvg-id'
    });
    expect(matchPlaylistEntry(entry('Матч ТВ'))).toMatchObject({
      channelId: 'match-tv',
      reason: 'name'
    });
    expect(matchPlaylistEntry(entry('Russian Night'))).toMatchObject({
      channelId: 'russkaya-noch',
      reason: 'alias'
    });
  });

  it('игнорирует все каналы вне белого списка', () => {
    const input = [entry('Первый канал'), entry('BBC World'), entry('NASA TV')];
    const result = matchPlaylist(input, 'test', 0, []);

    expect(result.matched.map((item) => item.channelId)).toEqual(['perviy']);
    expect(result.report.ignored).toBe(2);
    expect(result.report.ignoredEntries.map((item) => item.name)).toEqual(['BBC World', 'NASA TV']);
  });

  it('поддерживает явное ручное соответствие без расширения каталога', () => {
    expect(
      matchPlaylistEntry(entry('Провайдерский НТВ'), { 'провайдерский нтв': 'ntv' })
    ).toMatchObject({
      channelId: 'ntv',
      reason: 'manual'
    });
  });
});
