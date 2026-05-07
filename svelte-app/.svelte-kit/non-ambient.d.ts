
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>
		};
		Pathname(): "/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/app_store_managment.png" | "/baytraq/.DS_Store" | "/baytraq/logo.png" | "/baytraq/poster.png" | "/baytraq/screenshots/.DS_Store" | "/baytraq/screenshots/Simulator Screenshot - iPhone 16e - 2026-05-07 at 11.02.32.png" | "/baytraq/screenshots/Simulator Screenshot - iPhone 16e - 2026-05-07 at 11.02.36.png" | "/baytraq/screenshots/Simulator Screenshot - iPhone 16e - 2026-05-07 at 11.02.56.png" | "/baytraq/screenshots/Simulator Screenshot - iPhone 16e - 2026-05-07 at 11.03.00.png" | "/baytraq/screenshots/Simulator Screenshot - iPhone 16e - 2026-05-07 at 11.03.03.png" | "/baytraq/screenshots/Simulator Screenshot - iPhone 16e - 2026-05-07 at 11.03.07.png" | "/baytraq/screenshots/Simulator Screenshot - iPhone 16e - 2026-05-07 at 11.03.20.png" | "/baytraq/screenshots/Simulator Screenshot - iPhone 16e - 2026-05-07 at 11.03.35.png" | "/baytraq/screenshots/Simulator Screenshot - iPhone 16e - 2026-05-07 at 11.03.48.png" | "/baytraq/screenshots/Simulator Screenshot - iPhone 16e - 2026-05-07 at 11.04.10.png" | "/baytraq/screenshots/Simulator Screenshot - iPhone 16e - 2026-05-07 at 11.04.17.png" | "/logo.png" | "/madarik_banar.png" | "/madarik_logo.png" | "/meter_log_banner.png" | "/meter_log_logo.png" | "/placeholder.svg" | "/store_management_cover.png" | "/store_management_logo.png" | string & {};
	}
}