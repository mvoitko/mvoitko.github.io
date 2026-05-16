# CLAUDE.md

This file provides guidance to AI assistants working on the mvoitko.github.io repository.

## Project Overview

Personal portfolio website for **Maksym Voitko** — technology leader and staff engineer. Built with **Astro** (static site generator), deployed to GitHub Pages at `mxvtk.dev`.

## Repository Structure

```
mvoitko.github.io/
├── .github/workflows/deploy.yml  # GitHub Actions build + deploy
├── public/
│   ├── CNAME                     # Custom domain (mxvtk.dev)
│   └── favicon.svg
├── src/
│   ├── content.config.ts            # Zod schemas for content collections
│   ├── content/
│   │   ├── timeline/             # Timeline event .md files
│   │   └── blog/                 # Blog post .md files
│   ├── layouts/
│   │   ├── BaseLayout.astro      # HTML shell, fonts, header, footer
│   │   └── BlogPostLayout.astro  # Blog post wrapper
│   ├── components/               # Astro components (Header, Footer, Hero, cards, etc.)
│   ├── pages/                    # Route pages (index, about, timeline, resume, blog/)
│   ├── styles/
│   │   └── global.css            # Design tokens, reset, utilities, responsive breakpoints
│   └── data/
│       └── social-links.ts       # Social URLs with SVG icon paths (typed)
├── astro.config.mjs              # Site URL, sitemap, Shiki config
├── tsconfig.json
├── package.json
└── CLAUDE.md
```

## Technology Stack

- **Astro 6** — static site generator, no JS framework
- **TypeScript** — strict mode
- **CSS** — global design tokens (custom properties) + Astro scoped styles per component
- **Content Collections** — Markdown files with Zod-validated frontmatter for timeline and blog
- **Shiki** — syntax highlighting for blog code blocks
- **@astrojs/rss** — RSS feed generation
- **@astrojs/sitemap** — automatic sitemap
- **pnpm** — package manager (faster than npm, content-addressable store)
- **GitHub Actions** — build in node:22-alpine container, deploy to GitHub Pages
- **Dependency overrides** — `pnpm.overrides` in package.json pins transitive deps (vite, defu) to patched versions. Check Dependabot alerts after Astro upgrades.

## Development

```bash
pnpm dev           # Start dev server at localhost:4321
pnpm build         # Build static site to dist/
pnpm preview       # Preview built site locally
pnpm install       # Install dependencies
```

## Design System

All design tokens live in `src/styles/global.css`:

- **Dark theme**: background `#0A0E14`, cards `#111923`, accent `#00E87E`
- **Typography**: Fira Code (mono/headings), Inter (sans/body) — self-hosted woff2 in `public/fonts/`
- **Light theme**: defined in `[data-theme="light"]` block in global.css. Toggle persists to localStorage.
- **Layout**: 12-column bento grid on home, vertical alternating timeline
- **Responsive breakpoints**: 1024px (tablet → 6-col grid), 768px (mobile → 1-col, hamburger nav)
- **Category colors**: career `#00E87E`, education `#6C9FFF`, life `#FF6C9F`

## Content Collections

### Timeline (`src/content/timeline/`)
```yaml
date: 2023-07-01          # Required, coerced to Date
title: "Event Title"       # Required
category: career           # Required: career | education | life
tags: [AI, leadership]     # Required, array of strings
```

### Blog (`src/content/blog/`)
```yaml
title: "Post Title"        # Required
date: 2026-03-18           # Required
tags: [python, AI]         # Optional, defaults to []
status: published          # Optional: draft | published, defaults to draft
description: "Summary"     # Optional
```

Only posts with `status: published` appear on the site.

## Conventions

- **No JS frameworks** — pure Astro components. Use inline `<script>` for progressive enhancement only.
- **Responsive first** — every component must include mobile breakpoints. Test at 320px, 375px, 768px, 1024px, 1440px.
- **UTC dates** — use `getUTCMonth()`/`getUTCFullYear()` or `toLocaleDateString` with `timeZone: 'UTC'` for consistent builds.
- **SVG icons** — set `width`/`height` directly on SVG elements as HTML attributes, not via CSS (Astro scoped styles don't reach `set:html` content).
- **Social links** — typed in `src/data/social-links.ts`. Use `displayLinks` export (filters out Email) in components.
- **`.highlight` class** — defined in `global.css`, do not duplicate in scoped styles.
- **Semantic HTML** — use proper `<section>`, `<header>`, `<nav>`, `<main>`, `<footer>`.
- **Accessibility** — `aria-label` on icon-only links, `alt` text on images, sufficient contrast.
- **Fonts** — self-hosted in `public/fonts/`. `@font-face` in global.css. Do not add Google Fonts links.
- **Minimum font size** — 0.75rem (12px). Never go below this for any text.
- **Border contrast** — `--border` is `rgba(255,255,255,0.15)`, meeting WCAG 3:1. Do not reduce opacity.
- **prefers-reduced-motion** — all animations must be wrapped. Check global.css and Hero.astro for patterns.
- **Card headers** — use `.card-header` flex wrapper for inline icon + h3. Defined in global.css.
- **Body text color** — use `--text` (not `--text-muted`) for long-form content (about, resume, blog posts).
- **`backdrop-filter` gotcha** — creates a new containing block, breaking `position: fixed` on descendants. Always apply `backdrop-filter` to a `::before` pseudo-element instead of the parent. The parent needs `isolation: isolate` so `z-index: -1` on the pseudo stays within its stacking context.
- **Container alignment** — all full-width sections (main, header, footer, section-banner) must share horizontal padding `clamp(1.5rem, 5vw, 6rem)` and effective max-width `1440px`. Header uses dynamic padding formula instead of max-width to keep background full-viewport.
- **View transitions** — inline scripts that query DOM must register `astro:after-swap` listener to re-initialize. Pattern: wrap in named function, call it, then `document.addEventListener('astro:after-swap', fn)`.
- **Responsive JS thresholds** — checking `window.innerWidth` at init time won't recover when the viewport crosses that threshold later. Use `matchMedia` with a `change` listener for JS that enables/disables features at breakpoints.
- **Typography tokens** — `--text-xs` (0.75rem), `--text-sm` (0.875rem), `--text-base` (1rem), `--text-lg` (1.25rem), `--text-xl` (1.5rem). Ratio ≥1.25. Do not use hardcoded font sizes.
- **Spacing tokens** — `--space-xs` (0.25rem) through `--space-4xl` (6rem). Prefer semantic tokens for new code.
- **Easing tokens** — `--ease-out` (expo deceleration), `--ease-in-out` (smooth). Use for entrance animations and scroll reveals.
- **Shadow token** — `--shadow` is navy-tinted in dark theme, green-tinted in light. Use instead of `rgba(0,0,0,...)`.
- **Button variants** — `.btn-primary` (filled accent), `.btn-outline` (accent border, white text), `.btn-ghost` (muted border). All defined in global.css.

## Deployment

GitHub Pages deploys via GitHub Actions from the `master` branch. The workflow builds the Astro site in a `node:22-alpine` container using pnpm and deploys the `dist/` output. The `CNAME` file in `public/` preserves the custom domain.

### First-time setup (required once)

Go to the GitHub repo **Settings > Pages > Source** and switch from "Deploy from branch" to **"GitHub Actions"**. Without this, the workflow will build but not deploy.

## Git Workflow

- **`master`** — production branch, deploys automatically
- **`feature/<description>`** — for new features
- **`fix/<description>`** — for bug fixes
- Never commit directly to master. Use branches + pull requests.
- Commit each logical change separately. Keep commits focused.
