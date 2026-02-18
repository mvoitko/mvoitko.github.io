# CLAUDE.md

This file provides guidance to AI assistants working on the mvoitko.github.io repository.

## Project Overview

This is a **static personal portfolio website** for Maksym Voitko (Max Voitko), a Data Engineer. It is a single-page site hosted on GitHub Pages at the custom domain `maxvoitko.dev`.

## Repository Structure

```
mvoitko.github.io/
├── CLAUDE.md       # This file
├── CNAME           # GitHub Pages custom domain (maxvoitko.dev)
├── index.html      # The entire site - single HTML page
├── styles.css      # All styles for the site
└── .gitignore      # Standard Node.js gitignore (no build tooling currently used)
```

## Technology Stack

- **HTML5** - semantic markup, no JavaScript framework
- **CSS3** - vanilla CSS, no preprocessor
- **No build tools** - no npm, webpack, Vite, or any bundler
- **No JavaScript** - the page is currently static with no JS files
- **Hosting** - GitHub Pages (pushes to `master` branch deploy automatically)

## Development Workflow

### Making Changes

Since there is no build step, development is direct file editing:

1. Edit `index.html` or `styles.css` directly
2. Open `index.html` in a browser to preview locally (no server needed)
3. Commit and push to `master` to deploy

### Deployment

GitHub Pages serves the `master` branch root directory. Changes pushed to `master` are live within seconds to minutes at `maxvoitko.dev`.

There are no CI/CD pipelines, linters, or test runners configured.

## Site Structure

The site is a **single-page application** with anchor-link navigation. Sections are navigated via smooth scroll.

### Navigation Sections

| Nav Link | Anchor    | Description                        |
|----------|-----------|------------------------------------|
| About    | `#about`  | Profile photo and tagline          |
| Resume   | `#resume` | PDF download link                  |
| Projects | `#projects` | Achievements/projects showcase   |
| Contacts | `#contacts` | Email and social media links     |

### HTML Layout

```
<header>
  <nav id="navbar">     — Fixed top navigation bar
  <div id="intro">      — Hero section with logo and name

<main>
  <section id="about">  — Profile photo + tagline paragraph
  <section id="timeline"> — Career timeline (div#timeline, currently empty)
  <section id="contacts"> — Email link + social links div (currently empty)
  <section id="resume">   — Resume PDF download link (href currently empty)
  <section id="projects"> — div#achievements (currently empty)

<footer>                — Copyright notice
```

### Known Placeholder Elements

Several elements are present in the HTML but not yet filled in:

- `<img src="" alt="Max Voitko Logo">` — logo image missing
- `<img src="" alt="Max's Photo">` — profile photo missing
- `<a href="" accesskey="d">Download Resume PDF</a>` — resume PDF link missing
- `<div id="timeline">` — timeline content missing
- `<div class="social">` — social media links missing
- `<div id="achievements">` — project/achievement cards missing

When adding content to these placeholders, follow the existing HTML structure and CSS conventions described below.

## CSS Conventions

### Selectors

- **ID selectors** (`#about`, `#timeline`, `#logo`) for unique, single-use elements
- **Class selectors** (`.navbar`, `.intro`, `.email`, `.social`) for reusable styles
- Element selectors for global defaults (`h1`, `nav`, `section`, `a`, `img`, `footer`)

### Color Palette

| Usage         | Value    |
|---------------|----------|
| Background    | `#FFF`   |
| Navigation    | `black` / `#000` |
| Body text     | `#333`   |
| Links         | `grey`   |
| Footer text   | `#999`   |
| Borders       | `#eee`   |

### Typography

- Primary font: `'HelveticaNeue_Light'` with `Arial` fallback
- Thin variant: `'HelveticaNeue_Thin'` with `Arial` fallback
- Tagline (`p#about`): `45px/130%` — large, centered display text
- Footer: `12px` with `0.05em` letter-spacing

### Layout

- All sections are centered: `margin: 0 auto; text-align: center;`
- Full-width layout (`width: 100%`) with `min-width: 320px` for mobile
- `scroll-behavior: smooth` on `html` for anchor navigation
- Images are responsive: `max-width: 100%; height: auto;`
- Media query breakpoints are defined for iPad (768px–1024px) but currently empty

### Responsive Design

Currently only a mobile baseline and iPad media query stubs exist. Desktop styles are implicit (no `max-width` container is defined). When adding responsive styles, use the existing iPad media query block in `styles.css`.

## Key Conventions to Follow

1. **No build tools** — do not introduce npm, bundlers, or preprocessors without explicit discussion
2. **No frameworks** — keep the site vanilla HTML/CSS/JS unless otherwise agreed
3. **Semantic HTML** — use `<section>`, `<header>`, `<nav>`, `<main>`, `<footer>` appropriately
4. **ID uniqueness** — note that `id="about"` is used on both the `<section>` and a `<p>` inside it (a pre-existing bug); avoid duplicating this pattern
5. **Accessibility** — maintain `tabindex` attributes on nav items, `alt` text on images, and `accesskey` where present
6. **CSS-first styling** — add new styles to `styles.css`, not inline on HTML elements
7. **Minimize JS** — if adding JavaScript, prefer a single `<script>` tag at the bottom of `<body>` or a linked `.js` file; keep it minimal

## Common Tasks

### Adding a profile photo
Place the image file in the repo root and update the `src` attribute:
```html
<img src="photo.jpg" alt="Max's Photo">
```

### Adding a resume PDF
Place the PDF in the repo root and update the `href` attribute:
```html
<a href="resume.pdf" accesskey="d">Download Resume PDF</a>
```

### Adding social links
Inside `<div class="social">`, add anchor tags:
```html
<a href="https://linkedin.com/in/..." target="_blank" rel="noopener">LinkedIn</a>
```

### Adding timeline entries
Populate `<div id="timeline" class="timeline">` with timeline items (structure TBD; add corresponding CSS to `styles.css`).

### Adding project cards
Populate `<div id="achievements">` with project entries (structure TBD; add corresponding CSS to `styles.css`).

## Git Workflow

- **Default branch**: `master` (used for deployment)
- **No PR process** is enforced — direct commits to `master` deploy the site
- Commit messages should be short and descriptive (e.g., `Add profile photo`, `Update resume link`)
