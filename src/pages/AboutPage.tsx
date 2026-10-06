import type { CSSProperties } from 'react';
import { ContactPanel } from '../components/ContactPanel';
import { profile, projects, skillGroups } from '../data/profile';
import { navigate } from '../hooks/useRoute';
import { usePointerTilt } from '../hooks/usePointerTilt';
import { useReducedMotion } from '../hooks/useReducedMotion';
import type { Project } from '../data/profile';

const stagger = (index: number) => ({ '--i': index }) as CSSProperties;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduced = useReducedMotion();
  const tiltRef = usePointerTilt<HTMLElement>({ max: 5, lift: 10, disabled: reduced });

  return (
    <article ref={tiltRef} className="project" data-reveal style={stagger(index)}>
      <p className="project-kind">{project.type}</p>
      <h3>{project.name}</h3>
      <p className="project-body">{project.description}</p>
      <p className="project-impact">{project.impact}</p>

      <ul className="chip-list">
        {project.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="project-links">
        {project.demoUrl ? (
          <a href={project.demoUrl} target="_blank" rel="noreferrer">
            Open it
          </a>
        ) : null}
        {project.sourceUrl ? (
          <a href={project.sourceUrl} target="_blank" rel="noreferrer">
            Source
          </a>
        ) : null}
        {project.note ? <span className="project-note">{project.note}</span> : null}
      </div>
    </article>
  );
}

export function AboutPage() {
  const credentials = [...profile.education, ...profile.certifications];

  return (
    <>
      <section className="intro" data-reveal>
        <h1>Eight years of building, testing and teaching.</h1>
        <p className="intro-body">{profile.longBio}</p>
        <div className="intro-metrics">
          {profile.metrics.map((metric, index) => (
            <div key={metric.label} data-reveal style={stagger(index)}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="block" aria-labelledby="experience-heading">
        <h2 id="experience-heading" data-reveal>
          Experience
        </h2>
        <div className="timeline">
          {profile.experience.map((item, index) => (
            <article
              className="timeline-item"
              key={`${item.company}-${item.period}`}
              data-reveal
              style={stagger(index)}
            >
              <div className="timeline-when">{item.period}</div>
              <div className="timeline-what">
                <h3>
                  {item.role}
                  <span className="timeline-company">{item.company}</span>
                </h3>
                <p className="experience-context">{item.context}</p>
                <ul className="experience-points">
                  {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
                <ul className="chip-list">
                  {item.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="block" aria-labelledby="stack-heading">
        <h2 id="stack-heading" data-reveal>
          Where I use each technology
        </h2>
        <div className="stack-grid">
          {skillGroups.map((group, index) => (
            <div key={group.title} data-reveal style={stagger(index)}>
              <h3>{group.title}</h3>
              <p className="section-note">{group.description}</p>
              <ul className="chip-list">
                {group.items.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="block" aria-labelledby="projects-heading">
        <div className="block-head">
          <h2 id="projects-heading" data-reveal>
            Personal projects
          </h2>
          <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">
            All repositories
          </a>
        </div>
        <p className="project-disclosure" data-reveal>{profile.aiDisclosure}</p>
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="block" aria-labelledby="credentials-heading">
        <h2 id="credentials-heading" data-reveal>
          Education
        </h2>
        <ul className="credential-list">
          {credentials.map((item, index) => (
            <li key={`${item.year}-${item.title}`} data-reveal style={stagger(index)}>
              <span className="credential-year">{item.year}</span>
              <span className="credential-title">{item.title}</span>
              <span className="credential-where">{item.institution}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="block" aria-labelledby="principles-heading">
        <h2 id="principles-heading" data-reveal>
          How I work
        </h2>
        <ol className="principles">
          {profile.principles.map((principle, index) => (
            <li key={principle} data-reveal style={stagger(index)}>
              {principle}
            </li>
          ))}
        </ol>
      </section>

      <section className="block" aria-labelledby="personal-heading">
        <h2 id="personal-heading" data-reveal>
          Away from the keyboard
        </h2>
        <div className="personal-grid">
          {profile.personal.map((item, index) => (
            <article key={item.title} data-reveal style={stagger(index)}>
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

      <section className="contact" id="contact" data-reveal>
        <div>
          <h2>Let’s talk about your team.</h2>
          <p>
            {profile.availability}, looking in Utrecht and the surrounding area. Email is
            the quickest way to reach me.
          </p>
          <button type="button" className="secondary-button" onClick={() => navigate('cv')}>
            Read the CV
          </button>
        </div>
        <ContactPanel />
      </section>
    </>
  );
}
