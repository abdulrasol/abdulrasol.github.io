<script>
  import { locale, t } from '$lib/i18n.js';
  import { projects } from '$lib/data/projects.js';
</script>

<section id="projects" class="projects-section">
  <div class="container">
    <div class="section-header">
      <h2 class="text-gradient">{t('projects.title', $locale)}</h2>
      <p>{t('projects.subtitle', $locale)}</p>
    </div>

    <div class="projects-grid">
      {#each projects as project, i}
        <div class="card project-card animate-fade-in" style="animation-delay: {i * 120}ms">
          <img
            src={project.image}
            alt={$locale === 'ar' ? project.title_ar : project.title_en}
            class="project-img"
            loading="lazy"
          />
          <div class="project-body">
            <div class="project-header">
              <div class="project-title-row">
                {#if project.featured}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--primary)" stroke="var(--primary)" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                {/if}
                <h3>{$locale === 'ar' ? project.title_ar : project.title_en}</h3>
                {#if project.featured}
                  <span class="badge badge-primary">{t('projects.featured', $locale)}</span>
                {/if}
              </div>
              <p class="project-desc">{$locale === 'ar' ? project.desc_ar : project.desc_en}</p>
            </div>

            <div class="project-techs">
              {#each project.technologies as tech}
                <span class="badge">{tech}</span>
              {/each}
            </div>

            <div class="project-stats">
              <span class="stat">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                {project.stars} {t('projects.stars', $locale)}
              </span>
            </div>

            <div class="project-actions">
              <a href={project.githubUrl} class="btn btn-ghost btn-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                {t('projects.code', $locale)}
              </a>

              {#if project.liveUrl}
                <a href={project.liveUrl} class="btn btn-primary btn-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  {project.liveUrl.includes('/madarik') ? t('projects.landingPage', $locale) : t('projects.liveDemo', $locale)}
                </a>
              {/if}

              {#if project.googlePlayUrl}
                <a href={project.googlePlayUrl} class="btn btn-green btn-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  {t('projects.googlePlay', $locale)}
                </a>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .projects-section { background: hsl(222 47% 3%); padding: 5rem 0; }
  .projects-grid {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;
  }
  .project-card { overflow: hidden; }
  .project-img {
    width: 100%; height: 180px; object-fit: cover;
    border-bottom: 1px solid var(--border);
  }
  .project-body { padding: 1.5rem; }
  .project-title-row { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem; }
  h3 { font-size: 1.2rem; font-weight: 700; }
  .project-desc { color: var(--fg-muted); font-size: 0.88rem; line-height: 1.6; margin-bottom: 1rem; }
  .project-techs { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.75rem; }
  .project-stats { display: flex; gap: 1rem; font-size: 0.8rem; color: var(--fg-muted); margin-bottom: 1rem; }
  .stat { display: flex; align-items: center; gap: 0.3rem; }
  .project-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; }

  @media (max-width: 768px) {
    .projects-grid { grid-template-columns: 1fr; }
    .project-img { height: 160px; }
  }
</style>
