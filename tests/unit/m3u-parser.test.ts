import { describe, expect, it } from 'vitest';

import { parseAttributes, parseM3u } from '../../src/core/m3u-parser';

describe('parseAttributes', () => {
  it('читает двойные, одинарные и некавыченные атрибуты', () => {
    expect(parseAttributes(`tvg-id="NTV.ru" tvg-name='НТВ HD' group-title=Основные`)).toEqual({
      'tvg-id': 'NTV.ru',
      'tvg-name': 'НТВ HD',
      'group-title': 'Основные'
    });
  });
});

describe('parseM3u', () => {
  it('разбирает BOM, CRLF, запятые, EXTGRP, EXTVLCOPT и pipe-заголовки', () => {
    const playlist =
      '\uFEFF#EXTM3U url-tvg="https://example.test/epg.xml"\r\n' +
      `#EXTINF:-1 tvg-id='NTV.ru' tvg-name="НТВ" tvg-logo=https://img.test/ntv.png,НТВ, Москва\r\n` +
      '#EXTGRP:Основные\r\n' +
      '#EXTVLCOPT:http-user-agent=Lampa Test\r\n' +
      'https://media.example.test/ntv.m3u8|Referer=https%3A%2F%2Fexample.test%2Fwatch&Origin=https%3A%2F%2Fexample.test\r\n';

    const result = parseM3u(playlist);

    expect(result.report.foundChannels).toBe(1);
    expect(result.report.epgUrls).toEqual(['https://example.test/epg.xml']);
    expect(result.entries[0]).toMatchObject({
      name: 'НТВ, Москва',
      tvgId: 'NTV.ru',
      tvgName: 'НТВ',
      group: 'Основные',
      url: 'https://media.example.test/ntv.m3u8',
      headers: {
        userAgent: 'Lampa Test',
        referer: 'https://example.test/watch',
        origin: 'https://example.test'
      }
    });
  });

  it('разрешает относительный URL и сообщает о повреждённых записях', () => {
    const result = parseM3u(
      [
        '#EXTINF:-1 tvg-name="Первый канал",Первый канал',
        './first/live.m3u8',
        '#EXTINF:-1,Без URL'
      ].join('\n'),
      'https://provider.example.test/list/playlist.m3u'
    );

    expect(result.entries[0]?.url).toBe('https://provider.example.test/list/first/live.m3u8');
    expect(result.report.skippedEntries).toBe(1);
    expect(result.report.warnings.join(' ')).toContain('отсутствует');
  });

  it('не принимает активные или локальные схемы URL', () => {
    const result = parseM3u(
      '#EXTM3U\n#EXTINF:-1,Первый канал\njavascript:alert(1)\n#EXTINF:-1,НТВ\nfile:///tmp/tv.m3u8'
    );

    expect(result.entries).toHaveLength(0);
    expect(result.report.skippedEntries).toBe(2);
  });
});
