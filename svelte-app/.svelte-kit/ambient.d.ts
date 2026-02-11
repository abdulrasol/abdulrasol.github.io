
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```sh
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const OSLogRateLimit: string;
	export const MallocNanoZone: string;
	export const USER: string;
	export const COMMAND_MODE: string;
	export const __CFBundleIdentifier: string;
	export const PATH: string;
	export const LOGNAME: string;
	export const SSH_AUTH_SOCK: string;
	export const HOME: string;
	export const SHELL: string;
	export const TMPDIR: string;
	export const __CF_USER_TEXT_ENCODING: string;
	export const XPC_SERVICE_NAME: string;
	export const XPC_FLAGS: string;
	export const SHLVL: string;
	export const PWD: string;
	export const OLDPWD: string;
	export const LANG: string;
	export const ANDROID_HOME: string;
	export const PAGER: string;
	export const ANTIGRAVITY_AGENT: string;
	export const TERM_PROGRAM: string;
	export const TERM_PROGRAM_VERSION: string;
	export const COLORTERM: string;
	export const ANTIGRAVITY_CLI_ALIAS: string;
	export const GEMINI_CLI_IDE_SERVER_PORT: string;
	export const GEMINI_CLI_IDE_WORKSPACE_PATH: string;
	export const GEMINI_CLI_IDE_AUTH_TOKEN: string;
	export const QWEN_CODE_IDE_SERVER_PORT: string;
	export const QWEN_CODE_IDE_WORKSPACE_PATH: string;
	export const GIT_ASKPASS: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const VSCODE_INJECTION: string;
	export const ZDOTDIR: string;
	export const USER_ZDOTDIR: string;
	export const TERM: string;
	export const VSCODE_PROFILE_INITIALIZED: string;
	export const VSCODE_PYTHON_AUTOACTIVATE_GUARD: string;
	export const _: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		OSLogRateLimit: string;
		MallocNanoZone: string;
		USER: string;
		COMMAND_MODE: string;
		__CFBundleIdentifier: string;
		PATH: string;
		LOGNAME: string;
		SSH_AUTH_SOCK: string;
		HOME: string;
		SHELL: string;
		TMPDIR: string;
		__CF_USER_TEXT_ENCODING: string;
		XPC_SERVICE_NAME: string;
		XPC_FLAGS: string;
		SHLVL: string;
		PWD: string;
		OLDPWD: string;
		LANG: string;
		ANDROID_HOME: string;
		PAGER: string;
		ANTIGRAVITY_AGENT: string;
		TERM_PROGRAM: string;
		TERM_PROGRAM_VERSION: string;
		COLORTERM: string;
		ANTIGRAVITY_CLI_ALIAS: string;
		GEMINI_CLI_IDE_SERVER_PORT: string;
		GEMINI_CLI_IDE_WORKSPACE_PATH: string;
		GEMINI_CLI_IDE_AUTH_TOKEN: string;
		QWEN_CODE_IDE_SERVER_PORT: string;
		QWEN_CODE_IDE_WORKSPACE_PATH: string;
		GIT_ASKPASS: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		VSCODE_GIT_IPC_HANDLE: string;
		VSCODE_INJECTION: string;
		ZDOTDIR: string;
		USER_ZDOTDIR: string;
		TERM: string;
		VSCODE_PROFILE_INITIALIZED: string;
		VSCODE_PYTHON_AUTOACTIVATE_GUARD: string;
		_: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
