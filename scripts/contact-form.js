/**
 * Contact Form Handler - Portfolio Website
 *
 * Handles contact form functionality:
 * - Client-side validation
 * - Honeypot spam prevention
 * - Form submission (frontend only - requires backend integration)
 * - Accessible error messaging
 * - Form status announcements for screen readers
 */

"use strict";

(function() {
  // ============================================
  // DOM REFERENCES
  // ============================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  // Exit if contact form doesn't exist on this page
  if (!contactForm) return;

  // Form field references
  const fields = {
    name: contactForm.querySelector('#contact-name'),
    email: contactForm.querySelector('#contact-email'),
    message: contactForm.querySelector('#contact-message'),
    honeypot: contactForm.querySelector('#contact-website') // Honeypot field
  };

  // ============================================
  // VALIDATION RULES
  // ============================================
  const validationRules = {
    name: {
      required: true,
      minLength: 2,
      maxLength: 100,
      pattern: null,
      messages: {
        required: 'Please enter your name.',
        minLength: 'Name must be at least 2 characters.',
        maxLength: 'Name must be less than 100 characters.'
      }
    },
    email: {
      required: true,
      minLength: null,
      maxLength: 254,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      messages: {
        required: 'Please enter your email address.',
        pattern: 'Please enter a valid email address.',
        maxLength: 'Email must be less than 254 characters.'
      }
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 5000,
      pattern: null,
      messages: {
        required: 'Please enter a message.',
        minLength: 'Message must be at least 10 characters.',
        maxLength: 'Message must be less than 5000 characters.'
      }
    }
  };

  // ============================================
  // VALIDATION FUNCTIONS
  // ============================================

  /**
   * Validate a single field against its rules
   * @param {string} fieldName - Name of the field to validate
   * @param {string} value - Value to validate
   * @returns {string|null} - Error message or null if valid
   */
  function validateField(fieldName, value) {
    const rules = validationRules[fieldName];
    if (!rules) return null;

    const trimmedValue = value.trim();

    // Required check
    if (rules.required && !trimmedValue) {
      return rules.messages.required;
    }

    // Skip other validations if field is empty and not required
    if (!trimmedValue) return null;

    // Min length check
    if (rules.minLength && trimmedValue.length < rules.minLength) {
      return rules.messages.minLength;
    }

    // Max length check
    if (rules.maxLength && trimmedValue.length > rules.maxLength) {
      return rules.messages.maxLength;
    }

    // Pattern check
    if (rules.pattern && !rules.pattern.test(trimmedValue)) {
      return rules.messages.pattern;
    }

    return null;
  }

  /**
   * Validate all form fields
   * @returns {Object} - { isValid: boolean, errors: { fieldName: errorMessage } }
   */
  function validateForm() {
    const errors = {};
    let isValid = true;

    for (const fieldName in fields) {
      // Skip honeypot field
      if (fieldName === 'honeypot') continue;

      const field = fields[fieldName];
      if (!field) continue;

      const error = validateField(fieldName, field.value);
      if (error) {
        errors[fieldName] = error;
        isValid = false;
      }
    }

    return { isValid, errors };
  }

  // ============================================
  // UI FUNCTIONS
  // ============================================

  /**
   * Show error message for a field
   * @param {HTMLElement} field - The input/textarea element
   * @param {string} message - Error message to display
   */
  function showFieldError(field, message) {
    const errorElement = field.parentElement.querySelector('.form__error');

    field.classList.add('form__input--error');
    field.setAttribute('aria-invalid', 'true');

    if (errorElement) {
      errorElement.textContent = message;
      errorElement.removeAttribute('hidden');
      field.setAttribute('aria-describedby', errorElement.id);
    }
  }

  /**
   * Clear error message for a field
   * @param {HTMLElement} field - The input/textarea element
   */
  function clearFieldError(field) {
    const errorElement = field.parentElement.querySelector('.form__error');

    field.classList.remove('form__input--error');
    field.removeAttribute('aria-invalid');

    if (errorElement) {
      errorElement.textContent = '';
      errorElement.setAttribute('hidden', '');
      field.removeAttribute('aria-describedby');
    }
  }

  /**
   * Clear all field errors
   */
  function clearAllErrors() {
    for (const fieldName in fields) {
      if (fieldName === 'honeypot') continue;

      const field = fields[fieldName];
      if (field) {
        clearFieldError(field);
      }
    }
  }

  /**
   * Display form validation errors
   * @param {Object} errors - { fieldName: errorMessage }
   */
  function displayErrors(errors) {
    clearAllErrors();

    for (const fieldName in errors) {
      const field = fields[fieldName];
      if (field) {
        showFieldError(field, errors[fieldName]);
      }
    }

    // Focus first field with error
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField && fields[firstErrorField]) {
      fields[firstErrorField].focus();
    }
  }

  /**
   * Show form status message
   * @param {string} type - 'success' or 'error'
   * @param {string} message - Message to display
   */
  function showFormStatus(type, message) {
    if (!formStatus) return;

    formStatus.textContent = message;
    formStatus.className = `form__status form__status--${type}`;
    formStatus.removeAttribute('hidden');

    // Announce to screen readers
    formStatus.setAttribute('role', 'alert');
  }

  /**
   * Hide form status message
   */
  function hideFormStatus() {
    if (!formStatus) return;

    formStatus.textContent = '';
    formStatus.className = 'form__status';
    formStatus.setAttribute('hidden', '');
    formStatus.removeAttribute('role');
  }

  /**
   * Reset form to initial state
   */
  function resetForm() {
    contactForm.reset();
    clearAllErrors();
    hideFormStatus();
  }

  /**
   * Set form loading state
   * @param {boolean} isLoading
   */
  function setLoadingState(isLoading) {
    const submitButton = contactForm.querySelector('button[type="submit"]');

    if (isLoading) {
      submitButton.disabled = true;
      submitButton.setAttribute('aria-busy', 'true');
      submitButton.textContent = 'Sending...';
    } else {
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
      submitButton.textContent = 'Send Message';
    }
  }

  // ============================================
  // SPAM PREVENTION
  // ============================================

  /**
   * Check if honeypot field is filled (indicates bot)
   * @returns {boolean} - True if likely a bot
   */
  function isSpamBot() {
    return fields.honeypot && fields.honeypot.value.trim() !== '';
  }

  // ============================================
  // FORM SUBMISSION
  // ============================================

  /**
   * Handle form submission
   * Note: This is a frontend-only implementation.
   * For actual submission, integrate with a backend service like:
   * - Formspree (https://formspree.io)
   * - Netlify Forms
   * - Custom backend endpoint
   *
   * @param {Event} event
   */
  async function handleSubmit(event) {
    event.preventDefault();

    // Hide any previous status messages
    hideFormStatus();

    // Check for spam bot
    if (isSpamBot()) {
      // Silently fail for bots - don't reveal honeypot detection
      showFormStatus('success', 'Thank you for your message! I will get back to you soon.');
      resetForm();
      return;
    }

    // Validate form
    const { isValid, errors } = validateForm();

    if (!isValid) {
      displayErrors(errors);
      return;
    }

    // Clear any previous errors
    clearAllErrors();

    // Set loading state
    setLoadingState(true);

    try {
      // Collect form data
      const formData = {
        name: fields.name.value.trim(),
        email: fields.email.value.trim(),
        message: fields.message.value.trim()
      };

      // ================================================
      // BACKEND INTEGRATION POINT
      // ================================================
      // Replace this section with actual form submission logic.
      //
      // Example with Formspree:
      // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      //
      // if (!response.ok) {
      //   throw new Error('Form submission failed');
      // }
      // ================================================

      // Simulate network request (remove in production)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Log form data in development
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Form submission data:', formData);
      }

      // Show success message
      showFormStatus('success', 'Thank you for your message! I will get back to you soon.');
      resetForm();

    } catch (error) {
      // Log error in development
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.error('Form submission error:', error);
      }

      // Show error message
      showFormStatus('error', 'Sorry, there was a problem sending your message. Please try again later or email me directly.');
    } finally {
      setLoadingState(false);
    }
  }

  // ============================================
  // REAL-TIME VALIDATION
  // ============================================

  /**
   * Handle field blur event for real-time validation
   * @param {Event} event
   */
  function handleFieldBlur(event) {
    const field = event.target;
    const fieldName = field.id.replace('contact-', '');

    // Skip honeypot
    if (fieldName === 'website') return;

    const error = validateField(fieldName, field.value);

    if (error) {
      showFieldError(field, error);
    } else {
      clearFieldError(field);
    }
  }

  /**
   * Handle field input event to clear errors while typing
   * @param {Event} event
   */
  function handleFieldInput(event) {
    const field = event.target;

    // Clear error state while user is typing (if field had error)
    if (field.classList.contains('form__input--error')) {
      clearFieldError(field);
    }
  }

  // ============================================
  // EVENT LISTENERS
  // ============================================

  function initEventListeners() {
    // Form submission
    contactForm.addEventListener('submit', handleSubmit);

    // Real-time validation on blur
    for (const fieldName in fields) {
      if (fieldName === 'honeypot') continue;

      const field = fields[fieldName];
      if (field) {
        field.addEventListener('blur', handleFieldBlur);
        field.addEventListener('input', handleFieldInput);
      }
    }
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  function init() {
    initEventListeners();

    // Log initialization in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('Contact form initialized');
    }
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
