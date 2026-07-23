# Релиз

## Версия 1.1.0

1. Выполнить `npm ci`.
2. Выполнить `npm run validate`.
3. Убедиться, что `dist/manifest.json` и `dist/version.json` имеют версию `1.1.0`.
4. Проверить `dist/SHA256SUMS.txt`.
5. Проверить, что `public/data/sources.json` не содержит приватных URL.
6. Закоммитить изменения и создать annotated tag `v1.1.0`.
7. Отправить tag. Workflow Release повторно собирает проект, сверяет тесты и прикладывает
   `plugin.js`, `plugin.min.js`, CSS, manifest и checksums.
8. Workflow Pages публикует каталог `site/`.
9. Выполнить smoke test опубликованных `plugin.js`, `manifest.json`, `version.json` и demo:
   HTTP 200, JavaScript Content-Type, отсутствие HTML/редиректа, версия `1.1.0`.
10. Добавить опубликованный HTTPS URL в чистый профиль Lampa.

## Версионирование

Проект следует SemVer:

- patch — исправления без изменения формата;
- minor — совместимые функции;
- major — несовместимые storage/API изменения.

Каждая миграция увеличивает `schemaVersion`. Версия пакета, manifest, tag и Release обязаны
совпадать.

## Откат

Pages разворачивается из неизменяемого artifact конкретного workflow. Для отката создайте новый
patch-релиз, который возвращает код, либо повторно опубликуйте проверенный commit. Не заменяйте
старый GitHub Release артефактами с другим SHA-256.
