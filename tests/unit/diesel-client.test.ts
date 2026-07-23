import { afterEach, describe, expect, it } from 'vitest';

import {
  isDieselClientLoaded,
  loadDieselClient,
  removeDieselLoader
} from '../../src/integrations/diesel-client';

afterEach(() => {
  removeDieselLoader();
  delete (globalThis as any).plugin_diesel_iptv_ready;
});

describe('интеграция «Дизель ТВ»', () => {
  it('добавляет только один официальный внешний script', async () => {
    const first = loadDieselClient();
    const second = loadDieselClient();
    const script = document.querySelector<HTMLScriptElement>('#lampa-iptv-diesel-client');

    expect(script?.src).toBe('https://andreyurl54.github.io/diesel5/diesel.js');
    expect(document.querySelectorAll('#lampa-iptv-diesel-client')).toHaveLength(1);
    script?.dispatchEvent(new Event('load'));

    await expect(first).resolves.toBeUndefined();
    await expect(second).resolves.toBeUndefined();
    expect(isDieselClientLoaded()).toBe(true);
  });

  it('не создаёт script, если клиент уже зарегистрирован', async () => {
    (globalThis as any).plugin_diesel_iptv_ready = true;

    await expect(loadDieselClient()).resolves.toBeUndefined();
    expect(document.querySelector('#lampa-iptv-diesel-client')).toBeNull();
  });
});
