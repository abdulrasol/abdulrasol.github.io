<script>
  import { locale, t } from '$lib/i18n.js';
</script>

<section id="contact">
  <div class="container">
    <div class="section-header">
      <h2 class="text-gradient">{t('contact.title', $locale)}</h2>
      <p>{t('contact.subtitle', $locale)}</p>
    </div>

    <div class="contact-grid">
      <!-- Email -->
      <div class="card contact-card">
        <div class="contact-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </div>
        <div>
          <h3>{t('contact.email', $locale)}</h3>
          <a href="mailto:abdulrsol97@gmail.com">abdulrsol97@gmail.com</a>
        </div>
      </div>

      <!-- WhatsApp -->
      <div class="card contact-card">
        <div class="contact-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        </div>
        <div>
          <h3>{t('contact.whatsapp', $locale)}</h3>
          <a href="https://wa.me/9647813639721">+964 781 363 9721</a>
        </div>
      </div>

      <!-- Location -->
      <div class="card contact-card">
        <div class="contact-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
        <div>
          <h3>{t('contact.location', $locale)}</h3>
          <p>{t('contact.locationText', $locale)}</p>
        </div>
      </div>

      <!-- Availability -->
      <div class="card contact-card">
        <div class="contact-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </div>
        <div>
          <h3>{t('contact.availability', $locale)}</h3>
          <p>{t('contact.availabilityText', $locale)}</p>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="card cta-card">
      <h3>{t('contact.ctaTitle', $locale)}</h3>
      <p>{t('contact.ctaDescription', $locale)}</p>
      <a href="mailto:abdulrsol97@gmail.com" class="btn btn-primary">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        {t('contact.sendMessage', $locale)}
      </a>

      <div class="social-links">
        <a href="https://github.com/abdulrasol" aria-label="GitHub">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="https://linkedin.com/in/abdulrasoolal-hilo" aria-label="LinkedIn">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
        <a href="https://instagram.com/abdulrasol.dev" aria-label="Instagram">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  section { padding: 5rem 0; }
  .contact-grid {
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem; margin-bottom: 2rem;
  }
  .contact-card {
    display: flex; align-items: center; gap: 1rem; padding: 1.5rem;
  }
  .contact-icon {
    display: flex; padding: 0.75rem; border-radius: var(--radius);
    background: var(--gradient-skill);
    flex-shrink: 0;
    transition: transform 0.3s;
  }
  .contact-card:hover .contact-icon { transform: scale(1.1); }
  h3 { font-size: 1rem; font-weight: 600; margin-bottom: 0.25rem; }
  a { color: var(--fg-muted); transition: color 0.3s; }
  a:hover { color: var(--primary); }
  p { color: var(--fg-muted); font-size: 0.9rem; }

  .cta-card {
    text-align: center; padding: 3rem 2rem;
  }
  .cta-card h3 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem; }
  .cta-card p { max-width: 480px; margin: 0 auto 1.5rem; }
  .social-links {
    display: flex; justify-content: center; gap: 1.5rem;
    padding-top: 1.5rem; margin-top: 1.5rem;
    border-top: 1px solid var(--border);
  }
  .social-links a {
    color: var(--fg-muted);
    transition: color 0.3s, transform 0.3s;
  }
  .social-links a:hover { color: var(--primary); transform: scale(1.15); }

  @media (max-width: 768px) {
    .contact-grid { grid-template-columns: 1fr; }
    .cta-card { padding: 2rem 1.5rem; }
  }
</style>
