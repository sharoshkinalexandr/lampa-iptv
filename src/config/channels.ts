import type { ConfiguredChannel, DiscoveryStatus } from '../types';

type ChannelSeed = Omit<ConfiguredChannel, 'sources' | 'discoveryStatus'> & {
  discoveryStatus?: DiscoveryStatus;
};

function channel(seed: ChannelSeed): ConfiguredChannel {
  return {
    ...seed,
    sources: [],
    discoveryStatus: seed.discoveryStatus ?? 'user_url_required'
  };
}

export const CHANNELS: readonly ConfiguredChannel[] = [
  channel({
    id: 'perviy',
    number: 1,
    name: 'Первый канал',
    category: 'Основные',
    adult: false,
    epgId: '1kanal.ru',
    epgAliases: ['Первый', '1 канал', 'Channel One Russia', 'Perviy Kanal'],
    officialSite: 'https://www.1tv.ru/',
    officialLivePage: 'https://www.1tv.ru/live'
  }),
  channel({
    id: 'match-tv',
    number: 2,
    name: 'Матч ТВ',
    category: 'Основные',
    adult: false,
    epgId: 'MatchTV.ru',
    epgAliases: ['Матч!', 'Матч ТВ HD', 'Match TV', 'MatchTV'],
    officialSite: 'https://matchtv.ru/',
    officialLivePage: 'https://matchtv.ru/video/channel/matchtv'
  }),
  channel({
    id: 'ntv',
    number: 3,
    name: 'НТВ',
    category: 'Основные',
    adult: false,
    epgId: 'NTV.ru',
    epgAliases: ['НТВ HD', 'NTV', 'NTV Russia'],
    officialSite: 'https://www.ntv.ru/',
    officialLivePage: 'https://www.ntv.ru/air/ntv'
  }),
  channel({
    id: 'sts',
    number: 4,
    name: 'СТС',
    category: 'Основные',
    adult: false,
    epgId: 'STS.ru',
    epgAliases: ['СТС HD', 'CTC', 'STS'],
    officialSite: 'https://ctc.ru/',
    officialLivePage: 'https://ctc.ru/online/'
  }),
  channel({
    id: 'tnt',
    number: 5,
    name: 'ТНТ',
    category: 'Основные',
    adult: false,
    epgId: 'TNT.ru',
    epgAliases: ['ТНТ HD', 'TNT', 'TNT Russia'],
    officialSite: 'https://tnt-online.ru/',
    officialLivePage: 'https://tnt-online.ru/live/'
  }),
  channel({
    id: 'ren-tv',
    number: 6,
    name: 'РЕН ТВ',
    category: 'Основные',
    adult: false,
    epgId: 'RenTV.ru',
    epgAliases: ['РЕН', 'РЕН ТВ HD', 'REN TV', 'RENTV'],
    officialSite: 'https://ren.tv/',
    officialLivePage: 'https://ren.tv/live'
  }),
  channel({
    id: 'friday',
    number: 7,
    name: 'Пятница!',
    category: 'Основные',
    adult: false,
    epgId: 'Friday.ru',
    epgAliases: ['Пятница', 'Пятница HD', 'Friday TV', 'Friday'],
    officialSite: 'https://friday.ru/',
    officialLivePage: 'https://friday.ru/online'
  }),
  channel({
    id: 'domashniy',
    number: 8,
    name: 'Домашний',
    category: 'Основные',
    adult: false,
    epgId: 'Domashniy.ru',
    epgAliases: ['Домашний HD', 'Dомашний', 'Domashniy'],
    officialSite: 'https://domashniy.ru/',
    officialLivePage: 'https://domashniy.ru/online'
  }),
  channel({
    id: 'muz-tv',
    number: 9,
    name: 'Муз-ТВ',
    category: 'Основные',
    adult: false,
    epgId: 'MuzTV.ru',
    epgAliases: ['МУЗ ТВ', 'МУЗ-ТВ', 'MUZ TV', 'MUZ-TV'],
    officialSite: 'https://muz-tv.ru/',
    officialLivePage: 'https://muz-tv.ru/online/'
  }),
  channel({
    id: '2x2',
    number: 10,
    name: '2x2',
    category: 'Основные',
    adult: false,
    epgId: '2x2.ru',
    epgAliases: ['2X2', '2х2', 'Дважды два'],
    officialSite: 'https://2x2tv.ru/',
    officialLivePage: 'https://online.2x2tv.ru/'
  }),
  channel({
    id: 'tv3',
    number: 11,
    name: 'ТВ-3',
    category: 'Основные',
    adult: false,
    epgId: 'TV3.ru',
    epgAliases: ['ТВ3', 'ТВ-3 HD', 'TV3', 'TV-3'],
    officialSite: 'https://tv3.ru/'
  }),
  channel({
    id: 'tnt4',
    number: 12,
    name: 'ТНТ4',
    category: 'Основные',
    adult: false,
    epgId: 'TNT4.ru',
    epgAliases: ['ТНТ 4', 'ТНТ4 HD', 'TNT4', 'TNT 4'],
    officialSite: 'https://tnt4.ru/'
  }),
  channel({
    id: 'kinokomediya',
    number: 13,
    name: 'Кинокомедия',
    category: 'Кино и развлечения',
    adult: false,
    epgId: 'Kinokomediya.ru',
    epgAliases: ['КиноКомедия', 'Кинокомедия HD', 'Kinokomediya'],
    officialSite: 'https://www.red-media.ru/',
    discoveryStatus: 'authorized_provider_required'
  }),
  channel({
    id: 'che',
    number: 14,
    name: 'Чё!',
    category: 'Основные',
    adult: false,
    epgId: 'Che.ru',
    epgAliases: ['Че', 'ЧЕ!', 'Чё', 'CHE', 'Che TV'],
    officialSite: 'https://chetv.ru/',
    officialLivePage: 'https://chetv.ru/online'
  }),
  channel({
    id: 'dikaya-rybalka',
    number: 15,
    name: 'Дикая рыбалка',
    category: 'Хобби',
    adult: false,
    epgAliases: ['Дикая рыбалка HD', 'Wild Fishing'],
    officialSite: 'https://dikoe.tv/channels/dikaya-rybalka-hd.html',
    discoveryStatus: 'authorized_provider_required'
  }),
  channel({
    id: 'shalun',
    number: 16,
    name: 'Шалун',
    category: '18+',
    adult: true,
    epgAliases: ['Шалун HD', 'Shalun'],
    officialSite: 'https://goodtime.media/',
    discoveryStatus: 'authorized_provider_required'
  }),
  channel({
    id: 'blue-hustler-hd',
    number: 17,
    name: 'Blue Hustler HD',
    category: '18+',
    adult: true,
    epgAliases: ['Blue Hustler', 'Blue Hustler TV'],
    officialSite: 'https://hustlertv.eu/',
    discoveryStatus: 'authorized_provider_required'
  }),
  channel({
    id: 'russkaya-noch',
    number: 18,
    name: 'Русская ночь',
    category: '18+',
    adult: true,
    epgAliases: ['Русская ночь HD', 'Russian Night'],
    officialSite: 'https://www.rusnight.ru/',
    discoveryStatus: 'authorized_provider_required'
  }),
  channel({
    id: 'brazzers-tv-europe',
    number: 19,
    name: 'Brazzers TV Europe',
    category: '18+',
    adult: true,
    epgAliases: ['Brazzers TV', 'Brazzers Europe'],
    discoveryStatus: 'authorized_provider_required'
  }),
  channel({
    id: 'playboy-tv',
    number: 20,
    name: 'Playboy TV',
    category: '18+',
    adult: true,
    epgAliases: ['Playboy TV Europe', 'Playboy HD'],
    officialSite: 'https://www.playboytv.eu/',
    discoveryStatus: 'authorized_provider_required'
  }),
  channel({
    id: 'babes-tv-hd',
    number: 21,
    name: 'Babes TV HD',
    category: '18+',
    adult: true,
    epgAliases: ['Babes TV', 'BABES TV'],
    discoveryStatus: 'authorized_provider_required'
  }),
  channel({
    id: 'red-lips-hd',
    number: 22,
    name: 'Red Lips HD',
    category: '18+',
    adult: true,
    epgAliases: ['Red Lips', 'RED LIPS'],
    discoveryStatus: 'authorized_provider_required'
  }),
  channel({
    id: 'exxxotica-hd',
    number: 23,
    name: 'Exxxotica HD',
    category: '18+',
    adult: true,
    epgAliases: ['EXXXOTICA HD', 'Exxxotica', 'EXXXOTICA'],
    officialSite: 'https://goodtime.media/',
    discoveryStatus: 'authorized_provider_required'
  }),
  channel({
    id: 'eromania',
    number: 24,
    name: 'Eromania',
    category: '18+',
    adult: true,
    epgAliases: ['Eromania 4K', 'Eromania4K'],
    officialSite: 'https://goodtime.media/',
    discoveryStatus: 'authorized_provider_required'
  }),
  channel({
    id: 'temptation-tv',
    number: 25,
    name: 'Temptation TV',
    category: '18+',
    adult: true,
    epgAliases: ['Temptation', 'TEMPTATION TV'],
    discoveryStatus: 'authorized_provider_required'
  }),
  channel({
    id: 'barely-legal',
    number: 26,
    name: 'Barely Legal',
    category: '18+',
    adult: true,
    epgAliases: ['Barely Legal TV', 'BARELY LEGAL'],
    discoveryStatus: 'authorized_provider_required'
  }),
  channel({
    id: 'o-la-la',
    number: 27,
    name: 'O-la-la',
    category: '18+',
    adult: true,
    epgAliases: ['O-La-La', 'Olala', 'O LA LA'],
    discoveryStatus: 'not_verified'
  }),
  channel({
    id: 'candy',
    number: 28,
    name: 'CANDY',
    category: '18+',
    adult: true,
    epgAliases: ['Candy TV', 'CANDY TV'],
    discoveryStatus: 'not_verified'
  })
] as const;

if (CHANNELS.length !== 28) {
  throw new Error(
    `Реестр Lampa IPTV должен содержать ровно 28 каналов, получено ${CHANNELS.length}`
  );
}

export const CHANNEL_IDS = new Set(CHANNELS.map((item) => item.id));
