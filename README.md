# Rudy Quinternet - Personal Website

This repository contains my personal website: a small, animated, coding-inspired
portfolio built with Bun, React, TypeScript, and Vite.

The goal of the site is simple: give visitors a fast and pleasant way to
understand who I am, what I build, which technologies I use, and where they can
try my projects or read my CV.

## About Me

I am Rudy Quinternet, a senior software engineer based near Driebergen-Zeist in
the Netherlands, about fifteen minutes from Utrecht Centraal. I am available from
**1 September 2026** and looking for backend or full-stack engineering roles in
Utrecht and the surrounding area. I am an EU citizen, so no visa sponsorship is
required.

My stack is mostly TypeScript, Node, NestJS, Express, React, Next.js, Java,
Angular, Flutter, React Native, AWS, GCP, SQL, MongoDB, Cypress, Jest, and CI/CD.
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
  tooling in Node, Angular, and Flutter, backed by AWS, Docker, and Kubernetes.
- Freelance development and training across websites, apps, games, scripts,
  automation, cloud, and modern development tools.

Away from the keyboard I climb and boulder, write fiction, and am working my way
toward a functional level of Dutch.

## Website Features

- Animated homepage with a dark developer aesthetic.
- An availability panel aimed at recruiters: location, start date, commute, and
  work authorisation at a glance.
- About page with a deeper profile, experience timeline, education and
  certifications, grouped technology stack, and a personal section.
- Project cards linking to live demos and GitHub source repositories.
- A built-in CV page at `#/cv`, rendered from the same data as the rest of the
  site so it cannot drift, with a print stylesheet for saving to PDF.
- Responsive layout for desktop, tablet, and mobile.
- GitHub Pages deployment through GitHub Actions.

## Tech Stack

- Bun for package management and scripts.
- React for the interface.
- TypeScript for type safety.
- Vite for fast development and static production builds.
- CSS custom properties, animations, and responsive custom styling.
- GitHub Actions and GitHub Pages for hosting.

## Content

Nearly everything on the site is data, not markup. `src/profile.ts` holds the
profile, experience, education, certifications, skill groups, personal
interests, and project list; the pages in `src/App.tsx` render from it. To
update the site, edit that one file.

The colour palette lives in CSS custom properties at the top of
`src/styles.css`. Changing the accent family is a handful of token edits rather
than a search through the stylesheet.

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
