# Форматы данных

## M3U

Поддерживается Extended M3U в UTF-8:

```m3u
#EXTM3U url-tvg="https://epg.example.com/guide.xml"
#EXTINF:-1 tvg-id="ntv" tvg-name="НТВ" tvg-logo="https://img.example.com/ntv.png" group-title="Основные" tvg-chno="3",НТВ
#EXTVLCOPT:http-user-agent=Mozilla/5.0
#EXTVLCOPT:http-referrer=https://provider.example.com/
https://provider.example.com/live/ntv.m3u8|Origin=https%3A%2F%2Fprovider.example.com
```

Поддерживаемые поля: `tvg-id`, `tvg-name`, `tvg-logo`, `tvg-chno`, `group-title`, `catchup`,
`catchup-source`, `catchup-days`, `url-tvg`, `x-tvg-url`, `#EXTGRP` и известные HTTP options.
Неизвестные атрибуты сохраняются как текстовые metadata, но не выполняются.

Разрешены только HTTP(S) URL. Относительные URL разрешаются только при известном HTTP(S) base URL
удалённого плейлиста. Максимум записей и байтов задаётся в `src/config.ts`.

## Строгий matcher

Порядок:

1. точный `tvg-id`;
2. точный `tvg-name`;
3. точное отображаемое имя;
4. точный псевдоним из `epgAliases`;
5. осторожно нормализованное имя;
6. явное ручное соответствие.

Результат принимается только при единственном совпавшем ID из фиксированного реестра.

## XMLTV

Поддерживаются `channel`, `display-name`, `icon`, `programme`, `title`, `desc`, `category`,
`episode-num` и `rating/value`. Время:

```text
YYYYMMDDhhmmss +0300
YYYYMMDDhhmmss -0500
YYYYMMDDhhmmss Z
```

DTD и XML entities запрещены. Некорректные программы пропускаются с предупреждением.

## Состояние

Корневой ключ: `lampa_iptv_state`.

```json
{
  "schemaVersion": 3,
  "preferences": {
    "enabled": true,
    "view": "grid",
    "checkBeforePlay": false,
    "autoFallback": true,
    "connectionTimeoutMs": 12000,
    "retries": 2,
    "lowPowerMode": false,
    "showNumbers": true,
    "showStatuses": true
  },
  "channelOverrides": {},
  "favorites": [],
  "history": [],
  "adult": { "enabled": false },
  "xtreamAccounts": [],
  "manualMappings": {},
  "recentErrors": []
}
```

Неизвестные channel ID удаляются миграцией. Источники с не-HTTP(S) URL отклоняются. На канал
сохраняется не более трёх источников.

## Резервная копия

```json
{
  "format": "lampa-iptv-backup",
  "version": 1,
  "createdAt": "2026-07-23T00:00:00.000Z",
  "pluginVersion": "1.0.0",
  "includesSecrets": false,
  "data": {}
}
```

При `includesSecrets: false` удаляются Xtream accounts, Authorization, Cookie, Referer и URL с
учётными параметрами. Импорт принимает только `format=lampa-iptv-backup` и `version=1`.

## Публичные JSON

`public/data/catalog.json` содержит метаданные ровно 28 каналов без потоков.
`public/data/sources.json` — allowlist официальных публичных источников для Actions; в 1.0.0 он
пуст. `health.json` содержит только результаты безопасной проверки этого allowlist и никогда не
принимает пользовательские URL.
