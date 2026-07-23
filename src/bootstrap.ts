import './styles/plugin.scss';
import { PLUGIN_INFO } from './config';
import { createChannelComponent } from './lampa/channel-component';
import { createDiagnosticsComponent } from './lampa/diagnostics-component';
import { createMainComponent } from './lampa/main-component';
import { ICON, registerSettings } from './lampa/settings';
import { createSourcesComponent } from './lampa/sources-component';
import { loadState, saveState } from './storage/storage';
import type { LampaLike, PluginRuntime } from './types';

interface BootstrapResult {
  destroy: () => void;
}

function createMenuItem(Lampa: LampaLike): HTMLLIElement {
  const item = document.createElement('li');
  item.className = 'menu__item selector lampa-iptv-menu-item';
  item.dataset.action = PLUGIN_INFO.component;
  const icon = document.createElement('div');
  icon.className = 'menu__ico';
  icon.innerHTML = ICON;
  const text = document.createElement('div');
  text.className = 'menu__text';
  text.textContent = 'ТВ';
  item.append(icon, text);
  const open = (): void => {
    if (Lampa.Activity?.active?.()?.component === PLUGIN_INFO.component) return;
    Lampa.Activity.push({
      component: PLUGIN_INFO.component,
      title: 'ТВ',
      page: 1
    });
  };
  item.addEventListener('hover:enter', open);
  item.addEventListener('click', open);
  return item;
}

function addTranslations(Lampa: LampaLike): void {
  Lampa.Lang?.add?.({
    lampa_iptv_title: {
      ru: 'ТВ',
      en: 'TV',
      uk: 'ТБ'
    },
    lampa_iptv_not_configured: {
      ru: 'Источник не подключён',
      en: 'Source is not configured',
      uk: 'Джерело не підключено'
    }
  });
}

function compareVersions(current: string, available: string): boolean {
  const normalize = (value: string): number[] =>
    value
      .replace(/^v/, '')
      .split('.')
      .map((part) => Number(part) || 0);
  const left = normalize(current);
  const right = normalize(available);
  for (let index = 0; index < Math.max(left.length, right.length); index += 1) {
    if ((right[index] ?? 0) > (left[index] ?? 0)) return true;
    if ((right[index] ?? 0) < (left[index] ?? 0)) return false;
  }
  return false;
}

async function checkVersion(Lampa: LampaLike, baseUrl: string): Promise<void> {
  if (!baseUrl || !/^https?:/i.test(baseUrl)) return;
  const key = 'lampa_iptv_version_checked_at';
  const last = Number(Lampa.Storage?.get?.(key, '0') ?? 0);
  if (Date.now() - last < 24 * 60 * 60 * 1000) return;
  Lampa.Storage?.set?.(key, Date.now());
  try {
    const response = await fetch(`${baseUrl}version.json`, {
      credentials: 'omit',
      cache: 'no-cache'
    });
    if (!response.ok) return;
    const version = (await response.json()) as { version?: string };
    if (version.version && compareVersions(PLUGIN_INFO.version, version.version)) {
      Lampa.Noty?.show?.(`Доступна новая версия Lampa IPTV: ${version.version}`);
    }
  } catch {
    // Update availability is informational and must never affect startup.
  }
}

export function bootstrap(Lampa: LampaLike, baseUrl: string): BootstrapResult {
  const state = loadState(Lampa);
  const runtime: PluginRuntime = {
    Lampa,
    state,
    saveState: () => saveState(state, Lampa)
  };

  addTranslations(Lampa);
  Lampa.Component.add(PLUGIN_INFO.component, createMainComponent(runtime));
  Lampa.Component.add('lampa_iptv_sources', createSourcesComponent(runtime));
  Lampa.Component.add('lampa_iptv_channel', createChannelComponent(runtime));
  Lampa.Component.add('lampa_iptv_diagnostics', createDiagnosticsComponent(runtime));
  Lampa.Manifest.plugins = {
    type: 'video',
    version: PLUGIN_INFO.version,
    name: PLUGIN_INFO.name,
    description: 'IPTV-клиент со строгим реестром из 28 каналов',
    component: PLUGIN_INFO.component
  };

  const updateMenu = (): void => {
    document.querySelector('.lampa-iptv-menu-item')?.remove();
    if (!state.preferences.enabled) return;
    const menu = document.querySelector('.menu .menu__list');
    if (menu) menu.append(createMenuItem(Lampa));
  };

  const removeSettings = registerSettings(runtime, updateMenu);
  const ready = (): void => {
    updateMenu();
    document.body.classList.toggle('lampa-iptv-low-power', state.preferences.lowPowerMode);
    void checkVersion(Lampa, baseUrl);
  };

  let appListener: ((event: { type?: string }) => void) | undefined;
  if ((globalThis as any).appready) ready();
  else if (Lampa.Listener?.follow) {
    appListener = (event: { type?: string }): void => {
      if (event.type === 'ready') {
        ready();
        if (Lampa.Listener?.remove) Lampa.Listener.remove('app', appListener);
      }
    };
    Lampa.Listener.follow('app', appListener);
  } else {
    ready();
  }

  return {
    destroy: () => {
      document.querySelector('.lampa-iptv-menu-item')?.remove();
      if (appListener && Lampa.Listener?.remove) Lampa.Listener.remove('app', appListener);
      removeSettings();
      Lampa.Component?.add?.(PLUGIN_INFO.component, undefined);
    }
  };
}
