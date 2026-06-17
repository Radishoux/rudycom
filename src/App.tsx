import { useEffect, useMemo, useState } from "react";
import { cvUrl, profile, projects } from "./profile";

type Route = "home" | "about";

const codeLines = [
  "const engineer = 'Rudy Quinternet';",
  "ship({ web, mobile, cloud });",
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
  sameAs: [profile.github, profile.website],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  knowsAbout: profile.skills,
};

function getRoute(): Route {
  return window.location.hash.replace("#/", "") === "about" ? "about" : "home";
}

function navigate(route: Route) {
  window.location.hash = route === "home" ? "#/" : "#/about";
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
        {route === "home" ? <HomePage /> : <AboutPage />}
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
          About & projects
        </button>
        <a href={cvUrl} download>
          Download CV
        </a>
      </nav>
    </header>
  );
}

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero page">
        <div className="hero-copy">
          <p className="eyebrow">{profile.location} - {profile.availability}</p>
          <h1>
            {profile.headline.split("reliable")[0]}
            <span className="gradient-text">reliable</span>
            {profile.headline.split("reliable")[1]}
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
            <a className="ghost-link" href={cvUrl} download>
              Download CV
            </a>
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
            <p>React + TypeScript interfaces</p>
            <p>Node/NestJS services</p>
            <p>Cloud-backed product delivery</p>
          </div>
        </div>
      </section>
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
            <a className="secondary-button" href={cvUrl} download>
              Download CV
            </a>
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
                <p className="timeline-meta">{item.period} - {item.company}</p>
                <h3>{item.role}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">How I work</p>
        <div className="principle-grid">
          {profile.principles.map((principle) => (
            <article className="principle-card" key={principle}>
              <span>0{profile.principles.indexOf(principle) + 1}</span>
              <p>{principle}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Stack</p>
        <div className="skill-cloud">
          {profile.skills.map((skill) => (
            <span key={skill}>{skill}</span>
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
                <a href={project.demoUrl} target="_blank" rel="noreferrer">
                  Try it
                </a>
                <a href={project.sourceUrl} target="_blank" rel="noreferrer">
                  Source
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section contact-card">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Let's build something useful.</h2>
          <p>
            Reach me by email, browse my GitHub, or download the CV for the full
            version of my experience.
          </p>
        </div>
        <div className="actions">
          <a className="primary-button" href={`mailto:${profile.email}`}>
            Email me
          </a>
          <a className="secondary-button" href={cvUrl} download>
            Download CV
          </a>
        </div>
      </section>
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
