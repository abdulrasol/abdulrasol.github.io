/**
 * Project landing page interactions
 * - Theme toggle
 * - Mobile navigation
 * - Header scroll effect
 * - Scroll reveal animations
 * - Purchase form handling
 */

(function () {
  'use strict';

  const STORAGE_KEY_THEME = 'project_theme';
  const STORAGE_KEY_LANG_PREFERENCE = 'portfolio_lang_preference';
  const STORAGE_KEY_LANG_REDIRECTED = 'portfolio_lang_redirected';
  const html = document.documentElement;
  const body = document.body;
  const header = document.getElementById('project-header');
  const themeToggle = document.getElementById('theme-toggle');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const purchaseForm = document.getElementById('purchase-form');
  const langSwitches = Array.from(document.querySelectorAll('[data-lang-switch]'));

  /* Theme handling */
  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY_THEME);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
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
    return html.getAttribute('lang') === 'ar' ? 'ar' : 'en';
  }

  function hasLanguageRedirected() {
    try {
      return sessionStorage.getItem(STORAGE_KEY_LANG_REDIRECTED) === 'true';
    } catch {
      return false;
    }
  }

  function markLanguageRedirected() {
    try {
      sessionStorage.setItem(STORAGE_KEY_LANG_REDIRECTED, 'true');
    } catch {
      // Ignore storage failures.
    }
  }

  function clearLanguageRedirected() {
    try {
      sessionStorage.removeItem(STORAGE_KEY_LANG_REDIRECTED);
    } catch {
      // Ignore storage failures.
    }
  }

  function initLanguagePreference() {
    const currentLanguage = getCurrentLanguage();
    const preferredLanguage = getStoredLanguagePreference() || getBrowserLanguagePreference();

    langSwitches.forEach((link) => {
      link.addEventListener('click', () => {
        const nextLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
        setStoredLanguagePreference(nextLanguage);
      });
    });

    if (preferredLanguage === currentLanguage) {
      clearLanguageRedirected();
      return;
    }

    if (hasLanguageRedirected()) return;

    const targetLink = langSwitches[0];
    if (!targetLink?.href) return;

    markLanguageRedirected();
    window.location.replace(targetLink.href);
  }

  /* Header scroll effect */
  function handleScroll() {
    const scrolled = window.scrollY > 20;
    if (header) {
      header.classList.toggle('scrolled', scrolled);
    }
  }

  /* Mobile menu */
  function toggleMobileMenu() {
    if (!mobileNav || !mobileToggle) return;
    const isOpen = mobileNav.classList.toggle('open');
    mobileNav.hidden = !isOpen;
    const icon = mobileToggle.querySelector('i');
    if (icon) {
      icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    }
    mobileToggle.setAttribute('aria-expanded', isOpen);
  }

  function closeMobileMenu() {
    if (!mobileNav || !mobileToggle) return;
    mobileNav.classList.remove('open');
    mobileNav.hidden = true;
    const icon = mobileToggle.querySelector('i');
    if (icon) icon.className = 'fas fa-bars';
    mobileToggle.setAttribute('aria-expanded', 'false');
  }

  /* Scroll reveal */
  function initReveal() {
    const revealElements = document.querySelectorAll(
      '.section-header, .feature-card, .screenshot-item, .testimonial-card, .pricing-card, .version-card, .content-section'
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

  /* Purchase form */
  function initPurchaseForm() {
    if (!purchaseForm) return;

    const statusEl = document.getElementById('purchase-status');
    const submitBtn = purchaseForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

    purchaseForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(purchaseForm);
      const data = Object.fromEntries(formData.entries());

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      }

      try {
        const response = await fetch(purchaseForm.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          statusEl.textContent = statusEl.dataset.success || 'Thank you! Your request has been sent.';
          statusEl.className = 'form-status success';
          purchaseForm.reset();
        } else {
          throw new Error(result.message || 'Failed to send request');
        }
      } catch (error) {
        statusEl.textContent = statusEl.dataset.error || 'Something went wrong. Please try again.';
        statusEl.className = 'form-status error';
        console.error('Purchase form error:', error);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
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
    applyTheme(getPreferredTheme());
    handleScroll();
    closeMobileMenu();
    initLanguagePreference();

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (mobileToggle) mobileToggle.addEventListener('click', toggleMobileMenu);

    window.addEventListener('scroll', handleScroll, { passive: true });

    initReveal();
    initPurchaseForm();
    initSmoothScroll();

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
