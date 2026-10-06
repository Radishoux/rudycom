# Website architecture

This static portfolio uses React and TypeScript for typed content and page
composition, Vite for production builds and Bun for scripts and dependencies.
GitHub Pages serves the output; there is no server or database. Python with
ReportLab produces a searchable CV from the same data as the site; pypdf checks
it. Browser runtime dependencies remain React only.

## Run, verify and deploy

From the repository root, with Bun and Python 3.12+ installed:

```sh
bun install --frozen-lockfile
python -m pip install -r scripts/requirements.txt
bun run dev -- --host 127.0.0.1
bun run cv
bun run build
bun run preview -- --host 127.0.0.1
```

Vite uses `/rudycom/`, including locally. Development normally uses port 5173;
preview uses 4173. `CV_PYTHON` can select another Python executable. For example
in PowerShell: `$env:CV_PYTHON = 'C:\path\to\python.exe'`.

The build generates and validates the PDF, runs both TypeScript configurations,
and creates `dist/`. PDF checks reject missing career content, missing contact
links and overflow beyond one page. Inspect the PDF visually too: extraction
cannot detect every layout defect. Check home, work and CV at desktop and mobile
widths and exercise the download.

`.github/workflows/deploy.yml` installs Bun and Python dependencies, builds and
publishes pushes to `master` or `main`. Verify the Pages workflow and public site
after pushing; a local build is not a deployment.

## Structure and dependencies

- `src/data/profile.ts`: authored career content, skill groups and projects.
- `src/pages/`: home, work/about and CV views consuming shared content.
- `src/components/`: navigation, portrait, particles, contact controls and Snake.
- `src/hooks/`: hash routing, reveals, motion preferences and pointer tilt.
- `src/App.tsx`: route composition, footer and public Person structured data.
- `src/styles.css`: theme, layout, responsive, motion and print rules.
- `index.html`: static search/social metadata; keep aligned with the profile.
- `scripts/generate-cv.ts`: imports content with Bun and sends JSON to Python.
- `scripts/render-cv.py`: PDF layout and post-generation validation.
- `scripts/requirements.txt`: pinned generation and validation dependencies.
- `public/`: portrait and generated `Rudy_Morisot_Quinternet_Software_Engineer_CV.pdf`, plus an identical copy at the previous PDF filename for existing links.
- `dist/`: generated production output; never hand-edit.

Content does not import presentation. Pages and the generator import content;
the Python renderer accepts a JSON snapshot and has no browser dependency.

## Content model and invariants

`profile.experience` is a reverse-chronological list. Each entry has company,
role, period, context, bullets and stack. Company identifies the employer/team;
context identifies clients and location. Freelance work includes 2018-2021 and
subsequent teaching without inventing monthly dates.

Use the same role names, periods and bullets on the work page, CV page and PDF.
Use date precision supported by the owner's account. Never infer an employment
start from a relocation date. Make later corrections in this module.

The header, footer, structured data and PDF identity use `profile.name`; the
header monogram uses `profile.initials`. `profile.cvFilename` supplies the
canonical generation path and download link. Static search/social metadata in
`index.html` must be updated alongside name changes.

Skill groups describe where technologies were used. Only `professional: true`
groups supply `professionalSkills` in structured data. Personal and learning
tools must not silently become professional claims. `Project.cv` selects a
project for the PDF and on-screen CV. Project names are unique React keys;
links are optional and must represent real destinations.

PixelGuess API & mobile is the NestJS/React Native personal project; the Flutter
prototype is separate. AI assistance is disclosed for personal projects on the
work page and selected CV project. The footer credits Radishoux Rudy Magenta
and links to GitHub. Keep confidential implementation details, recruiter
correspondence, salary history and private source documents outside this repo.

## End-to-end CV flow

1. Edit `profile.ts`.
2. `bun run build` invokes `generate-cv.ts`, which imports the profile and sends
   JSON via stdin to Python; no intermediate personal-data file is written.
3. ReportLab lays out the PDF with standard PDF fonts and clickable contacts.
   pypdf reopens it and checks page count, shared text and link destinations.
4. Bun copies the validated PDF to the previous filename for backward-compatible
   links. Vite builds the site and copies both PDFs from `public/` into `dist/`.
5. Pages publishes `dist/`. The `#/cv` button uses Vite's base URL to download
   the PDF; the page itself renders the shared data in React.

## Hard parts and gotchas

PDF dates sit beside short headings; long periods get a separate line. Each
employment entry stays together. A second page fails the build: edit wording or
deliberately revise the layout, then inspect. Do not shrink text automatically
or overwrite the PDF by hand. Generation is deterministic (`invariant=1`), so
fixed content and dependencies produce repeatable bytes. Downloads is not a
build input.

Hash routing needs no server rewrites. Anchor navigation retries because targets
may not be mounted yet. Reveals depend on viewport observation: scroll into a
section before inspecting it. Reduced motion disables movement. WebGL and tilt
avoid React state updates per frame. Print styling hides interactive elements
and permits sections to span pages while keeping entries together. The PDF
download supplies the intentionally laid-out one-page version.
