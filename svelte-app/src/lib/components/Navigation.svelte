<script>
  import { locale, isRTL, t } from '$lib/i18n.js';
  import { onMount } from 'svelte';

  let scrolled = $state(false);
  let mobileOpen = $state(false);

  const navItems = [
    { id: 'top', key: 'nav.home' },
    { id: 'skills', key: 'nav.skills' },
    { id: 'projects', key: 'nav.projects' },
    { id: 'contact', key: 'nav.contact' }
  ];

  function scrollTo(id) {
    mobileOpen = false;
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function toggleLang() {
    locale.update(l => l === 'en' ? 'ar' : 'en');
  }

  onMount(() => {
    const onScroll = () => { scrolled = window.scrollY > 50; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });
</script>

<nav class="navbar" class:scrolled>
  <div class="container nav-inner">
    <!-- Logo -->
    <button class="nav-logo" onclick={() => scrollTo('top')}>
      <img src="/logo.png" alt="logo" width="28" height="28" />
      <span class="text-gradient">{t('nav.title', $locale)}</span>
    </button>

    <!-- Desktop nav -->
    <div class="nav-links">
      <button class="lang-toggle" onclick={toggleLang}>
        {$locale === 'en' ? 'عربي' : 'English'}
      </button>
      {#each navItems as item}
        <button class="nav-link" onclick={() => scrollTo(item.id)}>
          {t(item.key, $locale)}
        </button>
      {/each}
    </div>

    <!-- Mobile hamburger -->
    <button class="hamburger" onclick={() => mobileOpen = !mobileOpen} aria-label="Menu">
      {#if mobileOpen}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      {:else}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      {/if}
    </button>
  </div>

  <!-- Mobile menu -->
  {#if mobileOpen}
    <div class="mobile-menu">
      <div class="container">
        <button class="lang-toggle mobile-lang" onclick={toggleLang}>
          {$locale === 'en' ? 'عربي' : 'English'}
        </button>
        {#each navItems as item}
          <button class="mobile-link" onclick={() => scrollTo(item.id)}>
            {t(item.key, $locale)}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</nav>

<style>
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    transition: background 0.3s, box-shadow 0.3s;
    background: transparent;
  }
  .navbar.scrolled {
    background: hsl(222 47% 4% / .92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 4px 20px hsl(222 47% 4% / .5);
  }
  .nav-inner {
    display: flex; align-items: center; justify-content: space-between;
    height: 64px;
  }
  .nav-logo {
    display: flex; align-items: center; gap: 0.5rem;
    background: none; border: none; cursor: pointer;
    font-size: 1.15rem; font-weight: 700;
  }
  .nav-logo img { border-radius: 4px; }
  .nav-links {
    display: flex; align-items: center; gap: 1.5rem;
  }
  .nav-link {
    background: none; border: none; cursor: pointer;
    color: var(--fg-muted); font-weight: 500; font-size: 0.95rem;
    transition: color 0.3s;
  }
  .nav-link:hover { color: var(--primary); }
  .lang-toggle {
    background: hsl(214 100% 60% / .1);
    color: var(--primary); border: 1px solid hsl(214 100% 60% / .25);
    padding: 0.35rem 0.9rem; border-radius: 999px;
    font-weight: 600; cursor: pointer; font-size: 0.85rem;
    transition: all 0.3s;
    font-family: 'Cairo', sans-serif;
  }
  .lang-toggle:hover {
    background: hsl(214 100% 60% / .2);
    border-color: var(--primary);
  }
  .hamburger {
    display: none; background: none; border: none;
    color: var(--fg); cursor: pointer;
  }
  .mobile-menu {
    background: hsl(222 47% 4% / .95);
    backdrop-filter: blur(12px);
    border-top: 1px solid var(--border);
    padding: 1rem 0;
  }
  .mobile-link {
    display: block; width: 100%; text-align: start;
    background: none; border: none; cursor: pointer;
    color: var(--fg-muted); padding: 0.75rem 0;
    font-size: 1rem; font-weight: 500;
    transition: color 0.3s;
  }
  .mobile-link:hover { color: var(--primary); }
  .mobile-lang { margin-bottom: 0.75rem; }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .hamburger { display: flex; }
  }
</style>
