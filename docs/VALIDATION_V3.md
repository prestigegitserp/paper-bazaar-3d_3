# Validation — Paper Bazaar 03

## Build and regression checks

- TypeScript and production Vite build passed locally on Node 24.19.
- 84 Node tests: existing rendering/catalog contracts plus five new behavioral tests for Persian normalization, combined filters, unknown-price ordering, persisted quote validation and draft export.
- Old milestone tests were updated to accept a major release and read the archived v0.17 README; their rendering and KTX2 checks remain intact.
- Build tested with `VITE_PUBLIC_BASE=/paper-bazaar-3d_3/` and `VITE_STATIC_DEMO=true`.
- PNG fallback used locally because `toktx` is absent. CI installs KTX Software 4.4.2 and checks compressed atlas and generated models.

## Initial JavaScript comparison

Both measured with the same installed dependencies and Vite 7.1.5. Baseline: source commit `e96115dea55379bc8a0b72c4fec08b952eb97543`. Numbers are emitted bundle sizes, not network or device benchmarks.

| Entry JavaScript | v0.17 | v3 |
|---|---:|---:|
| Minified | 1,194.44 kB | 214.29 kB |
| gzip | 336.51 kB | 67.52 kB |

Initial gzip JS reduction: **79.9%**. Initial CSS grows from 9.36 kB gzip to 13.92 kB because legacy walk styling is retained alongside the new interface. Three/Fiber's shared lazy chunk is still ~233.65 kB gzip and is downloaded on opening either 3D experience. Total installed application weight is not reduced by 80%.

No real-device FPS, Core Web Vitals or conversion improvements are claimed. The inherited full mall has not been benchmarked against its predecessor; new startup architecture and lightweight studio are the measured/implemented improvements.

## Browser acceptance

`e2e/market.spec.ts` tests desktop catalog, absence of eager 3D loads, empty search/reset, comparison, inquiry quantity, download, persistence after reload, mobile overflow, studio color/quality and modal close. CI installs Chromium and uploads screenshots/traces under `browser-evidence`.

Local Chromium launch is unavailable in this sandbox (SIGTRAP); browser results are to be confirmed through the destination repository's CI. This limitation does not affect the local TypeScript, bundle and unit-test checks above.

## Manual acceptance for a real device

- Open the live demo on a midrange Android phone and desktop with hardware WebGL.
- Walk the full legacy market and return; ensure quote additions survive.
- Verify low-power studio interaction and cinema shadows on the target device.
- Confirm supplier price/date/unit against source before any actual purchasing.
