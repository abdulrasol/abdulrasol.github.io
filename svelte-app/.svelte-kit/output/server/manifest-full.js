export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["app_store_managment.png","logo.png","madarik_banar.png","madarik_logo.png","placeholder.svg"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.DmjS0Cf5.js",app:"_app/immutable/entry/app.DuqUB4BH.js",imports:["_app/immutable/entry/start.DmjS0Cf5.js","_app/immutable/chunks/nqsHTWCS.js","_app/immutable/chunks/BAGG94wi.js","_app/immutable/entry/app.DuqUB4BH.js","_app/immutable/chunks/BAGG94wi.js","_app/immutable/chunks/IXiYDxfQ.js","_app/immutable/chunks/B5x0efmV.js","_app/immutable/chunks/BnPNT7l0.js","_app/immutable/chunks/2a7XO0a2.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
