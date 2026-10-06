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

## 2026-10-07 - Confirmed dates and logistics group naming

The owner confirmed Capgemini employment from 1 April 2025 to 1 September 2026;
the public profile and generated CV now use those dates. This supersedes the
earlier year-only choice. GEFCO's acquisition supports the owner's recollection
of working there in 2022; it is not proof of a specific employment start month.

Use GEFCO / CEVA with CMA CGM identified as the parent group. Rejected wording
that implies CEVA sold GEFCO to CMA CGM. CMA CGM announced the acquisition on
8 April 2022 and completed it in July 2022; CEVA announced the rebranding on
10 January 2023. Sources: [CMA CGM](https://www.cmacgm-group.com/fr/actualites-media/cma-cgm-finalise-lacquisition-de-gefco)
and [CEVA](https://www.cevalogistics.com/en/news-and-media/newsroom/ceva-creates-global-finished-vehicles-organization-from-former-gefco-operation).

### 2026-10-07 — Confirmed Pitchboy NestJS experience

Rudy clarified that the initial Pitchboy version used Node.js, TypeScript and React, and the later version sold to CHU Nice used NestJS. Record NestJS as professional experience at ALTEN/Pitchboy as well as in personal projects. Rejected limiting NestJS to personal work, and rejected attributing it to Capgemini without evidence. Exact scope and technical decisions remain interview follow-up topics.


Rudy further confirmed personal implementation of NestJS modules, controllers and services integrating AI voice, text and video for simulated patient training. Include that concrete contribution. Do not infer named encryption controls, certifications or medical compliance from the stated privacy requirement.

