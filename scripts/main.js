/**
 * Main JavaScript - Portfolio Website
 *
 * Handles core functionality:
 * - Mobile navigation toggle
 * - Active navigation state
 * - Smooth scroll behavior
 * - Accessibility enhancements
 */

"use strict";

(function() {
  // ============================================
  // DOM REFERENCES
  // ============================================
  const navToggle = document.querySelector('.nav__toggle');
  const navMobile = document.querySelector('.nav__menu--mobile');
  const navLinks = document.querySelectorAll('.nav__link');
  const skipLink = document.querySelector('.skip-link');

  // ============================================
  // MOBILE NAVIGATION
  // ============================================

  /**
   * Toggle mobile navigation menu
   * Handles aria-expanded state and menu visibility
   */
  function toggleMobileNav() {
    if (!navToggle || !navMobile) return;

    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';

    navToggle.setAttribute('aria-expanded', !isExpanded);
    navMobile.classList.toggle('is-open');

    // Prevent body scroll when menu is open
    document.body.style.overflow = isExpanded ? '' : 'hidden';

    // Focus first link when menu opens
    if (!isExpanded) {
      const firstLink = navMobile.querySelector('.nav__link');
      if (firstLink) {
        firstLink.focus();
      }
    }
  }

  /**
   * Close mobile navigation menu
   */
  function closeMobileNav() {
    if (!navToggle || !navMobile) return;

    navToggle.setAttribute('aria-expanded', 'false');
    navMobile.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  /**
   * Handle keyboard navigation in mobile menu
   * @param {KeyboardEvent} event
   */
  function handleMobileNavKeydown(event) {
    if (event.key === 'Escape') {
      closeMobileNav();
      navToggle.focus();
    }
  }

  // ============================================
  // NAVIGATION STATE
  // ============================================

  /**
   * Set active navigation link based on current page
   * Uses aria-current="page" for accessibility
   */
  function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      const linkPage = linkHref.split('/').pop();

      // Check if this link matches current page
      const isActive = linkPage === currentPage ||
                       (currentPage === '' && linkPage === 'index.html') ||
                       (currentPage === 'index.html' && linkPage === 'index.html');

      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  // ============================================
  // SMOOTH SCROLL
  // ============================================

  /**
   * Handle smooth scroll for anchor links
   * Respects prefers-reduced-motion setting
   * @param {Event} event
   */
  function handleAnchorClick(event) {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    event.preventDefault();

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    targetElement.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start'
    });

    // Set focus to target element for accessibility
    targetElement.setAttribute('tabindex', '-1');
    targetElement.focus({ preventScroll: true });
  }

  // ============================================
  // SKIP LINK
  // ============================================

  /**
   * Handle skip link functionality
   * Ensures focus moves to main content
   */
  function handleSkipLink() {
    if (!skipLink) return;

    skipLink.addEventListener('click', function(event) {
      event.preventDefault();

      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.setAttribute('tabindex', '-1');
        mainContent.focus();
      }
    });
  }

  // ============================================
  // WINDOW RESIZE HANDLER
  // ============================================

  /**
   * Handle window resize
   * Closes mobile nav if window is resized to desktop size
   */
  function handleResize() {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    if (isDesktop && navMobile && navMobile.classList.contains('is-open')) {
      closeMobileNav();
    }
  }

  // Debounce utility for resize handler
  let resizeTimeout;
  function debouncedResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 150);
  }

  // ============================================
  // EVENT LISTENERS
  // ============================================

  function initEventListeners() {
    // Mobile navigation toggle
    if (navToggle) {
      navToggle.addEventListener('click', toggleMobileNav);
    }

    // Close mobile nav when link is clicked
    if (navMobile) {
      navMobile.addEventListener('click', function(event) {
        if (event.target.matches('.nav__link')) {
          closeMobileNav();
        }
      });

      // Keyboard handling for mobile nav
      navMobile.addEventListener('keydown', handleMobileNavKeydown);
    }

    // Smooth scroll for anchor links
    document.addEventListener('click', handleAnchorClick);

    // Skip link
    handleSkipLink();

    // Window resize
    window.addEventListener('resize', debouncedResize);

    // Close mobile nav on escape key (global)
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && navMobile && navMobile.classList.contains('is-open')) {
        closeMobileNav();
        navToggle.focus();
      }
    });
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  function init() {
    setActiveNavLink();
    initEventListeners();

    // Log initialization in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('Portfolio website initialized');
    }
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
