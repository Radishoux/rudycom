import { useEffect, useMemo, useRef, useState } from "react";
import { allSkills, profile, projects, skillGroups } from "./profile";

type Route = "home" | "about" | "cv";

const codeLines = [
  "const engineer = 'Rudy Quinternet';",
  "ship({ api, web, mobile, cloud });",
  "harden({ tests, ci, types });",
  "while (learning) buildBetter();",
  "export default productMindset;",
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: profile.email,
  url: "https://radishoux.github.io/rudycom/",
  sameAs: [profile.github, profile.linkedin].filter(Boolean),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Driebergen-Zeist",
    addressRegion: "Utrecht",
    addressCountry: "NL",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Epitech",
  },
  knowsLanguage: ["fr", "en", "nl"],
  knowsAbout: allSkills,
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function getRoute(): Route {
  const hash = window.location.hash.replace("#/", "");
  if (hash === "about") return "about";
  if (hash === "cv") return "cv";
  return "home";
}

/** Set when a navigation should land on a specific section instead of the top. */
let pendingAnchor: string | null = null;

function navigate(route: Route, anchor?: string) {
  const nextHash = route === "home" ? "#/" : `#/${route}`;

  // Assigning the hash it already has fires no hashchange, so navigating to a
  // section of the page you are already on would otherwise do nothing at all.
  if (window.location.hash === nextHash) {
    if (anchor) scrollToAnchor(anchor);
    return;
  }

  pendingAnchor = anchor ?? null;
  window.location.hash = nextHash;
}

/**
 * Scrolling to a section straight after a route change lands short: the new
 * page has only just been committed, so the document is still growing and the
 * browser clamps the scroll to the height it sees at that moment. Re-issue the
 * scroll a few times so late layout gets corrected for, then snap on the last
 * attempt if we still are not there — a smooth scroll that gets interrupted or
 * starved of frames otherwise leaves the reader stranded halfway.
 */
const SCROLL_ATTEMPTS = 4;

function scrollToAnchor(id: string, attempt = 0) {
  // A timer rather than requestAnimationFrame: rAF is suspended entirely while
  // the document is hidden, which would leave the scroll pending forever if the
  // page is restored from a background tab.
  setTimeout(() => {
    const last = attempt >= SCROLL_ATTEMPTS - 1;
    const target = document.getElementById(id);

    // On a route change the target may not be mounted yet, so keep retrying
    // rather than giving up on the first miss.
    if (!target) {
      if (!last) scrollToAnchor(id, attempt + 1);
      return;
    }

    const top = target.getBoundingClientRect().top;
    if (top > -80 && top < window.innerHeight * 0.5) return;

    target.scrollIntoView({
      behavior: last || prefersReducedMotion() ? "instant" : "smooth",
      block: "start",
    });

    if (!last) scrollToAnchor(id, attempt + 1);
  }, attempt === 0 ? 40 : 320);
}

export function App() {
  const [route, setRoute] = useState<Route>(getRoute);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute());
      const anchor = pendingAnchor;
      pendingAnchor = null;
      if (anchor) {
        scrollToAnchor(anchor);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("hashchange", onHashChange);
    if (!window.location.hash) {
      window.location.hash = "#/";
    }

    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Reveal-on-scroll for anything marked [data-reveal] in the current route.
  //
  // The hidden starting state is applied by the `js-reveal` class this effect
  // adds, never by the stylesheet alone. If scripting is off, or the observer
  // never runs — it stays idle while the document is hidden — the content is
  // simply visible rather than an invisible page.
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"),
    );
    if (nodes.length === 0) return;

    const reveal = (node: Element) => node.classList.add("is-visible");

    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      nodes.forEach(reveal);
      return;
    }

    document.documentElement.classList.add("js-reveal");

    // Anything already on screen animates in right away; only what is below
    // the fold waits for the observer.
    const pending: HTMLElement[] = [];
    nodes.forEach((node) => {
      const box = node.getBoundingClientRect();
      if (box.top < window.innerHeight * 0.94 && box.bottom > 0) {
        window.setTimeout(() => reveal(node), 20);
      } else {
        pending.push(node);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );
    pending.forEach((node) => observer.observe(node));

    // Last resort: never leave anything stuck invisible.
    const failsafe = window.setTimeout(() => pending.forEach(reveal), 2500);

    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
    };
  }, [route]);

  return (
    <div className="site-shell">
      <Background />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header route={route} />
      <main id="main-content">
        {route === "home" ? <HomePage /> : null}
        {route === "about" ? <AboutPage /> : null}
        {route === "cv" ? <CvPage /> : null}
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}

