import { CHANNELS } from '../config/channels';
import { isAdultUnlocked, unlockAdult } from '../core/adult-access';
import { stableId } from '../core/normalize';
import {
  importM3uText,
  importRemoteM3u,
  importXtream,
  setManualMapping
} from '../core/source-manager';
import { createBackup, parseBackup } from '../storage/export-import';
import { getChannelSources } from '../storage/storage';
import type { ImportReport, PluginRuntime, XtreamAccount } from '../types';
import {
  activateContentController,
  bindFocus,
  element,
  onEnter,
  selector,
  statusLabel
} from '../ui/dom';
import {
  askMultiline,
  askText,
  choose,
  confirmAction,
  downloadText,
  notify,
  readLocalFile
} from './input';

function reportText(report: ImportReport): string {
  return [
    `Обработано: ${report.parsed}`,
    `Добавлено источников: ${report.matched}`,
    `Игнорировано посторонних/неопознанных: ${report.ignored}`,
    `Дубли URL: ${report.duplicateUrls}`,
    ...report.warnings.map((warning) => `Предупреждение: ${warning}`)
  ].join('\n');
}

export function createSourcesComponent(runtime: PluginRuntime): new () => any {
  const { Lampa } = runtime;

  return class SourcesComponent {
    activity: any;
    private root = element('div', 'lampa-iptv lampa-iptv-sources');
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

    private save = (): void => {
      runtime.saveState();
    };

    private rebuild(): void {
      this.build();
      this.start();
    }

    private action(
      title: string,
      subtitle: string,
      callback: () => void | Promise<void>
    ): HTMLElement {
      const button = selector('lampa-iptv-action', title, subtitle);
      bindFocus(button, (node) => {
        this.last = node;
      });
      onEnter(button, callback);
      return button;
    }

    private build(): void {
      this.root.replaceChildren();
      const header = element('div', 'lampa-iptv__header');
      header.append(
        element('div', 'lampa-iptv__brand', 'Источники и каналы'),
        element(
          'div',
          'lampa-iptv__version',
          'Импортируются только совпадения с утверждёнными 28 каналами'
        )
      );
      const actions = element('div', 'lampa-iptv-actions');
      actions.append(
        this.action('Удалённый M3U', 'Загрузить плейлист по URL', () => this.remoteM3u()),
        this.action('Вставить M3U', 'Вставить полный текст или одну запись', () => this.pasteM3u()),
        this.action('Импорт файла', 'Выбрать .m3u или .m3u8 через File API', () => this.fileM3u()),
        this.action('Xtream Codes', 'Подключить легальную подписку пользователя', () =>
          this.xtream()
        ),
        this.action('Последний отчёт', 'Совпадения и проигнорированные записи', () =>
          this.showReport()
        ),
        this.action('Ручное сопоставление', 'Сохранить правило для следующего импорта', () =>
          this.manualMapping()
        ),
        this.action('Экспорт', 'Резервная копия без секретов по умолчанию', () =>
          this.exportBackup()
        ),
        this.action('Импорт копии', 'Восстановить файл lampa-iptv-backup', () =>
          this.importBackup()
        )
      );

      const title = element('div', 'lampa-iptv-section__title', 'Настройки каждого канала');
      const list = element('div', 'lampa-iptv-channel-settings');
      const adultUnlocked = isAdultUnlocked(runtime.state);
      for (const channel of CHANNELS) {
        if (channel.adult && !adultUnlocked) continue;
        const sources = getChannelSources(runtime.state, channel.id);
        const primary = sources[0];
        const item = selector(
          'lampa-iptv-source-card',
          `${channel.number}. ${channel.name}`,
          sources.length
            ? `${sources.length} источник(а) · ${statusLabel(primary?.status)}`
            : 'Источник не подключён'
        );
        if (channel.adult) item.classList.add('adult');
        bindFocus(item, (node) => {
          this.last = node;
        });
        onEnter(item, () => {
          Lampa.Activity.push({
            component: 'lampa_iptv_channel',
            title: channel.name,
            channelId: channel.id,
            page: 1
          });
        });
        list.append(item);
      }
      if (!adultUnlocked) {
        const locked = selector(
          'lampa-iptv-source-card',
          'Раздел 18+ заблокирован',
          '13 каналов скрыты. Нажмите, чтобы установить или ввести локальный PIN.'
        );
        locked.classList.add('adult');
        bindFocus(locked, (node) => {
          this.last = node;
        });
        onEnter(locked, async () => {
          if (await unlockAdult(Lampa, runtime.state, this.save)) this.rebuild();
          else this.start();
        });
        list.append(locked);
      }
      this.root.append(header, actions, title, list);
      this.activity?.loader?.(false);
    }

    private async remoteM3u(): Promise<void> {
      const url = await askText(Lampa, 'URL M3U/M3U8-плейлиста');
      if (!url) return this.start();
      const name = (await askText(Lampa, 'Название источника', 'Удалённый M3U')) || 'Удалённый M3U';
      try {
        notify(Lampa, 'Загрузка плейлиста…');
        const report = await importRemoteM3u(
          runtime.state,
          url,
          name,
          runtime.state.preferences.connectionTimeoutMs
        );
        this.save();
        notify(Lampa, reportText(report));
        this.rebuild();
      } catch (error) {
        notify(Lampa, (error as Error).message);
        this.start();
      }
    }

    private async pasteM3u(): Promise<void> {
      const content = await askMultiline(Lampa, 'Вставка M3U');
      if (!content) return this.start();
      try {
        const normalized = content.includes('#EXTM3U') ? content : `#EXTM3U\n${content}`;
        const report = importM3uText(runtime.state, normalized, 'Вставленный M3U');
        this.save();
        notify(Lampa, reportText(report));
        this.rebuild();
      } catch (error) {
        notify(Lampa, (error as Error).message);
        this.start();
      }
    }

    private async fileM3u(): Promise<void> {
      try {
        const file = await readLocalFile('.m3u,.m3u8,text/plain,application/x-mpegURL');
        if (!file) return this.start();
        const report = importM3uText(runtime.state, file.content, file.name);
        this.save();
        notify(Lampa, reportText(report));
        this.rebuild();
      } catch (error) {
        notify(Lampa, `${(error as Error).message} Используйте URL плейлиста или вставку текста.`);
        this.start();
      }
    }

    private async xtream(): Promise<void> {
      const server = await askText(Lampa, 'Адрес сервера Xtream (HTTP/HTTPS)');
      if (!server) return this.start();
      const username = await askText(Lampa, 'Имя пользователя Xtream');
      if (!username) return this.start();
      const password = await askText(Lampa, 'Пароль Xtream', '', { password: true });
      if (!password) return this.start();
      const account: XtreamAccount = {
        id: stableId('xtream', `${server}:${username}`),
        name: 'Xtream',
        server,
        username,
        password,
        enabled: true
      };
      try {
        notify(Lampa, 'Загрузка списка live streams…');
        const report = await importXtream(
          runtime.state,
          account,
          runtime.state.preferences.connectionTimeoutMs
        );
        this.save();
        notify(Lampa, reportText(report));
        this.rebuild();
      } catch (error) {
        notify(Lampa, (error as Error).message);
        this.start();
      }
    }

    private showReport(): void {
      const report = runtime.state.lastImportReport;
      if (!report) {
        notify(Lampa, 'Импорт ещё не выполнялся.');
        return;
      }
      const body = element('div', 'lampa-iptv-report');
      body.append(element('pre', '', reportText(report)));
      if (report.ignoredEntries.length) {
        body.append(element('div', 'lampa-iptv-report__title', 'Игнорированные записи'));
        body.append(
          element(
            'pre',
            '',
            report.ignoredEntries
              .slice(0, 100)
              .map(
                (entry) =>
                  `строка ${entry.line}: ${entry.name}${entry.tvgId ? ` [${entry.tvgId}]` : ''}`
              )
              .join('\n')
          )
        );
      }
      Lampa.Modal?.open?.({
        title: 'Отчёт импорта',
        html: body,
        size: 'large'
      });
    }

    private async manualMapping(): Promise<void> {
      const ignored = runtime.state.lastImportReport?.ignoredEntries ?? [];
      if (!ignored.length) {
        notify(Lampa, 'В последнем импорте нет неопознанных записей.');
        return;
      }
      const entry = await choose(
        Lampa,
        'Неопознанная запись',
        ignored.slice(0, 100).map((item) => ({
          title: `${item.name}${item.tvgId ? ` [${item.tvgId}]` : ''}`,
          item
        })),
        () => this.start()
      );
      if (!entry) return;
      const channel = await choose(
        Lampa,
        'Сопоставить с каналом',
        CHANNELS.map((item) => ({ title: `${item.number}. ${item.name}`, item })),
        () => this.start()
      );
      if (!channel) return;
      setManualMapping(runtime.state, entry.item.tvgId || entry.item.name, channel.item.id);
      this.save();
      notify(Lampa, 'Правило сохранено. Повторите импорт плейлиста.');
      this.start();
    }

    private async exportBackup(): Promise<void> {
      let includeSecrets = false;
      if (runtime.state.xtreamAccounts.length) {
        includeSecrets = await confirmAction(
          Lampa,
          'Экспорт секретов',
          'По умолчанию пароли, токены, cookies, Authorization и приватные URL не экспортируются. Включить секреты в этот файл? Храните такой файл как пароль.'
        );
      }
      const backup = createBackup(runtime.state, includeSecrets);
      downloadText(
        `lampa-iptv-backup-${new Date().toISOString().slice(0, 10)}.json`,
        JSON.stringify(backup, null, 2)
      );
      notify(Lampa, includeSecrets ? 'Копия с секретами создана.' : 'Безопасная копия создана.');
      this.start();
    }

    private async importBackup(): Promise<void> {
      try {
        const file = await readLocalFile('.json,application/json');
        if (!file) return this.start();
        const parsed = parseBackup(file.content);
        const accepted = await confirmAction(Lampa, 'Восстановление', parsed.report.join('\n'));
        if (!accepted) return this.start();
        Object.assign(runtime.state, parsed.state);
        this.save();
        notify(Lampa, 'Резервная копия восстановлена.');
        this.rebuild();
      } catch (error) {
        notify(Lampa, (error as Error).message);
        this.start();
      }
    }
  };
}
