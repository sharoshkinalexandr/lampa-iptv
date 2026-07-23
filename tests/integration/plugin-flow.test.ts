import { describe, expect, it, vi } from 'vitest';

import { importM3uText } from '../../src/core/source-manager';
import { playChannel } from '../../src/player/player-controller';
import { createDefaultState, getRuntimeChannels, toggleFavorite } from '../../src/storage/storage';

describe('импорт → каталог → воспроизведение', () => {
  it('не добавляет лишние каналы и передаёт резервы в API Lampa', async () => {
    const state = createDefaultState();
    const report = importM3uText(
      state,
      `#EXTM3U
#EXTINF:-1 tvg-id="NTV.ru",НТВ
https://provider.test/ntv-main.m3u8
#EXTINF:-1 tvg-name="НТВ HD",НТВ резерв
https://provider.test/ntv-reserve.m3u8
#EXTINF:-1,BBC World
https://provider.test/bbc.m3u8`,
      'Тестовый провайдер'
    );
    toggleFavorite(state, 'ntv');

    const channels = getRuntimeChannels(state);
    const ntv = channels.find((channel) => channel.id === 'ntv')!;
    expect(report.parsed).toBe(3);
    expect(report.matched).toBe(2);
    expect(report.ignored).toBe(1);
    expect(channels).toHaveLength(28);
    expect(ntv.sources).toHaveLength(2);
    expect(ntv.favorite).toBe(true);

    const play = vi.fn();
    const playlist = vi.fn();
    const save = vi.fn();
    const Lampa = {
      Player: { play, playlist, runas: vi.fn() },
      Storage: { field: vi.fn(() => '') },
      Noty: { show: vi.fn() }
    };

    expect(await playChannel(Lampa, state, ntv, channels, save)).toBe(true);
    expect(play).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'НТВ',
        url: 'https://provider.test/ntv-main.m3u8',
        url_reserve: 'https://provider.test/ntv-reserve.m3u8'
      })
    );
    expect(playlist).toHaveBeenCalledOnce();
    expect(save).toHaveBeenCalledOnce();
    expect(state.lastChannelId).toBe('ntv');
  });
});
