import type { PluginRuntime } from '../types';

const ICON = `<svg viewBox="0 0 48 48" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="5" y="11" width="38" height="27" rx="4" stroke="currentColor" stroke-width="3"/>
  <path d="M16 5l6 6m10-6l-6 6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  <path d="M15 43h18" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
</svg>`;

export function registerSettings(runtime: PluginRuntime, updateMenu: () => void): () => void {
  const { Lampa } = runtime;
  if (!Lampa?.SettingsApi?.addComponent || !Lampa?.SettingsApi?.addParam) return () => {};
  const component = 'lampa_iptv';
  Lampa.SettingsApi.addComponent({
    component,
    icon: ICON,
    name: 'Lampa IPTV'
  });

  const button = (name: string, description: string, target: string): void => {
    Lampa.SettingsApi.addParam({
      component,
      param: { type: 'button' },
      field: { name, description },
      onChange: () => {
        Lampa.Activity.push({
          component: target,
          title: name,
          page: 1
        });
      }
    });
  };

  button('Открыть ТВ', 'Перейти к фиксированному списку из 28 каналов', 'lampa_iptv');
  button(
    'Каналы и источники',
    'M3U, Xtream, резервные URL, EPG и настройки каждого канала',
    'lampa_iptv_sources'
  );
  button(
    'Диагностика',
    'Возможности устройства, тест HLS и безопасный журнал',
    'lampa_iptv_diagnostics'
  );

  Lampa.SettingsApi.addParam({
    component,
    param: { type: 'title' },
    field: { name: 'Общие' }
  });

  Lampa.SettingsApi.addParam({
    component,
    param: {
      name: 'lampa_iptv_enabled',
      type: 'trigger',
      default: runtime.state.preferences.enabled
    },
    field: {
      name: 'Включить плагин',
      description: 'Показывать пункт «ТВ» в главном меню'
    },
    onChange: (value: string) => {
      runtime.state.preferences.enabled = value === 'true';
      runtime.saveState();
      updateMenu();
    }
  });

  Lampa.SettingsApi.addParam({
    component,
    param: {
      name: 'lampa_iptv_view',
      type: 'select',
      values: {
        grid: 'Сетка',
        list: 'Список'
      },
      default: runtime.state.preferences.view
    },
    field: {
      name: 'Режим отображения',
      description: 'Сетка карточек или компактный список'
    },
    onChange: (value: string) => {
      runtime.state.preferences.view = value === 'list' ? 'list' : 'grid';
      runtime.saveState();
    }
  });

  Lampa.SettingsApi.addParam({
    component,
    param: {
      name: 'lampa_iptv_check_before_play',
      type: 'trigger',
      default: runtime.state.preferences.checkBeforePlay
    },
    field: {
      name: 'Проверять перед запуском',
      description: 'CORS может дать неопределённый результат'
    },
    onChange: (value: string) => {
      runtime.state.preferences.checkBeforePlay = value === 'true';
      runtime.saveState();
    }
  });

  Lampa.SettingsApi.addParam({
    component,
    param: {
      name: 'lampa_iptv_auto_fallback',
      type: 'trigger',
      default: runtime.state.preferences.autoFallback
    },
    field: {
      name: 'Автоматический резерв',
      description: 'Переключаться на резервный URL при ошибке плеера'
    },
    onChange: (value: string) => {
      runtime.state.preferences.autoFallback = value === 'true';
      runtime.saveState();
    }
  });

  Lampa.SettingsApi.addParam({
    component,
    param: {
      name: 'lampa_iptv_timeout',
      type: 'select',
      values: {
        '8000': '8 секунд',
        '12000': '12 секунд',
        '20000': '20 секунд',
        '30000': '30 секунд'
      },
      default: String(runtime.state.preferences.connectionTimeoutMs)
    },
    field: {
      name: 'Тайм-аут проверки'
    },
    onChange: (value: string) => {
      runtime.state.preferences.connectionTimeoutMs = Number(value) || 12_000;
      runtime.saveState();
    }
  });

  Lampa.SettingsApi.addParam({
    component,
    param: {
      name: 'lampa_iptv_low_power',
      type: 'trigger',
      default: runtime.state.preferences.lowPowerMode
    },
    field: {
      name: 'Режим слабого устройства',
      description: 'Минимум анимаций и более компактный интерфейс'
    },
    onChange: (value: string) => {
      runtime.state.preferences.lowPowerMode = value === 'true';
      document.body.classList.toggle('lampa-iptv-low-power', value === 'true');
      runtime.saveState();
    }
  });

  return () => {
    Lampa.SettingsApi.removeComponent?.(component);
    Lampa.SettingsApi.removeParams?.(component);
  };
}

export { ICON };
