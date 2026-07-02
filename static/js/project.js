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
  const html = document.documentElement;
  const body = document.body;
  const header = document.getElementById('project-header');
  const themeToggle = document.getElementById('theme-toggle');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const purchaseForm = document.getElementById('purchase-form');

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

  /* Header scroll effect */
  function handleScroll() {
    const scrolled = window.scrollY > 20;
    if (header) {
      header.classList.toggle('scrolled', scrolled);
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