function Header({ route }: { route: Route }) {
  return (
    <header className="header">
      <a className="brand" href="#/" onClick={() => navigate("home")}>
        <span className="brand-mark">RQ</span>
        <span>Rudy Quinternet</span>
      </a>
      <nav aria-label="Main navigation">
        <button
          className={route === "home" ? "active" : ""}
          onClick={() => navigate("home")}
        >
          Home
        </button>
        <button
          className={route === "about" ? "active" : ""}
          onClick={() => navigate("about")}
        >
          About &amp; projects
        </button>
        <button
          className={route === "cv" ? "active" : ""}
          onClick={() => navigate("cv")}
        >
          CV
        </button>
      </nav>
    </header>
  );
}

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero page">
        <div className="hero-copy">
          <p className="eyebrow">
            {profile.location} - {profile.availability}
          </p>
          <h1>
            {profile.headline.before}
            <span className="gradient-text">{profile.headline.highlight}</span>
            {profile.headline.after}
          </h1>
          <p className="lede">{profile.summary}</p>
          <div className="actions">
            <button className="primary-button" onClick={() => navigate("about")}>
              Explore my work
            </button>
            <a
              className="secondary-button"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub profile
            </a>
            {profile.linkedin ? (
              <a
                className="secondary-button"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            ) : null}
            <button className="ghost-link" onClick={() => navigate("cv")}>
              Read my CV
            </button>
          </div>
          <div className="hero-proof" aria-label="Career highlights">
            {profile.metrics.slice(0, 3).map((metric, index) => (
              <div key={metric.label} data-reveal style={cssIndex(index)}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-panel">
          <CodeCard />
          <div className="terminal-card" aria-label="Current engineering focus">
            <p className="terminal-label">current focus</p>
            <p>Backend services in TypeScript and Java</p>
            <p>Concurrency, throughput, optimisation</p>
            <p>Rust, Go, and generative AI on the side</p>
          </div>
        </div>
      </section>

      <AvailabilityStrip />

      <section className="page focus-strip" aria-label="Core strengths">
        {profile.focusAreas.map((area, index) => (
          <article key={area.title} data-reveal style={cssIndex(index)}>
            <span />
            <h2>{area.title}</h2>
            <p>{area.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function AvailabilityStrip() {
  const facts = [
    { term: "Available from", detail: "1 September 2026" },
    { term: "Based in", detail: profile.location },
    { term: "Commute", detail: profile.commute },
    { term: "Work authorisation", detail: profile.workAuthorization },
  ];

  return (
    <section className="page availability-strip" aria-label="Availability" data-reveal>
      <div className="availability-lead">
        <p className="eyebrow">Looking for work</p>
        <h2>{profile.lookingFor}</h2>
      </div>
      <dl className="availability-facts">
        {facts.map((fact, index) => (
          <div key={fact.term} data-reveal style={cssIndex(index)}>
            <dt>{fact.term}</dt>
            <dd>{fact.detail}</dd>
          </div>
        ))}
      </dl>
      <button
        className="primary-button"
        onClick={() => navigate("about", "contact")}
      >
        Get in touch
      </button>
    </section>
  );
}

function AboutPage() {
  return (
    <div className="page about-page">
      <section className="about-grid">
        <div>
          <p className="eyebrow">About me</p>
          <h2>Engineer, builder, and constant learner.</h2>
          <p>{profile.longBio}</p>
          <div className="actions compact-actions">
            <button
              className="primary-button"
              onClick={() => navigate("about", "contact")}
            >
              Contact me
            </button>
            <button className="secondary-button" onClick={() => navigate("cv")}>
              Read my CV
            </button>
          </div>
        </div>
        <div className="glass-card stats-card">
          {profile.metrics.map((metric, index) => (
            <div key={metric.label} data-reveal style={cssIndex(index)}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Experience</p>
        <div className="timeline">
          {profile.experience.map((item, index) => (
            <article
              className="timeline-item"
              key={`${item.company}-${item.period}`}
              data-reveal
              style={cssIndex(index)}
            >
              <span aria-hidden="true" />
              <div>
                <p className="timeline-meta">
                  {item.period} - {item.company}
                </p>
                <h3>{item.role}</h3>
                <p>{item.description}</p>
                <div className="stack-list compact-stack">
                  {item.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Education &amp; certifications</p>
        <div className="credential-grid">
          {[...profile.education, ...profile.certifications].map((item, index) => (
            <article
              className="credential-card"
              key={`${item.year}-${item.title}`}
              data-reveal
              style={cssIndex(index)}
            >
              <span>{item.year}</span>
              <h3>{item.title}</h3>
              <p>{item.institution}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">How I work</p>
        <div className="principle-grid">
          {profile.principles.map((principle, index) => (
            <article
              className="principle-card"
              key={principle}
              data-reveal
              style={cssIndex(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{principle}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Stack</p>
        <div className="skill-groups">
          {skillGroups.map((group, index) => (
            <div className="skill-group" key={group.title} data-reveal style={cssIndex(index)}>
              <h3>{group.title}</h3>
              <div className="skill-cloud">
                {group.items.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Projects</p>
            <h2>Things to explore</h2>
          </div>
          <a
            className="text-link"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            View all on GitHub
          </a>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article
              className="project-card"
              key={project.name}
              data-reveal
              style={cssIndex(index)}
            >
              <div>
                <p className="project-type">{project.type}</p>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <p className="project-impact">{project.impact}</p>
              </div>
              <div className="stack-list">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="card-actions">
                {project.demoUrl ? (
                  <a href={project.demoUrl} target="_blank" rel="noreferrer">
                    Try it
                  </a>
                ) : null}
                {project.sourceUrl ? (
                  <a href={project.sourceUrl} target="_blank" rel="noreferrer">
                    Source
                  </a>
                ) : null}
                {project.note ? <p className="project-note">{project.note}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Beyond the code</p>
        <div className="personal-grid">
          {profile.personal.map((item, index) => (
            <article
              className="personal-card"
              key={item.title}
              data-reveal
              style={cssIndex(index)}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.linkLabel && profile.writing.enabled ? (
                <a
                  className="text-link"
                  href={profile.writing.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.linkLabel}
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <ContactSection />
    </div>
  );
}

function ContactSection() {
  return (
    <section className="section contact-card" id="contact" data-reveal>
      <div>
        <p className="eyebrow">Contact</p>
        <h2>Let's build something useful.</h2>
        <p>
          {profile.availability}, looking in Utrecht and the surrounding area.
          The quickest way to reach me is email, and everything else is below.
        </p>
      </div>
      <ContactPanel />
    </section>
  );
}

const contactRows = [
  {
    key: "email",
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    external: false,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/rudy-quinternet",
    href: profile.linkedin,
    external: true,
  },
  {
    key: "github",
    label: "GitHub",
    value: "github.com/Radishoux",
    href: profile.github,
    external: true,
  },
].filter((row) => Boolean(row.href));

function ContactPanel() {
  return (
    <ul className="contact-panel">
      {contactRows.map(({ key, ...row }) => (
        <ContactRow key={key} {...row} />
      ))}
    </ul>
  );
}

function ContactRow({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href: string;
  external: boolean;
}) {
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");

  useEffect(() => {
    if (copied === "idle") return;
    const timer = setTimeout(() => setCopied("idle"), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    // The async clipboard API needs a secure context and permission, neither of
    // which is guaranteed. Fall back to a throwaway textarea, and if even that
    // fails, say so rather than silently doing nothing.
    try {
      await navigator.clipboard.writeText(value);
      setCopied("done");
      return;
    } catch {
      /* fall through */
    }

    try {
      const scratch = document.createElement("textarea");
      scratch.value = value;
      scratch.setAttribute("readonly", "");
      scratch.style.position = "fixed";
      scratch.style.opacity = "0";
      document.body.appendChild(scratch);
      scratch.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(scratch);
      setCopied(ok ? "done" : "failed");
    } catch {
      setCopied("failed");
    }
  }

  return (
    <li className="contact-row">
      <span className="contact-label">{label}</span>
      <a
        className="contact-value"
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {value}
      </a>
      <button
        className={`copy-button${copied === "done" ? " is-copied" : ""}`}
        onClick={copy}
        aria-label={`Copy ${label.toLowerCase()} to clipboard`}
      >
        <span aria-hidden="true">
          {copied === "done" ? "Copied" : copied === "failed" ? "Select it" : "Copy"}
        </span>
        <span className="visually-hidden" role="status">
          {copied === "done"
            ? `${label} copied to clipboard`
            : copied === "failed"
              ? `Could not copy automatically. ${label} is ${value}.`
              : ""}
        </span>
      </button>
    </li>
  );
}

function CvPage() {
  return (
    <div className="page cv-page">
      <div className="cv-toolbar">
        <p className="eyebrow">Curriculum vitae</p>
        <button className="secondary-button" onClick={() => window.print()}>
          Save as PDF
        </button>
      </div>

      <article className="cv-sheet">
        <header className="cv-header">
          <div>
            <h1>{profile.name}</h1>
            <p className="cv-role">{profile.role}</p>
          </div>
          <ul className="cv-contact">
            <li>{profile.location}</li>
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer">
                github.com/Radishoux
              </a>
            </li>
            {profile.linkedin ? (
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  linkedin.com/in/rudy-quinternet
                </a>
              </li>
            ) : null}
            <li>{profile.availability}</li>
            <li>{profile.workAuthorization}</li>
          </ul>
        </header>

        <section className="cv-section">
          <h2>Profile</h2>
          <p>{profile.summary}</p>
        </section>

        <section className="cv-section">
          <h2>Experience</h2>
          {profile.experience.map((item) => (
            <div className="cv-entry" key={`${item.company}-${item.period}`}>
              <div className="cv-entry-head">
                <h3>
                  {item.role} - {item.company}
                </h3>
                <span>{item.period}</span>
              </div>
              <p>{item.description}</p>
              <p className="cv-stack">{item.stack.join(" - ")}</p>
            </div>
          ))}
        </section>

        <section className="cv-section">
          <h2>Education</h2>
          {profile.education.map((item) => (
            <div className="cv-entry" key={item.title}>
              <div className="cv-entry-head">
                <h3>{item.title}</h3>
                <span>{item.year}</span>
              </div>
              <p>{item.institution}</p>
            </div>
          ))}
        </section>

        <section className="cv-section">
          <h2>Certifications</h2>
          {profile.certifications.map((item) => (
            <div className="cv-entry" key={item.title}>
              <div className="cv-entry-head">
                <h3>{item.title}</h3>
                <span>{item.year}</span>
              </div>
              <p>{item.institution}</p>
            </div>
          ))}
        </section>

        <section className="cv-section">
          <h2>Skills</h2>
          <dl className="cv-skills">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <dt>{group.title}</dt>
                <dd>{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="cv-section">
          <h2>Languages</h2>
          <dl className="cv-skills">
            {profile.languages.map((language) => (
              <div key={language.name}>
                <dt>{language.name}</dt>
                <dd>{language.level}</dd>
              </div>
            ))}
          </dl>
        </section>
      </article>
    </div>
  );
}

const TYPE_CHAR_MS = 32;
const TYPE_LINE_PAUSE_MS = 240;
const TYPE_HOLD_MS = 3200;
const TYPE_FADE_MS = 500;

/** Character counts at which one line has just finished and the next begins. */
function lineBoundaries(lines: string[]) {
  const stops: number[] = [];
  let total = 0;
  for (const line of lines) {
    total += line.length;
    stops.push(total);
  }
  return stops;
}

function sliceLines(lines: string[], count: number) {
  let remaining = count;
  return lines.map((line) => {
    const take = Math.max(0, Math.min(line.length, remaining));
    remaining -= take;
    return line.slice(0, take);
  });
}

/**
 * Types the sample out one character at a time, holds the finished block long
 * enough to read, then fades and starts over. Driven from state rather than CSS
 * so the cycle never restarts before the last line has actually landed.
 */
function useTypewriter(lines: string[]) {
  const stops = useMemo(() => lineBoundaries(lines), [lines]);
  const total = stops[stops.length - 1] ?? 0;
  const reduced = useMemo(prefersReducedMotion, []);

  const [count, setCount] = useState(() => (reduced ? total : 0));
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (reduced) return;

    if (fading) {
      const timer = setTimeout(() => {
        setCount(0);
        setFading(false);
      }, TYPE_FADE_MS);
      return () => clearTimeout(timer);
    }

    if (count >= total) {
      const timer = setTimeout(() => setFading(true), TYPE_HOLD_MS);
      return () => clearTimeout(timer);
    }

    // Breathe at the end of each line instead of running straight on.
    const atLineEnd = count > 0 && stops.includes(count);
    const timer = setTimeout(
      () => setCount((value) => value + 1),
      atLineEnd ? TYPE_LINE_PAUSE_MS : TYPE_CHAR_MS,
    );
    return () => clearTimeout(timer);
  }, [count, total, fading, reduced, stops]);

  const rendered = useMemo(() => sliceLines(lines, count), [lines, count]);
  const activeLine = useMemo(() => {
    if (count >= total) return -1;
    return stops.findIndex((stop) => count < stop);
  }, [count, total, stops]);

  return { rendered, fading, activeLine, done: count >= total };
}

function CodeCard() {
  const { rendered, fading, activeLine, done } = useTypewriter(codeLines);
  const cardRef = useRef<HTMLElement>(null);

  return (
    <aside
      ref={cardRef}
      className={`code-card${fading ? " is-fading" : ""}`}
      aria-label="Animated code sample"
    >
      <div className="window-controls">
        <i />
        <i />
        <i />
      </div>
      <p className="file-label">rudy.profile.ts</p>
      <pre aria-hidden="true">
        {rendered.map((text, index) => (
          <p key={codeLines[index]}>
            <span className="code-lineno">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="code-text">{text}</span>
            {index === activeLine ? <i className="caret" /> : null}
          </p>
        ))}
      </pre>
      {/* The animation is decorative; screen readers get the finished text once. */}
      <span className="visually-hidden">{done ? codeLines.join(" ") : ""}</span>
    </aside>
  );
}

function Background() {
  return (
    <div className="background" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

/** Stagger index consumed by the reveal transition. */
function cssIndex(index: number) {
  return { "--i": index } as React.CSSProperties;
}
