# Архитектура

## Цели

Плагин должен загружаться одним обычным скриптом в Lampa, не иметь runtime-зависимостей и
оставаться работоспособным на старых Android WebView. Исходный код написан на TypeScript, UI —
vanilla DOM, итог — IIFE ES2017 после Babel.

Главный инвариант: `src/config/channels.ts` содержит ровно 28 записей. Любой входной источник
только добавляет URL к одной из этих записей; расширение каталога невозможно.

## Слои

```text
index/bootstrap
  ├─ Lampa compatibility + lifecycle
  ├─ UI components
  │   ├─ main catalog
  │   ├─ source/import manager
  │   ├─ channel editor
  │   └─ diagnostics/settings
  ├─ domain core
  │   ├─ M3U parser + strict matcher
  │   ├─ source manager + adult access
  │   └─ security/masking
  ├─ player + network health
  ├─ XMLTV/EPG
  └─ Storage + IndexedDB cache
```

`src/index.ts` ставит глобальный guard, вычисляет базовый URL скрипта и ждёт появления
`globalThis.Lampa` не более 30 секунд. `bootstrap.ts` регистрирует компоненты, настройки,
manifest и единственный пункт меню.

## Подтверждённые точки расширения Lampa

API сверялся с актуальными исходниками Lampa:

- Android-оболочка `lampa-app/LAMPA`, commit
  `adf77db957556284154e44509072aaa8e1bdf0c9` от 2026-07-22;
- web source `yumata/lampa-source`, commit
  `3896f4b37fbf7ff15e12149babcad90593d19a2e` от 2026-07-21;
- встроенный компонент `plugins/iptv`.

Используемые контракты:

- `Lampa.Component.add(name, constructor)` — регистрация Activity-компонента;
- `Lampa.Activity.push(params)` / `backward()` / `active()` — навигация;
- `Lampa.Controller.add`, `toggle`, `collectionSet`, `collectionFocus` — пульт и фокус;
- `Lampa.Player.play`, `playlist`, `runas` — воспроизведение, список и внешний плеер;
- `url_reserve` и callback `error(work, useReserve)` — резервные источники;
- `Lampa.SettingsApi.addComponent/addParam` — настройки;
- `Lampa.Storage.get/set/field` — малое локальное состояние;
- `Lampa.Listener.follow/remove('app', ...)` — ожидание готовности;
- `Lampa.Input`, `Select`, `Modal`, `Noty` — штатные взаимодействия.

Все обращения проверяют наличие необязательных методов. Ошибка дополнительного API не должна
ломать загрузку каталога.

## Жизненный цикл

1. Guard предотвращает вторую инициализацию одного URL.
2. При наличии `appready` bootstrap выполняется сразу; иначе ждёт событие `app:ready`.
3. Состояние загружается и мигрирует до актуальной схемы.
4. Компоненты регистрируются один раз.
5. Пункт «ТВ» удаляется перед повторным добавлением.
6. Каждый UI-компонент строит DOM в `create/start`, освобождает корень в `destroy`.
7. `destroy` bootstrap удаляет пункт меню, listener и настройки.

## Данные и безопасность

Небольшое состояние хранится через `Lampa.Storage` с fallback в `localStorage`. Большие XMLTV
ответы кешируются в IndexedDB с TTL. Весь импорт проходит через:

1. ограничение размера;
2. безопасный текстовый парсер;
3. разрешение только `http:`/`https:`;
4. строгий matcher;
5. максимум три источника на канал;
6. миграцию/санитизацию перед сохранением.

Названия и описания вставляются через `textContent`; HTML из M3U/XMLTV не исполняется. XMLTV с DTD
или entity отклоняется. `eval` и `new Function` не используются.

## Воспроизведение

`playChannel` сортирует разрешённые источники, опционально проверяет основной, передаёт первый URL
в Lampa Player, второй — как `url_reserve`, а третий — через callback ошибки. Плейлист быстрого
переключения строится только из настроенных не-взрослых каналов. История записывается перед
запуском API плеера.

Приватные HTTP-заголовки сохраняются для диагностики и передачи внешнему плееру, но браузерный
MediaSource может не позволить установить их. Код сообщает об этом и не обещает невозможного.

## EPG

XMLTV разбирается DOMParser после запрета DTD/entity. Времена преобразуются в UTC с явным XMLTV
offset либо пользовательским fallback. Сопоставление выполняется по channel id, ручному alias и
нормализованному имени. В UI загружается ограниченное число программ и вычисляется now/next.

## Производительность

- реестр мал (28 каналов), поэтому полная перерисовка предсказуема;
- M3U/XMLTV имеют жёсткие лимиты;
- EPG кешируется в IndexedDB;
- картинки lazy-loaded и удаляются при ошибке;
- low-power class отключает тяжёлые эффекты;
- health checks выполняются последовательно в UI и с ограниченной параллельностью в Actions.

## Сборка

Rollup создаёт `plugin.js` и `plugin.min.js`. Babel понижает синтаксис до ES2017. Sass создаёт
обычный и минифицированный CSS, при этом стили также инжектируются JavaScript-бандлом. Manifest,
version и SHA-256 генерируются после сборки. `prepare-site.mjs` формирует полностью статический
каталог GitHub Pages.
