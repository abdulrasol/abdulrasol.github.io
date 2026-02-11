<script>
  import { locale, t } from '$lib/i18n.js';

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<section class="hero">
  <div class="hero-bg">
    <div class="orb orb-1 animate-float"></div>
    <div class="orb orb-2 animate-float" style="animation-delay: 1s"></div>
    <div class="orb orb-3 animate-float" style="animation-delay: 2s"></div>
  </div>

  <div class="container hero-content">
    <div class="hero-icons animate-fade-in">
      <!-- Smartphone icon -->
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
      <!-- Code icon -->
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
    </div>

    <h1 class="text-gradient animate-fade-in" style="animation-delay:.1s">
      {t('hero.title', $locale)}
    </h1>
    <h2 class="hero-subtitle animate-fade-in" style="animation-delay:.2s">
      {t('hero.subtitle', $locale)}
    </h2>
    <p class="hero-desc animate-fade-in" style="animation-delay:.3s">
      {t('hero.description', $locale)}
    </p>

    <div class="hero-actions animate-fade-in" style="animation-delay:.4s">
      <button class="btn btn-primary" onclick={() => scrollTo('projects')}>
        {t('hero.viewWork', $locale)}
      </button>
      <button class="btn btn-outline" onclick={() => scrollTo('contact')}>
        {t('hero.getInTouch', $locale)}
      </button>
    </div>

    <button class="scroll-down animate-bounce-gentle" onclick={() => scrollTo('skills')} aria-label="Scroll down">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--fg-muted)" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
  </div>
</section>

<style>
  .hero {
    min-height: 100vh; display: flex; align-items: center;
    justify-content: center; position: relative; overflow: hidden;
    padding: 5rem 0 3rem;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background: var(--gradient-hero); opacity: 0.07;
  }
  .orb {
    position: absolute; border-radius: 50%;
  }
  .orb-1 { top: 15%; left: 8%; width: 80px; height: 80px; background: hsl(214 100% 60% / .12); }
  .orb-2 { bottom: 20%; right: 10%; width: 60px; height: 60px; background: hsl(197 100% 56% / .12); }
  .orb-3 { top: 50%; right: 25%; width: 48px; height: 48px; background: hsl(214 100% 60% / .06); }
  .hero-content { text-align: center; position: relative; z-index: 2; }
  .hero-icons { display: flex; gap: 0.75rem; justify-content: center; margin-bottom: 1.5rem; }
  h1 { font-size: clamp(2.5rem, 7vw, 4.2rem); font-weight: 800; margin-bottom: 0.5rem; }
  .hero-subtitle { font-size: clamp(1.2rem, 3vw, 1.8rem); color: var(--fg-muted); margin-bottom: 1rem; font-weight: 500; }
  .hero-desc {
    color: var(--fg-muted); font-size: clamp(0.95rem, 2vw, 1.15rem);
    max-width: 600px; margin: 0 auto 2.5rem; line-height: 1.8;
  }
  .hero-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
  .scroll-down {
    position: absolute; bottom: 2rem; left: 50%;
    transform: translateX(-50%);
    background: none; border: none; cursor: pointer;
  }

  @media (max-width: 768px) {
    .hero { padding: 6rem 0 2rem; min-height: auto; }
    .hero-actions { flex-direction: column; align-items: center; }
    .orb-1, .orb-2, .orb-3 { display: none; }
    .scroll-down { display: none; }
  }
</style>
