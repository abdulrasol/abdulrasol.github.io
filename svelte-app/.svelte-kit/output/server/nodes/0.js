import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.f2xv8R-6.js","_app/immutable/chunks/B5x0efmV.js","_app/immutable/chunks/BAGG94wi.js","_app/immutable/chunks/2a7XO0a2.js","_app/immutable/chunks/Cwmopiq7.js"];
export const stylesheets = ["_app/immutable/assets/0.Bt7IOTdb.css"];
export const fonts = [];
