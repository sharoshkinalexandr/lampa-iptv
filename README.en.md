# Lampa IPTV

A production Lampa IPTV plugin with a strict registry of exactly 28 requested channels. Imported
M3U and Xtream entries are matched against that allowlist; unrelated channels are reported and
never added.

The repository intentionally ships with no TV streams, private credentials, or tokens. Add a
lawful provider M3U/XMLTV source or an official reusable HTTP(S) stream on your own device.

Key features:

- single browser-ready `plugin.js` bundle;
- categories, search, favourites, history and per-channel overrides;
- remote, pasted and file M3U, direct URLs and Xtream Codes;
- strict matching, up to two reserve URLs and Lampa Player fallback;
- XMLTV/XMLTV.GZ with now/next data and local cache;
- local adult PIN; adult entries are excluded from global search, history and public demos;
- secret-free export by default, diagnostics masking and no telemetry;
- optional, explicit opt-in loading of the full third-party **Diesel TV** client;
- CI, Pages and release workflows with SHA-256 checksums.

## Installation

After publication, use this exact installation URL:

```text
https://sharoshkinalexandr.github.io/lampa-iptv/plugin.js
```

In Lampa open **Settings → Extensions → Add plugin**, paste the URL and restart Lampa. The **TV**
item will appear in the side menu.

## Development

Node.js 20 or later is required.

```powershell
npm install
npm run validate
```

Build outputs are written to `dist/`; the deployable static site is written to `site/`.

See [README.md](README.md) for the complete Russian guide and [SOURCES_AUDIT.md](SOURCES_AUDIT.md)
for the per-channel source audit.

## Optional Diesel TV client

Open **TV → Sources → Diesel TV**, review the disclosure and confirm. Lampa IPTV then loads the
author's official client from:

```text
https://andreyurl54.github.io/diesel5/diesel.js
```

Diesel TV keeps its own catalogue, providers, EPG, archive and settings. It is disabled by default
and does not change the fixed 28-channel registry. Its code is used with the author's permission.
Because it is an independently updated network client, its own privacy and provider terms apply.

## Legal and privacy

The plugin is not an IPTV provider. It does not bypass DRM, authentication, tokens, CAPTCHA or
geographical restrictions. Private URLs and provider credentials remain local and are never sent
to GitHub Actions. MIT applies to project code only and grants no rights to broadcasts, EPG data
or channel artwork.
