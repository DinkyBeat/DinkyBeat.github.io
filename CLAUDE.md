# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static personal website for Vasudevan Govardhanen, deployed via GitHub Pages at **govardha.net** (configured in `CNAME`). No build tools, no framework, no package manager — just HTML, CSS, and vanilla JavaScript.

## Development

To preview locally, serve the repo root with any static file server, e.g.:
```
python3 -m http.server 8000
```

There are no build steps, tests, or linting tools.

## Visual Design System (v2 — Substack-inspired)

All pages share a unified light editorial aesthetic via the shared stylesheet.

- **Colors**: `#FAFAF8` background, `#0D0C0A` text, `#FF6719` accent orange, `#7A7970` muted/dim, `#E6E5E0` borders
- **Fonts** (Google Fonts CDN): Playfair Display (headings/display), Inter (body/UI)
- **Palette lives in one place**: `css/style.css` `:root` block — changing a variable there updates the entire site
- **Scroll progress bar**: fixed `#scrollBar` scaled via `scaleX` by `js/site.js`
- **Scroll animations**: `.reveal` class + `IntersectionObserver` in `js/site.js` adds `.visible`; stagger is automatic for sibling `.reveal` elements

## Architecture

### Shared files
- **`css/style.css`** — all global styles (reset, nav, page-header, buttons, tags, footer, coming-soon). Well-commented sections for each component. Edit variables in `:root` to retheme globally.
- **`js/site.js`** — shared JavaScript: scroll progress bar, reveal-on-scroll, active nav link detection. Included in every page's `</body>`.

### Page structure
Each section is a directory with its own `index.html`. All pages include `css/style.css` and `js/site.js`. Page-specific styles go in a `<style>` block inside that page's `<head>`.

| Page | Path | Status |
|------|------|--------|
| Home | `index.html` | Complete |
| About | `about/index.html` | Partial (coming soon block) |
| Projects | `projects/index.html` | Active |
| Blog | `blog/index.html` | Active |
| Notes | `notes/index.html` | Coming soon |
| Contact | `contact/index.html` | Partial |
| Problems | `problems/index.html` | Active |

### Blog system
Blog posts are stored as HTML *fragments* (no `<html>`/`<head>` wrapper) in `blog/posts/`. The blog index loads them dynamically via `fetch()` on click and injects into `.post-body`. After injection, `MathJax.typesetPromise()` is called. MathJax 3 is loaded from CDN.

Custom MathJax macro: `\Ima` → `\operatorname{im}`.

**Math rendering**: MathJax 3 from CDN, on `blog/index.html` and `problems/index.html`. Delimiters: `$...$` inline, `\[...\]` display.

## Adding Content

### New blog post
1. Create `blog/posts/your-post.html` (HTML fragment, no `<html>`/`<head>`)
2. Add a `.post-row` block in `blog/index.html` — see the comment template inside that file

### New problem
Add a `<div class="problem reveal">` block inside `.problem-grid` in `problems/index.html`.

### New project
Copy the commented template block in `projects/index.html` (clearly marked between `<!-- HOW TO ADD A NEW PROJECT -->` comments). Fill in title, description, stack tags, and action buttons. Each project hosted on a subdomain gets a primary `.action-btn.primary` button.

### New page
1. Copy any existing page's `<head>`, `<nav>`, and `<footer>`
2. Replace the content area
3. Keep `<link rel="stylesheet" href="/css/style.css">` and `<script src="/js/site.js"></script>`
4. Add the page to the `<ul class="nav-links">` in every page's nav

### Coming soon page
Drop a `.coming-soon` block (styled in `css/style.css`) inside `.page-wrap`. Remove it when you populate the page.

## Hosted Projects / Subdomains

Projects with a live hosted component (Flask apps, etc.) get a primary action button linking to their subdomain:
- `olave.govardha.net` — NFL analytics project
- Future apps follow the same pattern: add a project card in `projects/index.html`
