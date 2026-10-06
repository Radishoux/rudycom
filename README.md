# Rudy Quinternet - personal website

[Website](https://radishoux.github.io/rudycom/) · [CV](https://radishoux.github.io/rudycom/#/cv)

I am a senior software engineer based near Utrecht, available for backend and
full-stack roles. I started freelancing in 2018 and have worked in logistics,
defence, conversational AI and consulting, alongside technical teaching.

The site distinguishes professional technology experience, personal projects and
continuing learning. Consulting employers and their clients are identified
separately. This website was built with OpenAI Codex; recent personal projects
also use AI coding tools.

## Run locally

Requires Bun and Python 3.12 or later:

```sh
bun install --frozen-lockfile
python -m pip install -r scripts/requirements.txt
bun run dev -- --host 127.0.0.1
bun run cv
bun run build
bun run preview -- --host 127.0.0.1
```

Development normally opens at `http://127.0.0.1:5173/rudycom/`. Routes are `#/`,
`#/about` and `#/cv`. Set `CV_PYTHON` to a Python executable path if the interpreter
with the PDF dependencies is not the default `python`.

## Maintain and publish

`src/data/profile.ts` is the source for the website and downloadable PDF. Edit
career details there, then build. The build regenerates the CV, checks its shared
content and clickable contacts, enforces one A4 page, type-checks and builds the
site. Review the PDF and website visually before publishing.

GitHub Actions deploys pushes to `master` or `main` to GitHub Pages. The public
filename stays `Rudy_Quinternet_Software_Engineer_CV.pdf` to preserve existing
links. The build generates it before Vite copies it into `dist/`.

The dark theme, portrait, particle background, responsive layouts, CV print
styles and reduced-motion support remain part of the site.

See [architecture](docs/ARCHITECTURE.md) for the maintenance map and content
invariants, and [decisions](docs/DECISIONS.md) for the choices behind them.
