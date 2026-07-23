import { describe, expect, it } from 'vitest';

import { isAllowedUrl, maskHeaders, maskUrl, sanitizeLogMessage } from '../../src/core/security';
import { addDirectSource } from '../../src/core/source-manager';
import { createBackup, parseBackup } from '../../src/storage/export-import';
import { createDefaultState } from '../../src/storage/storage';

describe('безопасность URL и резервных копий', () => {
  it('разрешает только HTTP(S)', () => {
    expect(isAllowedUrl('https://example.test/live.m3u8')).toBe(true);
    expect(isAllowedUrl('http://192.168.1.20/live')).toBe(true);
    expect(isAllowedUrl('javascript:alert(1)')).toBe(false);
    expect(isAllowedUrl('file:///etc/passwd')).toBe(false);
  });

  it('маскирует учётные данные, токены и приватные заголовки', () => {
    const masked = maskUrl('https://alice:secret@example.test/live.m3u8?token=abc&quality=hd');
    expect(masked).not.toContain('alice');
    expect(masked).not.toContain('secret');
    expect(masked).not.toContain('abc');
    expect(masked).toContain('quality=hd');
    expect(
      maskHeaders({ authorization: 'Bearer secret', cookie: 'sid=secret', userAgent: 'Lampa' })
    ).toEqual({
      authorization: '***',
      cookie: '***',
      userAgent: 'Lampa',
      referer: undefined,
      origin: undefined
    });
    expect(sanitizeLogMessage('token=secret password=hunter2')).not.toContain('hunter2');
  });

  it('по умолчанию исключает секреты из экспорта', () => {
    const state = createDefaultState();
    addDirectSource(state, 'ntv', 'https://example.test/live.m3u8?token=secret', {
      headers: { authorization: 'Bearer secret', cookie: 'sid=secret' }
    });
    state.xtreamAccounts.push({
      id: 'provider',
      name: 'Провайдер',
      server: 'https://provider.test',
      username: 'alice',
      password: 'secret',
      enabled: true
    });

    const backup = createBackup(state);
    const serialized = JSON.stringify(backup);
    expect(serialized).not.toContain('Bearer secret');
    expect(serialized).not.toContain('alice');
    expect(serialized).not.toContain('sid=secret');
    expect(parseBackup(serialized).includesSecrets).toBe(false);
  });
});
