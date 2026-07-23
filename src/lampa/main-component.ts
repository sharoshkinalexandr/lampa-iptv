import { configureAdultPin, isAdultUnlocked, unlockAdult } from '../core/adult-access';
import { addDiagnostic } from '../core/security';
import { loadXmltv, matchEpgPrograms, nowAndNext } from '../epg/epg-manager';
import { programProgress } from '../epg/xmltv-parser';
import { checkStream, applyHealthResult } from '../network/health';
import { playChannel } from '../player/player-controller';
import {
  getChannelSources,
  getRuntimeChannels,
  toggleFavorite,
  updateOverride
} from '../storage/storage';
import type { PluginRuntime, RuntimeChannel } from '../types';
import {
  activateContentController,
  bindFocus,
  element,
  onEnter,
  onLong,
  selector,
  statusLabel
} from '../ui/dom';
import { askText, choose, notify } from './input';

type Section = 'favorites' | 'history' | 'main' | 'cinema' | 'hobby' | 'adult' | 'all' | 'epg';

interface ActivityParams {
  section?: Section;
}

const NAVIGATION: Array<{ id: Section | 'sources' | 'diagnostics' | 'search'; title: string }> = [
  { id: 'favorites', title: 'Избранное' },
  { id: 'history', title: 'Последние' },
  { id: 'main', title: 'Основные' },
  { id: 'cinema', title: 'Кино и развлечения' },
  { id: 'hobby', title: 'Хобби' },
  { id: 'adult', title: '18+' },
  { id: 'all', title: 'Все каналы' },
  { id: 'epg', title: 'Программа передач' },
  { id: 'search', title: 'Поиск' },
  { id: 'sources', title: 'Источники' },
  { id: 'diagnostics', title: 'Диагностика' }
];

function formatTime(timestamp: number): string {
  return new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(timestamp));
}

