import { PLUGIN_INFO, TEST_HLS_URL } from '../config';
import { maskUrl } from '../core/security';
import { clearEpgMemory } from '../epg/epg-manager';
import { checkStream } from '../network/health';
import { cacheClear } from '../storage/indexed-db';
import { createDefaultState, getRuntimeChannels } from '../storage/storage';
import type { ChannelSource, PluginRuntime } from '../types';
import {
  activateContentController,
  bindFocus,
  element,
  onEnter,
  selector,
  statusLabel
} from '../ui/dom';
import { confirmAction, downloadText, notify } from './input';

export function createDiagnosticsComponent(runtime: PluginRuntime): new () => any {
  const { Lampa } = runtime;

  return class DiagnosticsComponent {
    activity: any;
    private root = element('div', 'lampa-iptv lampa-iptv-diagnostics');
    private last?: HTMLElement;
    private initialized = false;

    create(): HTMLElement {
      return this.render();
    }

    render(): HTMLElement {
      return this.root;
    }

    start(): void {
      if (!this.initialized) {
        this.initialized = true;
        this.build();
      }
      activateContentController(
        Lampa,
        this.root,
        () => this.last,
        () => Lampa.Activity.backward()
      );
    }

    pause(): void {}

    stop(): void {}

    destroy(): void {
      this.root.remove();
    }

    private action(
      title: string,
      subtitle: string,
      callback: () => void | Promise<void>
    ): HTMLElement {
      const item = selector('lampa-iptv-action', title, subtitle);
      bindFocus(item, (node) => {
        this.last = node;
      });
      onEnter(item, callback);
      return item;
    }

    private facts(): Array<[string, string]> {
      const channels = getRuntimeChannels(runtime.state);
      return [
        ['Версия плагина', PLUGIN_INFO.version],
        ['Версия схемы', String(runtime.state.schemaVersion)],
        ['Версия Lampa', String(Lampa?.Manifest?.app_version ?? 'не определена')],
        ['Lampa app_digital', String(Lampa?.Manifest?.app_digital ?? 'не определён')],
        ['Платформа', String(Lampa?.Storage?.get?.('platform', 'browser') ?? 'browser')],
        ['User-Agent', navigator.userAgent],
        [
          'HLS в video',
          document.createElement('video').canPlayType('application/vnd.apple.mpegurl') ||
            'через hls.js/плеер'
        ],
        ['MediaSource', typeof MediaSource !== 'undefined' ? 'да' : 'нет'],
        ['IndexedDB', typeof indexedDB !== 'undefined' ? 'да' : 'нет'],
        ['File API', typeof FileReader !== 'undefined' ? 'да' : 'нет'],
        ['DecompressionStream', typeof DecompressionStream !== 'undefined' ? 'да' : 'нет'],
        ['Каналов в реестре', String(channels.length)],
        [
          'Каналов с источниками',
          String(channels.filter((channel) => channel.sources.length > 0).length)
        ],
        ['Избранных', String(runtime.state.favorites.length)],
        [
          'EPG-сопоставлений',
          String(
            channels.filter((channel) => runtime.state.channelOverrides[channel.id]?.epgUrl).length
          )
        ],
        ['Телеметрия', 'отсутствует']
      ];
    }

    private build(): void {
      this.root.replaceChildren();
      const header = element('div', 'lampa-iptv__header');
      header.append(
        element('div', 'lampa-iptv__brand', 'Диагностика'),
        element('div', 'lampa-iptv__version', 'Приватные данные автоматически маскируются')
      );
      const facts = element('div', 'lampa-iptv-facts');
      for (const [name, value] of this.facts()) {
        const row = element('div', 'lampa-iptv-fact');
        row.append(
          element('div', 'lampa-iptv-fact__name', name),
          element('div', 'lampa-iptv-fact__value', value)
        );
        facts.append(row);
      }
      const actions = element('div', 'lampa-iptv-actions');
      actions.append(
        this.action(
          'Проверить тестовый HLS',
          'Легальный Mux test stream, не добавляется в каналы',
          () => this.checkTestStream()
        ),
        this.action('Очистить EPG-кеш', 'Удалить только IndexedDB-кеш, не настройки', () =>
          this.clearCache()
        ),
        this.action('Экспорт диагностики', 'Без URL, логинов, токенов, cookies и паролей', () =>
          this.exportDiagnostics()
        ),
        this.action(
          'Сбросить локальные данные',
          'Удалить источники, EPG, PIN, избранное, историю и настройки',
          () => this.resetData()
        )
      );
      const log = element('div', 'lampa-iptv-log');
      log.append(element('div', 'lampa-iptv-section__title', 'Последние события'));
      if (!runtime.state.recentErrors.length) {
        log.append(element('div', 'lampa-iptv-section__hint', 'Журнал пуст.'));
      } else {
        for (const entry of [...runtime.state.recentErrors].reverse().slice(0, 30)) {
          log.append(
            element(
              'div',
              `lampa-iptv-log__entry ${entry.level}`,
              `${entry.at} · ${maskUrl(entry.message)}`
            )
          );
        }
      }
      this.root.append(header, facts, actions, log);
      this.activity?.loader?.(false);
    }

    private async checkTestStream(): Promise<void> {
      const source: ChannelSource = {
        id: 'mux-test',
        type: 'hls',
        url: TEST_HLS_URL,
        priority: 1,
        public: true,
        official: false,
        requiresAuthorization: false,
        status: 'unknown'
      };
      notify(Lampa, 'Проверка тестового HLS…');
      const result = await checkStream(source, runtime.state.preferences.connectionTimeoutMs);
      notify(Lampa, `${statusLabel(result.status)}: ${result.detail}`);
      this.start();
    }

    private async clearCache(): Promise<void> {
      const confirmed = await confirmAction(
        Lampa,
        'Очистить кеш',
        'Пользовательские URL, избранное и настройки останутся без изменений.'
      );
      if (!confirmed) return this.start();
      clearEpgMemory();
      await cacheClear();
      notify(Lampa, 'EPG-кеш очищен.');
      this.start();
    }

    private exportDiagnostics(): void {
      const payload = {
        format: 'lampa-iptv-diagnostics',
        createdAt: new Date().toISOString(),
        facts: Object.fromEntries(this.facts()),
        configuredChannels: getRuntimeChannels(runtime.state).filter(
          (channel) => channel.sources.length > 0
        ).length,
        recentErrors: runtime.state.recentErrors.map((entry) => ({
          ...entry,
          message: maskUrl(entry.message).replace(/https?:\/\/\S+/gi, '[URL]')
        }))
      };
      downloadText('lampa-iptv-diagnostics.json', JSON.stringify(payload, null, 2));
      notify(Lampa, 'Диагностика экспортирована без приватных URL и учётных данных.');
      this.start();
    }

    private async resetData(): Promise<void> {
      const confirmed = await confirmAction(
        Lampa,
        'Полный локальный сброс',
        'Будут удалены все пользовательские URL, Xtream-данные, EPG, PIN, избранное, история и настройки Lampa IPTV. Действие нельзя отменить без резервной копии.'
      );
      if (!confirmed) return this.start();
      clearEpgMemory();
      await cacheClear();
      for (const key of Object.keys(runtime.state)) Reflect.deleteProperty(runtime.state, key);
      Object.assign(runtime.state, createDefaultState());
      runtime.saveState();
      notify(Lampa, 'Локальные данные Lampa IPTV удалены.');
      Lampa.Activity?.backward?.();
    }
  };
}
