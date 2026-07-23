import { describe, expect, it } from 'vitest';

import { parseXmltv, parseXmltvTime, programProgress } from '../../src/epg/xmltv-parser';

describe('XMLTV', () => {
  it('учитывает явное смещение часового пояса', () => {
    expect(parseXmltvTime('20260723120000 +0300')).toBe(Date.UTC(2026, 6, 23, 9, 0, 0));
  });

  it('разбирает каналы и программы и рассчитывает прогресс', () => {
    const result = parseXmltv(`<?xml version="1.0"?>
      <tv>
        <channel id="NTV.ru"><display-name>НТВ</display-name></channel>
        <programme channel="NTV.ru" start="20260723120000 +0300" stop="20260723130000 +0300">
          <title>Новости</title><desc>Дневной выпуск</desc><category>Новости</category>
        </programme>
      </tv>`);

    expect(result.channels[0]).toEqual({ id: 'NTV.ru', names: ['НТВ'] });
    expect(result.programs[0]).toMatchObject({
      channelId: 'NTV.ru',
      title: 'Новости',
      description: 'Дневной выпуск'
    });
    expect(programProgress(result.programs[0]!, Date.UTC(2026, 6, 23, 9, 30))).toBe(50);
  });

  it('отклоняет DTD и внешние сущности', () => {
    expect(() =>
      parseXmltv('<!DOCTYPE tv [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><tv>&xxe;</tv>')
    ).toThrow(/DTD/);
  });
});
