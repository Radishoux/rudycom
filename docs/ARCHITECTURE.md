# Website architecture

This is a static personal portfolio built with React, TypeScript and Vite. Bun manages dependencies and runs the build. GitHub Pages serves the generated files; there is no backend or database. The small stack supports a portfolio, project list and printable CV without a server.

## Run and deploy

Run `bun install`, then `bun run dev -- --host 127.0.0.1` for development. Run `bun run build` for TypeScript checks and production output in `dist/`. Run `bun run preview -- --host 127.0.0.1` to inspect that output. The GitHub Actions workflow `.github/workflows/deploy.yml` builds and publishes pushes to `master` or `main` to GitHub Pages.

## Structure and dependencies

- `src/data/profile.ts` contains profile, experience, skills and project data.
- `src/pages/` renders the home, work/about and CV views from that data.
- `src/components/` contains shared presentation components and decorative effects.
- `src/hooks/` contains routing and interaction hooks.
- `src/App.tsx` composes the page and shared layout; `src/main.tsx` mounts React.
- `src/styles.css` supplies screen, responsive, motion and print styling.
- `index.html` contains static search and social metadata.
- `vite.config.ts` supplies build settings, including the GitHub Pages base path.

## Data flow and invariants

Changing `profile.availability` updates the visible profile availability wherever it is consumed, including the home and CV views, and the structured-data description in `App.tsx`. The homepage facts panel has a separate compact value in `HomePage.tsx`. Static search and social descriptions in `index.html` and the README must stay aligned. The current wording is Available now, with Now in the facts panel.

Routes use URL hashes so GitHub Pages does not require server-side routing. Profile data is static and public; do not add credentials or private application notes. The CV uses the shared data and print styles rather than a separate generated document.

## Gotchas

Local changes are not deployed until the publishing branch is pushed and the Pages workflow succeeds. Check the rendered homepage and CV after changing shared profile fields. Keep the Vite base path compatible with `/rudycom/`. Animation, pointer and WebGL behaviour has reduced-motion handling; preserve it when editing visual components.
