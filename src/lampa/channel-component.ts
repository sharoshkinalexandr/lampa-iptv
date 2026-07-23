import { addDirectSource } from '../core/source-manager';
import { isAllowedUrl, maskUrl } from '../core/security';
import { applyHealthResult, checkStream } from '../network/health';
import { getChannelSources, getRuntimeChannels, updateOverride } from '../storage/storage';
import type { ChannelSource, PluginRuntime, RuntimeChannel } from '../types';
import {
  activateContentController,
  bindFocus,
  element,
  onEnter,
  selector,
  statusLabel
} from '../ui/dom';
import { askText, choose, confirmAction, notify } from './input';

interface ActivityParams {
  channelId: string;
}

export function createChannelComponent(
  runtime: PluginRuntime
): new (params: ActivityParams) => any {
  const { Lampa } = runtime;

  return class ChannelComponent {
    activity: any;
    private root = element('div', 'lampa-iptv lampa-iptv-editor');
    private last?: HTMLElement;
    private channel?: RuntimeChannel;
    private initialized = false;
    private readonly channelId: string;

    constructor(params: ActivityParams) {
      this.channelId = params.channelId;
    }

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

    private field(
      title: string,
      value: string,
      callback: () => void | Promise<void>,
      className = ''
    ): HTMLElement {
      const item = selector('lampa-iptv-field', title, value || 'Не задано');
      if (className) item.classList.add(className);
      bindFocus(item, (node) => {
        this.last = node;
      });
      onEnter(item, callback);
      return item;
    }

    private build(): void {
      this.channel = getRuntimeChannels(runtime.state).find((item) => item.id === this.channelId);
      this.root.replaceChildren();
      if (!this.channel) {
        this.root.append(element('div', 'lampa-iptv-error', 'Канал не найден.'));
        return;
      }
      const channel = this.channel;
      const override = runtime.state.channelOverrides[channel.id] ?? {};
      const sources = getChannelSources(runtime.state, channel.id);
      const header = element('div', 'lampa-iptv__header');
      header.append(
        element('div', 'lampa-iptv__brand', channel.name),
        element(
          'div',
          'lampa-iptv__version',
          channel.adult ? 'Канал 18+ · данные хранятся только локально' : 'Настройка канала'
        )
      );
      const fields = element('div', 'lampa-iptv-fields');
      fields.append(
        this.field('Название', channel.name, () =>
          notify(Lampa, 'Фиксированное название реестра не изменяется.')
        ),
        this.field('Номер', String(channel.effectiveNumber), () => this.editNumber()),
        this.field('Категория', channel.effectiveCategory, () => this.editCategory()),
        this.field('Основной URL', this.sourceLabel(sources[0]), () => this.editSource(0)),
        this.field('Резервный URL №1', this.sourceLabel(sources[1]), () => this.editSource(1)),
        this.field('Резервный URL №2', this.sourceLabel(sources[2]), () => this.editSource(2)),
        this.field('XMLTV URL', override.epgUrl ? maskUrl(override.epgUrl) : '', () =>
          this.editEpgUrl()
        ),
        this.field('XMLTV channel ID / tvg-id', override.epgId ?? channel.epgId ?? '', () =>
          this.editEpgId()
        ),
        this.field('Часовой пояс', override.epgTimezone ?? 'Автоматически из XMLTV', () =>
          this.editTimezone()
        ),
        this.field('Смещение EPG, минут', String(override.epgOffsetMinutes ?? 0), () =>
          this.editEpgOffset()
        ),
        this.field('Название для сопоставления EPG', override.epgAlias ?? '', () =>
          this.editEpgAlias()
        ),
        this.field('User-Agent основного источника', sources[0]?.headers?.userAgent ?? '', () =>
          this.editHeader('userAgent')
        ),
        this.field('Referer основного источника', sources[0]?.headers?.referer ?? '', () =>
          this.editHeader('referer')
        ),
        this.field(
          'Внешний плеер',
          sources[0]?.externalPlayer ? 'Включён' : 'Использовать настройку Lampa',
          () => this.toggleExternalPlayer()
        ),
        this.field('Проверить ссылки', 'Проверить до трёх источников локально', () =>
          this.checkSources()
        ),
        this.field('Поменять приоритет', 'Основной ↔ резервный №1', () => this.swapSources()),
        this.field('Очистить источники', 'Удалить URL и приватные заголовки канала', () =>
          this.clearSources()
        ),
        this.field(
          'Официальная страница',
          channel.officialLivePage ?? channel.officialSite ?? 'Не найдена',
          () => this.openOfficial()
        )
      );
      if (!sources.length) {
        const notice = element(
          'div',
          'lampa-iptv-editor__notice',
          'Источник не подключён. Вставьте прямой .m3u8 URL, одну M3U-запись или импортируйте общий плейлист.'
        );
        this.root.append(header, notice, fields);
      } else {
        this.root.append(header, fields);
      }
      this.activity?.loader?.(false);
    }

    private sourceLabel(source: ChannelSource | undefined): string {
      if (!source) return 'Источник не подключён';
      return `${maskUrl(source.url)} · ${statusLabel(source.status)}`;
    }

    private async editNumber(): Promise<void> {
      if (!this.channel) return;
      const value = await askText(Lampa, 'Номер канала', String(this.channel.effectiveNumber), {
        numeric: true
      });
      const number = Number(value);
      if (!Number.isInteger(number) || number < 1 || number > 9999) {
        notify(Lampa, 'Введите целое число от 1 до 9999.');
        return this.start();
      }
      updateOverride(runtime.state, this.channel.id, { number });
      this.save();
      this.rebuild();
    }

    private async editCategory(): Promise<void> {
      if (!this.channel) return;
      const selection = await choose(
        Lampa,
        'Категория',
        ['Основные', 'Кино и развлечения', 'Хобби', '18+'].map((value) => ({
          title: value,
          value
        })),
        () => this.start()
      );
      if (!selection) return;
      updateOverride(runtime.state, this.channel.id, { category: selection.value });
      this.save();
      this.rebuild();
    }

    private async editSource(index: number): Promise<void> {
      if (!this.channel) return;
      const sources = getChannelSources(runtime.state, this.channel.id);
      const value = await askText(
        Lampa,
        index === 0 ? 'Основной URL или M3U-запись' : `Резервный URL №${index}`,
        sources[index]?.url ?? ''
      );
      if (!value) return this.start();
      try {
        const override = (runtime.state.channelOverrides[this.channel.id] ??= {});
        const current = [...(override.sources ?? [])];
        if (index < current.length) current.splice(index, 1);
        override.sources = current;
        const source = addDirectSource(runtime.state, this.channel.id, value, {
          priority: index + 1,
          headers: sources[index]?.headers,
          externalPlayer: sources[index]?.externalPlayer
        });
        const updated = override.sources ?? [];
        const found = updated.findIndex((item) => item.id === source.id);
        if (found >= 0) updated.splice(found, 1);
        updated.splice(index, 0, source);
        updated.slice(0, 3).forEach((item, position) => {
          item.priority = position + 1;
        });
        override.sources = updated.slice(0, 3);
        this.save();
        this.rebuild();
      } catch (error) {
        notify(Lampa, (error as Error).message);
        this.start();
      }
    }

    private async editEpgUrl(): Promise<void> {
      if (!this.channel) return;
      const current = runtime.state.channelOverrides[this.channel.id]?.epgUrl ?? '';
      const value = await askText(Lampa, 'XMLTV или XMLTV.GZ URL', current);
      if (!value) {
        updateOverride(runtime.state, this.channel.id, { epgUrl: undefined });
      } else if (!isAllowedUrl(value)) {
        notify(Lampa, 'Разрешены только URL HTTP или HTTPS.');
        return this.start();
      } else {
        updateOverride(runtime.state, this.channel.id, { epgUrl: value });
      }
      this.save();
      this.rebuild();
    }

    private async editEpgId(): Promise<void> {
      if (!this.channel) return;
      const current =
        runtime.state.channelOverrides[this.channel.id]?.epgId ?? this.channel.epgId ?? '';
      const value = await askText(Lampa, 'XMLTV channel ID / tvg-id', current);
      updateOverride(runtime.state, this.channel.id, { epgId: value || undefined });
      this.save();
      this.rebuild();
    }

    private async editTimezone(): Promise<void> {
      if (!this.channel) return;
      const current = runtime.state.channelOverrides[this.channel.id]?.epgTimezone ?? '';
      const value = await askText(Lampa, 'Часовой пояс, например Europe/Moscow', current);
      updateOverride(runtime.state, this.channel.id, { epgTimezone: value || undefined });
      this.save();
      this.rebuild();
    }

    private async editEpgOffset(): Promise<void> {
      if (!this.channel) return;
      const current = runtime.state.channelOverrides[this.channel.id]?.epgOffsetMinutes ?? 0;
      const value = await askText(Lampa, 'Смещение EPG в минутах', String(current));
      const offset = Number(value);
      if (!Number.isInteger(offset) || offset < -1440 || offset > 1440) {
        notify(Lampa, 'Введите целое число от -1440 до 1440.');
        return this.start();
      }
      updateOverride(runtime.state, this.channel.id, { epgOffsetMinutes: offset });
      this.save();
      this.rebuild();
    }

    private async editEpgAlias(): Promise<void> {
      if (!this.channel) return;
      const current = runtime.state.channelOverrides[this.channel.id]?.epgAlias ?? '';
      const value = await askText(Lampa, 'Название для сопоставления EPG', current);
      updateOverride(runtime.state, this.channel.id, { epgAlias: value || undefined });
      this.save();
      this.rebuild();
    }

    private async editHeader(field: 'userAgent' | 'referer'): Promise<void> {
      if (!this.channel) return;
      const source = getChannelSources(runtime.state, this.channel.id)[0];
      if (!source) {
        notify(Lampa, 'Сначала добавьте основной URL.');
        return;
      }
      const current = source.headers?.[field] ?? '';
      const value = await askText(Lampa, field === 'userAgent' ? 'User-Agent' : 'Referer', current);
      source.headers = { ...(source.headers ?? {}), [field]: value || undefined };
      this.save();
      notify(
        Lampa,
        'Заголовок сохранён локально. Встроенный браузерный плеер может его не передать; используйте внешний плеер или официальное приложение.'
      );
      this.rebuild();
    }

    private toggleExternalPlayer(): void {
      if (!this.channel) return;
      const source = getChannelSources(runtime.state, this.channel.id)[0];
      if (!source) {
        notify(Lampa, 'Сначала добавьте основной URL.');
        return;
      }
      source.externalPlayer = !source.externalPlayer;
      this.save();
      this.rebuild();
    }

    private async checkSources(): Promise<void> {
      if (!this.channel) return;
      const sources = getChannelSources(runtime.state, this.channel.id);
      if (!sources.length) {
        notify(Lampa, 'Источник не подключён.');
        return;
      }
      for (let index = 0; index < sources.length; index += 1) {
        notify(Lampa, `Проверка источника ${index + 1}/${sources.length}…`);
        const health = await checkStream(
          sources[index]!,
          runtime.state.preferences.connectionTimeoutMs
        );
        applyHealthResult(sources[index]!, health);
      }
      this.save();
      notify(
        Lampa,
        sources.map((source, index) => `${index + 1}: ${statusLabel(source.status)}`).join(' · ')
      );
      this.rebuild();
    }

    private swapSources(): void {
      if (!this.channel) return;
      const override = (runtime.state.channelOverrides[this.channel.id] ??= {});
      const sources = override.sources ?? [];
      if (sources.length < 2) {
        notify(Lampa, 'Для смены приоритета нужен хотя бы один резервный источник.');
        return;
      }
      [sources[0], sources[1]] = [sources[1]!, sources[0]!];
      sources.forEach((source, index) => {
        source.priority = index + 1;
      });
      override.sources = sources;
      this.save();
      this.rebuild();
    }

    private async clearSources(): Promise<void> {
      if (!this.channel) return;
      const confirmed = await confirmAction(
        Lampa,
        'Очистить источники',
        `Удалить все URL и приватные заголовки канала «${this.channel.name}»?`
      );
      if (!confirmed) return this.start();
      updateOverride(runtime.state, this.channel.id, { sources: [] });
      this.save();
      this.rebuild();
    }

    private openOfficial(): void {
      if (!this.channel) return;
      const url = this.channel.officialLivePage ?? this.channel.officialSite;
      if (!url) {
        notify(Lampa, 'Подтверждённая официальная страница не найдена.');
        return;
      }
      globalThis.open?.(url, '_blank', 'noopener,noreferrer');
      this.start();
    }
  };
}
