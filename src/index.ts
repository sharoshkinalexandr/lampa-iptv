import { bootstrap } from './bootstrap';
import { PLUGIN_INFO } from './config';

interface GlobalPluginState {
  version: string;
  destroy?: () => void;
  starting?: boolean;
}

const globalScope = globalThis as typeof globalThis & {
  Lampa?: Record<string, any>;
  __lampaIptvPlugin?: GlobalPluginState;
};

const scriptUrl = (document.currentScript as HTMLScriptElement | null)?.src ?? '';
const baseUrl = scriptUrl ? new URL('.', scriptUrl).toString() : '';

if (!globalScope.__lampaIptvPlugin) {
  globalScope.__lampaIptvPlugin = {
    version: PLUGIN_INFO.version,
    starting: true
  };

  let attempts = 0;
  const start = (): void => {
    const Lampa = globalScope.Lampa;
    if (
      Lampa?.Component?.add &&
      Lampa?.Activity?.push &&
      Lampa?.Controller &&
      Lampa?.Storage &&
      Lampa?.Player
    ) {
      const result = bootstrap(Lampa, baseUrl);
      globalScope.__lampaIptvPlugin = {
        version: PLUGIN_INFO.version,
        destroy: result.destroy,
        starting: false
      };
      return;
    }
    attempts += 1;
    if (attempts < 300) {
      globalThis.setTimeout(start, 100);
    } else {
      globalScope.__lampaIptvPlugin = undefined;
      console.error('Lampa IPTV: API Lampa не появился за 30 секунд.');
    }
  };
  start();
}
