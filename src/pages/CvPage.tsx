import { SnakeGame } from '../components/SnakeGame';
import { profile, skillGroups } from '../data/profile';

export function CvPage() {
  return (
    <>
      <div className="cv-toolbar">
        <h1>Curriculum vitae</h1>
        <button type="button" className="secondary-button" onClick={() => window.print()}>
          Save as PDF
        </button>
      </div>

      <article className="cv-sheet">
        <header className="cv-header">
          <div>
            <p className="cv-name">{profile.name}</p>
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
                  {item.role}, {item.company}
                </h3>
                <span>{item.period}</span>
              </div>
              <p>{item.description}</p>
              <p className="cv-stack">{item.stack.join(', ')}</p>
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
          <dl className="cv-definitions">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <dt>{group.title}</dt>
                <dd>{group.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="cv-section">
          <h2>Languages</h2>
          <dl className="cv-definitions">
            {profile.languages.map((language) => (
              <div key={language.name}>
                <dt>{language.name}</dt>
                <dd>{language.level}</dd>
              </div>
            ))}
          </dl>
        </section>
      </article>

      <SnakeGame />
    </>
  );
}
