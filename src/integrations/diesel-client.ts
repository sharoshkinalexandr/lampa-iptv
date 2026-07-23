import { DIESEL_CLIENT } from '../config';
import type { LampaLike } from '../types';

const SCRIPT_ID = 'lampa-iptv-diesel-client';
let loading: Promise<void> | undefined;

type DieselGlobal = typeof globalThis & {
  plugin_diesel_iptv_ready?: boolean;
};

function isOfficialScript(script: HTMLScriptElement): boolean {
  try {
    return new URL(script.src, globalThis.location?.href).href === DIESEL_CLIENT.scriptUrl;
  } catch {
    return false;
  }
}

export function isDieselClientLoaded(): boolean {
  if ((globalThis as DieselGlobal).plugin_diesel_iptv_ready === true) return true;
  return Array.from(document.scripts).some(isOfficialScript);
}

export function loadDieselClient(Lampa?: LampaLike): Promise<void> {
  if ((globalThis as DieselGlobal).plugin_diesel_iptv_ready === true) {
    return Promise.resolve();
  }
  if (loading) return loading;

  const existing = Array.from(document.scripts).find(isOfficialScript);
  if (existing?.dataset.lampaIptvLoaded === 'true') return Promise.resolve();

  loading = new Promise<void>((resolve, reject) => {
    const script = existing ?? document.createElement('script');
    const finish = (): void => {
      script.dataset.lampaIptvLoaded = 'true';
      resolve();
    };
    const fail = (): void => {
      if (!existing) script.remove();
      loading = undefined;
      reject(new Error('Не удалось загрузить официальный клиент «Дизель ТВ».'));
    };

    script.addEventListener('load', finish, { once: true });
    script.addEventListener('error', fail, { once: true });
    if (!existing) {
      script.id = SCRIPT_ID;
      script.src = DIESEL_CLIENT.scriptUrl;
      script.async = true;
      script.referrerPolicy = 'no-referrer';
      document.head.append(script);
    }
  });

  loading.catch((error) => {
    Lampa?.Noty?.show?.((error as Error).message);
  });
  return loading;
}

export function removeDieselLoader(): void {
  document.getElementById(SCRIPT_ID)?.remove();
  loading = undefined;
}
