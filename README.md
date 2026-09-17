# Rudy Quinternet - Personal Website

This repository contains my personal website: a small, animated, coding-inspired
portfolio built with Bun, React, TypeScript, and Vite.

The goal of the site is simple: give visitors a fast and pleasant way to
understand who I am, what I build, which technologies I use, and where they can
try my projects or read my CV.

## About Me

I am Rudy Quinternet, a senior software engineer based near Driebergen-Zeist in
the Netherlands, about fifteen minutes from Utrecht Centraal. I am available
**now** and looking for backend or full-stack engineering roles in
Utrecht and the surrounding area. I am an EU citizen, so no visa sponsorship is
required.

My stack is mostly TypeScript, Node, NestJS, Express, GraphQL, React, Next.js,
Java, Angular, Flutter, React Native, AWS, GCP, SQL, MongoDB, Cypress, Jest, and
CI/CD on both GitHub Actions and GitLab CI.
I have settled into a backend orientation while staying comfortable across the
whole stack, and I am currently most interested in concurrency, throughput, and
what it takes to keep a system healthy under load.

My background includes:

- Senior Software Engineer at Capgemini Engineering, full-stack with a strong
  backend orientation, focused on multithreading, concurrency, and code
  optimisation, while studying Rust, Go, and generative AI.
- Senior Full-stack Software Engineer at ALTEN on AI-generated video, audio, and
  text for medical training, including the Virtual Patients system sold to
  hospitals in France.
- Senior Full-stack Software Engineer at Thales, starting in test engineering and
  moving into development on cleared NATO projects with Angular, Node,
  TypeScript, and hexagonal architecture.
- Medior Full-stack Software Engineer at CMA CGM building container logistics
  tooling in Node, Angular, and Flutter, backed by AWS, Docker, and Kubernetes,
  shipped through GitLab CI.
- Freelance development and training across websites, apps, games, scripts,
  automation, cloud, and modern development tools, including GraphQL APIs and
  React Native apps for client work.

Away from the keyboard I climb and boulder, write fiction, and am working my way
toward a functional level of Dutch.

## Website Features

- A WebGL particle field behind the page: 1,400 points on a spherical shell,
  perspective-projected in a vertex shader and rotated by time and pointer.
  Written against raw WebGL rather than three.js, so the whole effect costs a
  few kilobytes instead of several hundred.
- 3D pointer tilt on the portrait and project cards, with a highlight that
  tracks the cursor. Transforms are written straight to the DOM inside a rAF,
  never through React state.
- An availability panel aimed at recruiters: start date, location, commute, and
  right to work at a glance.
- Experience timeline, grouped stack, projects, education, and a personal
  section.
- A built-in CV page at `#/cv`, rendered from the same data as the rest of the
  site so it cannot drift, with a print stylesheet for saving to PDF.
- A game of Snake on the CV page. It only captures arrow keys while a round is
  actually running, so it never interferes with scrolling, and it is hidden
  entirely when the CV is printed.
- Scroll reveals, responsive layout, and a full `prefers-reduced-motion` path
  that stops every animation including the particle field.
- GitHub Pages deployment through GitHub Actions.

## Design Notes

The visual direction is Apple-adjacent: large type, generous whitespace, an
asymmetric hero, restrained motion, and depth carried by real 3D rather than
drop shadows.

Type is a system stack that resolves to SF Pro on Apple hardware and Segoe UI
Variable on Windows. No webfont is downloaded, so there is no flash of unstyled
text and no layout shift.

Deliberately avoided: gradient headline text, fake macOS window chrome around
code samples, an uppercase micro-label above every section, and decorative
status dots. Those are the patterns that make a page read as machine-generated.

The site is dark only. That is a choice, not an oversight; the print stylesheet
covers the one case where a light rendering is actually needed.

## Tech Stack

- Bun for package management and scripts.
- React for the interface.
- TypeScript for type safety.
- Vite for fast development and static production builds.
- CSS custom properties, animations, and responsive custom styling.
- Raw WebGL for the particle field. No 3D framework, no animation library, no
  icon package: the site ships zero runtime dependencies beyond React.
- GitHub Actions and GitHub Pages for hosting.

## Content

Nearly everything on the site is data, not markup. `src/data/profile.ts` holds
the profile, experience, education, certifications, skill groups, personal
interests, and project list; every page renders from it. To update the site,
edit that one file.

The colour palette and the shape scale live in CSS custom properties at the top
of `src/styles.css`. Changing the accent family is a handful of token edits
rather than a search through the stylesheet.

Code is organised the way the Airbnb style guide asks for: one concern per
module, named exports, destructured props, no default exports, and hooks that
each do a single thing.

```
src/
  App.tsx          routing shell and structured data
  data/            profile content, the single source of truth
  hooks/           useRoute, useReveal, usePointerTilt, useTypewriter, useReducedMotion
  components/      ParticleField, Portrait, CodeSample, ContactPanel, SnakeGame, Header
  pages/           HomePage, AboutPage, CvPage
```

## Local Development

Install dependencies:

```bash
bun install
```

Start the development server:

```bash
bun run dev
```

Create a production build:

```bash
bun run build
```

Preview the production build locally:

```bash
bun run preview
```

## Deployment

The site is configured for GitHub Pages at:

```txt
https://radishoux.github.io/rudycom/
```

The deployment workflow lives in `.github/workflows/deploy.yml`. On every push
to `main` or `master`, GitHub Actions installs dependencies with Bun, builds the
Vite app, and publishes the generated `dist` folder to GitHub Pages.
