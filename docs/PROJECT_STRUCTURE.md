# PROJECT_STRUCTURE.md

## Purpose

This document defines the complete file and directory structure for the portfolio website. It serves as a reference for maintaining consistency and understanding how the project is organized.

---

## Directory Tree

```
portfolio_website/
├── index.html                 # Home page (landing)
├── resume.html                # Resume/experience page
├── projects.html              # Projects showcase page
├── contact.html               # Contact form page
├── resume.pdf                 # Downloadable resume file
├── robots.txt                 # Search engine crawling rules
├── sitemap.xml                # SEO sitemap
├── favicon.ico                # Browser tab icon
│
├── styles/
│   ├── styles.css             # Main stylesheet (all styles)
│   └── normalize.css          # CSS reset for cross-browser consistency
│
├── scripts/
│   ├── main.js                # Primary JavaScript (navigation, UI)
│   └── contact-form.js        # Contact form validation and submission
│
├── assets/
│   ├── images/
│   │   ├── profile/           # Profile photos and headshots
│   │   ├── projects/          # Project screenshots and thumbnails
│   │   └── misc/              # Other images (backgrounds, etc.)
│   │
│   └── icons/
│       ├── social/            # Social media icons (LinkedIn, GitHub, etc.)
│       └── ui/                # UI icons (menu, close, external link, etc.)
│
├── docs/
│   ├── LAYOUT.md              # Tab structure and content guidelines
│   ├── TECHNICAL_REQUIREMENTS.md  # Coding standards and requirements
│   ├── PROJECT_STRUCTURE.md   # This file
│   └── features/              # Feature documentation
│       └── <feature-name>.md  # Individual feature docs
│
├── test/
│   └── <test-scripts>.js      # Manual and automated test scripts
│
├── CLAUDE.md                  # Project context for Claude Code
└── README.md                  # Project overview and setup instructions
```

---

## Directory Descriptions

### Root Directory (`/`)

| File | Purpose |
|------|---------|
| `index.html` | Home/landing page. Entry point for all visitors. |
| `resume.html` | Resume page with work experience and downloadable PDF. |
| `projects.html` | Projects showcase with cards and featured projects. |
| `contact.html` | Contact form and direct contact information. |
| `resume.pdf` | Downloadable resume file (keep updated). |
| `robots.txt` | Instructs search engine crawlers on indexing rules. |
| `sitemap.xml` | Lists all pages for SEO and search engine discovery. |
| `favicon.ico` | Browser tab icon (also provide PNG versions for modern browsers). |
| `CLAUDE.md` | Instructions and context for Claude Code assistant. |
| `README.md` | Project documentation for GitHub (setup, deployment, etc.). |

---

### `/styles/`

Contains all CSS files for the website.

| File | Purpose |
|------|---------|
| `styles.css` | Main stylesheet containing all custom styles. Organized into sections: variables, reset overrides, layout, components, utilities, and responsive breakpoints. |
| `normalize.css` | Optional CSS reset for consistent cross-browser defaults. Can be omitted if using a minimal custom reset within `styles.css`. |

**CSS Architecture (within `styles.css`):**

```css
/* ============================================
   TABLE OF CONTENTS
   ============================================
   1. CSS Custom Properties (Variables)
   2. Base / Reset Styles
   3. Typography
   4. Layout (Grid, Flexbox containers)
   5. Components
      5.1 Navigation
      5.2 Buttons
      5.3 Cards
      5.4 Forms
      5.5 Footer
   6. Page-Specific Styles
      6.1 Home
      6.2 Resume
      6.3 Projects
      6.4 Contact
   7. Utilities
   8. Accessibility
   9. Animations
   10. Media Queries (Mobile-first breakpoints)
   ============================================ */
```

---

### `/scripts/`

Contains all JavaScript files.

| File | Purpose |
|------|---------|
| `main.js` | Core functionality: navigation, theme toggle (if applicable), scroll behavior, and shared UI interactions. |
| `contact-form.js` | Contact form validation, honeypot spam prevention, and form submission handling. |

**JavaScript Organization:**

- Use IIFEs or ES6 modules to avoid global namespace pollution
- Each file should have a clear, single responsibility
- Add new files only when functionality is clearly separate (e.g., `projects-filter.js` if filtering is added)

---

### `/assets/`

Contains all static assets (images and icons).

#### `/assets/images/`

