import { AboutPage } from './pages/AboutPage';
import { CvPage } from './pages/CvPage';
import { HomePage } from './pages/HomePage';
import { Header } from './components/Header';
import { ParticleField } from './components/ParticleField';
import { professionalSkills, profile } from './data/profile';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useReveal } from './hooks/useReveal';
import { useRoute } from './hooks/useRoute';

const SITE_URL = 'https://radishoux.github.io/rudycom/';

/**
 * Structured data, published in the open.
 *
 * This is the honest way to be legible to machines: schema.org markup that says
 * exactly what the visible page says, so an automated reader can parse the
 * facts rather than guess at them. Every claim here is verifiable against the
 * CV, which is the whole point.
 */
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.role,
  email: profile.email,
  url: SITE_URL,
  image: `${SITE_URL}portrait.jpg`,
  description: profile.summary,
  sameAs: [profile.github, profile.linkedin].filter(Boolean),
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Driebergen-Zeist',
    addressRegion: 'Utrecht',
    addressCountry: 'NL',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Epitech',
    address: { '@type': 'PostalAddress', addressLocality: 'Paris', addressCountry: 'FR' },
  },
  hasCredential: profile.certifications.map((item) => ({
    '@type': 'EducationalOccupationalCredential',
    name: item.title,
    credentialCategory: 'certificate',
    recognizedBy: { '@type': 'Organization', name: item.institution },
    dateCreated: item.year,
  })),
  knowsLanguage: profile.languages.map((language) => ({
    '@type': 'Language',
    name: language.name,
    alternateName: language.level,
  })),
  knowsAbout: professionalSkills,
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Software Engineer',
    occupationLocation: { '@type': 'City', name: 'Utrecht' },
    skills: professionalSkills.join(', '),
  },
  seeks: {
    '@type': 'Demand',
    name: profile.lookingFor,
    description: profile.availability,
    areaServed: { '@type': 'City', name: 'Utrecht' },
  },
  workLocation: { '@type': 'City', name: 'Utrecht' },
};

export function App() {
  const route = useRoute();
  const reduced = useReducedMotion();

  useReveal(route, reduced);

  return (
    <div className="shell">
      <ParticleField />
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header route={route} />

      <main id="main" className="page">
        {route === 'home' ? <HomePage /> : null}
        {route === 'about' ? <AboutPage /> : null}
        {route === 'cv' ? <CvPage /> : null}
      </main>

      <footer className="footer">
        <p>{profile.name}</p>
        <p>
          made with <span aria-label="love">♥</span> by{' '}
          <a href={profile.github} target="_blank" rel="noreferrer">Radishoux Rudy Magenta</a>
        </p>
        <p>{profile.availability}</p>
      </footer>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- JSON-LD has no React equivalent.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </div>
  );
}