export function createMainComponent(runtime: PluginRuntime): new (params?: ActivityParams) => any {
  const { Lampa } = runtime;

  return class MainComponent {
    activity: any;
    private root = element('div', 'lampa-iptv');
    private content = element('div', 'lampa-iptv__content');
    private last?: HTMLElement;
    private initialized = false;
    private section: Section;
    private searchQuery = '';

    constructor(params: ActivityParams = {}) {
      this.section = params.section ?? 'main';
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
      Lampa.Background?.immediately?.('data:image/png;base64,');
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

    private push(component: string, params: Record<string, unknown> = {}): void {
      Lampa.Activity.push({
        component,
        title: 'Lampa IPTV',
        page: 1,
        ...params
      });
    }

    private build(): void {
      this.root.replaceChildren();
      const header = element('div', 'lampa-iptv__header');
      header.append(
        element('div', 'lampa-iptv__brand', 'Lampa IPTV'),
        element('div', 'lampa-iptv__version', '28 фиксированных каналов')
      );
      const layout = element('div', 'lampa-iptv__layout');
      const navigation = element('div', 'lampa-iptv__navigation');
      for (const item of NAVIGATION) {
        const button = selector('lampa-iptv-nav', item.title);
        if (item.id === this.section) button.classList.add('active');
        bindFocus(button, (node) => {
          this.last = node;
        });
        onEnter(button, async () => {
          if (item.id === 'sources') {
            this.push('lampa_iptv_sources');
            return;
          }
          if (item.id === 'diagnostics') {
            this.push('lampa_iptv_diagnostics');
            return;
          }
          if (item.id === 'search') {
            this.searchQuery = await askText(
              Lampa,
              'Поиск по утверждённым каналам',
              this.searchQuery
            );
            this.section = 'all';
          } else if (item.id === 'adult') {
            const access = runtime.state.adult.enabled
              ? await unlockAdult(Lampa, runtime.state, this.save)
              : await configureAdultPin(Lampa, runtime.state, this.save);
            if (!access) {
              this.start();
              return;
            }
            this.section = 'adult';
          } else {
            this.section = item.id;
          }
          this.build();
          this.start();
        });
        navigation.append(button);
      }
      layout.append(navigation, this.content);
      this.root.append(header, layout);
      this.renderSection();
      this.activity?.loader?.(false);
    }

    private channelsForSection(): RuntimeChannel[] {
      const channels = getRuntimeChannels(runtime.state);
      const adultUnlocked = isAdultUnlocked(runtime.state);
      let filtered = channels.filter((channel) => !channel.hidden);
      if (!adultUnlocked || this.section !== 'adult')
        filtered = filtered.filter((channel) => !channel.adult);
      if (this.searchQuery) {
        const query = this.searchQuery.toLocaleLowerCase('ru-RU');
        filtered = filtered.filter((channel) =>
          [channel.name, ...channel.epgAliases].some((name) =>
            name.toLocaleLowerCase('ru-RU').includes(query)
          )
        );
      }
      switch (this.section) {
        case 'favorites':
          return filtered.filter((channel) => channel.favorite);
        case 'history': {
          const positions = new Map(
            [...runtime.state.history]
              .reverse()
              .map((entry, index) => [entry.channelId, index] as const)
          );
          return filtered
            .filter((channel) => positions.has(channel.id) && !channel.adult)
            .sort((left, right) => positions.get(left.id)! - positions.get(right.id)!);
        }
        case 'main':
          return filtered.filter((channel) => channel.effectiveCategory === 'Основные');
        case 'cinema':
          return filtered.filter((channel) => channel.effectiveCategory === 'Кино и развлечения');
        case 'hobby':
          return filtered.filter((channel) => channel.effectiveCategory === 'Хобби');
        case 'adult':
          return adultUnlocked
            ? channels.filter((channel) => channel.adult && !channel.hidden)
            : [];
        default:
          return filtered;
      }
    }

    private renderSection(): void {
      this.content.replaceChildren();
      const title = NAVIGATION.find((item) => item.id === this.section)?.title ?? 'Каналы';
      const sectionHeader = element('div', 'lampa-iptv-section__header');
      sectionHeader.append(element('div', 'lampa-iptv-section__title', title));
      if (this.searchQuery) {
        sectionHeader.append(
          element('div', 'lampa-iptv-section__hint', `Поиск: ${this.searchQuery}`)
        );
      }
      this.content.append(sectionHeader);
      if (this.section === 'epg') {
        this.renderEpgOverview();
        return;
      }
      const channels = this.channelsForSection();
      if (!channels.length) {
        const empty = selector(
          'lampa-iptv-empty',
          this.section === 'adult' ? 'Раздел заблокирован' : 'Здесь пока нет каналов',
          this.section === 'favorites'
            ? 'Добавляйте каналы в избранное через долгое нажатие.'
            : 'Проверьте фильтр или настройки.'
        );
        bindFocus(empty, (node) => {
          this.last = node;
        });
        if (this.section === 'adult') {
          onEnter(empty, async () => {
            if (await unlockAdult(Lampa, runtime.state, this.save)) {
              this.build();
              this.start();
            }
          });
        }
        this.content.append(empty);
        return;
      }
      const list = element(
        'div',
        runtime.state.preferences.view === 'list'
          ? 'lampa-iptv-channels list'
          : 'lampa-iptv-channels grid'
      );
      for (const channel of channels) list.append(this.channelCard(channel, channels));
      this.content.append(list);
    }

    private channelCard(channel: RuntimeChannel, playlist: RuntimeChannel[]): HTMLElement {
      const sources = getChannelSources(runtime.state, channel.id);
      const primary = sources[0];
      const card = element('div', 'lampa-iptv-channel selector');
      card.tabIndex = 0;
      card.dataset.channelId = channel.id;
      const logo = element('div', 'lampa-iptv-channel__logo');
      logo.textContent = channel.logo ? '' : channel.name.slice(0, 2).toLocaleUpperCase('ru-RU');
      if (channel.logo) {
        const image = element('img');
        image.loading = 'lazy';
        image.alt = '';
        image.src = channel.logo;
        image.addEventListener('error', () => image.remove(), { once: true });
        logo.append(image);
      }
      const body = element('div', 'lampa-iptv-channel__body');
      const name = element('div', 'lampa-iptv-channel__name');
      if (runtime.state.preferences.showNumbers) {
        name.append(element('span', 'lampa-iptv-channel__number', `${channel.effectiveNumber}`));
      }
      name.append(document.createTextNode(channel.name));
      body.append(name, element('div', 'lampa-iptv-channel__category', channel.effectiveCategory));
      if (runtime.state.preferences.showStatuses) {
        const status = primary?.status ?? 'not_configured';
        body.append(
          element('div', `lampa-iptv-channel__status status-${status}`, statusLabel(status))
        );
      }
      if (channel.favorite) card.append(element('div', 'lampa-iptv-channel__favorite', '★'));
      card.append(logo, body);
      bindFocus(card, (node) => {
        this.last = node;
      });
      onEnter(card, async () => {
        if (!sources.length) {
          this.push('lampa_iptv_channel', { channelId: channel.id });
          return;
        }
        await playChannel(Lampa, runtime.state, channel, playlist, this.save);
      });
      onLong(card, () => this.openContext(channel));
      return card;
    }

    private async openContext(channel: RuntimeChannel): Promise<void> {
      const selection = await choose(
        Lampa,
        channel.name,
        [
          { title: 'Смотреть', action: 'play' },
          {
            title: channel.favorite ? 'Удалить из избранного' : 'Добавить в избранное',
            action: 'favorite'
          },
          { title: 'Настроить источники', action: 'sources' },
          { title: 'Проверить основной источник', action: 'health' },
          { title: 'Показать программу', action: 'epg' },
          { title: channel.hidden ? 'Показать канал' : 'Скрыть канал', action: 'hidden' }
        ],
        () => this.start()
      );
      if (!selection) return;
      if (selection.action === 'play') {
        await playChannel(Lampa, runtime.state, channel, this.channelsForSection(), this.save);
      }
      if (selection.action === 'favorite') {
        toggleFavorite(runtime.state, channel.id);
        this.save();
        this.build();
      }
      if (selection.action === 'sources')
        this.push('lampa_iptv_channel', { channelId: channel.id });
      if (selection.action === 'hidden') {
        updateOverride(runtime.state, channel.id, { hidden: !channel.hidden });
        this.save();
        this.build();
      }
      if (selection.action === 'health') await this.checkPrimary(channel);
      if (selection.action === 'epg') await this.showProgram(channel);
      this.start();
    }

    private async checkPrimary(channel: RuntimeChannel): Promise<void> {
      const source = getChannelSources(runtime.state, channel.id)[0];
      if (!source) {
        notify(Lampa, 'Источник не подключён.');
        return;
      }
      notify(Lampa, 'Проверка источника…');
      const result = await checkStream(source, runtime.state.preferences.connectionTimeoutMs);
      applyHealthResult(source, result);
      runtime.state.recentErrors = addDiagnostic(
        runtime.state.recentErrors,
        result.status === 'online' || result.status === 'slow' ? 'info' : 'warning',
        `${channel.name}: ${result.detail}`
      );
      this.save();
      notify(Lampa, `${statusLabel(result.status)}: ${result.detail}`);
      this.build();
    }

    private async showProgram(channel: RuntimeChannel): Promise<void> {
      const epgUrl = runtime.state.channelOverrides[channel.id]?.epgUrl;
      if (!epgUrl) {
        notify(Lampa, 'Для канала не задан XMLTV URL.');
        this.push('lampa_iptv_channel', { channelId: channel.id });
        return;
      }
      try {
        notify(Lampa, 'Загрузка программы…');
        const xmltv = await loadXmltv(epgUrl, runtime.state.preferences.connectionTimeoutMs);
        const programs = matchEpgPrograms(xmltv, channel, runtime.state);
        const pair = nowAndNext(programs);
        const body = element('div', 'lampa-iptv-program');
        if (pair.current) {
          body.append(
            element(
              'div',
              'lampa-iptv-program__current',
              `Сейчас: ${formatTime(pair.current.start)}–${formatTime(pair.current.stop)} ${pair.current.title}`
            )
          );
          const progress = element('div', 'lampa-iptv-program__progress');
          const fill = element('div');
          fill.style.width = `${programProgress(pair.current)}%`;
          progress.append(fill);
          body.append(progress);
        }
        if (pair.next) {
          body.append(
            element(
              'div',
              'lampa-iptv-program__next',
              `Далее: ${formatTime(pair.next.start)} ${pair.next.title}`
            )
          );
        }
        for (const program of programs.filter((item) => item.stop > Date.now()).slice(0, 20)) {
          body.append(
            element(
              'div',
              'lampa-iptv-program__item',
              `${formatTime(program.start)}–${formatTime(program.stop)}  ${program.title}`
            )
          );
        }
        if (!programs.length) body.append(element('div', '', 'Совпадающих программ не найдено.'));
        Lampa.Modal?.open?.({
          title: channel.name,
          html: body,
          size: 'large'
        });
      } catch (error) {
        notify(Lampa, (error as Error).message);
      }
    }

    private renderEpgOverview(): void {
      const channels = getRuntimeChannels(runtime.state).filter(
        (channel) =>
          !channel.adult &&
          !channel.hidden &&
          Boolean(runtime.state.channelOverrides[channel.id]?.epgUrl)
      );
      if (!channels.length) {
        const empty = selector(
          'lampa-iptv-empty',
          'EPG пока не подключена',
          'Укажите XMLTV URL и channel ID в настройках нужного канала. Телеканалы работают и без EPG.'
        );
        onEnter(empty, () => this.push('lampa_iptv_sources'));
        bindFocus(empty, (node) => {
          this.last = node;
        });
        this.content.append(empty);
        return;
      }
      const list = element('div', 'lampa-iptv-epg-list');
      for (const channel of channels) {
        const item = selector(
          'lampa-iptv-field',
          channel.name,
          'Нажмите, чтобы загрузить текущую и следующую передачу'
        );
        bindFocus(item, (node) => {
          this.last = node;
        });
        onEnter(item, () => this.showProgram(channel));
        list.append(item);
      }
      this.content.append(list);
    }
  };
}