| Subdirectory | Purpose |
|--------------|---------|
| `profile/` | Profile photos, headshots. Use optimized formats (WebP with JPEG fallback). |
| `projects/` | Project screenshots and thumbnails. Name files descriptively: `project-name-thumbnail.webp`. |
| `misc/` | Background images, decorative graphics, or other visuals. |

#### `/assets/icons/`

| Subdirectory | Purpose |
|--------------|---------|
| `social/` | Social media icons (GitHub, LinkedIn, email). Prefer SVG for scalability. |
| `ui/` | Interface icons (hamburger menu, close, external link arrow, etc.). Prefer SVG. |

**Asset Guidelines:**

- Optimize all images before committing (use tools like ImageOptim, Squoosh)
- Prefer SVG for icons and simple graphics
- Provide WebP with fallbacks for photographs
- Use descriptive, lowercase, hyphenated filenames: `project-dashboard-screenshot.webp`

---

### `/docs/`

Contains project documentation.

| File | Purpose |
|------|---------|
| `LAYOUT.md` | Defines tab structure, content guidelines, and navigation UX. |
| `TECHNICAL_REQUIREMENTS.md` | Coding standards, accessibility rules, and technical constraints. |
| `PROJECT_STRUCTURE.md` | This document. Explains file/folder organization. |

#### `/docs/features/`

Contains documentation for non-trivial features.

| File Naming | Example |
|-------------|---------|
| `<feature-name>.md` | `contact-form-validation.md`, `project-filtering.md` |

Each feature doc should include:
- Purpose
- User behavior
- Implementation notes
- Limitations or known issues

---

### `/test/`

Contains test scripts and testing documentation.

| File Naming | Example |
|-------------|---------|
| `<test-area>.js` | `navigation-tests.js`, `form-validation-tests.js` |

Each test file must include:
- Header comment describing what is being tested
- Individual test functions with descriptive comments
- Pass/fail criteria

---

## File Naming Conventions

| Rule | Example |
|------|---------|
| All lowercase | `contact.html`, not `Contact.html` |
| Use hyphens for multi-word names | `project-details.html`, not `projectDetails.html` |
| Descriptive names | `contact-form.js`, not `form.js` |
| Match page names to nav items | Tab "Projects" → `projects.html` |

---

## How Files Connect

```
┌─────────────────────────────────────────────────────────────┐
│                        HTML Pages                           │
│  (index.html, resume.html, projects.html, contact.html)     │
└─────────────────────────┬───────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
    ┌──────────┐   ┌──────────┐   ┌──────────────┐
    │ styles/  │   │ scripts/ │   │ assets/      │
    │ css      │   │ js       │   │ images/icons │
    └──────────┘   └──────────┘   └──────────────┘
```

**Linking in HTML:**

```html
<!-- In <head> -->
<link rel="stylesheet" href="styles/styles.css">

<!-- Before </body> -->
<script src="scripts/main.js"></script>
<script src="scripts/contact-form.js"></script> <!-- contact.html only -->
```

---

## Scalability Notes

### Adding a New Page

1. Create `new-page.html` in root directory
2. Add navigation link to all HTML files
3. Add page-specific styles to `styles.css` under "Page-Specific Styles"
4. Update `sitemap.xml`
5. If complex functionality needed, create `new-page.js` in `/scripts/`

### Adding a New Feature

1. Implement in appropriate JS file (or create new if warranted)
2. Document in `/docs/features/<feature-name>.md`
3. Add test script to `/test/`
4. Update this document if structure changes

### Adding New Assets

1. Place in appropriate `/assets/` subdirectory
2. Optimize before committing
3. Use descriptive filename
4. Reference with relative paths from HTML

---

## GitHub Pages Deployment

The site is static and deploys directly from the repository root:

- **Deployment source**: Main branch, root directory (`/`)
- **Base URL**: All paths should be relative (e.g., `styles/styles.css`, not `/styles/styles.css`)
- **No build step required**: Files are served as-is

---

## Quick Reference

| Need to... | Look in... |
|------------|-----------|
| Edit page content | `*.html` files in root |
| Change styles | `styles/styles.css` |
| Add interactivity | `scripts/main.js` or create new JS file |
| Add images | `assets/images/<category>/` |
| Add icons | `assets/icons/<category>/` |
| Document a feature | `docs/features/<feature>.md` |
| Add tests | `test/<area>-tests.js` |
| Update SEO | `sitemap.xml`, `robots.txt`, `<head>` meta tags |
