<script>
  import '../app.css';
  import { locale, isRTL, initLocale } from '$lib/i18n.js';
  import { onMount } from 'svelte';

  let { children } = $props();

  onMount(() => {
    initLocale();
  });

  // Reactively update html dir and lang
  $effect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = $isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = $locale;
    }
  });
</script>

{@render children()}
