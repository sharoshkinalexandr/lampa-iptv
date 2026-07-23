import { afterEach, describe, expect, it, vi } from 'vitest';

import { bootstrap } from '../../src/bootstrap';

afterEach(() => {
  document.body.replaceChildren();
  delete (globalThis as any).appready;
  localStorage.clear();
});

describe('production lifecycle в DOM', () => {
  it('создаёт одно меню и обычный каталог без карточек 18+', () => {
    document.body.innerHTML =
      '<aside class="menu"><ul class="menu__list"></ul></aside><main id="content"></main>';
    (globalThis as any).appready = true;

    const components: Record<string, any> = {};
    const pushed: any[] = [];
    const stored = new Map<string, unknown>();
    const Lampa = {
      Component: {
        add: vi.fn((name: string, Component: any) => {
          if (Component) components[name] = Component;
          else delete components[name];
        })
      },
      Activity: {
        push: vi.fn((params: any) => pushed.push(params)),
        backward: vi.fn(),
        active: vi.fn(() => ({}))
      },
      Controller: {
        add: vi.fn(),
        toggle: vi.fn(),
        collectionSet: vi.fn(),
        collectionFocus: vi.fn()
      },
      Storage: {
        get: vi.fn((key: string, fallback: unknown) => stored.get(key) ?? fallback),
        set: vi.fn((key: string, value: unknown) => stored.set(key, value)),
        field: vi.fn(() => '')
      },
      Player: { play: vi.fn(), playlist: vi.fn(), runas: vi.fn() },
      SettingsApi: {
        addComponent: vi.fn(),
        addParam: vi.fn(),
        removeComponent: vi.fn(),
        removeParams: vi.fn()
      },
      Background: { immediately: vi.fn() },
      Lang: { add: vi.fn() },
      Manifest: {},
      Noty: { show: vi.fn() }
    };

    const first = bootstrap(Lampa, '');
    const second = bootstrap(Lampa, '');
    expect(document.querySelectorAll('.lampa-iptv-menu-item')).toHaveLength(1);

    (document.querySelector('.lampa-iptv-menu-item') as HTMLElement).click();
    expect(pushed[pushed.length - 1]).toMatchObject({ component: 'lampa_iptv', title: 'ТВ' });

    const MainComponent = components.lampa_iptv;
    const component = new MainComponent({ section: 'main' });
    component.activity = { loader: vi.fn() };
    document.getElementById('content')!.append(component.create());
    component.start();

    const cards = Array.from(document.querySelectorAll<HTMLElement>('.lampa-iptv-channel'));
    expect(cards).toHaveLength(13);
    expect(cards.map((card) => card.dataset.channelId)).not.toContain('shalun');
    expect(document.body.textContent).not.toContain('Blue Hustler');

    component.destroy();
    const SourcesComponent = components.lampa_iptv_sources;
    const sources = new SourcesComponent();
    sources.activity = { loader: vi.fn() };
    document.getElementById('content')!.append(sources.create());
    sources.start();
    expect(document.body.textContent).toContain('Раздел 18+ заблокирован');
    expect(document.body.textContent).not.toContain('Blue Hustler');
    expect(document.querySelectorAll('.lampa-iptv-source-card')).toHaveLength(16);

    sources.destroy();
    first.destroy();
    second.destroy();
  });
});
