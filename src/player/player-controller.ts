import type { LampaLike, RuntimeChannel, StoredState } from '../types';
import { checkStream, applyHealthResult } from '../network/health';
import { addHistory, getChannelSources } from '../storage/storage';

function notify(Lampa: LampaLike, message: string): void {
  if (Lampa?.Noty?.show) Lampa.Noty.show(message);
  else globalThis.alert?.(message);
}

export async function playChannel(
  Lampa: LampaLike,
  state: StoredState,
  channel: RuntimeChannel,
  allChannels: RuntimeChannel[],
  save: () => void
): Promise<boolean> {
  const sources = getChannelSources(state, channel.id);
  if (!sources.length) {
    notify(Lampa, 'Источник не подключён. Откройте настройки канала и добавьте ссылку.');
    return false;
  }

  const playable = sources.filter(
    (source) => source.enabled !== false && source.status !== 'offline'
  );
  if (!playable.length) {
    notify(Lampa, 'Все настроенные источники помечены как недоступные.');
    return false;
  }

  if (state.preferences.checkBeforePlay) {
    const health = await checkStream(playable[0]!, state.preferences.connectionTimeoutMs);
    applyHealthResult(playable[0]!, health);
    save();
    if (health.status === 'offline' && playable.length === 1) {
      notify(Lampa, health.detail);
      return false;
    }
  }

  const first = playable[0]!;
  let fallbackIndex = 1;
  const playData: Record<string, unknown> = {
    title: channel.name,
    url: first.url,
    tv: true,
    iptv: true,
    channel: channel.name,
    logo: channel.logo,
    need_check_live_stream: true
  };
  if (state.preferences.autoFallback && playable[1]) {
    playData.url_reserve = playable[1].url;
    fallbackIndex = 2;
    playData.error = (_work: unknown, useReserve: (url: string) => void) => {
      const next = playable[fallbackIndex];
      if (next) {
        fallbackIndex += 1;
        notify(Lampa, `Переключение на резервный источник №${fallbackIndex}.`);
        useReserve(next.url);
      } else {
        notify(Lampa, 'Не удалось запустить ни один источник канала.');
      }
    };
  }

  if (first.externalPlayer && Lampa?.Player?.runas) {
    const configured = Lampa?.Storage?.field?.('player_iptv');
    if (configured) Lampa.Player.runas(configured);
    else notify(Lampa, 'В Lampa не выбран внешний IPTV-плеер; используется доступный плеер.');
  } else if (Lampa?.Player?.runas) {
    const configured = Lampa?.Storage?.field?.('player_iptv');
    if (configured) Lampa.Player.runas(configured);
  }

  const playlist = allChannels
    .filter((item) => !item.adult && getChannelSources(state, item.id).length > 0)
    .map((item) => ({
      title: item.name,
      url: getChannelSources(state, item.id)[0]!.url,
      tv: true,
      iptv: true
    }));

  addHistory(state, channel.id);
  save();
  if (Lampa?.Player?.play) {
    Lampa.Player.play(playData);
    if (Lampa.Player.playlist) Lampa.Player.playlist(playlist);
    return true;
  }

  notify(Lampa, 'API плеера Lampa недоступен в этой версии.');
  return false;
}
