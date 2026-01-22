# TECHNICAL_REQUIREMENTS.md

## Purpose
This document defines the technical requirements and coding standards for the portfolio website project. It is intended to be read by the code generator (Claude Code) before any code changes are made. The goal is to ensure the site remains:

- Minimalist, performant, and mobile-first
- SEO optimized and accessible
- Cleanly structured and maintainable
- Built using only HTML, CSS, and JavaScript (no frameworks)
- Well documented and testable

This document is written as guidance for a junior engineer to follow when contributing code.

---

## 1. General Project Requirements

### 1.1 Stack
- Use **plain HTML, CSS, and JavaScript only**
- No frontend frameworks (React, Vue, Svelte, etc.)
- No CSS frameworks (Tailwind, Bootstrap, etc.)
- No bundlers (Webpack, Vite, etc.)
- The site must be **static** and deployable to GitHub Pages

### 1.2 Browser Support
- Support modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- Ensure graceful degradation for older browsers (ES5-compatible JavaScript when feasible)
- Avoid experimental APIs unless polyfilled or fallback is provided

### 1.3 Performance
- Keep total page weight small
- Optimize images and avoid large assets
- Use **lazy loading** for non-critical assets (images, videos)
- Minimize render-blocking CSS and JS
- Prefer CSS for animations over JavaScript where possible
- Avoid unnecessary DOM operations and layout thrashing

### 1.4 Accessibility (A11y)
The site must follow modern accessibility best practices and meet WCAG AA standards.

#### 1.4.1 Semantic HTML
- Use semantic HTML elements (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`, etc.)
- Maintain a clear document outline
- Use heading elements (`<h1>` through `<h6>`) in logical order

#### 1.4.2 Keyboard Accessibility
- All interactive elements must be operable via keyboard (Tab, Shift+Tab, Enter, Space)
- Ensure logical tab order
- Provide visible focus styles on all focusable elements
- Use `:focus-visible` for focus styling where appropriate
- Implement keyboard support for custom UI components (modals, dropdowns, tabs)

#### 1.4.3 Screen Reader Support
- Provide meaningful `aria-*` attributes only when necessary
- Use ARIA roles for custom widgets (e.g., `role="dialog"`, `role="tablist"`, `role="tabpanel"`)
- Ensure proper labeling (`aria-label`, `aria-labelledby`) for UI controls
- Provide status announcements for dynamic content (e.g., `aria-live="polite"` for notifications)

#### 1.4.4 Forms
- Use `<label>` for all form inputs
- Ensure labels are correctly associated with inputs (`for` attribute)
- Provide clear error messaging and inline validation
- Use accessible input types (`email`, `tel`, `url`, etc.)
- Provide accessible form hints and helper text
- Include a lightweight spam-prevention method (e.g., honeypot field)

#### 1.4.5 Visual Design & Contrast
- Ensure color contrast meets WCAG AA (minimum 4.5:1 for normal text, 3:1 for large text)
- Avoid using color alone to convey meaning
- Ensure text is readable at small sizes
- Provide sufficient spacing and line height

#### 1.4.6 Reduced Motion
- Respect the user’s `prefers-reduced-motion` setting
- Disable non-essential animations and transitions when reduced motion is enabled
@media (prefers-reduced-motion: reduce) {

{
animation: none !important;
transition: none !important;
scroll-behavior: auto !important;
}
}

#### 1.4.7 Skip Links & Landmarks
- Provide a skip link to bypass navigation (`<a href="#main-content" class="skip-link">Skip to main content</a>`)
- Ensure main regions have landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`)

#### 1.4.8 Focus Management
- When opening overlays (modals, dialogs), move focus into the overlay
- Trap focus within overlays while open
- Restore focus to the triggering element when closed

#### 1.4.9 Accessible Tables & Lists
- Use tables only for tabular data
- Provide `<th>` for headers and `scope` attributes where needed
- Use lists (`<ul>`, `<ol>`) for grouped content

#### 1.4.10 Accessibility Testing
- Perform keyboard-only navigation checks
- Validate with Lighthouse accessibility audit
- Use screen reader testing (VoiceOver or NVDA) for key pages

### 1.5 SEO
- Each page must have a unique, descriptive `<title>` and `<meta name="description">`
- Use semantic headings in logical order
- Use structured data where appropriate (JSON-LD for organization, person, portfolio items)
- Provide canonical links if duplicate content exists
- Ensure internal navigation uses descriptive link text
- Provide an accessible sitemap and robots.txt (if applicable)

---

## 2. HTML Requirements

### 2.1 Structure & Semantics
- Use **semantic HTML** throughout
- Avoid generic `<div>` and `<span>` elements unless necessary
- Ensure the page has a clear document outline
- Use `main` for the primary content area

