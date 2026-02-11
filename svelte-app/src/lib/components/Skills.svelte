<script>
  import { locale, t } from '$lib/i18n.js';

  const skills = [
    { icon: 'code', key: 'flutterDev', level: 95 },
    { icon: 'phone', key: 'mobileUI', level: 90 },
    { icon: 'database', key: 'stateManagement', level: 85 },
    { icon: 'cloud', key: 'firebase', level: 88 },
    { icon: 'palette', key: 'materialDesign', level: 92 },
    { icon: 'zap', key: 'performance', level: 80 }
  ];

  const icons = {
    code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    phone: '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
    cloud: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>',
    palette: '<circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12.5" r="1.5"/><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c.55 0 1-.45 1-1v-1a1 1 0 0 1 1-1h1.5c2.76 0 5-2.24 5-5 0-5-4.49-9-9.5-9z"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'
  };
</script>

<section id="skills">
  <div class="container">
    <div class="section-header">
      <h2 class="text-gradient">{t('skills.title', $locale)}</h2>
      <p>{t('skills.subtitle', $locale)}</p>
    </div>

    <div class="skills-grid">
      {#each skills as skill, i}
        <div class="card skill-card animate-fade-in" style="animation-delay: {i * 100}ms">
          <div class="skill-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2">
              {@html icons[skill.icon]}
            </svg>
          </div>
          <h3>{t(`skills.${skill.key}.title`, $locale)}</h3>
          <p>{t(`skills.${skill.key}.description`, $locale)}</p>
          <div class="skill-bar-meta">
            <span>{t('skills.proficiency', $locale)}</span>
            <span class="skill-pct">{skill.level}%</span>
          </div>
          <div class="skill-bar-track">
            <div class="skill-bar-fill" style="width: {skill.level}%"></div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  section { padding: 5rem 0; }
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  .skill-card { padding: 2rem; }
  .skill-icon {
    display: inline-flex; padding: 0.75rem;
    border-radius: var(--radius);
    background: var(--gradient-skill);
    margin-bottom: 1rem;
    transition: transform 0.3s;
  }
  .skill-card:hover .skill-icon { transform: scale(1.1); }
  h3 { font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem; }
  p { color: var(--fg-muted); font-size: 0.88rem; margin-bottom: 1rem; line-height: 1.6; }
  .skill-bar-meta {
    display: flex; justify-content: space-between;
    font-size: 0.75rem; color: var(--fg-muted); margin-bottom: 0.4rem;
  }
  .skill-pct { color: var(--primary); font-weight: 600; }

  @media (max-width: 968px) {
    .skills-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 600px) {
    .skills-grid { grid-template-columns: 1fr; }
    .skill-card { padding: 1.5rem; }
  }
</style>
