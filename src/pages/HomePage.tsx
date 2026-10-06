import { Portrait } from '../components/Portrait';
import { profile } from '../data/profile';
import { navigate } from '../hooks/useRoute';

const AVAILABILITY_FACTS = [
  { term: 'Availability', detail: profile.availability },
  { term: 'Based in', detail: profile.location },
  { term: 'Commute', detail: profile.commute },
  { term: 'Right to work', detail: profile.workAuthorization },
];

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="hero-eyebrow">
            {profile.location}
            <span className="hero-dot" aria-hidden="true" />
            {profile.availability}
          </p>

          <h1 className="hero-title">
            <span>{profile.headline.before}</span>
            <span className="gradient-text">{profile.headline.highlight}</span>
            <span>{profile.headline.after}</span>
          </h1>

          <p className="hero-lede">{profile.summary}</p>

          <div className="hero-actions">
            <button type="button" className="primary-button" onClick={() => navigate('about')}>
              Explore my experience
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate('cv')}
            >
              Read my CV
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <Portrait name={profile.name} caption={profile.role} />
          <p className="hero-caption">Development · Quality · Teaching<br />France → Netherlands</p>
        </div>
      </section>

      <section className="availability" aria-labelledby="availability-heading" data-reveal>
        <h2 id="availability-heading">{profile.lookingFor}</h2>
        <dl className="availability-facts">
          {AVAILABILITY_FACTS.map((fact, index) => (
            <div key={fact.term} data-reveal style={{ '--i': index } as React.CSSProperties}>
              <dt>{fact.term}</dt>
              <dd>{fact.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="focus" aria-label="What I do">
        {profile.focusAreas.map((area, index) => (
          <article key={area.title} data-reveal style={{ '--i': index } as React.CSSProperties}>
            <span className="focus-rule" aria-hidden="true" />
            <h2>{area.title}</h2>
            <p>{area.description}</p>
          </article>
        ))}
      </section>
    </>
  );
}
