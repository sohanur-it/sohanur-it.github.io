# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio for Sohanur Rahman, built with **React + Vite + Tailwind CSS + Framer Motion**. Deployed to GitHub Pages via GitHub Actions (`gh-pages` branch).

## Commands

```bash
npm run dev      # dev server (usually http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview built dist/ locally
```

## Project structure

```
src/
  App.jsx                  # root — mounts all section components
  index.css                # Tailwind directives + base styles (scrollbar, selection)
  components/
    Navbar.jsx             # sticky; transparent → frosted glass after 24px scroll; mobile hamburger
    Hero.jsx               # full-screen: avatar, typewriter greeting, social icons, CTAs
    About.jsx              # two-column: bio text + stats card
    Projects.jsx           # 3-col grid; clicking a card opens ProjectModal
    ProjectModal.jsx       # AnimatePresence overlay modal; closes on Escape or backdrop click
    Skills.jsx             # animated progress bars (useInView-triggered) + tech tag pills
    Contact.jsx            # 3 cards: email, location, social links
    Footer.jsx
  hooks/
    useTypewriter.js       # custom typewriter hook — closure-based, no deps
  data/
    projects.js            # array of project objects (title, image, tags, link, detail)
    skills.js              # skillBars[] and techTags[] arrays
public/
  assets/img/              # all images served as static files (reference as /assets/img/...)
```

## Key patterns

- **Animations**: Framer Motion `motion.*` components with `whileInView` + `viewport={{ once: true }}`; stagger via `variants` + `staggerChildren`; hover with `whileHover`
- **Skill bars**: `useInView` (from framer-motion) triggers `motion.div` width animation; data lives in `data/skills.js`
- **Project modal**: pure React state (`useState`) + `AnimatePresence` — no Bootstrap dependency
- **Navbar scroll**: `window.addEventListener('scroll')` sets `.scrolled` class for glassmorphism
- **Typewriter**: custom `useTypewriter` hook in `src/hooks/useTypewriter.js` — runs once on mount with closure variables
- **Colors**: Tailwind extended palette — `dark-900` (#0a0f1c), `dark-800` (#0f1626); accent uses Tailwind's built-in `emerald-*` scale

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds on push to `main`/`master` and deploys `dist/` to the `gh-pages` branch using `peaceiris/actions-gh-pages`.

> **One-time setup**: In your GitHub repo → Settings → Pages → set source branch to `gh-pages`.

## Adding a project

Add an object to `src/data/projects.js` and drop the image into `public/assets/img/project/`. No other files need touching.
