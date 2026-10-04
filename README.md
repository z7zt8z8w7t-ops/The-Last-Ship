# The Last Ship — v125 terrain rendering update

Overwrite the matching files in your existing game folder and retain all other assets. This update includes terrain.js as well as game.js, style.css, index.html and sw.js. Includes all previous updates and temporary TEST navigation.

Static terrain, facility scenery, tile art, edge features and bridges are rendered into a reusable bitmap. Animation frames composite that bitmap with moving gravity-well cores, weather, ship/Marine lighting and storm effects. The bitmap is reused across unchanged screen remounts. Discovery, terrain type, well pairing, emplacement/site changes, completed image loads and board size changes invalidate it.

The animation rate, rules, sound and gameplay timing remain unchanged. This reduces repeated terrain construction, but a Safari performance improvement has not yet been measured.

Validation:
- JavaScript syntax checks passed.
- Native-canvas rendering with real art compared against the previous renderer; the sample scene has negligible rasterisation differences (mean per-channel difference under 0.01/255).
- Confirmed unchanged animation frames do not rebuild terrain or allocate new cached canvases.
- Terrain collapse, sentry emplacement, discovery and resizing refresh the cache; unchanged remounts reuse it.
- Dynamic draw loop remains active.
- Repeated native-canvas timings did not show a consistent overall frame-time improvement. They do not measure Safari performance; compare v125 with v124 on the affected device.