### 2.2 Metadata
- Include the following in `<head>`:
  - `<meta charset="UTF-8">`
  - `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
  - `<meta name="description" content="...">`
  - Open Graph tags for social sharing
  - Twitter card metadata
  - Favicon link
- Each page must include a unique title and description

### 2.3 Links & Navigation
- Use `<a>` elements for navigation and external links
- Use `rel="noopener noreferrer"` on external links that open in new tabs
- Use `aria-current="page"` on the active navigation item

### 2.4 Forms (Contact Page)
- Use `<label>` for all form inputs
- Use appropriate input types (`email`, `tel`, etc.)
- Provide validation and error messages (client-side)
- Prevent form spam using a lightweight method (e.g., honeypot field)

---

## 3. CSS Requirements

### 3.1 Organization
- Use a single `styles.css` file unless a compelling reason exists
- Keep styles modular and grouped by layout, components, and utilities
- Use CSS custom properties (variables) for:
  - colors
  - typography
  - spacing
  - layout breakpoints

### 3.2 Naming & Structure
- Use a consistent naming convention (BEM recommended)
- Avoid deeply nested selectors
- Avoid `!important` unless absolutely necessary

### 3.3 Responsiveness
- Design mobile-first
- Use CSS Grid and Flexbox for layout
- Define breakpoints using `min-width` media queries
- Ensure all sections are responsive across common screen sizes

### 3.4 Typography
- Use system fonts for performance
- Maintain consistent typography scale (e.g., using CSS variables)
- Ensure line height and letter spacing are readable

### 3.5 Animations
- Prefer CSS transitions and keyframes
- Avoid heavy or complex animations that impact performance
- Provide reduced-motion support (see Section 1.4.6)

---

## 4. JavaScript Requirements

### 4.1 General Rules
- Use vanilla JavaScript only
- Keep scripts small and focused
- Avoid global variables; use modules or IIFEs
- Use strict mode (`"use strict";`)
- Use descriptive variable and function names
- Add comments to clarify non-obvious logic

### 4.2 DOM & Event Handling
- Use event delegation where appropriate
- Avoid querying the DOM repeatedly in loops
- Cache DOM references when used frequently
- Avoid layout thrashing (limit reads/writes to the DOM)

### 4.3 Accessibility
- Ensure keyboard support for all interactive components
- Ensure focus management when opening/closing overlays or modals
- Use ARIA roles and attributes only when needed
- Provide screen reader announcements for dynamic content

### 4.4 State & UI Updates
- Keep UI state in a single source of truth when feasible
- Use data attributes for component state (`data-`)

### 4.5 Security
- Avoid using `innerHTML` with untrusted content
- Escape user-generated content when injecting into the DOM
- Avoid exposing API keys or secrets in the client-side code

---

## 5. Project Structure Requirements

### 5.1 Recommended Directory Layout
/
├── index.html
├── about.html
├── projects.html
├── contact.html
├── resume.pdf
├── styles/
│   └── styles.css
├── scripts/
│   └── main.js
├── assets/
│   ├── images/
│   └── icons/
├── docs/
│   ├── LAYOUT.md
│   ├── TECHNICAL_REQUIREMENTS.md
│   └── features/
├── test/
│   └── <test scripts>
└── README.md

### 5.2 File Naming
- Use lowercase filenames with hyphens (`project-details.html`, not `ProjectDetails.html`)
- Keep naming consistent across the codebase

---

## 6. Documentation Requirements

### 6.1 Code Documentation
- Add comments for:
  - complex logic
  - non-obvious UI behavior
  - accessibility considerations
- Keep comments concise and relevant

### 6.2 Feature Documentation
- Any feature beyond basic layout must be documented in `/docs/features`
- Feature docs must include:
  - Purpose
  - User behavior
  - Implementation notes
  - Any limitations or known issues

### 6.3 Change Documentation
- If a structural change occurs, update the relevant docs file
- Keep documentation concise and focused

---

## 7. Testing Requirements

### 7.1 Testing Approach
- All code must be tested manually at minimum
- Document the test approach in `test/`
- Each test script must include:
  - A header comment describing the purpose
  - Individual test functions with comments

### 7.2 Recommended Test Cases
- Navigation works on desktop and mobile
- Keyboard navigation works for all interactive elements
- Form validation and submission behavior
- Responsive layout checks
- SEO checks (meta tags, headings)
- Performance checks (page weight, load time)
- Accessibility checks (skip links, focus states, screen reader usability)

---

## 8. Release & Deployment Requirements

### 8.1 GitHub Pages
- Ensure the site is deployable as a static site
- Ensure correct base paths for assets and links
- Validate that pages work when served from the GitHub Pages environment

### 8.2 Version Control
- Use meaningful commit messages
- Keep PRs small and focused (if applicable)

---

## 9. Code Review Checklist (For Claude Code)
Before finalizing any change, validate:

- [ ] HTML is semantic and accessible
- [ ] CSS is modular, responsive, and uses variables
- [ ] JS is minimal, efficient, and secure
- [ ] No unused code or dead assets
- [ ] All new features documented in `/docs/features`
- [ ] Manual tests documented in `test/`
- [ ] Deployment works on GitHub Pages
- [ ] SEO meta tags present and correct
- [ ] Keyboard navigation works for all UI elements
- [ ] Accessibility checks pass (contrast, focus, screen reader, skip link)

---

## 10. Notes for Claude Code
When you are asked to implement a feature:

1. **Explain your plan first** (what you will implement, where, and why).
2. **Confirm adherence** to this TECHNICAL_REQUIREMENTS.md file.
3. **Proceed only after approval**.
4. **Document** the feature in `/docs/features` if it is not a basic UI layout change.
5. **Test** and add test scripts to `/test/` when complete.
