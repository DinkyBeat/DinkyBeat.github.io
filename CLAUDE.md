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

## Visual Design System

All pages share a unified dark aesthetic:
- **Colors**: `#0b0b0a` background, `#f0ece2` text, `#e82010` accent red, `#55554a` dim/muted
- **Fonts** (Google Fonts CDN): Bebas Neue (display headings), Space Grotesk (body/nav), Cormorant Garamond italic (captions/serif accent)
- **Custom cursor**: inner dot (`.c-dot`) + lagging outer ring (`.c-ring`) animated via RAF loop; both get `.on` class on link hover
- **Scroll progress bar**: fixed `div.scroll-bar` scaled via `scaleX` on scroll
- **Noise overlay**: fixed SVG turbulence filter overlay at ~3% opacity for texture
- **Scroll animations**: `IntersectionObserver` adds `.visible` class; elements start `opacity:0; transform:translateY(...)` and transition to their resting state with staggered `transitionDelay`
- **Marquee**: pure CSS `@keyframes marqueeRoll` on `translateX(-50%)` with content duplicated twice in HTML
- **Easing**: `--ease: cubic-bezier(0.16,1,0.3,1)` (spring-like) used throughout

## Architecture

**Page structure:** Each section is a directory with its own `index.html` (`/blog/`, `/about/`, `/notes/`, `/problems/`, `/contact/`). The root `index.html` is the home page.

**CSS:** `css/style.css` exists but most pages use inline `<style>` blocks instead. There is no shared stylesheet enforced across pages.

**Blog system:** Blog posts are stored as HTML *fragments* (no `<html>`/`<head>` wrapper) in `blog/posts/`. The blog index (`blog/index.html`) loads them dynamically via `fetch()` and injects the HTML into a container div on click. After injection, `MathJax.typesetPromise()` is called to render LaTeX in the loaded content.

**Math rendering:** MathJax 3 is loaded from CDN on pages that need LaTeX (`blog/index.html`, `problems/index.html`). The blog index defines a custom macro `\Ima` for `\operatorname{im}`.

## Adding Content

**New blog post:** Create an HTML fragment in `blog/posts/your-post.html` (no `<html>`/`<head>`, just content), then add a `.post-wrapper` entry and a corresponding empty `.post-content` div in `blog/index.html` following the existing pattern.

**New problems page entry:** Add a `<div class="problem">` block in `problems/index.html`. MathJax delimiters are `$...$` (inline) and `\[...\]` (display).
