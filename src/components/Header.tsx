import { navigate, type Route } from '../hooks/useRoute';
import { profile } from '../data/profile';

type HeaderProps = {
  route: Route;
};

const NAV_ITEMS: Array<{ route: Route; label: string }> = [
  { route: 'home', label: 'Home' },
  { route: 'about', label: 'Work' },
  { route: 'cv', label: 'CV' },
];

export function Header({ route }: HeaderProps) {
  return (
    <header className="header">
      <a
        className="brand"
        href="#/"
        aria-label={`${profile.name} — Home`}
        onClick={(event) => {
          event.preventDefault();
          navigate('home');
        }}
      >
        <span className="brand-mark" aria-hidden="true">{profile.initials}</span>
        <span className="brand-name">{profile.name}</span>
      </a>

      <nav aria-label="Main">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.route}
            type="button"
            className={route === item.route ? 'is-active' : ''}
            aria-current={route === item.route ? 'page' : undefined}
            onClick={() => navigate(item.route)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
