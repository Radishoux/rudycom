# Rudy Quinternet - Personal Website

This repository contains my personal website: a small, animated, coding-inspired
portfolio built with Bun, React, TypeScript, and Vite.

The goal of the site is simple: give visitors a fast and pleasant way to
understand who I am, what I build, which technologies I use, and where they can
try my projects or download my CV.

## About Me

I am Rudy Quinternet, a Paris-based software engineer with experience across web,
mobile, cloud, AI-powered products, logistics tooling, and enterprise systems.

My stack is mostly React, TypeScript, Node, NestJS, Express, Next.js, Angular,
Flutter, React Native, AWS, GCP, SQL, MongoDB, Cypress, Jest, and CI/CD. I like
building useful software, polishing interfaces, and helping teams move from idea
to working product with clean, practical engineering.

My background includes:

- Senior Software Engineer work at ALTEN on AI media tooling with React, Node,
  NestJS, Next.js, AWS, MongoDB, MySQL, Jest, Scrum, Kanban, and CI/CD.
- Software engineering work on Thales / NATO projects, moving from test
  engineering into Angular, Java, C#, TypeScript, and hexagonal architecture.
- Product and logistics application development for Ceva / CMA CGM with Angular,
  Node, TypeScript, Flutter, SQL, MongoDB, and AWS.
- Freelance development and training across websites, apps, games, scripts,
  automation, cloud, and modern development tools.

## Website Features

- Animated homepage with a dark developer aesthetic.
- About page with a deeper profile, experience highlights, and technology stack.
- Project cards linking to live demos and GitHub source repositories.
- Direct link to my GitHub profile.
- Downloadable CV.
- Responsive layout for desktop, tablet, and mobile.
- GitHub Pages deployment through GitHub Actions.

## Tech Stack

- Bun for package management and scripts.
- React for the interface.
- TypeScript for type safety.
- Vite for fast development and static production builds.
- CSS animations and responsive custom styling.
- GitHub Actions and GitHub Pages for hosting.

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
to `main`, GitHub Actions installs dependencies with Bun, builds the Vite app,
and publishes the generated `dist` folder to GitHub Pages.
