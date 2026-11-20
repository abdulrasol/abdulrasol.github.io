/**
 * Subul Technology main interactions
 * - Theme toggle with safe persistence
 * - Mobile navigation with accessibility guards
 * - Scroll states and active section highlighting
 * - Project filtering with empty state handling
 * - Contact form submission
 * - Lightweight reveal effects
 */

(function () {
  'use strict';

  const STORAGE_KEY_THEME = 'portfolio_theme';
  const STORAGE_KEY_LANG_PREFERENCE = 'portfolio_lang_preference';
  const STORAGE_KEY_LANG_REDIRECTED = 'portfolio_lang_redirected';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const ui = {
    html: document.documentElement,
    body: document.body,
    header: document.getElementById('header'),
    themeToggle: document.getElementById('theme-toggle'),
    mobileToggle: document.getElementById('mobile-menu-toggle'),
    mobileNav: document.getElementById('mobile-nav'),
    backToTop: document.getElementById('back-to-top'),
    contactForm: document.getElementById('contact-form'),
    projectCards: Array.from(document.querySelectorAll('.project-card')),
    filterButtons: Array.from(document.querySelectorAll('.filter-btn')),
    projectsEmpty: document.getElementById('projects-empty'),
    projectsTrack: document.getElementById('projects-track'),
    projectsPrev: document.getElementById('projects-prev'),
    projectsNext: document.getElementById('projects-next'),
    projectsStatus: document.getElementById('projects-carousel-status'),
    projectsAutoplayToggle: document.getElementById('projects-autoplay-toggle'),
    navLinks: Array.from(document.querySelectorAll('.nav-link[data-nav-target]')),
    langSwitches: Array.from(document.querySelectorAll('[data-lang-switch]')),
  };

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY_THEME);
    } catch {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
    } catch {
      // Ignore storage failures in restrictive browsers.
    }
  }

  function getPreferredTheme() {
    return getStoredTheme() || getSystemTheme();
  }

  function applyTheme(theme) {
    ui.html.setAttribute('data-theme', theme);

    if (!ui.themeToggle) return;
    const icon = ui.themeToggle.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  function initTheme() {
    applyTheme(getPreferredTheme());

    if (ui.themeToggle) {
      ui.themeToggle.addEventListener('click', () => {
        const current = ui.html.getAttribute('data-theme') || getPreferredTheme();
        const next = current === 'dark' ? 'light' : 'dark';
        setStoredTheme(next);
        applyTheme(next);
      });
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', (event) => {
      if (!getStoredTheme()) {
        applyTheme(event.matches ? 'dark' : 'light');
      }
    });
  }

  function setMobileMenuState(isOpen) {
    if (!ui.mobileNav || !ui.mobileToggle) return;

    ui.mobileNav.classList.toggle('open', isOpen);
    ui.mobileNav.hidden = !isOpen;
    ui.mobileToggle.setAttribute('aria-expanded', String(isOpen));

    const icon = ui.mobileToggle.querySelector('i');
    if (icon) {
      icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    }
  }

  function initMobileNav() {
    if (!ui.mobileNav || !ui.mobileToggle) return;

    setMobileMenuState(false);

    ui.mobileToggle.addEventListener('click', () => {
      const next = !ui.mobileNav.classList.contains('open');
      setMobileMenuState(next);
    });

    ui.mobileNav.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        setMobileMenuState(false);
      }
    });

    document.addEventListener('click', (event) => {
      if (!ui.mobileNav.classList.contains('open')) return;
      if (ui.mobileNav.contains(event.target) || ui.mobileToggle.contains(event.target)) return;
      setMobileMenuState(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && ui.mobileNav.classList.contains('open')) {
        setMobileMenuState(false);
        ui.mobileToggle.focus();
      }
    });
  }

  function initScrollState() {
    const onScroll = () => {
      const scrolled = window.scrollY > 24;

      if (ui.header) {
        ui.header.classList.toggle('scrolled', scrolled);
      }

      if (ui.backToTop) {
        ui.backToTop.classList.toggle('visible', scrolled);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (ui.backToTop) {
      ui.backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
      });
    }
  }

  function setActiveNav(sectionId) {
    ui.navLinks.forEach((link) => {
      const isActive = link.dataset.navTarget === sectionId;
      link.classList.toggle('is-current', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'location');
      } else if (link.getAttribute('aria-current') === 'location') {
        link.removeAttribute('aria-current');
      }
    });
  }

  function initSectionTracking() {
    if (!ui.navLinks.length) return;
    if (ui.body?.dataset.page !== 'home') return;

    const sections = ui.navLinks
      .map((link) => document.getElementById(link.dataset.navTarget))
      .filter(Boolean);

    if (!sections.length) return;

    if (!('IntersectionObserver' in window)) {
      setActiveNav('services');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveNav(visibleEntry.target.id);
        }
      },
      {
        threshold: [0.2, 0.45, 0.7],
        rootMargin: '-25% 0px -45% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function initReveal() {
    const revealElements = document.querySelectorAll(
      '.section-header, .service-card, .skill-category, .project-card, .contact-card, .contact-proof-card, .stat-card, .team-card, .timeline-item, .invest-card'
    );

    if (!revealElements.length || prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((element) => {
      element.classList.add('reveal');
      observer.observe(element);
    });
  }

  function updateProjectFilter(filter) {
    let visibleCount = 0;

    ui.projectCards.forEach((card) => {
      const categories = (card.dataset.categories || card.dataset.category || '')
        .split(/\s+/)
        .filter(Boolean);
      const matches = filter === 'all' || categories.includes(filter);
      const shouldHide = !matches;
      card.classList.toggle('hidden', shouldHide);
      if (matches) visibleCount += 1;
    });

    if (ui.projectsEmpty) {
      ui.projectsEmpty.hidden = visibleCount > 0;
    }

    if (ui.projectsStatus) {
      const total = ui.projectCards.length;
      ui.projectsStatus.textContent = filter === 'all'
        ? `${visibleCount} / ${total}`
        : `${visibleCount}`;
    }
  }

  function initProjectFilters() {
    if (!ui.filterButtons.length || !ui.projectCards.length) return;

    ui.filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter || 'all';

        ui.filterButtons.forEach((item) => {
          item.classList.toggle('active', item === button);
          item.setAttribute('aria-selected', String(item === button));
          item.tabIndex = item === button ? 0 : -1;
        });

        updateProjectFilter(filter);
      });
    });

    updateProjectFilter('all');
    requestAnimationFrame(() => { ui.projectsTrack.scrollLeft = 0; });
  }

  function initProjectsCarousel() {
    if (!ui.projectsTrack) return;

    let autoPaused = prefersReducedMotion.matches;
    let interactionPaused = false;
    let timer = null;
    const isRtl = () => document.documentElement.dir === 'rtl';
    const cards = () => ui.projectCards.filter((card) => !card.classList.contains('hidden'));
    const moveTo = (card) => card?.scrollIntoView({ behavior: prefersReducedMotion.matches ? 'auto' : 'smooth', block: 'nearest', inline: 'start' });
    const scroll = (direction) => {
      const visible = cards();
      if (!visible.length) return;
      const current = visible.reduce((best, card, index) => {
        const distance = Math.abs(card.getBoundingClientRect().left - ui.projectsTrack.getBoundingClientRect().left);
        return distance < best.distance ? { index, distance } : best;
      }, { index: 0, distance: Infinity }).index;
      const next = (current + direction + visible.length) % visible.length;
      moveTo(visible[next]);
    };

    const updateToggle = () => {
      const paused = autoPaused || interactionPaused;
      ui.projectsAutoplayToggle?.setAttribute('aria-pressed', String(autoPaused));
      if (ui.projectsAutoplayToggle) {
        ui.projectsAutoplayToggle.innerHTML = `<i class="fas fa-${autoPaused ? 'play' : 'pause'}" aria-hidden="true"></i>`;
        ui.projectsAutoplayToggle.setAttribute('aria-label', autoPaused ? (isRtl() ? 'تشغيل الحركة التلقائية' : 'Resume automatic movement') : (isRtl() ? 'إيقاف الحركة التلقائية' : 'Pause automatic movement'));
      }
      if (paused || prefersReducedMotion.matches) clearInterval(timer);
      else if (!timer) timer = setInterval(() => scroll(1), 4800);
    };
    const setInteractionPaused = (value) => { interactionPaused = value; updateToggle(); };
    ui.projectsAutoplayToggle?.addEventListener('click', () => { autoPaused = !autoPaused; updateToggle(); });
    ui.projectsTrack.closest('.projects-carousel')?.addEventListener('mouseenter', () => setInteractionPaused(true));
    ui.projectsTrack.closest('.projects-carousel')?.addEventListener('mouseleave', () => setInteractionPaused(false));
    ui.projectsTrack.closest('.projects-carousel')?.addEventListener('focusin', () => setInteractionPaused(true));
    ui.projectsTrack.closest('.projects-carousel')?.addEventListener('focusout', (event) => { if (!event.currentTarget.contains(event.relatedTarget)) setInteractionPaused(false); });

    ui.projectsPrev?.addEventListener('click', () => scroll(-1));
    ui.projectsNext?.addEventListener('click', () => scroll(1));
    ui.projectsTrack.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown'].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'PageUp') return scroll(-1);
      if (event.key === 'PageDown') return scroll(1);
      const next = isRtl() ? event.key === 'ArrowLeft' : event.key === 'ArrowRight';
      scroll(next ? 1 : -1);
    });
    ui.projectsTrack.scrollLeft = 0;
    updateToggle();
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
        setMobileMenuState(false);
      });
    });
  }

  function getStoredLanguagePreference() {
    try {
      return localStorage.getItem(STORAGE_KEY_LANG_PREFERENCE);
    } catch {
      return null;
    }
  }

  function setStoredLanguagePreference(language) {
    try {
      localStorage.setItem(STORAGE_KEY_LANG_PREFERENCE, language);
    } catch {
      // Ignore storage failures.
    }
  }

  function getBrowserLanguagePreference() {
    const browserLanguage = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    return browserLanguage.startsWith('ar') ? 'ar' : 'en';
  }

  function getCurrentLanguage() {
    return ui.html.getAttribute('lang') === 'ar' ? 'ar' : 'en';
  }

  function markLanguageRedirected() {
    try {
      sessionStorage.setItem(STORAGE_KEY_LANG_REDIRECTED, 'true');
    } catch {
      // Ignore storage failures.
    }
  }

  function hasLanguageRedirected() {
    try {
      return sessionStorage.getItem(STORAGE_KEY_LANG_REDIRECTED) === 'true';
    } catch {
      return false;
    }
  }

  function initLanguagePreference() {
    const currentLanguage = getCurrentLanguage();
    const preferredLanguage = getStoredLanguagePreference() || getBrowserLanguagePreference();

    ui.langSwitches.forEach((link) => {
      link.addEventListener('click', () => {
        const nextLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
        setStoredLanguagePreference(nextLanguage);
      });
    });

    if (preferredLanguage === currentLanguage || hasLanguageRedirected()) {
      return;
    }

    const targetLink = ui.langSwitches[0];
    if (!targetLink?.href) {
      return;
    }

    markLanguageRedirected();
    window.location.replace(targetLink.href);
  }

  function initContactForm() {
    if (!ui.contactForm) return;

    const statusElement = document.getElementById('form-status');
    const submitButton = ui.contactForm.querySelector('button[type="submit"]');
    const originalButtonMarkup = submitButton ? submitButton.innerHTML : '';

    ui.contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(ui.contactForm);
      const payload = Object.fromEntries(formData.entries());

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      }

      if (statusElement) {
        statusElement.textContent = '';
        statusElement.className = 'form-status';
      }

      try {
        const response = await fetch(ui.contactForm.action, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Failed to send message');
        }

        ui.contactForm.reset();
        if (statusElement) {
          statusElement.textContent =
            statusElement.dataset.success || 'Thank you! Your message has been sent.';
          statusElement.className = 'form-status success';
        }
      } catch (error) {
        if (statusElement) {
          statusElement.textContent =
            statusElement.dataset.error || 'Something went wrong. Please try again.';
          statusElement.className = 'form-status error';
        }
        console.error('Contact form error:', error);
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonMarkup;
        }
      }
    });
  }

  function init() {
    initTheme();
    initMobileNav();
    initScrollState();
    initSectionTracking();
    initReveal();
    initProjectFilters();
    initProjectsCarousel();
    initSmoothScroll();
    initLanguagePreference();
    initContactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
