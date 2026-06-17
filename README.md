# rudycom

Personal website for Rudy Quinternet, built with Bun, React, TypeScript, and Vite.

## Development

```bash
bun install
bun run dev
```

## Build

```bash
bun run build
bun run preview
```

## Deployment

The repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.
After the repo is pushed to GitHub, enable GitHub Pages with **GitHub Actions** as
the Pages source. The Vite base path is configured for:

```txt
https://rudyquinternet.github.io/rudycom/
```
