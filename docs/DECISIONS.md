# Decisions

## 2026-10-07 - One career source for the website and PDF

Generate the CV from `src/data/profile.ts` on every build. Rejected a separately
edited PDF because dates, employers and technical claims could drift. This adds
Python, ReportLab and pypdf to build dependencies, but none to the browser. Keep
the existing public filename.

## 2026-10-07 - Give skills and projects their context

Identify employers, clients, professional tools, personal projects and learning.
Rejected a flat technology list because it hides the setting and depth of
experience. Keep the NestJS/React Native PixelGuess project distinct from its
Flutter prototype. Disclose Codex use plainly. Use years where employment months
need clarification; moving country is not a contract start date. The cost is
less apparent breadth and precision, in exchange for clearer claims.

## 2026-10-07 - Keep the identity and improve readability

Keep the dark palette, portrait, reduced-motion support and navigation. Use
shorter headings, experience bullets and contextual skills. Replace decorative
pseudo-code with a professional caption and remove its unused component, hook
and CSS. Rejected a full redesign because the main problem was content accuracy
and clarity.
