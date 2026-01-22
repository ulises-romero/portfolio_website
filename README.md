# Portfolio Website

A minimalist, performant, and accessible personal portfolio website built with vanilla HTML, CSS, and JavaScript. Designed for GitHub Pages deployment.

## Overview

This portfolio website showcases professional experience, projects, and provides a way for recruiters and collaborators to get in touch. Built with a focus on:

- **Performance** - Lightweight, no frameworks, optimized assets
- **Accessibility** - WCAG AA compliant, keyboard navigable, screen reader friendly
- **SEO** - Semantic HTML, meta tags, Open Graph, sitemap
- **Mobile-first** - Responsive design that works on all devices

## Pages

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Landing page with hero section and skills overview |
| Resume | `resume.html` | Work experience, skills, education, and downloadable PDF |
| Projects | `projects.html` | Featured and additional project showcase |
| Contact | `contact.html` | Contact form and direct contact information |

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid, BEM naming
- **JavaScript** - Vanilla ES6+, no dependencies
- **Deployment** - GitHub Pages (static hosting)

## Project Structure

```
portfolio_website/
├── index.html              # Home page
├── resume.html             # Resume page
├── projects.html           # Projects page
├── contact.html            # Contact page
├── resume.pdf              # Downloadable resume
├── robots.txt              # Search engine crawling rules
├── sitemap.xml             # SEO sitemap
├── favicon.ico             # Browser tab icon
│
├── styles/
│   └── styles.css          # Main stylesheet
│
├── scripts/
│   ├── main.js             # Navigation and core functionality
│   └── contact-form.js     # Form validation and submission
│
├── assets/
│   ├── images/
│   │   ├── profile/        # Profile photos
│   │   ├── projects/       # Project screenshots
│   │   └── misc/           # Other images
│   └── icons/
│       ├── social/         # Social media icons
│       └── ui/             # UI icons
│
├── docs/
│   ├── LAYOUT.md           # Tab structure and content guidelines
│   ├── TECHNICAL_REQUIREMENTS.md  # Coding standards
│   ├── PROJECT_STRUCTURE.md       # File organization guide
│   └── features/           # Feature documentation
│
├── test/
│   └── manual-test-checklist.js   # Test procedures
│
├── CLAUDE.md               # AI assistant context
└── README.md               # This file
```

## Local Development

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local HTTP server (any of the following):
  - Python 3: `python -m http.server`
  - Node.js: `npx serve`
  - VS Code: Live Server extension

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio_website.git
   cd portfolio_website
   ```

2. Start a local server:
   ```bash
   # Python 3
   python -m http.server 8000

   # Or Node.js
   npx serve
   ```

3. Open `http://localhost:8000` in your browser

## Deployment

This site is configured for GitHub Pages deployment:

1. Push changes to the `main` branch
2. Go to repository Settings > Pages
3. Set Source to "Deploy from a branch"
4. Select `main` branch and `/ (root)` folder
5. Save and wait for deployment

The site will be available at `https://yourusername.github.io/`

## Customization

### Personal Information

Update the following across all HTML files:

1. Replace "Your Name" with your actual name
2. Update social links (GitHub, LinkedIn, email)
3. Replace `yourusername` in URLs with your GitHub username
4. Update meta descriptions and Open Graph images

### Content

- **Home**: Edit hero text and skills in `index.html`
- **Resume**: Add your experience, skills, education in `resume.html`
- **Projects**: Add your projects in `projects.html`
- **Contact**: Update contact information in `contact.html`
- **Resume PDF**: Replace `resume.pdf` with your actual resume

### Styling

Edit `styles/styles.css` to customize:

- Colors: CSS custom properties in `:root`
- Typography: Font family and size variables
- Spacing: Spacing scale variables
- Components: Button, card, form styles

### Contact Form

The contact form requires backend integration for actual submission. Options:

1. **Formspree**: Free tier available, easy setup
2. **Netlify Forms**: If deploying on Netlify
3. **Custom backend**: Build your own endpoint

See `scripts/contact-form.js` for integration points.

## Accessibility Features

- Skip link for keyboard users
- Semantic HTML structure
- ARIA labels and roles where needed
- Visible focus indicators
- Color contrast meets WCAG AA
- Respects `prefers-reduced-motion`
- Mobile menu keyboard accessible

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Testing

Run through the test checklist in `test/manual-test-checklist.js`:

1. Navigation tests
2. Keyboard accessibility tests
3. Contact form tests
4. Responsive design tests
5. SEO and meta tests
6. Performance tests (Lighthouse)

## Documentation

- `docs/LAYOUT.md` - Page structure and content guidelines
- `docs/TECHNICAL_REQUIREMENTS.md` - Coding standards and requirements
- `docs/PROJECT_STRUCTURE.md` - Complete file organization reference

## License

This project is for personal use. Feel free to use it as a template for your own portfolio.
