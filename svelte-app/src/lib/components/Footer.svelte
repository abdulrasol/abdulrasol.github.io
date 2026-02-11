<script>
  import { locale, t } from '$lib/i18n.js';
  const year = new Date().getFullYear();
</script>

<footer>
  <p>{t('footer.copyright', $locale).replace('{year}', year)}</p>
</footer>

<style>
  footer {
    text-align: center;
    padding: 2.5rem 1.5rem;
    border-top: 1px solid var(--border);
    color: var(--fg-muted);
    font-size: 0.85rem;
  }
</style>
