/**
 * Meaad Tech main interactions
 * - Theme toggle + auto-detect dark mode
 * - Mobile navigation
 * - Scroll effects
 * - Project filtering
 * - Contact form
 * - Language detection toast
 */

(function () {
  'use strict';

  const STORAGE_KEY_THEME = 'portfolio_theme';
  const STORAGE_KEY_LANG_DETECTED = 'portfolio_lang_detected';
  const html = document.documentElement;
  const body = document.body;
  const header = document.getElementById('header');
  const themeToggle = document.getElementById('theme-toggle');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const backToTop = document.getElementById('back-to-top');
  const contactForm = document.getElementById('contact-form');

  /* Theme handling */
  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getSavedTheme() {
    return localStorage.getItem(STORAGE_KEY_THEME);
  }

  function getPreferredTheme() {
    const saved = getSavedTheme();
    if (saved) return saved;
    return getSystemTheme();
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
    }
  }

  function toggleTheme() {
    const current = html.getAttribute('data-theme') || getPreferredTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY_THEME, next);
    applyTheme(next);
  }

  function initAutoTheme() {
    // Apply theme immediately based on saved preference or system preference
    applyTheme(getPreferredTheme());

    // Listen for system theme changes when no explicit preference is saved
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!getSavedTheme()) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  /* Language detection toast */
  function getBrowserLanguage() {
    return (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  }

  function getCurrentPageLanguage() {
    return html.getAttribute('lang') || 'en';
  }

  function initLanguageToast() {
    const toast = document.getElementById('lang-toast');
    if (!toast) return;

    // Already detected this session? Don't show again.
    if (sessionStorage.getItem(STORAGE_KEY_LANG_DETECTED)) {
      return;
    }

    const browserLang = getBrowserLanguage();
    const currentLang = getCurrentPageLanguage();

    // Show toast if browser is Arabic but page is English, or vice versa
    const isBrowserArabic = browserLang.startsWith('ar');
    const isCurrentArabic = currentLang === 'ar';

    if (isBrowserArabic !== isCurrentArabic) {
      // Small delay so it doesn't appear immediately on load
      setTimeout(() => {
        toast.classList.add('visible');
        toast.setAttribute('aria-hidden', 'false');
        sessionStorage.setItem(STORAGE_KEY_LANG_DETECTED, 'true');
      }, 1500);
    }

    // Close button
    const closeBtn = toast.querySelector('.lang-toast-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        toast.classList.remove('visible');
        toast.setAttribute('aria-hidden', 'true');
      });
    }
  }

  /* Header scroll effect */
  function handleScroll() {
    const scrolled = window.scrollY > 20;
    if (header) {
      header.classList.toggle('scrolled', scrolled);
    }
    if (backToTop) {
      backToTop.classList.toggle('visible', scrolled);
    }
  }

  /* Mobile menu */
  function toggleMobileMenu() {
    const isOpen = mobileNav.classList.toggle('open');
    const icon = mobileToggle.querySelector('i');
    if (icon) {
      icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    }
    mobileToggle.setAttribute('aria-expanded', isOpen);
  }

  function closeMobileMenu() {
    if (!mobileNav) return;
    mobileNav.classList.remove('open');
    const icon = mobileToggle.querySelector('i');
    if (icon) icon.className = 'fas fa-bars';
    mobileToggle.setAttribute('aria-expanded', 'false');
  }

  /* Scroll reveal animations */
  function initReveal() {
    const revealElements = document.querySelectorAll(
      '.section-header, .skill-category, .project-card, .timeline-item, .testimonial-card, .contact-card, .stat-card, .about-text, .about-stats, .service-card, .team-card, .invest-card'
    );

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach((el) => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  /* Project filtering */
  function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filterBtns.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        projectCards.forEach((card) => {
          const category = card.dataset.category;
          if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* Animate skill bars on scroll */
  function initSkillBars() {
    const bars = document.querySelectorAll('.skill-progress');
    if (!bars.length) return;

    bars.forEach((bar) => {
      bar.style.width = '0%';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.parentElement.dataset.width || bar.style.width;
            // Read target width from inline style set by template
            const target = bar.getAttribute('style').match(/width:\s*([^;]+)/)?.[1] || '0%';
            setTimeout(() => {
              bar.style.width = target;
            }, 100);
            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.5 }
    );

    bars.forEach((bar) => observer.observe(bar));
  }

  /* Contact form via Web3Forms */
  function initContactForm() {
    if (!contactForm) return;

    const statusEl = document.getElementById('form-status');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      }

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          statusEl.textContent = statusEl.dataset.success || 'Thank you! Your message has been sent.';
          statusEl.className = 'form-status success';
          contactForm.reset();
        } else {
          throw new Error(result.message || 'Failed to send message');
        }
      } catch (error) {
        statusEl.textContent = statusEl.dataset.error || 'Something went wrong. Please try again.';
        statusEl.className = 'form-status error';
        console.error('Contact form error:', error);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });
  }

  /* Back to top */
  function initBackToTop() {
    if (!backToTop) return;
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* Smooth scroll for anchor links */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          closeMobileMenu();
        }
      });
    });
  }

  /* Initialize */
  function init() {
    initAutoTheme();
    handleScroll();

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (mobileToggle) mobileToggle.addEventListener('click', toggleMobileMenu);
    if (backToTop) initBackToTop();

    window.addEventListener('scroll', handleScroll, { passive: true });

    initReveal();
    initProjectFilters();
    initSkillBars();
    initContactForm();
    initSmoothScroll();
    initLanguageToast();

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        mobileNav &&
        mobileNav.classList.contains('open') &&
        !mobileNav.contains(e.target) &&
        !mobileToggle.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
