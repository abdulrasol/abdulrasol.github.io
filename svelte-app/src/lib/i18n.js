import { writable, derived } from 'svelte/store';
import { translations } from './translations.js';

/** @type {import('svelte/store').Writable<'en'|'ar'>} */
export const locale = writable('en');

/** @type {import('svelte/store').Readable<boolean>} */
export const isRTL = derived(locale, ($locale) => $locale === 'ar');

/**
 * @param {string} key
 * @param {'en'|'ar'} lang
 * @returns {string}
 */
function getNestedValue(key, lang) {
    const keys = key.split('.');
    /** @type {any} */
    let value = translations[lang];
    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            return key;
        }
    }
    return typeof value === 'string' ? value : key;
}

/**
 * @param {string} key
 * @param {'en'|'ar'} lang
 * @returns {string}
 */
export function t(key, lang) {
    return getNestedValue(key, lang);
}

/** Initialize language from browser */
export function initLocale() {
    if (typeof navigator !== 'undefined') {
        const browserLang = navigator.language?.toLowerCase() || '';
        if (browserLang.startsWith('ar')) {
            locale.set('ar');
        } else {
            locale.set('en');
        }
    }
}
