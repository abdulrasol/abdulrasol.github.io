export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["app_store_managment.png","baytraq/.DS_Store","baytraq/logo.png","baytraq/poster.png","baytraq/screenshots/.DS_Store","baytraq/screenshots/Simulator Screenshot - iPhone 16e - 2026-05-07 at 11.02.32.png","baytraq/screenshots/Simulator Screenshot - iPhone 16e - 2026-05-07 at 11.02.36.png","baytraq/screenshots/Simulator Screenshot - iPhone 16e - 2026-05-07 at 11.02.56.png","baytraq/screenshots/Simulator Screenshot - iPhone 16e - 2026-05-07 at 11.03.00.png","baytraq/screenshots/Simulator Screenshot - iPhone 16e - 2026-05-07 at 11.03.03.png","baytraq/screenshots/Simulator Screenshot - iPhone 16e - 2026-05-07 at 11.03.07.png","baytraq/screenshots/Simulator Screenshot - iPhone 16e - 2026-05-07 at 11.03.20.png","baytraq/screenshots/Simulator Screenshot - iPhone 16e - 2026-05-07 at 11.03.35.png","baytraq/screenshots/Simulator Screenshot - iPhone 16e - 2026-05-07 at 11.03.48.png","baytraq/screenshots/Simulator Screenshot - iPhone 16e - 2026-05-07 at 11.04.10.png","baytraq/screenshots/Simulator Screenshot - iPhone 16e - 2026-05-07 at 11.04.17.png","logo.png","madarik_banar.png","madarik_logo.png","meter_log_banner.png","meter_log_logo.png","placeholder.svg","store_management_cover.png","store_management_logo.png"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.CnaG4F3l.js",app:"_app/immutable/entry/app.B8Tey1k0.js",imports:["_app/immutable/entry/start.CnaG4F3l.js","_app/immutable/chunks/BKdnHgiH.js","_app/immutable/chunks/BAGG94wi.js","_app/immutable/entry/app.B8Tey1k0.js","_app/immutable/chunks/BAGG94wi.js","_app/immutable/chunks/IXiYDxfQ.js","_app/immutable/chunks/B5x0efmV.js","_app/immutable/chunks/BnPNT7l0.js","_app/immutable/chunks/2a7XO0a2.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
