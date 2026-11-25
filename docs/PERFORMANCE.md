# Asset delivery and canvas interaction

`npm run build` emits the isolated `public/` tree. `version-assets.mjs` hashes final bytes in dependency order (media, CSS/orb, scripts, bootstrap, HTML). Runtime catalogs use absolute URLs; computed canvas paths use `KB_ASSET`. Source asset URLs remain available with short caching for compatibility. Only `/assets/build/` contains immutable, content-hashed files. HTML, robots and sitemap revalidate; the API remains `no-store`.

The initial document contains the real introduction paragraph. Its critical stylesheet is selected from the approved cascade in source order. The full cascade loads after first paint, before a reveal can complete. Scripts initialize in their original dependency order in separate idle tasks. Keep the single intro Text node and reserved paragraph layout when editing the typewriter.

WOFF2 files contain all original glyphs and font metrics, including Outfit's variable weights. The TTF sources and license notices remain in `assets/fonts/`. Featured WebP artwork has 240/480/960 pixel variants alongside the untouched originals. Regeneration uses fontTools with Brotli support and Pillow; Python is not required by the production build.

Canvas previews load on intersection, retain their layout while loading, and upgrade responsive candidates as zoom changes. Never set a lazy image to `display:none` while waiting for its load event. Offscreen card animations pause. The canvas owns pointer identifiers and midpoint anchoring; internal document scrollers use browser scrolling and accessibility zoom.

Validation: `npm run test:build` and `npm run test:ai`. The final performance, browser, media and production reports are kept outside the deployable repository in `E:\Kunal-Builds-Tools\reports\final-performance`.
