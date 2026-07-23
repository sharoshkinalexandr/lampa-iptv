/*! Lampa IPTV v1.1.0 | MIT | built-in client has no telemetry */
(function () {
  'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function asyncGeneratorStep(n, t, e, r, o, a, c) {
    try {
      var i = n[a](c),
        u = i.value;
    } catch (n) {
      return void e(n);
    }
    i.done ? t(u) : Promise.resolve(u).then(r, o);
  }
  function _asyncToGenerator(n) {
    return function () {
      var t = this,
        e = arguments;
      return new Promise(function (r, o) {
        var a = n.apply(t, e);
        function _next(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
        }
        function _throw(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
        }
        _next(void 0);
      });
    };
  }
  function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
        t && (r = t);
        var n = 0,
          F = function () {};
        return {
          s: F,
          n: function () {
            return n >= r.length ? {
              done: true
            } : {
              done: false,
              value: r[n++]
            };
          },
          e: function (r) {
            throw r;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o,
      a = true,
      u = false;
    return {
      s: function () {
        t = t.call(r);
      },
      n: function () {
        var r = t.next();
        return a = r.done, r;
      },
      e: function (r) {
        u = true, o = r;
      },
      f: function () {
        try {
          a || null == t.return || t.return();
        } finally {
          if (u) throw o;
        }
      }
    };
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = true,
        o = false;
      try {
        if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = true, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _regenerator() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
    var e,
      t,
      r = "function" == typeof Symbol ? Symbol : {},
      n = r.iterator || "@@iterator",
      o = r.toStringTag || "@@toStringTag";
    function i(r, n, o, i) {
      var c = n && n.prototype instanceof Generator ? n : Generator,
        u = Object.create(c.prototype);
      return _regeneratorDefine(u, "_invoke", function (r, n, o) {
        var i,
          c,
          u,
          f = 0,
          p = o || [],
          y = false,
          G = {
            p: 0,
            n: 0,
            v: e,
            a: d,
            f: d.bind(e, 4),
            d: function (t, r) {
              return i = t, c = 0, u = e, G.n = r, a;
            }
          };
        function d(r, n) {
          for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
            var o,
              i = p[t],
              d = G.p,
              l = i[2];
            r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
          }
          if (o || r > 1) return a;
          throw y = true, n;
        }
        return function (o, p, l) {
          if (f > 1) throw TypeError("Generator is already running");
          for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
            i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
            try {
              if (f = 2, i) {
                if (c || (o = "next"), t = i[o]) {
                  if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                  if (!t.done) return t;
                  u = t.value, c < 2 && (c = 0);
                } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
                i = e;
              } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
            } catch (t) {
              i = e, c = 1, u = t;
            } finally {
              f = 1;
            }
          }
          return {
            value: t,
            done: y
          };
        };
      }(r, o, i), true), u;
    }
    var a = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    t = Object.getPrototypeOf;
    var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function () {
        return this;
      }), t),
      u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
    function f(e) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function () {
      return this;
    }), _regeneratorDefine(u, "toString", function () {
      return "[object Generator]";
    }), (_regenerator = function () {
      return {
        w: i,
        m: f
      };
    })();
  }
  function _regeneratorDefine(e, r, n, t) {
    var i = Object.defineProperty;
    try {
      i({}, "", {});
    } catch (e) {
      i = 0;
    }
    _regeneratorDefine = function (e, r, n, t) {
      function o(r, n) {
        _regeneratorDefine(e, r, function (e) {
          return this._invoke(r, n, e);
        });
      }
      r ? i ? i(e, r, {
        value: n,
        enumerable: !t,
        configurable: !t,
        writable: !t
      }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
    }, _regeneratorDefine(e, r, n, t);
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  var PLUGIN_INFO = {
    component: 'lampa_iptv',
    name: 'Lampa IPTV',
    version: '1.1.0',
    schemaVersion: 4
  };
  var DIESEL_CLIENT = {
    id: 'diesel_iptv',
    name: 'Дизель ТВ',
    scriptUrl: 'https://andreyurl54.github.io/diesel5/diesel.js',
    repositoryUrl: 'https://github.com/andreyurl54/diesel5'
  };
  var LIMITS = {
    maxM3uBytes: 20 * 1024 * 1024,
    maxM3uEntries: 50000,
    maxXmltvBytes: 30 * 1024 * 1024,
    maxPrograms: 250000,
    maxSourcesPerChannel: 3};
  var TEST_HLS_URL = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

  var SCRIPT_ID = 'lampa-iptv-diesel-client';
  var loading;
  function isOfficialScript(script) {
    var _a;
    try {
      return new URL(script.src, (_a = globalThis.location) === null || _a === void 0 ? void 0 : _a.href).href === DIESEL_CLIENT.scriptUrl;
    } catch (_b) {
      return false;
    }
  }
  function isDieselClientLoaded() {
    if (globalThis.plugin_diesel_iptv_ready === true) return true;
    return Array.from(document.scripts).some(isOfficialScript);
  }
  function loadDieselClient(Lampa) {
    if (globalThis.plugin_diesel_iptv_ready === true) {
      return Promise.resolve();
    }
    if (loading) return loading;
    var existing = Array.from(document.scripts).find(isOfficialScript);
    if ((existing === null || existing === void 0 ? void 0 : existing.dataset.lampaIptvLoaded) === 'true') return Promise.resolve();
    loading = new Promise((resolve, reject) => {
      var script = existing !== null && existing !== void 0 ? existing : document.createElement('script');
      var finish = () => {
        script.dataset.lampaIptvLoaded = 'true';
        resolve();
      };
      var fail = () => {
        if (!existing) script.remove();
        loading = undefined;
        reject(new Error('Не удалось загрузить официальный клиент «Дизель ТВ».'));
      };
      script.addEventListener('load', finish, {
        once: true
      });
      script.addEventListener('error', fail, {
        once: true
      });
      if (!existing) {
        script.id = SCRIPT_ID;
        script.src = DIESEL_CLIENT.scriptUrl;
        script.async = true;
        script.referrerPolicy = 'no-referrer';
        document.head.append(script);
      }
    });
    loading.catch(error => {
      var _a, _b;
      (_b = (_a = Lampa === null || Lampa === void 0 ? void 0 : Lampa.Noty) === null || _a === void 0 ? void 0 : _a.show) === null || _b === void 0 ? void 0 : _b.call(_a, error.message);
    });
    return loading;
  }
  function removeDieselLoader() {
    var _a;
    (_a = document.getElementById(SCRIPT_ID)) === null || _a === void 0 ? void 0 : _a.remove();
    loading = undefined;
  }

  function channel(seed) {
    var _a;
    return Object.assign(Object.assign({}, seed), {
      sources: [],
      discoveryStatus: (_a = seed.discoveryStatus) !== null && _a !== void 0 ? _a : 'user_url_required'
    });
  }
  var CHANNELS = [channel({
    id: 'perviy',
    number: 1,
    name: 'Первый канал',
    category: 'Основные',
    adult: false,
    epgId: '1kanal.ru',
    epgAliases: ['Первый', '1 канал', 'Channel One Russia', 'Perviy Kanal'],
    officialSite: 'https://www.1tv.ru/',
    officialLivePage: 'https://www.1tv.ru/live'
  }), channel({
    id: 'match-tv',
    number: 2,
    name: 'Матч ТВ',
    category: 'Основные',
    adult: false,
    epgId: 'MatchTV.ru',
    epgAliases: ['Матч!', 'Матч ТВ HD', 'Match TV', 'MatchTV'],
    officialSite: 'https://matchtv.ru/',
    officialLivePage: 'https://matchtv.ru/video/channel/matchtv'
  }), channel({
    id: 'ntv',
    number: 3,
    name: 'НТВ',
    category: 'Основные',
    adult: false,
    epgId: 'NTV.ru',
    epgAliases: ['НТВ HD', 'NTV', 'NTV Russia'],
    officialSite: 'https://www.ntv.ru/',
    officialLivePage: 'https://www.ntv.ru/air/ntv'
  }), channel({
    id: 'sts',
    number: 4,
    name: 'СТС',
    category: 'Основные',
    adult: false,
    epgId: 'STS.ru',
    epgAliases: ['СТС HD', 'CTC', 'STS'],
    officialSite: 'https://ctc.ru/',
    officialLivePage: 'https://ctc.ru/online/'
  }), channel({
    id: 'tnt',
    number: 5,
    name: 'ТНТ',
    category: 'Основные',
    adult: false,
    epgId: 'TNT.ru',
    epgAliases: ['ТНТ HD', 'TNT', 'TNT Russia'],
    officialSite: 'https://tnt-online.ru/',
    officialLivePage: 'https://tnt-online.ru/live/'
  }), channel({
    id: 'ren-tv',
    number: 6,
    name: 'РЕН ТВ',
    category: 'Основные',
    adult: false,
    epgId: 'RenTV.ru',
    epgAliases: ['РЕН', 'РЕН ТВ HD', 'REN TV', 'RENTV'],
    officialSite: 'https://ren.tv/',
    officialLivePage: 'https://ren.tv/live'
  }), channel({
    id: 'friday',
    number: 7,
    name: 'Пятница!',
    category: 'Основные',
    adult: false,
    epgId: 'Friday.ru',
    epgAliases: ['Пятница', 'Пятница HD', 'Friday TV', 'Friday'],
    officialSite: 'https://friday.ru/',
    officialLivePage: 'https://friday.ru/online'
  }), channel({
    id: 'domashniy',
    number: 8,
    name: 'Домашний',
    category: 'Основные',
    adult: false,
    epgId: 'Domashniy.ru',
    epgAliases: ['Домашний HD', 'Dомашний', 'Domashniy'],
    officialSite: 'https://domashniy.ru/',
    officialLivePage: 'https://domashniy.ru/online'
  }), channel({
    id: 'muz-tv',
    number: 9,
    name: 'Муз-ТВ',
    category: 'Основные',
    adult: false,
    epgId: 'MuzTV.ru',
    epgAliases: ['МУЗ ТВ', 'МУЗ-ТВ', 'MUZ TV', 'MUZ-TV'],
    officialSite: 'https://muz-tv.ru/',
    officialLivePage: 'https://muz-tv.ru/online/'
  }), channel({
    id: '2x2',
    number: 10,
    name: '2x2',
    category: 'Основные',
    adult: false,
    epgId: '2x2.ru',
    epgAliases: ['2X2', '2х2', 'Дважды два'],
    officialSite: 'https://2x2tv.ru/',
    officialLivePage: 'https://online.2x2tv.ru/'
  }), channel({
    id: 'tv3',
    number: 11,
    name: 'ТВ-3',
    category: 'Основные',
    adult: false,
    epgId: 'TV3.ru',
    epgAliases: ['ТВ3', 'ТВ-3 HD', 'TV3', 'TV-3'],
    officialSite: 'https://tv3.ru/'
  }), channel({
    id: 'tnt4',
    number: 12,
    name: 'ТНТ4',
    category: 'Основные',
    adult: false,
    epgId: 'TNT4.ru',
    epgAliases: ['ТНТ 4', 'ТНТ4 HD', 'TNT4', 'TNT 4'],
    officialSite: 'https://tnt4.ru/'
  }), channel({
    id: 'kinokomediya',
    number: 13,
    name: 'Кинокомедия',
    category: 'Кино и развлечения',
    adult: false,
    epgId: 'Kinokomediya.ru',
    epgAliases: ['КиноКомедия', 'Кинокомедия HD', 'Kinokomediya'],
    officialSite: 'https://www.red-media.ru/',
    discoveryStatus: 'authorized_provider_required'
  }), channel({
    id: 'che',
    number: 14,
    name: 'Чё!',
    category: 'Основные',
    adult: false,
    epgId: 'Che.ru',
    epgAliases: ['Че', 'ЧЕ!', 'Чё', 'CHE', 'Che TV'],
    officialSite: 'https://chetv.ru/',
    officialLivePage: 'https://chetv.ru/online'
  }), channel({
    id: 'dikaya-rybalka',
    number: 15,
    name: 'Дикая рыбалка',
    category: 'Хобби',
    adult: false,
    epgAliases: ['Дикая рыбалка HD', 'Wild Fishing'],
    officialSite: 'https://dikoe.tv/channels/dikaya-rybalka-hd.html',
    discoveryStatus: 'authorized_provider_required'
  }), channel({
    id: 'shalun',
    number: 16,
    name: 'Шалун',
    category: '18+',
    adult: true,
    epgAliases: ['Шалун HD', 'Shalun'],
    officialSite: 'https://goodtime.media/',
    discoveryStatus: 'authorized_provider_required'
  }), channel({
    id: 'blue-hustler-hd',
    number: 17,
    name: 'Blue Hustler HD',
    category: '18+',
    adult: true,
    epgAliases: ['Blue Hustler', 'Blue Hustler TV'],
    officialSite: 'https://hustlertv.eu/',
    discoveryStatus: 'authorized_provider_required'
  }), channel({
    id: 'russkaya-noch',
    number: 18,
    name: 'Русская ночь',
    category: '18+',
    adult: true,
    epgAliases: ['Русская ночь HD', 'Russian Night'],
    officialSite: 'https://www.rusnight.ru/',
    discoveryStatus: 'authorized_provider_required'
  }), channel({
    id: 'brazzers-tv-europe',
    number: 19,
    name: 'Brazzers TV Europe',
    category: '18+',
    adult: true,
    epgAliases: ['Brazzers TV', 'Brazzers Europe'],
    discoveryStatus: 'authorized_provider_required'
  }), channel({
    id: 'playboy-tv',
    number: 20,
    name: 'Playboy TV',
    category: '18+',
    adult: true,
    epgAliases: ['Playboy TV Europe', 'Playboy HD'],
    officialSite: 'https://www.playboytv.eu/',
    discoveryStatus: 'authorized_provider_required'
  }), channel({
    id: 'babes-tv-hd',
    number: 21,
    name: 'Babes TV HD',
    category: '18+',
    adult: true,
    epgAliases: ['Babes TV', 'BABES TV'],
    discoveryStatus: 'authorized_provider_required'
  }), channel({
    id: 'red-lips-hd',
    number: 22,
    name: 'Red Lips HD',
    category: '18+',
    adult: true,
    epgAliases: ['Red Lips', 'RED LIPS'],
    discoveryStatus: 'authorized_provider_required'
  }), channel({
    id: 'exxxotica-hd',
    number: 23,
    name: 'Exxxotica HD',
    category: '18+',
    adult: true,
    epgAliases: ['EXXXOTICA HD', 'Exxxotica', 'EXXXOTICA'],
    officialSite: 'https://goodtime.media/',
    discoveryStatus: 'authorized_provider_required'
  }), channel({
    id: 'eromania',
    number: 24,
    name: 'Eromania',
    category: '18+',
    adult: true,
    epgAliases: ['Eromania 4K', 'Eromania4K'],
    officialSite: 'https://goodtime.media/',
    discoveryStatus: 'authorized_provider_required'
  }), channel({
    id: 'temptation-tv',
    number: 25,
    name: 'Temptation TV',
    category: '18+',
    adult: true,
    epgAliases: ['Temptation', 'TEMPTATION TV'],
    discoveryStatus: 'authorized_provider_required'
  }), channel({
    id: 'barely-legal',
    number: 26,
    name: 'Barely Legal',
    category: '18+',
    adult: true,
    epgAliases: ['Barely Legal TV', 'BARELY LEGAL'],
    discoveryStatus: 'authorized_provider_required'
  }), channel({
    id: 'o-la-la',
    number: 27,
    name: 'O-la-la',
    category: '18+',
    adult: true,
    epgAliases: ['O-La-La', 'Olala', 'O LA LA'],
    discoveryStatus: 'not_verified'
  }), channel({
    id: 'candy',
    number: 28,
    name: 'CANDY',
    category: '18+',
    adult: true,
    epgAliases: ['Candy TV', 'CANDY TV'],
    discoveryStatus: 'not_verified'
  })];
  if (CHANNELS.length !== 28) {
    throw new Error(`Реестр Lampa IPTV должен содержать ровно 28 каналов, получено ${CHANNELS.length}`);
  }
  var CHANNEL_IDS = new Set(CHANNELS.map(item => item.id));

  var QUALITY_MARKERS = /\b(?:uhd|fhd|full\s*hd|hd|sd|4k|2160p|1440p|1080p|720p|576p|480p|hevc|h265|h264)\b/gi;
  function normalizeName(value) {
    return value.normalize('NFKC').toLocaleLowerCase('ru-RU').replace(QUALITY_MARKERS, ' ').replace(/ё/g, 'е').replace(/&/g, ' и ').replace(/[«»"'`’]/g, '').replace(/[^a-zа-я0-9]+/gi, ' ').trim().replace(/\s+/g, ' ');
  }
  function normalizeExact(value) {
    return (value !== null && value !== void 0 ? value : '').normalize('NFKC').trim().toLocaleLowerCase('ru-RU');
  }
  function stableId(prefix, value) {
    var hash = 2166136261;
    var text = `${prefix}:${value}`;
    for (var index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return `${prefix}-${(hash >>> 0).toString(16).padStart(8, '0')}`;
  }

  function uniqueCandidate(candidates) {
    var ids = new Set(candidates.map(candidate => candidate.channel.id));
    return ids.size === 1 ? candidates[0] : undefined;
  }
  function exactMatches(entryValue, values) {
    var query = normalizeExact(entryValue);
    if (!query) return [];
    return CHANNELS.filter(channel => values(channel).some(value => normalizeExact(value) === query));
  }
  function matchPlaylistEntry(entry, manualMappings = {}) {
    var manualKey = normalizeName(entry.tvgId || entry.tvgName || entry.name);
    var manualId = manualMappings[manualKey];
    if (manualId) {
      var channel = CHANNELS.find(candidate => candidate.id === manualId);
      if (channel) return {
        channelId: channel.id,
        entry,
        reason: 'manual'
      };
    }
    var stages = [{
      reason: 'tvg-id',
      matches: exactMatches(entry.tvgId, channel => {
        var _a;
        return [channel.id, (_a = channel.epgId) !== null && _a !== void 0 ? _a : ''];
      })
    }, {
      reason: 'tvg-name',
      matches: exactMatches(entry.tvgName, channel => [channel.name])
    }, {
      reason: 'name',
      matches: exactMatches(entry.name, channel => [channel.name])
    }, {
      reason: 'alias',
      matches: exactMatches(entry.tvgName || entry.name, channel => channel.epgAliases)
    }];
    var _loop = function _loop() {
        var stage = _stages[_i];
        var candidate = uniqueCandidate(stage.matches.map(channel => ({
          channel,
          reason: stage.reason
        })));
        if (candidate) {
          return {
            v: {
              channelId: candidate.channel.id,
              entry,
              reason: candidate.reason
            }
          };
        }
      },
      _ret;
    for (var _i = 0, _stages = stages; _i < _stages.length; _i++) {
      _ret = _loop();
      if (_ret) return _ret.v;
    }
    var names = [entry.tvgName, entry.name].filter(value => Boolean(value));
    var normalizedMatches = CHANNELS.filter(channel => {
      var known = [channel.name, ...channel.epgAliases].map(normalizeName);
      return names.some(name => known.includes(normalizeName(name)));
    });
    var normalized = uniqueCandidate(normalizedMatches.map(channel => ({
      channel,
      reason: 'normalized-name'
    })));
    return normalized ? {
      channelId: normalized.channel.id,
      entry,
      reason: normalized.reason
    } : undefined;
  }
  function matchPlaylist(entries, sourceName, duplicateUrls, warnings, manualMappings = {}) {
    var matched = [];
    var ignored = [];
    var _iterator = _createForOfIteratorHelper(entries),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var entry = _step.value;
        var result = matchPlaylistEntry(entry, manualMappings);
        if (result) matched.push(result);else ignored.push(entry);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return {
      matched,
      report: {
        importedAt: new Date().toISOString(),
        sourceName,
        parsed: entries.length,
        matched: matched.length,
        ignored: ignored.length,
        duplicateUrls,
        warnings,
        matchedEntries: matched.map(item => ({
          channelId: item.channelId,
          sourceName: item.entry.name,
          reason: item.reason
        })),
        ignoredEntries: ignored.slice(0, 500).map(entry => ({
          name: entry.name,
          tvgId: entry.tvgId,
          line: entry.line
        }))
      }
    };
  }

  var SECRET_QUERY_KEYS = /^(?:token|key|auth|authorization|password|passwd|pass|username|user|login|cookie|signature|sig|session|access_token)$/i;
  function isAllowedUrl(value, allowRelative = false) {
    var trimmed = value.trim();
    if (!trimmed || /^(?:javascript|data|vbscript|file|blob):/i.test(trimmed)) return false;
    if (allowRelative && /^(?:\.{0,2}\/|\/)/.test(trimmed)) return true;
    try {
      var parsed = new URL(trimmed);
      return parsed.protocol === 'https:' || parsed.protocol === 'http:';
    } catch (_a) {
      return false;
    }
  }
  function normalizeServerUrl(value) {
    var trimmed = value.trim().replace(/\/+$/, '');
    if (!isAllowedUrl(trimmed)) throw new Error('Разрешены только URL с протоколом HTTP или HTTPS.');
    return trimmed;
  }
  function maskUrl(value) {
    try {
      var parsed = new URL(value);
      if (parsed.username) parsed.username = '***';
      if (parsed.password) parsed.password = '***';
      for (var _i = 0, _Array$from = Array.from(parsed.searchParams.keys()); _i < _Array$from.length; _i++) {
        var key = _Array$from[_i];
        if (SECRET_QUERY_KEYS.test(key)) parsed.searchParams.set(key, '***');
      }
      parsed.pathname = parsed.pathname.split('/').map(segment => segment.length > 20 && /[A-Za-z0-9_-]{16,}/.test(segment) ? '***' : segment).join('/');
      return parsed.toString();
    } catch (_a) {
      return value.replace(/([?&](?:token|key|auth|password|user|login)=)[^&\s]+/gi, '$1***').replace(/\/\/([^:/\s]+):([^@/\s]+)@/g, '//***:***@');
    }
  }
  function sanitizeLogMessage(message) {
    return maskUrl(message).replace(/(authorization|cookie|password|passwd|token)\s*[:=]\s*[^\s,;]+/gi, '$1=***').slice(0, 1000);
  }
  function addDiagnostic(entries, level, message, max = 100) {
    var next = [...entries, {
      at: new Date().toISOString(),
      level,
      message: sanitizeLogMessage(message)
    }];
    return next.slice(-max);
  }
  function fallbackHash(value) {
    var first = 0x811c9dc5;
    var second = 0x9e3779b9;
    for (var index = 0; index < value.length; index += 1) {
      var code = value.charCodeAt(index);
      first = Math.imul(first ^ code, 0x01000193);
      second = Math.imul(second ^ code, 0x85ebca6b);
    }
    return `${(first >>> 0).toString(16).padStart(8, '0')}${(second >>> 0).toString(16).padStart(8, '0')}`;
  }
  function hashPin(_x, _x2) {
    return _hashPin.apply(this, arguments);
  }
  function _hashPin() {
    _hashPin = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(pin, salt) {
      var _a, input, digest;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            input = new TextEncoder().encode(`${salt}:${pin}`);
            if (!((_a = globalThis.crypto) === null || _a === void 0 ? void 0 : _a.subtle)) {
              _context.n = 2;
              break;
            }
            _context.n = 1;
            return globalThis.crypto.subtle.digest('SHA-256', input);
          case 1:
            digest = _context.v;
            return _context.a(2, Array.from(new Uint8Array(digest)).map(byte => byte.toString(16).padStart(2, '0')).join(''));
          case 2:
            return _context.a(2, fallbackHash(`${salt}:${pin}`));
        }
      }, _callee);
    }));
    return _hashPin.apply(this, arguments);
  }
  function createSalt() {
    var _a;
    if ((_a = globalThis.crypto) === null || _a === void 0 ? void 0 : _a.getRandomValues) {
      var bytes = new Uint8Array(16);
      globalThis.crypto.getRandomValues(bytes);
      return Array.from(bytes).map(byte => byte.toString(16).padStart(2, '0')).join('');
    }
    return `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
  }

  function findCommaOutsideQuotes(value) {
    var _a;
    var quote = '';
    for (var index = 0; index < value.length; index += 1) {
      var character = (_a = value[index]) !== null && _a !== void 0 ? _a : '';
      if ((character === '"' || character === "'") && value[index - 1] !== '\\') {
        if (quote === character) quote = '';else if (!quote) quote = character;
      } else if (character === ',' && !quote) {
        return index;
      }
    }
    return -1;
  }
  function parseAttributes(value) {
    var _a, _b, _c, _d;
    var attributes = {};
    var matcher = /([A-Za-z0-9_-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s]+))/g;
    var match;
    while ((match = matcher.exec(value)) !== null) {
      var key = ((_a = match[1]) !== null && _a !== void 0 ? _a : '').toLocaleLowerCase('en-US');
      attributes[key] = (_d = (_c = (_b = match[2]) !== null && _b !== void 0 ? _b : match[3]) !== null && _c !== void 0 ? _c : match[4]) !== null && _d !== void 0 ? _d : '';
    }
    return attributes;
  }
  function parseExtinf(line, lineNumber) {
    var _a;
    var body = line.slice(line.indexOf(':') + 1);
    var commaIndex = findCommaOutsideQuotes(body);
    var metadata = commaIndex >= 0 ? body.slice(0, commaIndex) : body;
    var attributes = parseAttributes(metadata);
    var name = (commaIndex >= 0 ? body.slice(commaIndex + 1).trim() : '') || attributes['tvg-name'] || attributes['tvg-id'] || `Канал из строки ${lineNumber}`;
    return {
      name,
      attributes,
      line: lineNumber,
      raw: [line],
      headers: {
        userAgent: attributes['user-agent'],
        referer: (_a = attributes['http-referrer']) !== null && _a !== void 0 ? _a : attributes['referer'],
        origin: attributes['origin']
      }
    };
  }
  function splitUrlAndOptions(value) {
    var _a;
    var separator = value.indexOf('|');
    if (separator < 0) return {
      url: value.trim(),
      headers: {}
    };
    var url = value.slice(0, separator).trim();
    var options = new URLSearchParams(value.slice(separator + 1));
    var lookup = name => {
      var _a, _b;
      return (_b = (_a = options.get(name)) !== null && _a !== void 0 ? _a : options.get(name.toLocaleLowerCase('en-US'))) !== null && _b !== void 0 ? _b : undefined;
    };
    return {
      url,
      headers: {
        userAgent: lookup('User-Agent'),
        referer: (_a = lookup('Referer')) !== null && _a !== void 0 ? _a : lookup('Referrer'),
        origin: lookup('Origin'),
        authorization: lookup('Authorization'),
        cookie: lookup('Cookie')
      }
    };
  }
  function resolveUrl(value, baseUrl) {
    if (isAllowedUrl(value)) return value;
    if (!baseUrl || !isAllowedUrl(value, true)) return undefined;
    try {
      var result = new URL(value, baseUrl).toString();
      return isAllowedUrl(result) ? result : undefined;
    } catch (_a) {
      return undefined;
    }
  }
  function parseHeaderUrls(line) {
    var attributes = parseAttributes(line);
    return [attributes['url-tvg'], attributes['x-tvg-url']].filter(value => Boolean(value)).flatMap(value => value.split(',')).map(value => value.trim()).filter(url => isAllowedUrl(url));
  }
  function parseM3u(content, baseUrl) {
    var _a, _b, _c, _d, _e, _f;
    var _g;
    if (new Blob([content]).size > LIMITS.maxM3uBytes) {
      throw new Error(`Плейлист превышает лимит ${LIMITS.maxM3uBytes / 1024 / 1024} МБ.`);
    }
    var normalized = content.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
    var lines = normalized.split('\n');
    var report = {
      processedLines: lines.length,
      foundChannels: 0,
      skippedEntries: 0,
      duplicateUrls: 0,
      warnings: [],
      errors: [],
      epgUrls: []
    };
    var firstMeaningful = lines.find(line => line.trim().length > 0);
    if (!(firstMeaningful === null || firstMeaningful === void 0 ? void 0 : firstMeaningful.trim().startsWith('#EXTM3U'))) {
      report.warnings.push('Заголовок #EXTM3U отсутствует; выполнен осторожный разбор записей.');
    } else {
      report.epgUrls.push(...parseHeaderUrls(firstMeaningful));
    }
    var entries = [];
    var seenUrls = new Set();
    var pending;
    for (var index = 0; index < lines.length; index += 1) {
      var raw = (_a = lines[index]) !== null && _a !== void 0 ? _a : '';
      var line = raw.trim();
      var lineNumber = index + 1;
      if (!line) continue;
      if (line.startsWith('#EXTINF:')) {
        if (pending) {
          report.skippedEntries += 1;
          report.warnings.push(`Строка ${pending.line}: у записи отсутствует URL.`);
        }
        pending = parseExtinf(line, lineNumber);
        continue;
      }
      if (!pending) continue;
      if (line.startsWith('#EXTVLCOPT:')) {
        var option = line.slice('#EXTVLCOPT:'.length);
        var separator = option.indexOf('=');
        if (separator > 0) {
          var key = option.slice(0, separator).trim().toLocaleLowerCase('en-US');
          var value = option.slice(separator + 1).trim().replace(/^["']|["']$/g, '');
          if (key === 'http-user-agent') pending.headers.userAgent = value;
          if (key === 'http-referrer' || key === 'http-referer') pending.headers.referer = value;
          if (key === 'http-origin') pending.headers.origin = value;
          if (key === 'http-cookie') pending.headers.cookie = value;
        }
        pending.raw.push(line);
        continue;
      }
      if (line.startsWith('#EXTGRP:')) {
        (_g = pending.attributes)['group-title'] || (_g['group-title'] = line.slice('#EXTGRP:'.length).trim());
        pending.raw.push(line);
        continue;
      }
      if (line.startsWith('#')) {
        pending.raw.push(line);
        continue;
      }
      var split = splitUrlAndOptions(line);
      var url = resolveUrl(split.url, baseUrl);
      pending.raw.push(line);
      if (!url) {
        report.skippedEntries += 1;
        report.warnings.push(`Строка ${lineNumber}: URL имеет неподдерживаемый формат.`);
        pending = undefined;
        continue;
      }
      if (entries.length >= LIMITS.maxM3uEntries) {
        report.errors.push(`Достигнут лимит ${LIMITS.maxM3uEntries} записей.`);
        break;
      }
      if (seenUrls.has(url)) report.duplicateUrls += 1;
      seenUrls.add(url);
      var attributes = pending.attributes;
      entries.push({
        name: pending.name,
        tvgId: attributes['tvg-id'] || undefined,
        tvgName: attributes['tvg-name'] || undefined,
        tvgLogo: attributes['tvg-logo'] || undefined,
        tvgChno: Number.isFinite(Number(attributes['tvg-chno'])) ? Number(attributes['tvg-chno']) : undefined,
        group: attributes['group-title'] || undefined,
        url,
        headers: {
          userAgent: (_b = split.headers.userAgent) !== null && _b !== void 0 ? _b : pending.headers.userAgent,
          referer: (_c = split.headers.referer) !== null && _c !== void 0 ? _c : pending.headers.referer,
          origin: (_d = split.headers.origin) !== null && _d !== void 0 ? _d : pending.headers.origin,
          authorization: (_e = split.headers.authorization) !== null && _e !== void 0 ? _e : pending.headers.authorization,
          cookie: (_f = split.headers.cookie) !== null && _f !== void 0 ? _f : pending.headers.cookie
        },
        catchup: attributes['catchup'] || attributes['catchup-source'] || attributes['catchup-days'] ? {
          type: attributes['catchup'],
          source: attributes['catchup-source'],
          days: Number(attributes['catchup-days']) || undefined
        } : undefined,
        attributes,
        line: pending.line,
        raw: pending.raw.join('\n')
      });
      pending = undefined;
    }
    if (pending) {
      report.skippedEntries += 1;
      report.warnings.push(`Строка ${pending.line}: у последней записи отсутствует URL.`);
    }
    report.foundChannels = entries.length;
    report.epgUrls = Array.from(new Set(report.epgUrls));
    return {
      entries,
      report
    };
  }

  function sourceFromEntry(entry, priority, type) {
    return {
      id: stableId('source', entry.url),
      type,
      url: entry.url,
      priority,
      public: false,
      official: false,
      requiresAuthorization: Boolean(entry.headers.authorization || entry.headers.cookie) || /(?:[?&](?:token|key|auth|password|user|login)=|\/\/[^/]+@)/i.test(entry.url),
      headers: {
        userAgent: entry.headers.userAgent,
        referer: entry.headers.referer,
        origin: entry.headers.origin,
        authorization: entry.headers.authorization,
        cookie: entry.headers.cookie
      },
      status: 'unknown',
      enabled: true
    };
  }
  function mergeSource(state, channelId, source) {
    var _a, _b;
    var _c;
    var override = (_a = (_c = state.channelOverrides)[channelId]) !== null && _a !== void 0 ? _a : _c[channelId] = {};
    var sources = (_b = override.sources) !== null && _b !== void 0 ? _b : override.sources = [];
    var existing = sources.find(item => item.url === source.url);
    if (existing) {
      Object.assign(existing, source, {
        priority: existing.priority
      });
      return false;
    }
    if (sources.length >= LIMITS.maxSourcesPerChannel) return false;
    source.priority = sources.length + 1;
    sources.push(source);
    return true;
  }
  function importM3uText(state, content, sourceName, baseUrl) {
    var parsed = parseM3u(content, baseUrl);
    var _matchPlaylist = matchPlaylist(parsed.entries, sourceName, parsed.report.duplicateUrls, [...parsed.report.warnings, ...parsed.report.errors], state.manualMappings),
      matched = _matchPlaylist.matched,
      report = _matchPlaylist.report;
    var actuallyAdded = 0;
    var _iterator = _createForOfIteratorHelper(matched),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;
        if (mergeSource(state, item.channelId, sourceFromEntry(item.entry, 1, 'm3u'))) {
          actuallyAdded += 1;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    report.matched = actuallyAdded;
    if (matched.length !== actuallyAdded) {
      report.warnings.push(`${matched.length - actuallyAdded} совпавших источников уже существовали или превысили лимит резервов.`);
    }
    state.lastImportReport = report;
    return report;
  }
  function addDirectSource(state, channelId, value, options = {}) {
    var _a, _b;
    var trimmed = value.trim();
    if (trimmed.startsWith('#EXTINF:')) {
      var parsed = parseM3u(`#EXTM3U\n${trimmed}`);
      var entry = parsed.entries[0];
      if (!entry) throw new Error('В строке M3U не найден корректный URL.');
      var _source = sourceFromEntry(entry, (_a = options.priority) !== null && _a !== void 0 ? _a : 1, 'm3u');
      _source.externalPlayer = options.externalPlayer;
      mergeSource(state, channelId, _source);
      return _source;
    }
    if (!isAllowedUrl(trimmed)) throw new Error('Разрешены только ссылки HTTP или HTTPS.');
    var source = {
      id: stableId('source', trimmed),
      type: /\.m3u8(?:$|[?#])/i.test(trimmed) ? 'hls' : 'direct',
      url: trimmed,
      priority: (_b = options.priority) !== null && _b !== void 0 ? _b : 1,
      public: false,
      official: false,
      requiresAuthorization: /(?:[?&](?:token|key|auth|password|user|login)=|\/\/[^/]+@)/i.test(trimmed),
      headers: options.headers,
      status: 'unknown',
      externalPlayer: options.externalPlayer,
      enabled: true
    };
    mergeSource(state, channelId, source);
    return source;
  }
  function setManualMapping(state, playlistNameOrId, channelId) {
    state.manualMappings[normalizeName(playlistNameOrId)] = channelId;
  }
  function fetchText(_x, _x2) {
    return _fetchText.apply(this, arguments);
  }
  function _fetchText() {
    _fetchText = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(url, timeoutMs, init = {}) {
      var controller, timeout, response, text, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (isAllowedUrl(url)) {
              _context.n = 1;
              break;
            }
            throw new Error('Разрешены только URL HTTP или HTTPS.');
          case 1:
            controller = typeof AbortController !== 'undefined' ? new AbortController() : undefined;
            timeout = globalThis.setTimeout(() => controller === null || controller === void 0 ? void 0 : controller.abort(), timeoutMs);
            _context.p = 2;
            _context.n = 3;
            return fetch(url, Object.assign(Object.assign({}, init), {
              signal: controller === null || controller === void 0 ? void 0 : controller.signal,
              credentials: 'omit',
              redirect: 'follow'
            }));
          case 3:
            response = _context.v;
            if (response.ok) {
              _context.n = 4;
              break;
            }
            throw new Error(`HTTP ${response.status}`);
          case 4:
            _context.n = 5;
            return response.text();
          case 5:
            text = _context.v;
            if (!(text.length > LIMITS.maxM3uBytes)) {
              _context.n = 6;
              break;
            }
            throw new Error('Ответ превышает допустимый размер.');
          case 6:
            return _context.a(2, text);
          case 7:
            _context.p = 7;
            _t = _context.v;
            if (!(_t.name === 'AbortError')) {
              _context.n = 8;
              break;
            }
            throw new Error('Истекло время ожидания ответа.');
          case 8:
            if (!(_t instanceof TypeError)) {
              _context.n = 9;
              break;
            }
            throw new Error('Источник недоступен из браузера: сеть или CORS. Попробуйте внешний плеер.');
          case 9:
            throw _t;
          case 10:
            _context.p = 10;
            globalThis.clearTimeout(timeout);
            return _context.f(10);
          case 11:
            return _context.a(2);
        }
      }, _callee, null, [[2, 7, 10, 11]]);
    }));
    return _fetchText.apply(this, arguments);
  }
  function importRemoteM3u(_x3, _x4, _x5, _x6) {
    return _importRemoteM3u.apply(this, arguments);
  }
  function _importRemoteM3u() {
    _importRemoteM3u = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(state, url, sourceName, timeoutMs) {
      var content;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return fetchText(url, timeoutMs);
          case 1:
            content = _context2.v;
            return _context2.a(2, importM3uText(state, content, sourceName, url));
        }
      }, _callee2);
    }));
    return _importRemoteM3u.apply(this, arguments);
  }
  function xtreamApiUrl(account, action) {
    var server = normalizeServerUrl(account.server);
    var params = new URLSearchParams({
      username: account.username,
      password: account.password,
      action
    });
    return `${server}/player_api.php?${params.toString()}`;
  }
  function importXtream(_x7, _x8, _x9) {
    return _importXtream.apply(this, arguments);
  }
  function _importXtream() {
    _importXtream = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(state, account, timeoutMs) {
      var controller, timeout, response, body, server, entries, _matchPlaylist2, matched, report, actuallyAdded, _iterator2, _step2, item, _t2;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            controller = typeof AbortController !== 'undefined' ? new AbortController() : undefined;
            timeout = globalThis.setTimeout(() => controller === null || controller === void 0 ? void 0 : controller.abort(), timeoutMs);
            _context3.p = 1;
            _context3.n = 2;
            return fetch(xtreamApiUrl(account, 'get_live_streams'), {
              signal: controller === null || controller === void 0 ? void 0 : controller.signal,
              credentials: 'omit'
            });
          case 2:
            response = _context3.v;
            if (response.ok) {
              _context3.n = 3;
              break;
            }
            throw new Error(`Xtream вернул HTTP ${response.status}.`);
          case 3:
            _context3.n = 4;
            return response.json();
          case 4:
            body = _context3.v;
            if (Array.isArray(body)) {
              _context3.n = 5;
              break;
            }
            throw new Error('Xtream вернул неожиданный формат live streams.');
          case 5:
            server = normalizeServerUrl(account.server);
            entries = body.slice(0, LIMITS.maxM3uEntries).map((item, index) => {
              var _a;
              return {
                name: String((_a = item.name) !== null && _a !== void 0 ? _a : `Xtream ${index + 1}`),
                tvgId: typeof item.epg_channel_id === 'string' ? item.epg_channel_id : undefined,
                tvgName: typeof item.name === 'string' ? item.name : undefined,
                tvgLogo: typeof item.stream_icon === 'string' ? item.stream_icon : undefined,
                group: typeof item.category_name === 'string' ? item.category_name : undefined,
                url: `${server}/live/${encodeURIComponent(account.username)}/${encodeURIComponent(account.password)}/${encodeURIComponent(String(item.stream_id))}.m3u8`,
                headers: {},
                attributes: {},
                line: index + 1,
                raw: ''
              };
            });
            _matchPlaylist2 = matchPlaylist(entries, account.name, 0, [], state.manualMappings), matched = _matchPlaylist2.matched, report = _matchPlaylist2.report;
            actuallyAdded = 0;
            _iterator2 = _createForOfIteratorHelper(matched);
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                item = _step2.value;
                if (mergeSource(state, item.channelId, sourceFromEntry(item.entry, 1, 'xtream'))) {
                  actuallyAdded += 1;
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
            report.matched = actuallyAdded;
            state.xtreamAccounts = state.xtreamAccounts.filter(item => item.id !== account.id);
            state.xtreamAccounts.push(account);
            state.lastImportReport = report;
            return _context3.a(2, report);
          case 6:
            _context3.p = 6;
            _t2 = _context3.v;
            if (!(_t2.name === 'AbortError')) {
              _context3.n = 7;
              break;
            }
            throw new Error('Xtream: истекло время ожидания.');
          case 7:
            if (!(_t2 instanceof TypeError)) {
              _context3.n = 8;
              break;
            }
            throw new Error('Xtream недоступен из браузера из-за сети или CORS. Проверьте его в официальном приложении провайдера.');
          case 8:
            throw _t2;
          case 9:
            _context3.p = 9;
            globalThis.clearTimeout(timeout);
            return _context3.f(9);
          case 10:
            return _context3.a(2);
        }
      }, _callee3, null, [[1, 6, 9, 10]]);
    }));
    return _importXtream.apply(this, arguments);
  }

  function result(status, detail, startedAt, httpStatus) {
    return {
      status,
      detail,
      checkedAt: new Date().toISOString(),
      responseTimeMs: Date.now() - startedAt,
      httpStatus
    };
  }
  function statusFromHttp(code) {
    if (code === 401 || code === 403) return 'auth_required';
    if (code === 404 || code === 410) return 'offline';
    if (code === 429 || code >= 500) return 'temporarily_unavailable';
    return code >= 400 ? 'offline' : 'unknown';
  }
  function hasForbiddenBrowserHeaders(source) {
    var _a, _b, _c, _d, _e;
    return Boolean(((_a = source.headers) === null || _a === void 0 ? void 0 : _a.userAgent) || ((_b = source.headers) === null || _b === void 0 ? void 0 : _b.referer) || ((_c = source.headers) === null || _c === void 0 ? void 0 : _c.origin) || ((_d = source.headers) === null || _d === void 0 ? void 0 : _d.cookie) || ((_e = source.headers) === null || _e === void 0 ? void 0 : _e.authorization));
  }
  function checkStream(_x) {
    return _checkStream.apply(this, arguments);
  }
  function _checkStream() {
    _checkStream = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(source, timeoutMs = 12000) {
      var _a, startedAt, controller, timeout, response, contentType, body, hasMedia, elapsed, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            startedAt = Date.now();
            if (source.url) {
              _context.n = 1;
              break;
            }
            return _context.a(2, result('not_configured', 'Источник не настроен.', startedAt));
          case 1:
            if (!(location.protocol === 'https:' && source.url.startsWith('http:'))) {
              _context.n = 2;
              break;
            }
            return _context.a(2, result('unsupported', 'HTTP-поток заблокирован политикой mixed content на HTTPS-странице.', startedAt));
          case 2:
            controller = typeof AbortController !== 'undefined' ? new AbortController() : undefined;
            timeout = globalThis.setTimeout(() => controller === null || controller === void 0 ? void 0 : controller.abort(), timeoutMs);
            _context.p = 3;
            _context.n = 4;
            return fetch(source.url, {
              method: 'GET',
              signal: controller === null || controller === void 0 ? void 0 : controller.signal,
              credentials: 'omit',
              redirect: 'follow',
              headers: {
                Accept: 'application/vnd.apple.mpegurl, application/x-mpegURL, video/*, */*',
                Range: 'bytes=0-131071'
              }
            });
          case 4:
            response = _context.v;
            if (!(!response.ok && response.status !== 206)) {
              _context.n = 5;
              break;
            }
            return _context.a(2, result(statusFromHttp(response.status), `Сервер ответил HTTP ${response.status}.`, startedAt, response.status));
          case 5:
            contentType = (_a = response.headers.get('content-type')) !== null && _a !== void 0 ? _a : '';
            if (!(/mpegurl|m3u8/i.test(contentType) || /\.m3u8(?:$|[?#])/i.test(source.url))) {
              _context.n = 8;
              break;
            }
            _context.n = 6;
            return response.text();
          case 6:
            body = _context.v;
            if (body.replace(/^\uFEFF/, '').trimStart().startsWith('#EXTM3U')) {
              _context.n = 7;
              break;
            }
            return _context.a(2, result('offline', 'Ответ не является HLS-манифестом #EXTM3U.', startedAt, response.status));
          case 7:
            hasMedia = /#EXT-X-STREAM-INF|#EXTINF|#EXT-X-TARGETDURATION|#EXT-X-MEDIA/i.test(body);
            if (hasMedia) {
              _context.n = 8;
              break;
            }
            return _context.a(2, result('offline', 'HLS-манифест не содержит вариантов или сегментов.', startedAt));
          case 8:
            elapsed = Date.now() - startedAt;
            return _context.a(2, result(elapsed > Math.min(5000, timeoutMs / 2) ? 'slow' : 'online', hasForbiddenBrowserHeaders(source) ? 'Поток ответил, но специальные заголовки браузером не проверялись.' : 'Источник ответил корректно.', startedAt, response.status));
          case 9:
            _context.p = 9;
            _t = _context.v;
            if (!(_t.name === 'AbortError')) {
              _context.n = 10;
              break;
            }
            return _context.a(2, result('offline', 'Истекло время ожидания ответа.', startedAt));
          case 10:
            if (!(_t instanceof TypeError)) {
              _context.n = 11;
              break;
            }
            return _context.a(2, result('cors_unknown', 'Браузер не смог проверить поток: CORS или сетевая политика. Это не доказывает недоступность в нативном плеере.', startedAt));
          case 11:
            return _context.a(2, result('offline', _t.message || 'Неизвестная ошибка проверки.', startedAt));
          case 12:
            _context.p = 12;
            globalThis.clearTimeout(timeout);
            return _context.f(12);
          case 13:
            return _context.a(2);
        }
      }, _callee, null, [[3, 9, 12, 13]]);
    }));
    return _checkStream.apply(this, arguments);
  }
  function applyHealthResult(source, health) {
    source.status = health.status;
    source.responseTimeMs = health.responseTimeMs;
    source.lastCheckedAt = health.checkedAt;
  }

  var STORAGE_KEY = 'lampa_iptv_state';
  var DEFAULT_PREFERENCES = {
    enabled: true,
    dieselClientEnabled: false,
    view: 'grid',
    checkBeforePlay: false,
    autoFallback: true,
    connectionTimeoutMs: 12000,
    retries: 2,
    lowPowerMode: false,
    showNumbers: true,
    showStatuses: true
  };
  function createDefaultState() {
    return {
      schemaVersion: PLUGIN_INFO.schemaVersion,
      preferences: Object.assign({}, DEFAULT_PREFERENCES),
      channelOverrides: {},
      favorites: [],
      history: [],
      adult: {
        enabled: false
      },
      xtreamAccounts: [],
      manualMappings: {},
      recentErrors: []
    };
  }
  function safeObject(value) {
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  }
  function sanitizeSource(value) {
    var item = safeObject(value);
    if (typeof item.id !== 'string' || typeof item.url !== 'string') return undefined;
    if (!/^https?:\/\//i.test(item.url)) return undefined;
    return {
      id: item.id,
      type: item.type === 'direct' || item.type === 'm3u' || item.type === 'xtream' || item.type === 'external_player' ? item.type : 'hls',
      url: item.url,
      priority: Number(item.priority) || 1,
      public: item.public === true,
      official: item.official === true,
      requiresAuthorization: item.requiresAuthorization !== false,
      headers: safeObject(item.headers),
      status: typeof item.status === 'string' ? item.status : 'unknown',
      responseTimeMs: typeof item.responseTimeMs === 'number' ? item.responseTimeMs : undefined,
      lastCheckedAt: typeof item.lastCheckedAt === 'string' ? item.lastCheckedAt : undefined,
      externalPlayer: item.externalPlayer === true,
      enabled: item.enabled !== false
    };
  }
  function sanitizeOverride(value) {
    var item = safeObject(value);
    var sources = Array.isArray(item.sources) ? item.sources.map(sanitizeSource).filter(source => Boolean(source)) : undefined;
    return {
      number: typeof item.number === 'number' ? item.number : undefined,
      category: typeof item.category === 'string' ? item.category : undefined,
      hidden: item.hidden === true,
      epgUrl: typeof item.epgUrl === 'string' ? item.epgUrl : undefined,
      epgId: typeof item.epgId === 'string' ? item.epgId : undefined,
      epgTimezone: typeof item.epgTimezone === 'string' ? item.epgTimezone : undefined,
      epgOffsetMinutes: typeof item.epgOffsetMinutes === 'number' ? item.epgOffsetMinutes : undefined,
      epgAlias: typeof item.epgAlias === 'string' ? item.epgAlias : undefined,
      sources: sources === null || sources === void 0 ? void 0 : sources.slice(0, LIMITS.maxSourcesPerChannel)
    };
  }
  function migrateState(value) {
    var input = safeObject(value);
    var state = createDefaultState();
    var preferences = safeObject(input.preferences);
    state.preferences = Object.assign(Object.assign(Object.assign({}, state.preferences), preferences), {
      enabled: preferences.enabled !== false,
      dieselClientEnabled: preferences.dieselClientEnabled === true,
      view: preferences.view === 'list' ? 'list' : 'grid',
      connectionTimeoutMs: Math.min(60000, Math.max(3000, Number(preferences.connectionTimeoutMs) || 12000)),
      retries: Math.min(5, Math.max(0, Number(preferences.retries) || 0))
    });
    var overrides = safeObject(input.channelOverrides);
    for (var _i = 0, _Object$entries = Object.entries(overrides); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        channelId = _Object$entries$_i[0],
        override = _Object$entries$_i[1];
      if (CHANNEL_IDS.has(channelId)) state.channelOverrides[channelId] = sanitizeOverride(override);
    }
    state.favorites = Array.isArray(input.favorites) ? Array.from(new Set(input.favorites.filter(id => typeof id === 'string' && CHANNEL_IDS.has(id)))) : [];
    state.history = Array.isArray(input.history) ? input.history.filter(item => item && typeof item.channelId === 'string' && CHANNEL_IDS.has(item.channelId) && typeof item.watchedAt === 'number').slice(-30) : [];
    state.lastChannelId = typeof input.lastChannelId === 'string' && CHANNEL_IDS.has(input.lastChannelId) ? input.lastChannelId : undefined;
    var adult = safeObject(input.adult);
    state.adult = {
      enabled: adult.enabled === true,
      pinSalt: typeof adult.pinSalt === 'string' ? adult.pinSalt : undefined,
      pinHash: typeof adult.pinHash === 'string' ? adult.pinHash : undefined,
      unlockedUntil: typeof adult.unlockedUntil === 'number' ? adult.unlockedUntil : undefined
    };
    state.xtreamAccounts = Array.isArray(input.xtreamAccounts) ? input.xtreamAccounts.filter(account => account && typeof account.id === 'string' && typeof account.server === 'string' && typeof account.username === 'string' && typeof account.password === 'string').map(account => ({
      id: account.id,
      name: typeof account.name === 'string' ? account.name : 'Xtream',
      server: account.server,
      username: account.username,
      password: account.password,
      enabled: account.enabled !== false
    })) : [];
    state.manualMappings = Object.fromEntries(Object.entries(safeObject(input.manualMappings)).filter(([, channelId]) => typeof channelId === 'string' && CHANNEL_IDS.has(channelId)));
    state.lastImportReport = input.lastImportReport && typeof input.lastImportReport === 'object' ? input.lastImportReport : undefined;
    state.recentErrors = Array.isArray(input.recentErrors) ? input.recentErrors.slice(-100) : [];
    state.schemaVersion = PLUGIN_INFO.schemaVersion;
    return state;
  }
  function parseStorageValue(value) {
    if (typeof value !== 'string') return value;
    try {
      return JSON.parse(value);
    } catch (_a) {
      return {};
    }
  }
  function loadState(Lampa) {
    var _a, _b, _c;
    try {
      if ((_a = Lampa === null || Lampa === void 0 ? void 0 : Lampa.Storage) === null || _a === void 0 ? void 0 : _a.get) {
        return migrateState(parseStorageValue(Lampa.Storage.get(STORAGE_KEY, '{}')));
      }
      return migrateState(parseStorageValue((_c = (_b = globalThis.localStorage) === null || _b === void 0 ? void 0 : _b.getItem(STORAGE_KEY)) !== null && _c !== void 0 ? _c : '{}'));
    } catch (_d) {
      return createDefaultState();
    }
  }
  function saveState(state, Lampa) {
    var _a, _b;
    var safe = migrateState(state);
    if ((_a = Lampa === null || Lampa === void 0 ? void 0 : Lampa.Storage) === null || _a === void 0 ? void 0 : _a.set) {
      Lampa.Storage.set(STORAGE_KEY, safe);
      return;
    }
    (_b = globalThis.localStorage) === null || _b === void 0 ? void 0 : _b.setItem(STORAGE_KEY, JSON.stringify(safe));
  }
  function getChannelSources(state, channelId) {
    var _a, _b;
    var channel = CHANNELS.find(item => item.id === channelId);
    var custom = (_a = state.channelOverrides[channelId]) === null || _a === void 0 ? void 0 : _a.sources;
    return [...((_b = custom !== null && custom !== void 0 ? custom : channel === null || channel === void 0 ? void 0 : channel.sources) !== null && _b !== void 0 ? _b : [])].filter(source => source.enabled !== false).sort((left, right) => left.priority - right.priority);
  }
  function getRuntimeChannels(state) {
    return CHANNELS.map(channel => {
      var _a, _b, _c, _d;
      var override = (_a = state.channelOverrides[channel.id]) !== null && _a !== void 0 ? _a : {};
      return Object.assign(Object.assign({}, channel), {
        sources: getChannelSources(state, channel.id),
        favorite: state.favorites.includes(channel.id),
        hidden: override.hidden === true,
        effectiveNumber: (_b = override.number) !== null && _b !== void 0 ? _b : channel.number,
        effectiveCategory: (_c = override.category) !== null && _c !== void 0 ? _c : channel.category,
        effectiveEpgId: (_d = override.epgId) !== null && _d !== void 0 ? _d : channel.epgId
      });
    }).sort((left, right) => left.effectiveNumber - right.effectiveNumber);
  }
  function updateOverride(state, channelId, change) {
    var _a;
    if (!CHANNEL_IDS.has(channelId)) return;
    state.channelOverrides[channelId] = Object.assign(Object.assign({}, (_a = state.channelOverrides[channelId]) !== null && _a !== void 0 ? _a : {}), change);
  }
  function toggleFavorite(state, channelId) {
    if (!CHANNEL_IDS.has(channelId)) return false;
    var index = state.favorites.indexOf(channelId);
    if (index >= 0) state.favorites.splice(index, 1);else state.favorites.push(channelId);
    return index < 0;
  }
  function addHistory(state, channelId) {
    if (!CHANNEL_IDS.has(channelId)) return;
    state.history = state.history.filter(item => item.channelId !== channelId);
    state.history.push({
      channelId,
      watchedAt: Date.now()
    });
    state.history = state.history.slice(-30);
    state.lastChannelId = channelId;
  }

  function element(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function selector(className, title, subtitle) {
    var node = element('div', `${className} selector`);
    node.tabIndex = 0;
    var titleNode = element('div', `${className}__title`, title);
    node.append(titleNode);
    if (subtitle) node.append(element('div', `${className}__subtitle`, subtitle));
    return node;
  }
  function onEnter(node, callback) {
    var invoke = () => {
      void callback();
    };
    node.addEventListener('hover:enter', invoke);
    node.addEventListener('click', invoke);
    node.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        invoke();
      }
    });
  }
  function onLong(node, callback) {
    node.addEventListener('hover:long', callback);
    node.addEventListener('contextmenu', event => {
      event.preventDefault();
      callback();
    });
  }
  function bindFocus(node, onFocused) {
    var focused = () => {
      onFocused(node);
      try {
        node.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest'
        });
      } catch (_a) {
        node.scrollIntoView();
      }
    };
    node.addEventListener('hover:focus', focused);
    node.addEventListener('focus', focused);
  }
  function navigator$1() {
    var candidate = globalThis.Navigator;
    return candidate && typeof candidate.canmove === 'function' ? candidate : undefined;
  }
  function activateContentController(Lampa, root, getLast, onBack) {
    var _a;
    if (!((_a = Lampa === null || Lampa === void 0 ? void 0 : Lampa.Controller) === null || _a === void 0 ? void 0 : _a.add)) return;
    var move = direction => {
      var _a;
      var navigation = navigator$1();
      if ((_a = navigation === null || navigation === void 0 ? void 0 : navigation.canmove) === null || _a === void 0 ? void 0 : _a.call(navigation, direction)) {
        navigation.move(direction);
        return true;
      }
      return false;
    };
    Lampa.Controller.add('content', {
      toggle: () => {
        var _a, _b, _c, _d;
        (_b = (_a = Lampa.Controller).collectionSet) === null || _b === void 0 ? void 0 : _b.call(_a, root);
        (_d = (_c = Lampa.Controller).collectionFocus) === null || _d === void 0 ? void 0 : _d.call(_c, getLast() || false, root);
      },
      up: () => {
        var _a, _b;
        if (!move('up')) (_b = (_a = Lampa.Controller).toggle) === null || _b === void 0 ? void 0 : _b.call(_a, 'head');
      },
      down: () => {
        move('down');
      },
      left: () => {
        var _a, _b;
        if (!move('left')) (_b = (_a = Lampa.Controller).toggle) === null || _b === void 0 ? void 0 : _b.call(_a, 'menu');
      },
      right: () => {
        move('right');
      },
      back: onBack
    });
    Lampa.Controller.toggle('content');
  }
  function statusLabel(status) {
    var _a;
    var labels = {
      unknown: 'Не проверен',
      online: 'Онлайн',
      slow: 'Медленный',
      offline: 'Недоступен',
      auth_required: 'Нужна авторизация',
      geo_restricted: 'Геоограничение',
      cors_unknown: 'CORS: неизвестно',
      drm_required: 'Требуется DRM',
      unsupported: 'Не поддерживается',
      not_configured: 'Источник не подключён',
      temporarily_unavailable: 'Временно недоступен'
    };
    return (_a = labels[status !== null && status !== void 0 ? status : '']) !== null && _a !== void 0 ? _a : 'Источник не подключён';
  }

  function notify$1(Lampa, message) {
    var _a, _b;
    if ((_a = Lampa === null || Lampa === void 0 ? void 0 : Lampa.Noty) === null || _a === void 0 ? void 0 : _a.show) Lampa.Noty.show(message);else (_b = globalThis.alert) === null || _b === void 0 ? void 0 : _b.call(globalThis, message);
  }
  function askText(Lampa, title, value = '', options = {}) {
    return new Promise(resolve => {
      var _a, _b, _c;
      if ((_a = Lampa === null || Lampa === void 0 ? void 0 : Lampa.Input) === null || _a === void 0 ? void 0 : _a.edit) {
        Lampa.Input.edit({
          title,
          free: true,
          nosave: true,
          value,
          password: options.password === true,
          layout: options.numeric ? 'nums' : undefined,
          keyboard: 'lampa'
        }, answer => resolve((answer !== null && answer !== void 0 ? answer : '').trim()));
        return;
      }
      resolve(((_c = (_b = globalThis.prompt) === null || _b === void 0 ? void 0 : _b.call(globalThis, title, value)) !== null && _c !== void 0 ? _c : '').trim());
    });
  }
  function choose(Lampa, title, items, _onBack) {
    return new Promise(resolve => {
      var _a, _b;
      if ((_a = Lampa === null || Lampa === void 0 ? void 0 : Lampa.Select) === null || _a === void 0 ? void 0 : _a.show) {
        Lampa.Select.show({
          title,
          items,
          onSelect: item => resolve(item),
          onBack: () => {
            _onBack === null || _onBack === void 0 ? void 0 : _onBack();
            resolve(undefined);
          }
        });
        return;
      }
      var answer = (_b = globalThis.prompt) === null || _b === void 0 ? void 0 : _b.call(globalThis, `${title}\n${items.map((item, index) => `${index + 1}. ${item.title}`).join('\n')}`, '1');
      var selected = Number(answer) - 1;
      resolve(items[selected]);
    });
  }
  function confirmAction(Lampa, title, text) {
    return new Promise(resolve => {
      var _a, _b, _c;
      if ((_a = Lampa === null || Lampa === void 0 ? void 0 : Lampa.Modal) === null || _a === void 0 ? void 0 : _a.open) {
        var body = document.createElement('div');
        body.className = 'lampa-iptv-confirm';
        body.textContent = text;
        Lampa.Modal.open({
          title,
          align: 'center',
          html: body,
          buttons: [{
            name: 'Отмена',
            onSelect: () => {
              Lampa.Modal.close();
              resolve(false);
            }
          }, {
            name: 'Подтвердить',
            onSelect: () => {
              Lampa.Modal.close();
              resolve(true);
            }
          }],
          onBack: () => resolve(false)
        });
        return;
      }
      resolve((_c = (_b = globalThis.confirm) === null || _b === void 0 ? void 0 : _b.call(globalThis, `${title}\n\n${text}`)) !== null && _c !== void 0 ? _c : false);
    });
  }
  function askMultiline(Lampa, title, initial = '') {
    return new Promise(resolve => {
      var _a, _b, _c;
      if (!((_a = Lampa === null || Lampa === void 0 ? void 0 : Lampa.Modal) === null || _a === void 0 ? void 0 : _a.open)) {
        resolve((_c = (_b = globalThis.prompt) === null || _b === void 0 ? void 0 : _b.call(globalThis, title, initial)) !== null && _c !== void 0 ? _c : undefined);
        return;
      }
      var body = document.createElement('div');
      body.className = 'lampa-iptv-textarea-wrap';
      var hint = document.createElement('div');
      hint.className = 'lampa-iptv-textarea-hint';
      hint.textContent = 'Вставьте текст. На устройствах без ввода многострочного текста используйте импорт файла.';
      var textarea = document.createElement('textarea');
      textarea.className = 'lampa-iptv-textarea';
      textarea.value = initial;
      textarea.setAttribute('aria-label', title);
      body.append(hint, textarea);
      Lampa.Modal.open({
        title,
        html: body,
        size: 'large',
        buttons: [{
          name: 'Отмена',
          onSelect: () => {
            Lampa.Modal.close();
            resolve(undefined);
          }
        }, {
          name: 'Импортировать',
          onSelect: () => {
            var value = textarea.value;
            Lampa.Modal.close();
            resolve(value);
          }
        }],
        onBack: () => resolve(undefined)
      });
      globalThis.setTimeout(() => textarea.focus(), 50);
    });
  }
  function readLocalFile(accept) {
    return new Promise((resolve, reject) => {
      if (typeof FileReader === 'undefined') {
        reject(new Error('File API не поддерживается на этом устройстве.'));
        return;
      }
      var input = document.createElement('input');
      input.type = 'file';
      input.accept = accept;
      input.style.display = 'none';
      input.addEventListener('change', () => {
        var _a;
        var file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file) {
          input.remove();
          resolve(undefined);
          return;
        }
        var reader = new FileReader();
        reader.onload = () => {
          var _a;
          input.remove();
          resolve({
            name: file.name,
            content: String((_a = reader.result) !== null && _a !== void 0 ? _a : '')
          });
        };
        reader.onerror = () => {
          var _a;
          input.remove();
          reject((_a = reader.error) !== null && _a !== void 0 ? _a : new Error('Не удалось прочитать файл.'));
        };
        reader.readAsText(file);
      }, {
        once: true
      });
      document.body.append(input);
      input.click();
    });
  }
  function downloadText(filename, content, mime = 'application/json') {
    var blob = new Blob([content], {
      type: `${mime};charset=utf-8`
    });
    var url = URL.createObjectURL(blob);
    var anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.style.display = 'none';
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    globalThis.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function createChannelComponent(runtime) {
    var Lampa = runtime.Lampa;
    return class ChannelComponent {
      constructor(params) {
        this.root = element('div', 'lampa-iptv lampa-iptv-editor');
        this.initialized = false;
        this.save = () => {
          runtime.saveState();
        };
        this.channelId = params.channelId;
      }
      create() {
        return this.render();
      }
      render() {
        return this.root;
      }
      start() {
        if (!this.initialized) {
          this.initialized = true;
          this.build();
        }
        activateContentController(Lampa, this.root, () => this.last, () => Lampa.Activity.backward());
      }
      pause() {}
      stop() {}
      destroy() {
        this.root.remove();
      }
      rebuild() {
        this.build();
        this.start();
      }
      field(title, value, callback, className = '') {
        var item = selector('lampa-iptv-field', title, value || 'Не задано');
        if (className) item.classList.add(className);
        bindFocus(item, node => {
          this.last = node;
        });
        onEnter(item, callback);
        return item;
      }
      build() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        this.channel = getRuntimeChannels(runtime.state).find(item => item.id === this.channelId);
        this.root.replaceChildren();
        if (!this.channel) {
          this.root.append(element('div', 'lampa-iptv-error', 'Канал не найден.'));
          return;
        }
        var channel = this.channel;
        var override = (_a = runtime.state.channelOverrides[channel.id]) !== null && _a !== void 0 ? _a : {};
        var sources = getChannelSources(runtime.state, channel.id);
        var header = element('div', 'lampa-iptv__header');
        header.append(element('div', 'lampa-iptv__brand', channel.name), element('div', 'lampa-iptv__version', channel.adult ? 'Канал 18+ · данные хранятся только локально' : 'Настройка канала'));
        var fields = element('div', 'lampa-iptv-fields');
        fields.append(this.field('Название', channel.name, () => notify$1(Lampa, 'Фиксированное название реестра не изменяется.')), this.field('Номер', String(channel.effectiveNumber), () => this.editNumber()), this.field('Категория', channel.effectiveCategory, () => this.editCategory()), this.field('Основной URL', this.sourceLabel(sources[0]), () => this.editSource(0)), this.field('Резервный URL №1', this.sourceLabel(sources[1]), () => this.editSource(1)), this.field('Резервный URL №2', this.sourceLabel(sources[2]), () => this.editSource(2)), this.field('XMLTV URL', override.epgUrl ? maskUrl(override.epgUrl) : '', () => this.editEpgUrl()), this.field('XMLTV channel ID / tvg-id', (_c = (_b = override.epgId) !== null && _b !== void 0 ? _b : channel.epgId) !== null && _c !== void 0 ? _c : '', () => this.editEpgId()), this.field('Часовой пояс', (_d = override.epgTimezone) !== null && _d !== void 0 ? _d : 'Автоматически из XMLTV', () => this.editTimezone()), this.field('Смещение EPG, минут', String((_e = override.epgOffsetMinutes) !== null && _e !== void 0 ? _e : 0), () => this.editEpgOffset()), this.field('Название для сопоставления EPG', (_f = override.epgAlias) !== null && _f !== void 0 ? _f : '', () => this.editEpgAlias()), this.field('User-Agent основного источника', (_j = (_h = (_g = sources[0]) === null || _g === void 0 ? void 0 : _g.headers) === null || _h === void 0 ? void 0 : _h.userAgent) !== null && _j !== void 0 ? _j : '', () => this.editHeader('userAgent')), this.field('Referer основного источника', (_m = (_l = (_k = sources[0]) === null || _k === void 0 ? void 0 : _k.headers) === null || _l === void 0 ? void 0 : _l.referer) !== null && _m !== void 0 ? _m : '', () => this.editHeader('referer')), this.field('Внешний плеер', ((_o = sources[0]) === null || _o === void 0 ? void 0 : _o.externalPlayer) ? 'Включён' : 'Использовать настройку Lampa', () => this.toggleExternalPlayer()), this.field('Проверить ссылки', 'Проверить до трёх источников локально', () => this.checkSources()), this.field('Поменять приоритет', 'Основной ↔ резервный №1', () => this.swapSources()), this.field('Очистить источники', 'Удалить URL и приватные заголовки канала', () => this.clearSources()), this.field('Официальная страница', (_q = (_p = channel.officialLivePage) !== null && _p !== void 0 ? _p : channel.officialSite) !== null && _q !== void 0 ? _q : 'Не найдена', () => this.openOfficial()));
        if (!sources.length) {
          var notice = element('div', 'lampa-iptv-editor__notice', 'Источник не подключён. Вставьте прямой .m3u8 URL, одну M3U-запись или импортируйте общий плейлист.');
          this.root.append(header, notice, fields);
        } else {
          this.root.append(header, fields);
        }
        (_s = (_r = this.activity) === null || _r === void 0 ? void 0 : _r.loader) === null || _s === void 0 ? void 0 : _s.call(_r, false);
      }
      sourceLabel(source) {
        if (!source) return 'Источник не подключён';
        return `${maskUrl(source.url)} · ${statusLabel(source.status)}`;
      }
      editNumber() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var value, number;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                if (_this.channel) {
                  _context.n = 1;
                  break;
                }
                return _context.a(2);
              case 1:
                _context.n = 2;
                return askText(Lampa, 'Номер канала', String(_this.channel.effectiveNumber), {
                  numeric: true
                });
              case 2:
                value = _context.v;
                number = Number(value);
                if (!(!Number.isInteger(number) || number < 1 || number > 9999)) {
                  _context.n = 3;
                  break;
                }
                notify$1(Lampa, 'Введите целое число от 1 до 9999.');
                return _context.a(2, _this.start());
              case 3:
                updateOverride(runtime.state, _this.channel.id, {
                  number
                });
                _this.save();
                _this.rebuild();
              case 4:
                return _context.a(2);
            }
          }, _callee);
        }))();
      }
      editCategory() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var selection;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                if (_this2.channel) {
                  _context2.n = 1;
                  break;
                }
                return _context2.a(2);
              case 1:
                _context2.n = 2;
                return choose(Lampa, 'Категория', ['Основные', 'Кино и развлечения', 'Хобби', '18+'].map(value => ({
                  title: value,
                  value
                })), () => _this2.start());
              case 2:
                selection = _context2.v;
                if (selection) {
                  _context2.n = 3;
                  break;
                }
                return _context2.a(2);
              case 3:
                updateOverride(runtime.state, _this2.channel.id, {
                  category: selection.value
                });
                _this2.save();
                _this2.rebuild();
              case 4:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      }
      editSource(index) {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var _a, _b, _c, _d, _e, _f, _g, _h, _j, sources, value, override, current, source, updated, found;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                if (_this3.channel) {
                  _context3.n = 1;
                  break;
                }
                return _context3.a(2);
              case 1:
                sources = getChannelSources(runtime.state, _this3.channel.id);
                _context3.n = 2;
                return askText(Lampa, index === 0 ? 'Основной URL или M3U-запись' : `Резервный URL №${index}`, (_b = (_a = sources[index]) === null || _a === void 0 ? void 0 : _a.url) !== null && _b !== void 0 ? _b : '');
              case 2:
                value = _context3.v;
                if (value) {
                  _context3.n = 3;
                  break;
                }
                return _context3.a(2, _this3.start());
              case 3:
                try {
                  override = (_c = (_h = runtime.state.channelOverrides)[_j = _this3.channel.id]) !== null && _c !== void 0 ? _c : _h[_j] = {};
                  current = [...((_d = override.sources) !== null && _d !== void 0 ? _d : [])];
                  if (index < current.length) current.splice(index, 1);
                  override.sources = current;
                  source = addDirectSource(runtime.state, _this3.channel.id, value, {
                    priority: index + 1,
                    headers: (_e = sources[index]) === null || _e === void 0 ? void 0 : _e.headers,
                    externalPlayer: (_f = sources[index]) === null || _f === void 0 ? void 0 : _f.externalPlayer
                  });
                  updated = (_g = override.sources) !== null && _g !== void 0 ? _g : [];
                  found = updated.findIndex(item => item.id === source.id);
                  if (found >= 0) updated.splice(found, 1);
                  updated.splice(index, 0, source);
                  updated.slice(0, 3).forEach((item, position) => {
                    item.priority = position + 1;
                  });
                  override.sources = updated.slice(0, 3);
                  _this3.save();
                  _this3.rebuild();
                } catch (error) {
                  notify$1(Lampa, error.message);
                  _this3.start();
                }
              case 4:
                return _context3.a(2);
            }
          }, _callee3);
        }))();
      }
      editEpgUrl() {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          var _a, _b, current, value;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                if (_this4.channel) {
                  _context4.n = 1;
                  break;
                }
                return _context4.a(2);
              case 1:
                current = (_b = (_a = runtime.state.channelOverrides[_this4.channel.id]) === null || _a === void 0 ? void 0 : _a.epgUrl) !== null && _b !== void 0 ? _b : '';
                _context4.n = 2;
                return askText(Lampa, 'XMLTV или XMLTV.GZ URL', current);
              case 2:
                value = _context4.v;
                if (value) {
                  _context4.n = 3;
                  break;
                }
                updateOverride(runtime.state, _this4.channel.id, {
                  epgUrl: undefined
                });
                _context4.n = 5;
                break;
              case 3:
                if (isAllowedUrl(value)) {
                  _context4.n = 4;
                  break;
                }
                notify$1(Lampa, 'Разрешены только URL HTTP или HTTPS.');
                return _context4.a(2, _this4.start());
              case 4:
                updateOverride(runtime.state, _this4.channel.id, {
                  epgUrl: value
                });
              case 5:
                _this4.save();
                _this4.rebuild();
              case 6:
                return _context4.a(2);
            }
          }, _callee4);
        }))();
      }
      editEpgId() {
        var _this5 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
          var _a, _b, _c, current, value;
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.n) {
              case 0:
                if (_this5.channel) {
                  _context5.n = 1;
                  break;
                }
                return _context5.a(2);
              case 1:
                current = (_c = (_b = (_a = runtime.state.channelOverrides[_this5.channel.id]) === null || _a === void 0 ? void 0 : _a.epgId) !== null && _b !== void 0 ? _b : _this5.channel.epgId) !== null && _c !== void 0 ? _c : '';
                _context5.n = 2;
                return askText(Lampa, 'XMLTV channel ID / tvg-id', current);
              case 2:
                value = _context5.v;
                updateOverride(runtime.state, _this5.channel.id, {
                  epgId: value || undefined
                });
                _this5.save();
                _this5.rebuild();
              case 3:
                return _context5.a(2);
            }
          }, _callee5);
        }))();
      }
      editTimezone() {
        var _this6 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
          var _a, _b, current, value;
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.n) {
              case 0:
                if (_this6.channel) {
                  _context6.n = 1;
                  break;
                }
                return _context6.a(2);
              case 1:
                current = (_b = (_a = runtime.state.channelOverrides[_this6.channel.id]) === null || _a === void 0 ? void 0 : _a.epgTimezone) !== null && _b !== void 0 ? _b : '';
                _context6.n = 2;
                return askText(Lampa, 'Часовой пояс, например Europe/Moscow', current);
              case 2:
                value = _context6.v;
                updateOverride(runtime.state, _this6.channel.id, {
                  epgTimezone: value || undefined
                });
                _this6.save();
                _this6.rebuild();
              case 3:
                return _context6.a(2);
            }
          }, _callee6);
        }))();
      }
      editEpgOffset() {
        var _this7 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
          var _a, _b, current, value, offset;
          return _regenerator().w(function (_context7) {
            while (1) switch (_context7.n) {
              case 0:
                if (_this7.channel) {
                  _context7.n = 1;
                  break;
                }
                return _context7.a(2);
              case 1:
                current = (_b = (_a = runtime.state.channelOverrides[_this7.channel.id]) === null || _a === void 0 ? void 0 : _a.epgOffsetMinutes) !== null && _b !== void 0 ? _b : 0;
                _context7.n = 2;
                return askText(Lampa, 'Смещение EPG в минутах', String(current));
              case 2:
                value = _context7.v;
                offset = Number(value);
                if (!(!Number.isInteger(offset) || offset < -1440 || offset > 1440)) {
                  _context7.n = 3;
                  break;
                }
                notify$1(Lampa, 'Введите целое число от -1440 до 1440.');
                return _context7.a(2, _this7.start());
              case 3:
                updateOverride(runtime.state, _this7.channel.id, {
                  epgOffsetMinutes: offset
                });
                _this7.save();
                _this7.rebuild();
              case 4:
                return _context7.a(2);
            }
          }, _callee7);
        }))();
      }
      editEpgAlias() {
        var _this8 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
          var _a, _b, current, value;
          return _regenerator().w(function (_context8) {
            while (1) switch (_context8.n) {
              case 0:
                if (_this8.channel) {
                  _context8.n = 1;
                  break;
                }
                return _context8.a(2);
              case 1:
                current = (_b = (_a = runtime.state.channelOverrides[_this8.channel.id]) === null || _a === void 0 ? void 0 : _a.epgAlias) !== null && _b !== void 0 ? _b : '';
                _context8.n = 2;
                return askText(Lampa, 'Название для сопоставления EPG', current);
              case 2:
                value = _context8.v;
                updateOverride(runtime.state, _this8.channel.id, {
                  epgAlias: value || undefined
                });
                _this8.save();
                _this8.rebuild();
              case 3:
                return _context8.a(2);
            }
          }, _callee8);
        }))();
      }
      editHeader(field) {
        var _this9 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
          var _a, _b, _c, source, current, value;
          return _regenerator().w(function (_context9) {
            while (1) switch (_context9.n) {
              case 0:
                if (_this9.channel) {
                  _context9.n = 1;
                  break;
                }
                return _context9.a(2);
              case 1:
                source = getChannelSources(runtime.state, _this9.channel.id)[0];
                if (source) {
                  _context9.n = 2;
                  break;
                }
                notify$1(Lampa, 'Сначала добавьте основной URL.');
                return _context9.a(2);
              case 2:
                current = (_b = (_a = source.headers) === null || _a === void 0 ? void 0 : _a[field]) !== null && _b !== void 0 ? _b : '';
                _context9.n = 3;
                return askText(Lampa, field === 'userAgent' ? 'User-Agent' : 'Referer', current);
              case 3:
                value = _context9.v;
                source.headers = Object.assign(Object.assign({}, (_c = source.headers) !== null && _c !== void 0 ? _c : {}), {
                  [field]: value || undefined
                });
                _this9.save();
                notify$1(Lampa, 'Заголовок сохранён локально. Встроенный браузерный плеер может его не передать; используйте внешний плеер или официальное приложение.');
                _this9.rebuild();
              case 4:
                return _context9.a(2);
            }
          }, _callee9);
        }))();
      }
      toggleExternalPlayer() {
        if (!this.channel) return;
        var source = getChannelSources(runtime.state, this.channel.id)[0];
        if (!source) {
          notify$1(Lampa, 'Сначала добавьте основной URL.');
          return;
        }
        source.externalPlayer = !source.externalPlayer;
        this.save();
        this.rebuild();
      }
      checkSources() {
        var _this0 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
          var sources, index, health;
          return _regenerator().w(function (_context0) {
            while (1) switch (_context0.n) {
              case 0:
                if (_this0.channel) {
                  _context0.n = 1;
                  break;
                }
                return _context0.a(2);
              case 1:
                sources = getChannelSources(runtime.state, _this0.channel.id);
                if (sources.length) {
                  _context0.n = 2;
                  break;
                }
                notify$1(Lampa, 'Источник не подключён.');
                return _context0.a(2);
              case 2:
                index = 0;
              case 3:
                if (!(index < sources.length)) {
                  _context0.n = 6;
                  break;
                }
                notify$1(Lampa, `Проверка источника ${index + 1}/${sources.length}…`);
                _context0.n = 4;
                return checkStream(sources[index], runtime.state.preferences.connectionTimeoutMs);
              case 4:
                health = _context0.v;
                applyHealthResult(sources[index], health);
              case 5:
                index += 1;
                _context0.n = 3;
                break;
              case 6:
                _this0.save();
                notify$1(Lampa, sources.map((source, index) => `${index + 1}: ${statusLabel(source.status)}`).join(' · '));
                _this0.rebuild();
              case 7:
                return _context0.a(2);
            }
          }, _callee0);
        }))();
      }
      swapSources() {
        var _a, _b;
        var _c, _d;
        if (!this.channel) return;
        var override = (_a = (_c = runtime.state.channelOverrides)[_d = this.channel.id]) !== null && _a !== void 0 ? _a : _c[_d] = {};
        var sources = (_b = override.sources) !== null && _b !== void 0 ? _b : [];
        if (sources.length < 2) {
          notify$1(Lampa, 'Для смены приоритета нужен хотя бы один резервный источник.');
          return;
        }
        var _ref = [sources[1], sources[0]];
        sources[0] = _ref[0];
        sources[1] = _ref[1];
        sources.forEach((source, index) => {
          source.priority = index + 1;
        });
        override.sources = sources;
        this.save();
        this.rebuild();
      }
      clearSources() {
        var _this1 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
          var confirmed;
          return _regenerator().w(function (_context1) {
            while (1) switch (_context1.n) {
              case 0:
                if (_this1.channel) {
                  _context1.n = 1;
                  break;
                }
                return _context1.a(2);
              case 1:
                _context1.n = 2;
                return confirmAction(Lampa, 'Очистить источники', `Удалить все URL и приватные заголовки канала «${_this1.channel.name}»?`);
              case 2:
                confirmed = _context1.v;
                if (confirmed) {
                  _context1.n = 3;
                  break;
                }
                return _context1.a(2, _this1.start());
              case 3:
                updateOverride(runtime.state, _this1.channel.id, {
                  sources: []
                });
                _this1.save();
                _this1.rebuild();
              case 4:
                return _context1.a(2);
            }
          }, _callee1);
        }))();
      }
      openOfficial() {
        var _a, _b;
        if (!this.channel) return;
        var url = (_a = this.channel.officialLivePage) !== null && _a !== void 0 ? _a : this.channel.officialSite;
        if (!url) {
          notify$1(Lampa, 'Подтверждённая официальная страница не найдена.');
          return;
        }
        (_b = globalThis.open) === null || _b === void 0 ? void 0 : _b.call(globalThis, url, '_blank', 'noopener,noreferrer');
        this.start();
      }
    };
  }

  var DATABASE_NAME = 'lampa_iptv';
  var DATABASE_VERSION = 1;
  var STORE_NAME = 'cache';
  function openDatabase() {
    return new Promise((resolve, reject) => {
      if (!globalThis.indexedDB) {
        reject(new Error('IndexedDB не поддерживается.'));
        return;
      }
      var request = globalThis.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
      request.onupgradeneeded = () => {
        var database = request.result;
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          database.createObjectStore(STORE_NAME, {
            keyPath: 'key'
          });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => {
        var _a;
        return reject((_a = request.error) !== null && _a !== void 0 ? _a : new Error('Ошибка IndexedDB.'));
      };
    });
  }
  function cacheGet(_x) {
    return _cacheGet.apply(this, arguments);
  }
  function _cacheGet() {
    _cacheGet = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(key) {
      var database;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return openDatabase();
          case 1:
            database = _context.v;
            _context.n = 2;
            return new Promise((resolve, reject) => {
              var transaction = database.transaction(STORE_NAME, 'readonly');
              var request = transaction.objectStore(STORE_NAME).get(key);
              request.onsuccess = () => {
                var record = request.result;
                if (!record || record.expiresAt < Date.now()) resolve(undefined);else resolve(record.value);
              };
              request.onerror = () => reject(request.error);
              transaction.oncomplete = () => database.close();
            });
          case 2:
            return _context.a(2, _context.v);
          case 3:
            _context.p = 3;
            _context.v;
            return _context.a(2, undefined);
        }
      }, _callee, null, [[0, 3]]);
    }));
    return _cacheGet.apply(this, arguments);
  }
  function cacheSet(_x2, _x3, _x4) {
    return _cacheSet.apply(this, arguments);
  }
  function _cacheSet() {
    _cacheSet = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(key, value, ttlMs) {
      var database;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            _context2.n = 1;
            return openDatabase();
          case 1:
            database = _context2.v;
            _context2.n = 2;
            return new Promise((resolve, reject) => {
              var transaction = database.transaction(STORE_NAME, 'readwrite');
              transaction.objectStore(STORE_NAME).put({
                key,
                value,
                expiresAt: Date.now() + ttlMs
              });
              transaction.oncomplete = () => {
                database.close();
                resolve();
              };
              transaction.onerror = () => reject(transaction.error);
            });
          case 2:
            _context2.n = 4;
            break;
          case 3:
            _context2.p = 3;
            _context2.v;
          case 4:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 3]]);
    }));
    return _cacheSet.apply(this, arguments);
  }
  function cacheClear() {
    return _cacheClear.apply(this, arguments);
  }
  function _cacheClear() {
    _cacheClear = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            if (globalThis.indexedDB) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2);
          case 1:
            _context3.n = 2;
            return new Promise(resolve => {
              var request = globalThis.indexedDB.deleteDatabase(DATABASE_NAME);
              request.onsuccess = () => resolve();
              request.onerror = () => resolve();
              request.onblocked = () => resolve();
            });
          case 2:
            return _context3.a(2);
        }
      }, _callee3);
    }));
    return _cacheClear.apply(this, arguments);
  }

  function text(element, selector) {
    var _a, _b;
    var value = (_b = (_a = element.querySelector(selector)) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim();
    return value || undefined;
  }
  function parseXmltvTime(value, defaultOffsetMinutes = 0) {
    var _a;
    var match = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})?(?:\s*([+-])(\d{2})(\d{2})|Z)?$/.exec(value.trim());
    if (!match) return Number.NaN;
    var year = Number(match[1]);
    var month = Number(match[2]) - 1;
    var day = Number(match[3]);
    var hour = Number(match[4]);
    var minute = Number(match[5]);
    var second = Number((_a = match[6]) !== null && _a !== void 0 ? _a : 0);
    var sign = match[7] === '-' ? -1 : 1;
    var explicitOffset = match[8] && match[9] ? sign * (Number(match[8]) * 60 + Number(match[9])) : undefined;
    var offset = explicitOffset !== null && explicitOffset !== void 0 ? explicitOffset : defaultOffsetMinutes;
    return Date.UTC(year, month, day, hour, minute, second) - offset * 60000;
  }
  function parseXmltv(content, defaultOffsetMinutes = 0) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (new Blob([content]).size > LIMITS.maxXmltvBytes) {
      throw new Error(`XMLTV превышает лимит ${LIMITS.maxXmltvBytes / 1024 / 1024} МБ.`);
    }
    if (/<!DOCTYPE|<!ENTITY/i.test(content)) {
      throw new Error('XMLTV с DTD или внешними сущностями не поддерживается из соображений безопасности.');
    }
    var documentNode = new DOMParser().parseFromString(content, 'application/xml');
    if (documentNode.querySelector('parsererror')) throw new Error('XMLTV содержит некорректный XML.');
    var channels = Array.from(documentNode.querySelectorAll('channel')).map(element => {
      var _a, _b, _c, _d;
      return {
        id: (_b = (_a = element.getAttribute('id')) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : '',
        names: Array.from(element.querySelectorAll('display-name')).map(name => {
          var _a, _b;
          return (_b = (_a = name.textContent) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : '';
        }).filter(Boolean),
        icon: (_d = (_c = element.querySelector('icon')) === null || _c === void 0 ? void 0 : _c.getAttribute('src')) !== null && _d !== void 0 ? _d : undefined
      };
    }).filter(channel => Boolean(channel.id));
    var warnings = [];
    var programs = [];
    var elements = Array.from(documentNode.querySelectorAll('programme')).slice(0, LIMITS.maxPrograms);
    var _iterator = _createForOfIteratorHelper(elements),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var element = _step.value;
        var channelId = (_b = (_a = element.getAttribute('channel')) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : '';
        var start = parseXmltvTime((_c = element.getAttribute('start')) !== null && _c !== void 0 ? _c : '', defaultOffsetMinutes);
        var stop = parseXmltvTime((_d = element.getAttribute('stop')) !== null && _d !== void 0 ? _d : '', defaultOffsetMinutes);
        var title = (_e = text(element, 'title')) !== null && _e !== void 0 ? _e : '';
        if (!channelId || !title || !Number.isFinite(start) || !Number.isFinite(stop) || stop <= start) {
          warnings.push('Пропущена программа с неполными или некорректными полями.');
          continue;
        }
        programs.push({
          channelId,
          start,
          stop,
          title,
          description: text(element, 'desc'),
          category: text(element, 'category'),
          icon: (_g = (_f = element.querySelector('icon')) === null || _f === void 0 ? void 0 : _f.getAttribute('src')) !== null && _g !== void 0 ? _g : undefined,
          episode: text(element, 'episode-num'),
          rating: text(element, 'rating value')
        });
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    if (documentNode.querySelectorAll('programme').length > LIMITS.maxPrograms) {
      warnings.push(`Применён лимит ${LIMITS.maxPrograms} программ.`);
    }
    return {
      channels,
      programs: programs.sort((left, right) => left.start - right.start),
      warnings: Array.from(new Set(warnings)).slice(0, 100)
    };
  }
  function programProgress(program, now = Date.now()) {
    if (now <= program.start) return 0;
    if (now >= program.stop) return 100;
    return Math.max(0, Math.min(100, (now - program.start) / (program.stop - program.start) * 100));
  }

  var memory = new Map();
  function externalIdsForChannel(channel, state) {
    var _a;
    var override = (_a = state.channelOverrides[channel.id]) !== null && _a !== void 0 ? _a : {};
    return [override.epgId, channel.effectiveEpgId, channel.epgId, override.epgAlias, channel.name, ...channel.epgAliases].filter(value => Boolean(value));
  }
  function matchEpgPrograms(result, channel, state) {
    var knownExact = externalIdsForChannel(channel, state).map(normalizeExact);
    var knownNormalized = externalIdsForChannel(channel, state).map(normalizeName);
    var matchedExternalIds = new Set(result.channels.filter(external => {
      if (knownExact.includes(normalizeExact(external.id))) return true;
      return external.names.some(name => knownExact.includes(normalizeExact(name)) || knownNormalized.includes(normalizeName(name)));
    }).map(external => external.id));
    if (channel.effectiveEpgId) matchedExternalIds.add(channel.effectiveEpgId);
    return result.programs.filter(program => matchedExternalIds.has(program.channelId)).map(program => Object.assign(Object.assign({}, program), {
      channelId: channel.id
    }));
  }
  function nowAndNext(programs, now = Date.now()) {
    var currentIndex = programs.findIndex(program => program.start <= now && program.stop > now);
    if (currentIndex >= 0) {
      return {
        current: programs[currentIndex],
        next: programs[currentIndex + 1]
      };
    }
    return {
      next: programs.find(program => program.start > now)
    };
  }
  function maybeDecompress(_x, _x2) {
    return _maybeDecompress.apply(this, arguments);
  }
  function _maybeDecompress() {
    _maybeDecompress = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(response, url) {
      var decompressed;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            if (/\.gz(?:$|[?#])/i.test(url)) {
              _context.n = 1;
              break;
            }
            return _context.a(2, response.text());
          case 1:
            if (!(typeof DecompressionStream === 'undefined')) {
              _context.n = 2;
              break;
            }
            throw new Error('XMLTV.GZ не поддерживается этой платформой. Укажите несжатый XMLTV URL.');
          case 2:
            if (response.body) {
              _context.n = 3;
              break;
            }
            throw new Error('Пустой ответ XMLTV.GZ.');
          case 3:
            decompressed = response.body.pipeThrough(new DecompressionStream('gzip'));
            return _context.a(2, new Response(decompressed).text());
        }
      }, _callee);
    }));
    return _maybeDecompress.apply(this, arguments);
  }
  function loadXmltv(_x3, _x4) {
    return _loadXmltv.apply(this, arguments);
  }
  function _loadXmltv() {
    _loadXmltv = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(url, timeoutMs) {
      var cacheKey, inMemory, cached, content, controller, timeout, response, parsed;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            cacheKey = stableId('xmltv', url);
            inMemory = memory.get(cacheKey);
            if (!inMemory) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2, inMemory);
          case 1:
            _context2.n = 2;
            return cacheGet(cacheKey);
          case 2:
            cached = _context2.v;
            if (!cached) {
              _context2.n = 3;
              break;
            }
            memory.set(cacheKey, cached);
            return _context2.a(2, cached);
          case 3:
            if (!/\.gz(?:$|[?#])/i.test(url)) {
              _context2.n = 10;
              break;
            }
            controller = typeof AbortController !== 'undefined' ? new AbortController() : undefined;
            timeout = globalThis.setTimeout(() => controller === null || controller === void 0 ? void 0 : controller.abort(), timeoutMs);
            _context2.p = 4;
            _context2.n = 5;
            return fetch(url, {
              signal: controller === null || controller === void 0 ? void 0 : controller.signal,
              credentials: 'omit'
            });
          case 5:
            response = _context2.v;
            if (response.ok) {
              _context2.n = 6;
              break;
            }
            throw new Error(`XMLTV вернул HTTP ${response.status}.`);
          case 6:
            _context2.n = 7;
            return maybeDecompress(response, url);
          case 7:
            content = _context2.v;
          case 8:
            _context2.p = 8;
            globalThis.clearTimeout(timeout);
            return _context2.f(8);
          case 9:
            _context2.n = 12;
            break;
          case 10:
            _context2.n = 11;
            return fetchText(url, timeoutMs);
          case 11:
            content = _context2.v;
          case 12:
            parsed = parseXmltv(content);
            memory.set(cacheKey, parsed);
            _context2.n = 13;
            return cacheSet(cacheKey, parsed, 12 * 60 * 60 * 1000);
          case 13:
            return _context2.a(2, parsed);
        }
      }, _callee2, null, [[4,, 8, 9]]);
    }));
    return _loadXmltv.apply(this, arguments);
  }
  function clearEpgMemory() {
    memory.clear();
  }

  function createDiagnosticsComponent(runtime) {
    var Lampa = runtime.Lampa;
    return class DiagnosticsComponent {
      constructor() {
        this.root = element('div', 'lampa-iptv lampa-iptv-diagnostics');
        this.initialized = false;
      }
      create() {
        return this.render();
      }
      render() {
        return this.root;
      }
      start() {
        if (!this.initialized) {
          this.initialized = true;
          this.build();
        }
        activateContentController(Lampa, this.root, () => this.last, () => Lampa.Activity.backward());
      }
      pause() {}
      stop() {}
      destroy() {
        this.root.remove();
      }
      action(title, subtitle, callback) {
        var item = selector('lampa-iptv-action', title, subtitle);
        bindFocus(item, node => {
          this.last = node;
        });
        onEnter(item, callback);
        return item;
      }
      facts() {
        var _a, _b, _c, _d, _e, _f, _g;
        var channels = getRuntimeChannels(runtime.state);
        return [['Версия плагина', PLUGIN_INFO.version], ['Версия схемы', String(runtime.state.schemaVersion)], ['Версия Lampa', String((_b = (_a = Lampa === null || Lampa === void 0 ? void 0 : Lampa.Manifest) === null || _a === void 0 ? void 0 : _a.app_version) !== null && _b !== void 0 ? _b : 'не определена')], ['Lampa app_digital', String((_d = (_c = Lampa === null || Lampa === void 0 ? void 0 : Lampa.Manifest) === null || _c === void 0 ? void 0 : _c.app_digital) !== null && _d !== void 0 ? _d : 'не определён')], ['Платформа', String((_g = (_f = (_e = Lampa === null || Lampa === void 0 ? void 0 : Lampa.Storage) === null || _e === void 0 ? void 0 : _e.get) === null || _f === void 0 ? void 0 : _f.call(_e, 'platform', 'browser')) !== null && _g !== void 0 ? _g : 'browser')], ['User-Agent', navigator.userAgent], ['HLS в video', document.createElement('video').canPlayType('application/vnd.apple.mpegurl') || 'через hls.js/плеер'], ['MediaSource', typeof MediaSource !== 'undefined' ? 'да' : 'нет'], ['IndexedDB', typeof indexedDB !== 'undefined' ? 'да' : 'нет'], ['File API', typeof FileReader !== 'undefined' ? 'да' : 'нет'], ['DecompressionStream', typeof DecompressionStream !== 'undefined' ? 'да' : 'нет'], ['Каналов в реестре', String(channels.length)], ['Каналов с источниками', String(channels.filter(channel => channel.sources.length > 0).length)], ['Избранных', String(runtime.state.favorites.length)], ['EPG-сопоставлений', String(channels.filter(channel => {
          var _a;
          return (_a = runtime.state.channelOverrides[channel.id]) === null || _a === void 0 ? void 0 : _a.epgUrl;
        }).length)], ['Телеметрия', 'отсутствует']];
      }
      build() {
        var _a, _b;
        this.root.replaceChildren();
        var header = element('div', 'lampa-iptv__header');
        header.append(element('div', 'lampa-iptv__brand', 'Диагностика'), element('div', 'lampa-iptv__version', 'Приватные данные автоматически маскируются'));
        var facts = element('div', 'lampa-iptv-facts');
        var _iterator = _createForOfIteratorHelper(this.facts()),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _slicedToArray(_step.value, 2),
              name = _step$value[0],
              value = _step$value[1];
            var row = element('div', 'lampa-iptv-fact');
            row.append(element('div', 'lampa-iptv-fact__name', name), element('div', 'lampa-iptv-fact__value', value));
            facts.append(row);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        var actions = element('div', 'lampa-iptv-actions');
        actions.append(this.action('Проверить тестовый HLS', 'Легальный Mux test stream, не добавляется в каналы', () => this.checkTestStream()), this.action('Очистить EPG-кеш', 'Удалить только IndexedDB-кеш, не настройки', () => this.clearCache()), this.action('Экспорт диагностики', 'Без URL, логинов, токенов, cookies и паролей', () => this.exportDiagnostics()), this.action('Сбросить локальные данные', 'Удалить источники, EPG, PIN, избранное, историю и настройки', () => this.resetData()));
        var log = element('div', 'lampa-iptv-log');
        log.append(element('div', 'lampa-iptv-section__title', 'Последние события'));
        if (!runtime.state.recentErrors.length) {
          log.append(element('div', 'lampa-iptv-section__hint', 'Журнал пуст.'));
        } else {
          var _iterator2 = _createForOfIteratorHelper([...runtime.state.recentErrors].reverse().slice(0, 30)),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var entry = _step2.value;
              log.append(element('div', `lampa-iptv-log__entry ${entry.level}`, `${entry.at} · ${maskUrl(entry.message)}`));
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
        this.root.append(header, facts, actions, log);
        (_b = (_a = this.activity) === null || _a === void 0 ? void 0 : _a.loader) === null || _b === void 0 ? void 0 : _b.call(_a, false);
      }
      checkTestStream() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var source, result;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                source = {
                  id: 'mux-test',
                  type: 'hls',
                  url: TEST_HLS_URL,
                  priority: 1,
                  public: true,
                  official: false,
                  requiresAuthorization: false,
                  status: 'unknown'
                };
                notify$1(Lampa, 'Проверка тестового HLS…');
                _context.n = 1;
                return checkStream(source, runtime.state.preferences.connectionTimeoutMs);
              case 1:
                result = _context.v;
                notify$1(Lampa, `${statusLabel(result.status)}: ${result.detail}`);
                _this.start();
              case 2:
                return _context.a(2);
            }
          }, _callee);
        }))();
      }
      clearCache() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var confirmed;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                _context2.n = 1;
                return confirmAction(Lampa, 'Очистить кеш', 'Пользовательские URL, избранное и настройки останутся без изменений.');
              case 1:
                confirmed = _context2.v;
                if (confirmed) {
                  _context2.n = 2;
                  break;
                }
                return _context2.a(2, _this2.start());
              case 2:
                clearEpgMemory();
                _context2.n = 3;
                return cacheClear();
              case 3:
                notify$1(Lampa, 'EPG-кеш очищен.');
                _this2.start();
              case 4:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      }
      exportDiagnostics() {
        var payload = {
          format: 'lampa-iptv-diagnostics',
          createdAt: new Date().toISOString(),
          facts: Object.fromEntries(this.facts()),
          configuredChannels: getRuntimeChannels(runtime.state).filter(channel => channel.sources.length > 0).length,
          recentErrors: runtime.state.recentErrors.map(entry => Object.assign(Object.assign({}, entry), {
            message: maskUrl(entry.message).replace(/https?:\/\/\S+/gi, '[URL]')
          }))
        };
        downloadText('lampa-iptv-diagnostics.json', JSON.stringify(payload, null, 2));
        notify$1(Lampa, 'Диагностика экспортирована без приватных URL и учётных данных.');
        this.start();
      }
      resetData() {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var _a, _b, confirmed, _i, _Object$keys, key;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                _context3.n = 1;
                return confirmAction(Lampa, 'Полный локальный сброс', 'Будут удалены все пользовательские URL, Xtream-данные, EPG, PIN, избранное, история и настройки Lampa IPTV. Действие нельзя отменить без резервной копии.');
              case 1:
                confirmed = _context3.v;
                if (confirmed) {
                  _context3.n = 2;
                  break;
                }
                return _context3.a(2, _this3.start());
              case 2:
                clearEpgMemory();
                _context3.n = 3;
                return cacheClear();
              case 3:
                for (_i = 0, _Object$keys = Object.keys(runtime.state); _i < _Object$keys.length; _i++) {
                  key = _Object$keys[_i];
                  Reflect.deleteProperty(runtime.state, key);
                }
                Object.assign(runtime.state, createDefaultState());
                runtime.saveState();
                notify$1(Lampa, 'Локальные данные Lampa IPTV удалены.');
                (_b = (_a = Lampa.Activity) === null || _a === void 0 ? void 0 : _a.backward) === null || _b === void 0 ? void 0 : _b.call(_a);
              case 4:
                return _context3.a(2);
            }
          }, _callee3);
        }))();
      }
    };
  }

  var SESSION_MS = 15 * 60 * 1000;
  function isAdultUnlocked(state) {
    var _a;
    return state.adult.enabled === true && Boolean(state.adult.pinHash) && ((_a = state.adult.unlockedUntil) !== null && _a !== void 0 ? _a : 0) > Date.now();
  }
  function validPin(pin) {
    return /^\d{4,8}$/.test(pin);
  }
  function configureAdultPin(_x, _x2, _x3) {
    return _configureAdultPin.apply(this, arguments);
  }
  function _configureAdultPin() {
    _configureAdultPin = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(Lampa, state, save) {
      var pin, confirmation, salt;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return askText(Lampa, 'Придумайте PIN (4–8 цифр)', '', {
              password: true,
              numeric: true
            });
          case 1:
            pin = _context.v;
            if (validPin(pin)) {
              _context.n = 2;
              break;
            }
            notify$1(Lampa, 'PIN должен содержать от 4 до 8 цифр.');
            return _context.a(2, false);
          case 2:
            _context.n = 3;
            return askText(Lampa, 'Повторите PIN', '', {
              password: true,
              numeric: true
            });
          case 3:
            confirmation = _context.v;
            if (!(pin !== confirmation)) {
              _context.n = 4;
              break;
            }
            notify$1(Lampa, 'PIN-коды не совпадают.');
            return _context.a(2, false);
          case 4:
            salt = createSalt();
            state.adult.pinSalt = salt;
            _context.n = 5;
            return hashPin(pin, salt);
          case 5:
            state.adult.pinHash = _context.v;
            state.adult.enabled = true;
            state.adult.unlockedUntil = Date.now() + SESSION_MS;
            save();
            notify$1(Lampa, 'Раздел 18+ включён и защищён PIN-кодом.');
            return _context.a(2, true);
        }
      }, _callee);
    }));
    return _configureAdultPin.apply(this, arguments);
  }
  function unlockAdult(_x4, _x5, _x6) {
    return _unlockAdult.apply(this, arguments);
  }
  function _unlockAdult() {
    _unlockAdult = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(Lampa, state, save) {
      var pin, digest;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            if (!(!state.adult.pinHash || !state.adult.pinSalt)) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2, configureAdultPin(Lampa, state, save));
          case 1:
            if (!isAdultUnlocked(state)) {
              _context2.n = 2;
              break;
            }
            return _context2.a(2, true);
          case 2:
            _context2.n = 3;
            return askText(Lampa, 'Введите PIN раздела 18+', '', {
              password: true,
              numeric: true
            });
          case 3:
            pin = _context2.v;
            if (pin) {
              _context2.n = 4;
              break;
            }
            return _context2.a(2, false);
          case 4:
            _context2.n = 5;
            return hashPin(pin, state.adult.pinSalt);
          case 5:
            digest = _context2.v;
            if (!(digest !== state.adult.pinHash)) {
              _context2.n = 6;
              break;
            }
            notify$1(Lampa, 'Неверный PIN-код.');
            return _context2.a(2, false);
          case 6:
            state.adult.unlockedUntil = Date.now() + SESSION_MS;
            save();
            return _context2.a(2, true);
        }
      }, _callee2);
    }));
    return _unlockAdult.apply(this, arguments);
  }

  function notify(Lampa, message) {
    var _a, _b;
    if ((_a = Lampa === null || Lampa === void 0 ? void 0 : Lampa.Noty) === null || _a === void 0 ? void 0 : _a.show) Lampa.Noty.show(message);else (_b = globalThis.alert) === null || _b === void 0 ? void 0 : _b.call(globalThis, message);
  }
  function playChannel(_x, _x2, _x3, _x4, _x5) {
    return _playChannel.apply(this, arguments);
  }
  function _playChannel() {
    _playChannel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(Lampa, state, channel, allChannels, save) {
      var _a, _b, _c, _d, _e, _f, _g, sources, playable, health, first, fallbackIndex, playData, configured, _configured, playlist;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            sources = getChannelSources(state, channel.id);
            if (sources.length) {
              _context.n = 1;
              break;
            }
            notify(Lampa, 'Источник не подключён. Откройте настройки канала и добавьте ссылку.');
            return _context.a(2, false);
          case 1:
            playable = sources.filter(source => source.enabled !== false && source.status !== 'offline');
            if (playable.length) {
              _context.n = 2;
              break;
            }
            notify(Lampa, 'Все настроенные источники помечены как недоступные.');
            return _context.a(2, false);
          case 2:
            if (!state.preferences.checkBeforePlay) {
              _context.n = 4;
              break;
            }
            _context.n = 3;
            return checkStream(playable[0], state.preferences.connectionTimeoutMs);
          case 3:
            health = _context.v;
            applyHealthResult(playable[0], health);
            save();
            if (!(health.status === 'offline' && playable.length === 1)) {
              _context.n = 4;
              break;
            }
            notify(Lampa, health.detail);
            return _context.a(2, false);
          case 4:
            first = playable[0];
            fallbackIndex = 1;
            playData = {
              title: channel.name,
              url: first.url,
              tv: true,
              iptv: true,
              channel: channel.name,
              logo: channel.logo,
              need_check_live_stream: true
            };
            if (state.preferences.autoFallback && playable[1]) {
              playData.url_reserve = playable[1].url;
              fallbackIndex = 2;
              playData.error = (_work, useReserve) => {
                var next = playable[fallbackIndex];
                if (next) {
                  fallbackIndex += 1;
                  notify(Lampa, `Переключение на резервный источник №${fallbackIndex}.`);
                  useReserve(next.url);
                } else {
                  notify(Lampa, 'Не удалось запустить ни один источник канала.');
                }
              };
            }
            if (first.externalPlayer && ((_a = Lampa === null || Lampa === void 0 ? void 0 : Lampa.Player) === null || _a === void 0 ? void 0 : _a.runas)) {
              configured = (_c = (_b = Lampa === null || Lampa === void 0 ? void 0 : Lampa.Storage) === null || _b === void 0 ? void 0 : _b.field) === null || _c === void 0 ? void 0 : _c.call(_b, 'player_iptv');
              if (configured) Lampa.Player.runas(configured);else notify(Lampa, 'В Lampa не выбран внешний IPTV-плеер; используется доступный плеер.');
            } else if ((_d = Lampa === null || Lampa === void 0 ? void 0 : Lampa.Player) === null || _d === void 0 ? void 0 : _d.runas) {
              _configured = (_f = (_e = Lampa === null || Lampa === void 0 ? void 0 : Lampa.Storage) === null || _e === void 0 ? void 0 : _e.field) === null || _f === void 0 ? void 0 : _f.call(_e, 'player_iptv');
              if (_configured) Lampa.Player.runas(_configured);
            }
            playlist = allChannels.filter(item => !item.adult && getChannelSources(state, item.id).length > 0).map(item => ({
              title: item.name,
              url: getChannelSources(state, item.id)[0].url,
              tv: true,
              iptv: true
            }));
            addHistory(state, channel.id);
            save();
            if (!((_g = Lampa === null || Lampa === void 0 ? void 0 : Lampa.Player) === null || _g === void 0 ? void 0 : _g.play)) {
              _context.n = 5;
              break;
            }
            Lampa.Player.play(playData);
            if (Lampa.Player.playlist) Lampa.Player.playlist(playlist);
            return _context.a(2, true);
          case 5:
            notify(Lampa, 'API плеера Lampa недоступен в этой версии.');
            return _context.a(2, false);
        }
      }, _callee);
    }));
    return _playChannel.apply(this, arguments);
  }

  var NAVIGATION = [{
    id: 'favorites',
    title: 'Избранное'
  }, {
    id: 'history',
    title: 'Последние'
  }, {
    id: 'main',
    title: 'Основные'
  }, {
    id: 'cinema',
    title: 'Кино и развлечения'
  }, {
    id: 'hobby',
    title: 'Хобби'
  }, {
    id: 'adult',
    title: '18+'
  }, {
    id: 'all',
    title: 'Все каналы'
  }, {
    id: 'epg',
    title: 'Программа передач'
  }, {
    id: 'search',
    title: 'Поиск'
  }, {
    id: 'sources',
    title: 'Источники'
  }, {
    id: 'diagnostics',
    title: 'Диагностика'
  }];
  function formatTime(timestamp) {
    return new Intl.DateTimeFormat('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(timestamp));
  }
  function createMainComponent(runtime) {
    var Lampa = runtime.Lampa;
    return class MainComponent {
      constructor(params = {}) {
        var _a;
        this.root = element('div', 'lampa-iptv');
        this.content = element('div', 'lampa-iptv__content');
        this.initialized = false;
        this.searchQuery = '';
        this.save = () => {
          runtime.saveState();
        };
        this.section = (_a = params.section) !== null && _a !== void 0 ? _a : 'main';
      }
      create() {
        return this.render();
      }
      render() {
        return this.root;
      }
      start() {
        var _a, _b;
        if (!this.initialized) {
          this.initialized = true;
          this.build();
        }
        (_b = (_a = Lampa.Background) === null || _a === void 0 ? void 0 : _a.immediately) === null || _b === void 0 ? void 0 : _b.call(_a, 'data:image/png;base64,');
        activateContentController(Lampa, this.root, () => this.last, () => Lampa.Activity.backward());
      }
      pause() {}
      stop() {}
      destroy() {
        this.root.remove();
      }
      push(component, params = {}) {
        Lampa.Activity.push(Object.assign({
          component,
          title: 'Lampa IPTV',
          page: 1
        }, params));
      }
      build() {
        var _this = this;
        var _a, _b;
        this.root.replaceChildren();
        var header = element('div', 'lampa-iptv__header');
        header.append(element('div', 'lampa-iptv__brand', 'Lampa IPTV'), element('div', 'lampa-iptv__version', '28 фиксированных каналов'));
        var layout = element('div', 'lampa-iptv__layout');
        var navigation = element('div', 'lampa-iptv__navigation');
        var _iterator = _createForOfIteratorHelper(NAVIGATION),
          _step;
        try {
          var _loop = function _loop() {
            var item = _step.value;
            var button = selector('lampa-iptv-nav', item.title);
            if (item.id === _this.section) button.classList.add('active');
            bindFocus(button, node => {
              _this.last = node;
            });
            onEnter(button, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
              var access, _t;
              return _regenerator().w(function (_context) {
                while (1) switch (_context.n) {
                  case 0:
                    if (!(item.id === 'sources')) {
                      _context.n = 1;
                      break;
                    }
                    _this.push('lampa_iptv_sources');
                    return _context.a(2);
                  case 1:
                    if (!(item.id === 'diagnostics')) {
                      _context.n = 2;
                      break;
                    }
                    _this.push('lampa_iptv_diagnostics');
                    return _context.a(2);
                  case 2:
                    if (!(item.id === 'search')) {
                      _context.n = 4;
                      break;
                    }
                    _context.n = 3;
                    return askText(Lampa, 'Поиск по утверждённым каналам', _this.searchQuery);
                  case 3:
                    _this.searchQuery = _context.v;
                    _this.section = 'all';
                    _context.n = 11;
                    break;
                  case 4:
                    if (!(item.id === 'adult')) {
                      _context.n = 10;
                      break;
                    }
                    if (!runtime.state.adult.enabled) {
                      _context.n = 6;
                      break;
                    }
                    _context.n = 5;
                    return unlockAdult(Lampa, runtime.state, _this.save);
                  case 5:
                    _t = _context.v;
                    _context.n = 8;
                    break;
                  case 6:
                    _context.n = 7;
                    return configureAdultPin(Lampa, runtime.state, _this.save);
                  case 7:
                    _t = _context.v;
                  case 8:
                    access = _t;
                    if (access) {
                      _context.n = 9;
                      break;
                    }
                    _this.start();
                    return _context.a(2);
                  case 9:
                    _this.section = 'adult';
                    _context.n = 11;
                    break;
                  case 10:
                    _this.section = item.id;
                  case 11:
                    _this.build();
                    _this.start();
                  case 12:
                    return _context.a(2);
                }
              }, _callee);
            })));
            navigation.append(button);
          };
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        layout.append(navigation, this.content);
        this.root.append(header, layout);
        this.renderSection();
        (_b = (_a = this.activity) === null || _a === void 0 ? void 0 : _a.loader) === null || _b === void 0 ? void 0 : _b.call(_a, false);
      }
      channelsForSection() {
        var channels = getRuntimeChannels(runtime.state);
        var adultUnlocked = isAdultUnlocked(runtime.state);
        var filtered = channels.filter(channel => !channel.hidden);
        if (!adultUnlocked || this.section !== 'adult') filtered = filtered.filter(channel => !channel.adult);
        if (this.searchQuery) {
          var query = this.searchQuery.toLocaleLowerCase('ru-RU');
          filtered = filtered.filter(channel => [channel.name, ...channel.epgAliases].some(name => name.toLocaleLowerCase('ru-RU').includes(query)));
        }
        switch (this.section) {
          case 'favorites':
            return filtered.filter(channel => channel.favorite);
          case 'history':
            {
              var positions = new Map([...runtime.state.history].reverse().map((entry, index) => [entry.channelId, index]));
              return filtered.filter(channel => positions.has(channel.id) && !channel.adult).sort((left, right) => positions.get(left.id) - positions.get(right.id));
            }
          case 'main':
            return filtered.filter(channel => channel.effectiveCategory === 'Основные');
          case 'cinema':
            return filtered.filter(channel => channel.effectiveCategory === 'Кино и развлечения');
          case 'hobby':
            return filtered.filter(channel => channel.effectiveCategory === 'Хобби');
          case 'adult':
            return adultUnlocked ? channels.filter(channel => channel.adult && !channel.hidden) : [];
          default:
            return filtered;
        }
      }
      renderSection() {
        var _this2 = this;
        var _a, _b;
        this.content.replaceChildren();
        var title = (_b = (_a = NAVIGATION.find(item => item.id === this.section)) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : 'Каналы';
        var sectionHeader = element('div', 'lampa-iptv-section__header');
        sectionHeader.append(element('div', 'lampa-iptv-section__title', title));
        if (this.searchQuery) {
          sectionHeader.append(element('div', 'lampa-iptv-section__hint', `Поиск: ${this.searchQuery}`));
        }
        this.content.append(sectionHeader);
        if (this.section === 'epg') {
          this.renderEpgOverview();
          return;
        }
        var channels = this.channelsForSection();
        if (!channels.length) {
          var empty = selector('lampa-iptv-empty', this.section === 'adult' ? 'Раздел заблокирован' : 'Здесь пока нет каналов', this.section === 'favorites' ? 'Добавляйте каналы в избранное через долгое нажатие.' : 'Проверьте фильтр или настройки.');
          bindFocus(empty, node => {
            this.last = node;
          });
          if (this.section === 'adult') {
            onEnter(empty, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
              return _regenerator().w(function (_context2) {
                while (1) switch (_context2.n) {
                  case 0:
                    _context2.n = 1;
                    return unlockAdult(Lampa, runtime.state, _this2.save);
                  case 1:
                    if (!_context2.v) {
                      _context2.n = 2;
                      break;
                    }
                    _this2.build();
                    _this2.start();
                  case 2:
                    return _context2.a(2);
                }
              }, _callee2);
            })));
          }
          this.content.append(empty);
          return;
        }
        var list = element('div', runtime.state.preferences.view === 'list' ? 'lampa-iptv-channels list' : 'lampa-iptv-channels grid');
        var _iterator2 = _createForOfIteratorHelper(channels),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var channel = _step2.value;
            list.append(this.channelCard(channel, channels));
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        this.content.append(list);
      }
      channelCard(channel, playlist) {
        var _this3 = this;
        var _a;
        var sources = getChannelSources(runtime.state, channel.id);
        var primary = sources[0];
        var card = element('div', 'lampa-iptv-channel selector');
        card.tabIndex = 0;
        card.dataset.channelId = channel.id;
        var logo = element('div', 'lampa-iptv-channel__logo');
        logo.textContent = channel.logo ? '' : channel.name.slice(0, 2).toLocaleUpperCase('ru-RU');
        if (channel.logo) {
          var image = element('img');
          image.loading = 'lazy';
          image.alt = '';
          image.src = channel.logo;
          image.addEventListener('error', () => image.remove(), {
            once: true
          });
          logo.append(image);
        }
        var body = element('div', 'lampa-iptv-channel__body');
        var name = element('div', 'lampa-iptv-channel__name');
        if (runtime.state.preferences.showNumbers) {
          name.append(element('span', 'lampa-iptv-channel__number', `${channel.effectiveNumber}`));
        }
        name.append(document.createTextNode(channel.name));
        body.append(name, element('div', 'lampa-iptv-channel__category', channel.effectiveCategory));
        if (runtime.state.preferences.showStatuses) {
          var status = (_a = primary === null || primary === void 0 ? void 0 : primary.status) !== null && _a !== void 0 ? _a : 'not_configured';
          body.append(element('div', `lampa-iptv-channel__status status-${status}`, statusLabel(status)));
        }
        if (channel.favorite) card.append(element('div', 'lampa-iptv-channel__favorite', '★'));
        card.append(logo, body);
        bindFocus(card, node => {
          this.last = node;
        });
        onEnter(card, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                if (sources.length) {
                  _context3.n = 1;
                  break;
                }
                _this3.push('lampa_iptv_channel', {
                  channelId: channel.id
                });
                return _context3.a(2);
              case 1:
                _context3.n = 2;
                return playChannel(Lampa, runtime.state, channel, playlist, _this3.save);
              case 2:
                return _context3.a(2);
            }
          }, _callee3);
        })));
        onLong(card, () => this.openContext(channel));
        return card;
      }
      openContext(channel) {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          var selection;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                _context4.n = 1;
                return choose(Lampa, channel.name, [{
                  title: 'Смотреть',
                  action: 'play'
                }, {
                  title: channel.favorite ? 'Удалить из избранного' : 'Добавить в избранное',
                  action: 'favorite'
                }, {
                  title: 'Настроить источники',
                  action: 'sources'
                }, {
                  title: 'Проверить основной источник',
                  action: 'health'
                }, {
                  title: 'Показать программу',
                  action: 'epg'
                }, {
                  title: channel.hidden ? 'Показать канал' : 'Скрыть канал',
                  action: 'hidden'
                }], () => _this4.start());
              case 1:
                selection = _context4.v;
                if (selection) {
                  _context4.n = 2;
                  break;
                }
                return _context4.a(2);
              case 2:
                if (!(selection.action === 'play')) {
                  _context4.n = 3;
                  break;
                }
                _context4.n = 3;
                return playChannel(Lampa, runtime.state, channel, _this4.channelsForSection(), _this4.save);
              case 3:
                if (selection.action === 'favorite') {
                  toggleFavorite(runtime.state, channel.id);
                  _this4.save();
                  _this4.build();
                }
                if (selection.action === 'sources') _this4.push('lampa_iptv_channel', {
                  channelId: channel.id
                });
                if (selection.action === 'hidden') {
                  updateOverride(runtime.state, channel.id, {
                    hidden: !channel.hidden
                  });
                  _this4.save();
                  _this4.build();
                }
                if (!(selection.action === 'health')) {
                  _context4.n = 4;
                  break;
                }
                _context4.n = 4;
                return _this4.checkPrimary(channel);
              case 4:
                if (!(selection.action === 'epg')) {
                  _context4.n = 5;
                  break;
                }
                _context4.n = 5;
                return _this4.showProgram(channel);
              case 5:
                _this4.start();
              case 6:
                return _context4.a(2);
            }
          }, _callee4);
        }))();
      }
      checkPrimary(channel) {
        var _this5 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
          var source, result;
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.n) {
              case 0:
                source = getChannelSources(runtime.state, channel.id)[0];
                if (source) {
                  _context5.n = 1;
                  break;
                }
                notify$1(Lampa, 'Источник не подключён.');
                return _context5.a(2);
              case 1:
                notify$1(Lampa, 'Проверка источника…');
                _context5.n = 2;
                return checkStream(source, runtime.state.preferences.connectionTimeoutMs);
              case 2:
                result = _context5.v;
                applyHealthResult(source, result);
                runtime.state.recentErrors = addDiagnostic(runtime.state.recentErrors, result.status === 'online' || result.status === 'slow' ? 'info' : 'warning', `${channel.name}: ${result.detail}`);
                _this5.save();
                notify$1(Lampa, `${statusLabel(result.status)}: ${result.detail}`);
                _this5.build();
              case 3:
                return _context5.a(2);
            }
          }, _callee5);
        }))();
      }
      showProgram(channel) {
        var _this6 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
          var _a, _b, _c, epgUrl, xmltv, programs, pair, body, progress, fill, _iterator3, _step3, program, _t2;
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.p = _context6.n) {
              case 0:
                epgUrl = (_a = runtime.state.channelOverrides[channel.id]) === null || _a === void 0 ? void 0 : _a.epgUrl;
                if (epgUrl) {
                  _context6.n = 1;
                  break;
                }
                notify$1(Lampa, 'Для канала не задан XMLTV URL.');
                _this6.push('lampa_iptv_channel', {
                  channelId: channel.id
                });
                return _context6.a(2);
              case 1:
                _context6.p = 1;
                notify$1(Lampa, 'Загрузка программы…');
                _context6.n = 2;
                return loadXmltv(epgUrl, runtime.state.preferences.connectionTimeoutMs);
              case 2:
                xmltv = _context6.v;
                programs = matchEpgPrograms(xmltv, channel, runtime.state);
                pair = nowAndNext(programs);
                body = element('div', 'lampa-iptv-program');
                if (pair.current) {
                  body.append(element('div', 'lampa-iptv-program__current', `Сейчас: ${formatTime(pair.current.start)}–${formatTime(pair.current.stop)} ${pair.current.title}`));
                  progress = element('div', 'lampa-iptv-program__progress');
                  fill = element('div');
                  fill.style.width = `${programProgress(pair.current)}%`;
                  progress.append(fill);
                  body.append(progress);
                }
                if (pair.next) {
                  body.append(element('div', 'lampa-iptv-program__next', `Далее: ${formatTime(pair.next.start)} ${pair.next.title}`));
                }
                _iterator3 = _createForOfIteratorHelper(programs.filter(item => item.stop > Date.now()).slice(0, 20));
                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    program = _step3.value;
                    body.append(element('div', 'lampa-iptv-program__item', `${formatTime(program.start)}–${formatTime(program.stop)}  ${program.title}`));
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }
                if (!programs.length) body.append(element('div', '', 'Совпадающих программ не найдено.'));
                (_c = (_b = Lampa.Modal) === null || _b === void 0 ? void 0 : _b.open) === null || _c === void 0 ? void 0 : _c.call(_b, {
                  title: channel.name,
                  html: body,
                  size: 'large'
                });
                _context6.n = 4;
                break;
              case 3:
                _context6.p = 3;
                _t2 = _context6.v;
                notify$1(Lampa, _t2.message);
              case 4:
                return _context6.a(2);
            }
          }, _callee6, null, [[1, 3]]);
        }))();
      }
      renderEpgOverview() {
        var _this7 = this;
        var channels = getRuntimeChannels(runtime.state).filter(channel => {
          var _a;
          return !channel.adult && !channel.hidden && Boolean((_a = runtime.state.channelOverrides[channel.id]) === null || _a === void 0 ? void 0 : _a.epgUrl);
        });
        if (!channels.length) {
          var empty = selector('lampa-iptv-empty', 'EPG пока не подключена', 'Укажите XMLTV URL и channel ID в настройках нужного канала. Телеканалы работают и без EPG.');
          onEnter(empty, () => this.push('lampa_iptv_sources'));
          bindFocus(empty, node => {
            this.last = node;
          });
          this.content.append(empty);
          return;
        }
        var list = element('div', 'lampa-iptv-epg-list');
        var _iterator4 = _createForOfIteratorHelper(channels),
          _step4;
        try {
          var _loop2 = function _loop2() {
            var channel = _step4.value;
            var item = selector('lampa-iptv-field', channel.name, 'Нажмите, чтобы загрузить текущую и следующую передачу');
            bindFocus(item, node => {
              _this7.last = node;
            });
            onEnter(item, () => _this7.showProgram(channel));
            list.append(item);
          };
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            _loop2();
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
        this.content.append(list);
      }
    };
  }

  var ICON = `<svg viewBox="0 0 48 48" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="5" y="11" width="38" height="27" rx="4" stroke="currentColor" stroke-width="3"/>
  <path d="M16 5l6 6m10-6l-6 6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  <path d="M15 43h18" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
</svg>`;
  function registerSettings(runtime, updateMenu) {
    var _a, _b;
    var Lampa = runtime.Lampa;
    if (!((_a = Lampa === null || Lampa === void 0 ? void 0 : Lampa.SettingsApi) === null || _a === void 0 ? void 0 : _a.addComponent) || !((_b = Lampa === null || Lampa === void 0 ? void 0 : Lampa.SettingsApi) === null || _b === void 0 ? void 0 : _b.addParam)) return () => {};
    var component = 'lampa_iptv';
    Lampa.SettingsApi.addComponent({
      component,
      icon: ICON,
      name: 'Lampa IPTV'
    });
    var button = (name, description, target) => {
      Lampa.SettingsApi.addParam({
        component,
        param: {
          type: 'button'
        },
        field: {
          name,
          description
        },
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
    button('Каналы и источники', 'M3U, Xtream, резервные URL, EPG и настройки каждого канала', 'lampa_iptv_sources');
    button('Диагностика', 'Возможности устройства, тест HLS и безопасный журнал', 'lampa_iptv_diagnostics');
    Lampa.SettingsApi.addParam({
      component,
      param: {
        type: 'title'
      },
      field: {
        name: 'Общие'
      }
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
      onChange: value => {
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
      onChange: value => {
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
      onChange: value => {
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
      onChange: value => {
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
      onChange: value => {
        runtime.state.preferences.connectionTimeoutMs = Number(value) || 12000;
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
      onChange: value => {
        runtime.state.preferences.lowPowerMode = value === 'true';
        document.body.classList.toggle('lampa-iptv-low-power', value === 'true');
        runtime.saveState();
      }
    });
    return () => {
      var _a, _b, _c, _d;
      (_b = (_a = Lampa.SettingsApi).removeComponent) === null || _b === void 0 ? void 0 : _b.call(_a, component);
      (_d = (_c = Lampa.SettingsApi).removeParams) === null || _d === void 0 ? void 0 : _d.call(_c, component);
    };
  }

  function sourceWithoutSecrets(source) {
    var secretUrl = /(?:[?&](?:token|key|auth|password|user|login)=|\/\/[^/]+@)/i.test(source.url);
    return Object.assign(Object.assign({}, source), {
      url: secretUrl ? '' : source.url,
      headers: source.headers ? {
        userAgent: source.headers.userAgent,
        origin: source.headers.origin
      } : undefined,
      requiresAuthorization: source.requiresAuthorization || secretUrl,
      status: secretUrl ? 'auth_required' : source.status
    });
  }
  function createBackup(state, includeSecrets = false) {
    var _a;
    var copy = structuredCloneSafe(state);
    if (!includeSecrets) {
      copy.xtreamAccounts = [];
      for (var _i = 0, _Object$values = Object.values(copy.channelOverrides); _i < _Object$values.length; _i++) {
        var override = _Object$values[_i];
        override.sources = (_a = override.sources) === null || _a === void 0 ? void 0 : _a.map(sourceWithoutSecrets);
      }
    }
    copy.recentErrors = [];
    return {
      format: 'lampa-iptv-backup',
      version: 1,
      createdAt: new Date().toISOString(),
      pluginVersion: PLUGIN_INFO.version,
      includesSecrets: includeSecrets,
      data: copy
    };
  }
  function structuredCloneSafe(value) {
    if (typeof globalThis.structuredClone === 'function') return globalThis.structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  }
  function parseBackup(content) {
    if (content.length > 5 * 1024 * 1024) throw new Error('Файл резервной копии слишком большой.');
    var parsed;
    try {
      parsed = JSON.parse(content);
    } catch (_a) {
      throw new Error('Резервная копия не является корректным JSON.');
    }
    if (!parsed || typeof parsed !== 'object') throw new Error('Некорректная структура резервной копии.');
    var envelope = parsed;
    if (envelope.format !== 'lampa-iptv-backup' || envelope.version !== 1 || !envelope.data) {
      throw new Error('Формат резервной копии не поддерживается.');
    }
    var state = migrateState(envelope.data);
    var configured = Object.entries(state.channelOverrides).filter(([channelId, override]) => {
      var _a;
      return CHANNEL_IDS.has(channelId) && Boolean((_a = override.sources) === null || _a === void 0 ? void 0 : _a.length);
    }).length;
    return {
      state,
      includesSecrets: envelope.includesSecrets === true,
      report: [`Настроено каналов: ${configured}`, `Избранных каналов: ${state.favorites.length}`, `Записей истории: ${state.history.length}`, `Учётных записей Xtream: ${state.xtreamAccounts.length}`, `Секреты: ${envelope.includesSecrets ? 'присутствуют' : 'не включены'}`]
    };
  }

  function reportText(report) {
    return [`Обработано: ${report.parsed}`, `Добавлено источников: ${report.matched}`, `Игнорировано посторонних/неопознанных: ${report.ignored}`, `Дубли URL: ${report.duplicateUrls}`, ...report.warnings.map(warning => `Предупреждение: ${warning}`)].join('\n');
  }
  function createSourcesComponent(runtime) {
    var Lampa = runtime.Lampa;
    return class SourcesComponent {
      constructor() {
        this.root = element('div', 'lampa-iptv lampa-iptv-sources');
        this.initialized = false;
        this.save = () => {
          runtime.saveState();
        };
      }
      create() {
        return this.render();
      }
      render() {
        return this.root;
      }
      start() {
        if (!this.initialized) {
          this.initialized = true;
          this.build();
        }
        activateContentController(Lampa, this.root, () => this.last, () => Lampa.Activity.backward());
      }
      pause() {}
      stop() {}
      destroy() {
        this.root.remove();
      }
      rebuild() {
        this.build();
        this.start();
      }
      action(title, subtitle, callback) {
        var button = selector('lampa-iptv-action', title, subtitle);
        bindFocus(button, node => {
          this.last = node;
        });
        onEnter(button, callback);
        return button;
      }
      build() {
        var _this = this;
        var _a, _b;
        this.root.replaceChildren();
        var header = element('div', 'lampa-iptv__header');
        header.append(element('div', 'lampa-iptv__brand', 'Источники и каналы'), element('div', 'lampa-iptv__version', 'Импортируются только совпадения с утверждёнными 28 каналами'));
        var actions = element('div', 'lampa-iptv-actions');
        actions.append(this.action(DIESEL_CLIENT.name, runtime.state.preferences.dieselClientEnabled ? 'Сторонний клиент включён' : 'Подключить полный сторонний IPTV-клиент', () => this.dieselClient()), this.action('Удалённый M3U', 'Загрузить плейлист по URL', () => this.remoteM3u()), this.action('Вставить M3U', 'Вставить полный текст или одну запись', () => this.pasteM3u()), this.action('Импорт файла', 'Выбрать .m3u или .m3u8 через File API', () => this.fileM3u()), this.action('Xtream Codes', 'Подключить легальную подписку пользователя', () => this.xtream()), this.action('Последний отчёт', 'Совпадения и проигнорированные записи', () => this.showReport()), this.action('Ручное сопоставление', 'Сохранить правило для следующего импорта', () => this.manualMapping()), this.action('Экспорт', 'Резервная копия без секретов по умолчанию', () => this.exportBackup()), this.action('Импорт копии', 'Восстановить файл lampa-iptv-backup', () => this.importBackup()));
        var title = element('div', 'lampa-iptv-section__title', 'Настройки каждого канала');
        var list = element('div', 'lampa-iptv-channel-settings');
        var adultUnlocked = isAdultUnlocked(runtime.state);
        var _iterator = _createForOfIteratorHelper(CHANNELS),
          _step;
        try {
          var _loop = function _loop() {
            var channel = _step.value;
            if (channel.adult && !adultUnlocked) return 1; // continue
            var sources = getChannelSources(runtime.state, channel.id);
            var primary = sources[0];
            var item = selector('lampa-iptv-source-card', `${channel.number}. ${channel.name}`, sources.length ? `${sources.length} источник(а) · ${statusLabel(primary === null || primary === void 0 ? void 0 : primary.status)}` : 'Источник не подключён');
            if (channel.adult) item.classList.add('adult');
            bindFocus(item, node => {
              _this.last = node;
            });
            onEnter(item, () => {
              Lampa.Activity.push({
                component: 'lampa_iptv_channel',
                title: channel.name,
                channelId: channel.id,
                page: 1
              });
            });
            list.append(item);
          };
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            if (_loop()) continue;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        if (!adultUnlocked) {
          var locked = selector('lampa-iptv-source-card', 'Раздел 18+ заблокирован', '13 каналов скрыты. Нажмите, чтобы установить или ввести локальный PIN.');
          locked.classList.add('adult');
          bindFocus(locked, node => {
            this.last = node;
          });
          onEnter(locked, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  _context.n = 1;
                  return unlockAdult(Lampa, runtime.state, _this.save);
                case 1:
                  if (!_context.v) {
                    _context.n = 2;
                    break;
                  }
                  _this.rebuild();
                  _context.n = 3;
                  break;
                case 2:
                  _this.start();
                case 3:
                  return _context.a(2);
              }
            }, _callee);
          })));
          list.append(locked);
        }
        this.root.append(header, actions, title, list);
        (_b = (_a = this.activity) === null || _a === void 0 ? void 0 : _a.loader) === null || _b === void 0 ? void 0 : _b.call(_a, false);
      }
      dieselClient() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var disable, accepted, _t;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                if (!runtime.state.preferences.dieselClientEnabled) {
                  _context2.n = 3;
                  break;
                }
                _context2.n = 1;
                return confirmAction(Lampa, `Отключить ${DIESEL_CLIENT.name}`, 'Автозагрузка стороннего клиента будет отключена. Уже запущенный клиент останется в памяти до полного перезапуска Lampa.');
              case 1:
                disable = _context2.v;
                if (disable) {
                  _context2.n = 2;
                  break;
                }
                return _context2.a(2, _this2.start());
              case 2:
                runtime.state.preferences.dieselClientEnabled = false;
                _this2.save();
                notify$1(Lampa, 'Автозагрузка отключена. Полностью перезапустите Lampa.');
                _this2.rebuild();
                return _context2.a(2);
              case 3:
                _context2.n = 4;
                return confirmAction(Lampa, `Подключить ${DIESEL_CLIENT.name}`, 'Будет загружен полный официальный сторонний клиент с домена автора. Он выполняется с теми же правами, что и другие плагины Lampa, использует собственные настройки, внешние сервисы и может обрабатывать данные аккаунта Lampa. Подключайте только разрешённые вам IPTV-подписки.');
              case 4:
                accepted = _context2.v;
                if (accepted) {
                  _context2.n = 5;
                  break;
                }
                return _context2.a(2, _this2.start());
              case 5:
                runtime.state.preferences.dieselClientEnabled = true;
                _this2.save();
                notify$1(Lampa, `Загрузка ${DIESEL_CLIENT.name}…`);
                _context2.p = 6;
                _context2.n = 7;
                return loadDieselClient(Lampa);
              case 7:
                notify$1(Lampa, isDieselClientLoaded() ? `${DIESEL_CLIENT.name} подключён. Его пункт появится в главном меню; при необходимости перезапустите Lampa.` : `${DIESEL_CLIENT.name} загружен. Перезапустите Lampa.`);
                _this2.rebuild();
                _context2.n = 9;
                break;
              case 8:
                _context2.p = 8;
                _t = _context2.v;
                runtime.state.preferences.dieselClientEnabled = false;
                _this2.save();
                notify$1(Lampa, _t.message);
                _this2.rebuild();
              case 9:
                return _context2.a(2);
            }
          }, _callee2, null, [[6, 8]]);
        }))();
      }
      remoteM3u() {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var url, name, report, _t2, _t3;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.p = _context3.n) {
              case 0:
                _context3.n = 1;
                return askText(Lampa, 'URL M3U/M3U8-плейлиста');
              case 1:
                url = _context3.v;
                if (url) {
                  _context3.n = 2;
                  break;
                }
                return _context3.a(2, _this3.start());
              case 2:
                _context3.n = 3;
                return askText(Lampa, 'Название источника', 'Удалённый M3U');
              case 3:
                _t2 = _context3.v;
                if (_t2) {
                  _context3.n = 4;
                  break;
                }
                _t2 = 'Удалённый M3U';
              case 4:
                name = _t2;
                _context3.p = 5;
                notify$1(Lampa, 'Загрузка плейлиста…');
                _context3.n = 6;
                return importRemoteM3u(runtime.state, url, name, runtime.state.preferences.connectionTimeoutMs);
              case 6:
                report = _context3.v;
                _this3.save();
                notify$1(Lampa, reportText(report));
                _this3.rebuild();
                _context3.n = 8;
                break;
              case 7:
                _context3.p = 7;
                _t3 = _context3.v;
                notify$1(Lampa, _t3.message);
                _this3.start();
              case 8:
                return _context3.a(2);
            }
          }, _callee3, null, [[5, 7]]);
        }))();
      }
      pasteM3u() {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          var content, normalized, report;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                _context4.n = 1;
                return askMultiline(Lampa, 'Вставка M3U');
              case 1:
                content = _context4.v;
                if (content) {
                  _context4.n = 2;
                  break;
                }
                return _context4.a(2, _this4.start());
              case 2:
                try {
                  normalized = content.includes('#EXTM3U') ? content : `#EXTM3U\n${content}`;
                  report = importM3uText(runtime.state, normalized, 'Вставленный M3U');
                  _this4.save();
                  notify$1(Lampa, reportText(report));
                  _this4.rebuild();
                } catch (error) {
                  notify$1(Lampa, error.message);
                  _this4.start();
                }
              case 3:
                return _context4.a(2);
            }
          }, _callee4);
        }))();
      }
      fileM3u() {
        var _this5 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
          var file, report, _t4;
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.p = _context5.n) {
              case 0:
                _context5.p = 0;
                _context5.n = 1;
                return readLocalFile('.m3u,.m3u8,text/plain,application/x-mpegURL');
              case 1:
                file = _context5.v;
                if (file) {
                  _context5.n = 2;
                  break;
                }
                return _context5.a(2, _this5.start());
              case 2:
                report = importM3uText(runtime.state, file.content, file.name);
                _this5.save();
                notify$1(Lampa, reportText(report));
                _this5.rebuild();
                _context5.n = 4;
                break;
              case 3:
                _context5.p = 3;
                _t4 = _context5.v;
                notify$1(Lampa, `${_t4.message} Используйте URL плейлиста или вставку текста.`);
                _this5.start();
              case 4:
                return _context5.a(2);
            }
          }, _callee5, null, [[0, 3]]);
        }))();
      }
      xtream() {
        var _this6 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
          var server, username, password, account, report, _t5;
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.p = _context6.n) {
              case 0:
                _context6.n = 1;
                return askText(Lampa, 'Адрес сервера Xtream (HTTP/HTTPS)');
              case 1:
                server = _context6.v;
                if (server) {
                  _context6.n = 2;
                  break;
                }
                return _context6.a(2, _this6.start());
              case 2:
                _context6.n = 3;
                return askText(Lampa, 'Имя пользователя Xtream');
              case 3:
                username = _context6.v;
                if (username) {
                  _context6.n = 4;
                  break;
                }
                return _context6.a(2, _this6.start());
              case 4:
                _context6.n = 5;
                return askText(Lampa, 'Пароль Xtream', '', {
                  password: true
                });
              case 5:
                password = _context6.v;
                if (password) {
                  _context6.n = 6;
                  break;
                }
                return _context6.a(2, _this6.start());
              case 6:
                account = {
                  id: stableId('xtream', `${server}:${username}`),
                  name: 'Xtream',
                  server,
                  username,
                  password,
                  enabled: true
                };
                _context6.p = 7;
                notify$1(Lampa, 'Загрузка списка live streams…');
                _context6.n = 8;
                return importXtream(runtime.state, account, runtime.state.preferences.connectionTimeoutMs);
              case 8:
                report = _context6.v;
                _this6.save();
                notify$1(Lampa, reportText(report));
                _this6.rebuild();
                _context6.n = 10;
                break;
              case 9:
                _context6.p = 9;
                _t5 = _context6.v;
                notify$1(Lampa, _t5.message);
                _this6.start();
              case 10:
                return _context6.a(2);
            }
          }, _callee6, null, [[7, 9]]);
        }))();
      }
      showReport() {
        var _a, _b;
        var report = runtime.state.lastImportReport;
        if (!report) {
          notify$1(Lampa, 'Импорт ещё не выполнялся.');
          return;
        }
        var body = element('div', 'lampa-iptv-report');
        body.append(element('pre', '', reportText(report)));
        if (report.ignoredEntries.length) {
          body.append(element('div', 'lampa-iptv-report__title', 'Игнорированные записи'));
          body.append(element('pre', '', report.ignoredEntries.slice(0, 100).map(entry => `строка ${entry.line}: ${entry.name}${entry.tvgId ? ` [${entry.tvgId}]` : ''}`).join('\n')));
        }
        (_b = (_a = Lampa.Modal) === null || _a === void 0 ? void 0 : _a.open) === null || _b === void 0 ? void 0 : _b.call(_a, {
          title: 'Отчёт импорта',
          html: body,
          size: 'large'
        });
      }
      manualMapping() {
        var _this7 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
          var _a, _b, ignored, entry, channel;
          return _regenerator().w(function (_context7) {
            while (1) switch (_context7.n) {
              case 0:
                ignored = (_b = (_a = runtime.state.lastImportReport) === null || _a === void 0 ? void 0 : _a.ignoredEntries) !== null && _b !== void 0 ? _b : [];
                if (ignored.length) {
                  _context7.n = 1;
                  break;
                }
                notify$1(Lampa, 'В последнем импорте нет неопознанных записей.');
                return _context7.a(2);
              case 1:
                _context7.n = 2;
                return choose(Lampa, 'Неопознанная запись', ignored.slice(0, 100).map(item => ({
                  title: `${item.name}${item.tvgId ? ` [${item.tvgId}]` : ''}`,
                  item
                })), () => _this7.start());
              case 2:
                entry = _context7.v;
                if (entry) {
                  _context7.n = 3;
                  break;
                }
                return _context7.a(2);
              case 3:
                _context7.n = 4;
                return choose(Lampa, 'Сопоставить с каналом', CHANNELS.map(item => ({
                  title: `${item.number}. ${item.name}`,
                  item
                })), () => _this7.start());
              case 4:
                channel = _context7.v;
                if (channel) {
                  _context7.n = 5;
                  break;
                }
                return _context7.a(2);
              case 5:
                setManualMapping(runtime.state, entry.item.tvgId || entry.item.name, channel.item.id);
                _this7.save();
                notify$1(Lampa, 'Правило сохранено. Повторите импорт плейлиста.');
                _this7.start();
              case 6:
                return _context7.a(2);
            }
          }, _callee7);
        }))();
      }
      exportBackup() {
        var _this8 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
          var includeSecrets, backup;
          return _regenerator().w(function (_context8) {
            while (1) switch (_context8.n) {
              case 0:
                includeSecrets = false;
                if (!runtime.state.xtreamAccounts.length) {
                  _context8.n = 2;
                  break;
                }
                _context8.n = 1;
                return confirmAction(Lampa, 'Экспорт секретов', 'По умолчанию пароли, токены, cookies, Authorization и приватные URL не экспортируются. Включить секреты в этот файл? Храните такой файл как пароль.');
              case 1:
                includeSecrets = _context8.v;
              case 2:
                backup = createBackup(runtime.state, includeSecrets);
                downloadText(`lampa-iptv-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(backup, null, 2));
                notify$1(Lampa, includeSecrets ? 'Копия с секретами создана.' : 'Безопасная копия создана.');
                _this8.start();
              case 3:
                return _context8.a(2);
            }
          }, _callee8);
        }))();
      }
      importBackup() {
        var _this9 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
          var file, parsed, accepted, _t6;
          return _regenerator().w(function (_context9) {
            while (1) switch (_context9.p = _context9.n) {
              case 0:
                _context9.p = 0;
                _context9.n = 1;
                return readLocalFile('.json,application/json');
              case 1:
                file = _context9.v;
                if (file) {
                  _context9.n = 2;
                  break;
                }
                return _context9.a(2, _this9.start());
              case 2:
                parsed = parseBackup(file.content);
                _context9.n = 3;
                return confirmAction(Lampa, 'Восстановление', parsed.report.join('\n'));
              case 3:
                accepted = _context9.v;
                if (accepted) {
                  _context9.n = 4;
                  break;
                }
                return _context9.a(2, _this9.start());
              case 4:
                Object.assign(runtime.state, parsed.state);
                _this9.save();
                notify$1(Lampa, 'Резервная копия восстановлена.');
                _this9.rebuild();
                _context9.n = 6;
                break;
              case 5:
                _context9.p = 5;
                _t6 = _context9.v;
                notify$1(Lampa, _t6.message);
                _this9.start();
              case 6:
                return _context9.a(2);
            }
          }, _callee9, null, [[0, 5]]);
        }))();
      }
    };
  }

  function createMenuItem(Lampa) {
    var item = document.createElement('li');
    item.className = 'menu__item selector lampa-iptv-menu-item';
    item.dataset.action = PLUGIN_INFO.component;
    var icon = document.createElement('div');
    icon.className = 'menu__ico';
    icon.innerHTML = ICON;
    var text = document.createElement('div');
    text.className = 'menu__text';
    text.textContent = 'ТВ';
    item.append(icon, text);
    var open = () => {
      var _a, _b, _c;
      if (((_c = (_b = (_a = Lampa.Activity) === null || _a === void 0 ? void 0 : _a.active) === null || _b === void 0 ? void 0 : _b.call(_a)) === null || _c === void 0 ? void 0 : _c.component) === PLUGIN_INFO.component) return;
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
  function addTranslations(Lampa) {
    var _a, _b;
    (_b = (_a = Lampa.Lang) === null || _a === void 0 ? void 0 : _a.add) === null || _b === void 0 ? void 0 : _b.call(_a, {
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
  function compareVersions(current, available) {
    var _a, _b, _c, _d;
    var normalize = value => value.replace(/^v/, '').split('.').map(part => Number(part) || 0);
    var left = normalize(current);
    var right = normalize(available);
    for (var index = 0; index < Math.max(left.length, right.length); index += 1) {
      if (((_a = right[index]) !== null && _a !== void 0 ? _a : 0) > ((_b = left[index]) !== null && _b !== void 0 ? _b : 0)) return true;
      if (((_c = right[index]) !== null && _c !== void 0 ? _c : 0) < ((_d = left[index]) !== null && _d !== void 0 ? _d : 0)) return false;
    }
    return false;
  }
  function checkVersion(_x, _x2) {
    return _checkVersion.apply(this, arguments);
  }
  function _checkVersion() {
    _checkVersion = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(Lampa, baseUrl) {
      var _a, _b, _c, _d, _e, _f, _g, key, last, response, version;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (!(!baseUrl || !/^https?:/i.test(baseUrl))) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            key = 'lampa_iptv_version_checked_at';
            last = Number((_c = (_b = (_a = Lampa.Storage) === null || _a === void 0 ? void 0 : _a.get) === null || _b === void 0 ? void 0 : _b.call(_a, key, '0')) !== null && _c !== void 0 ? _c : 0);
            if (!(Date.now() - last < 24 * 60 * 60 * 1000)) {
              _context.n = 2;
              break;
            }
            return _context.a(2);
          case 2:
            (_e = (_d = Lampa.Storage) === null || _d === void 0 ? void 0 : _d.set) === null || _e === void 0 ? void 0 : _e.call(_d, key, Date.now());
            _context.p = 3;
            _context.n = 4;
            return fetch(`${baseUrl}version.json`, {
              credentials: 'omit',
              cache: 'no-cache'
            });
          case 4:
            response = _context.v;
            if (response.ok) {
              _context.n = 5;
              break;
            }
            return _context.a(2);
          case 5:
            _context.n = 6;
            return response.json();
          case 6:
            version = _context.v;
            if (version.version && compareVersions(PLUGIN_INFO.version, version.version)) {
              (_g = (_f = Lampa.Noty) === null || _f === void 0 ? void 0 : _f.show) === null || _g === void 0 ? void 0 : _g.call(_f, `Доступна новая версия Lampa IPTV: ${version.version}`);
            }
            _context.n = 8;
            break;
          case 7:
            _context.p = 7;
            _context.v;
          case 8:
            return _context.a(2);
        }
      }, _callee, null, [[3, 7]]);
    }));
    return _checkVersion.apply(this, arguments);
  }
  function bootstrap(Lampa, baseUrl) {
    var _a;
    var state = loadState(Lampa);
    var runtime = {
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
    var updateMenu = () => {
      var _a;
      (_a = document.querySelector('.lampa-iptv-menu-item')) === null || _a === void 0 ? void 0 : _a.remove();
      if (!state.preferences.enabled) return;
      var menu = document.querySelector('.menu .menu__list');
      if (menu) menu.append(createMenuItem(Lampa));
    };
    var removeSettings = registerSettings(runtime, updateMenu);
    var ready = () => {
      updateMenu();
      document.body.classList.toggle('lampa-iptv-low-power', state.preferences.lowPowerMode);
      if (state.preferences.dieselClientEnabled) {
        void loadDieselClient(Lampa);
      }
      void checkVersion(Lampa, baseUrl);
    };
    var appListener;
    if (globalThis.appready) ready();else if ((_a = Lampa.Listener) === null || _a === void 0 ? void 0 : _a.follow) {
      appListener = event => {
        var _a;
        if (event.type === 'ready') {
          ready();
          if ((_a = Lampa.Listener) === null || _a === void 0 ? void 0 : _a.remove) Lampa.Listener.remove('app', appListener);
        }
      };
      Lampa.Listener.follow('app', appListener);
    } else {
      ready();
    }
    return {
      destroy: () => {
        var _a, _b, _c, _d;
        (_a = document.querySelector('.lampa-iptv-menu-item')) === null || _a === void 0 ? void 0 : _a.remove();
        if (appListener && ((_b = Lampa.Listener) === null || _b === void 0 ? void 0 : _b.remove)) Lampa.Listener.remove('app', appListener);
        removeSettings();
        removeDieselLoader();
        (_d = (_c = Lampa.Component) === null || _c === void 0 ? void 0 : _c.add) === null || _d === void 0 ? void 0 : _d.call(_c, PLUGIN_INFO.component, undefined);
      }
    };
  }

  var _a, _b;
  var globalScope = globalThis;
  var scriptUrl = (_b = (_a = document.currentScript) === null || _a === void 0 ? void 0 : _a.src) !== null && _b !== void 0 ? _b : '';
  var baseUrl = scriptUrl ? new URL('.', scriptUrl).toString() : '';
  if (!globalScope.__lampaIptvPlugin) {
    globalScope.__lampaIptvPlugin = {
      version: PLUGIN_INFO.version,
      starting: true
    };
    var attempts = 0;
    var start = () => {
      var _a, _b;
      var Lampa = globalScope.Lampa;
      if (((_a = Lampa === null || Lampa === void 0 ? void 0 : Lampa.Component) === null || _a === void 0 ? void 0 : _a.add) && ((_b = Lampa === null || Lampa === void 0 ? void 0 : Lampa.Activity) === null || _b === void 0 ? void 0 : _b.push) && (Lampa === null || Lampa === void 0 ? void 0 : Lampa.Controller) && (Lampa === null || Lampa === void 0 ? void 0 : Lampa.Storage) && (Lampa === null || Lampa === void 0 ? void 0 : Lampa.Player)) {
        var result = bootstrap(Lampa, baseUrl);
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

})();
//# sourceMappingURL=plugin.js.map
