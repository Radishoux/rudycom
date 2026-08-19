import { useEffect, useMemo, useState } from "react";
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

function getRoute(): Route {
  const hash = window.location.hash.replace("#/", "");
  if (hash === "about") return "about";
  if (hash === "cv") return "cv";
  return "home";
}

function navigate(route: Route) {
  window.location.hash = route === "home" ? "#/" : `#/${route}`;
}

export function App() {
  const [route, setRoute] = useState<Route>(getRoute);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", onHashChange);
    if (!window.location.hash) {
      window.location.hash = "#/";
    }

    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

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
            {profile.metrics.slice(0, 3).map((metric) => (
              <div key={metric.label}>
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
        {profile.focusAreas.map((area) => (
          <article key={area.title}>
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
  return (
    <section className="page availability-strip" aria-label="Availability">
      <div className="availability-lead">
        <p className="eyebrow">Looking for work</p>
        <h2>{profile.lookingFor}</h2>
      </div>
      <dl className="availability-facts">
        <div>
          <dt>Available from</dt>
          <dd>1 September 2026</dd>
        </div>
        <div>
          <dt>Based in</dt>
          <dd>{profile.location}</dd>
        </div>
        <div>
          <dt>Commute</dt>
          <dd>{profile.commute}</dd>
        </div>
        <div>
          <dt>Work authorisation</dt>
          <dd>{profile.workAuthorization}</dd>
        </div>
      </dl>
      <a className="primary-button" href={`mailto:${profile.email}`}>
        Get in touch
      </a>
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
            <a className="primary-button" href={`mailto:${profile.email}`}>
              Contact me
            </a>
            <button className="secondary-button" onClick={() => navigate("cv")}>
              Read my CV
            </button>
          </div>
        </div>
        <div className="glass-card stats-card">
          {profile.metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Experience</p>
        <div className="timeline">
          {profile.experience.map((item) => (
            <article className="timeline-item" key={`${item.company}-${item.period}`}>
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
          {[...profile.education, ...profile.certifications].map((item) => (
            <article className="credential-card" key={`${item.year}-${item.title}`}>
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
            <article className="principle-card" key={principle}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{principle}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Stack</p>
        <div className="skill-groups">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.title}>
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
          {projects.map((project) => (
            <article className="project-card" key={project.name}>
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
          {profile.personal.map((item) => (
            <article className="personal-card" key={item.title}>
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

      <section className="section contact-card">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Let's build something useful.</h2>
          <p>
            {profile.availability}, looking in Utrecht and the surrounding area.
            Reach me by email, browse my GitHub, or read the full CV.
          </p>
        </div>
        <div className="actions">
          <a className="primary-button" href={`mailto:${profile.email}`}>
            Email me
          </a>
          <button className="secondary-button" onClick={() => navigate("cv")}>
            Read my CV
          </button>
        </div>
      </section>
    </div>
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

function CodeCard() {
  const renderedLines = useMemo(
    () =>
      codeLines.map((line, index) => (
        <p style={{ animationDelay: `${index * 0.32}s` }} key={line}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          {line}
        </p>
      )),
    [],
  );

  return (
    <aside className="code-card" aria-label="Animated code sample">
      <div className="window-controls">
        <i />
        <i />
        <i />
      </div>
      <p className="file-label">rudy.profile.ts</p>
      <pre>{renderedLines}</pre>
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
