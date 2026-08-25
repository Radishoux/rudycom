import { useEffect, useState } from 'react';

export const ROUTES = ['home', 'about', 'cv'] as const;

export type Route = (typeof ROUTES)[number];

const SCROLL_ATTEMPTS = 4;

function readRoute(): Route {
  const hash = window.location.hash.replace('#/', '');
  return (ROUTES as readonly string[]).includes(hash) ? (hash as Route) : 'home';
}

function hashFor(route: Route): string {
  return route === 'home' ? '#/' : `#/${route}`;
}

/**
 * Scrolls to a section after a route change.
 *
 * Two things make the naive version fail. The target may not be mounted yet
 * when the hash changes, and a smooth scroll issued while the page is still
 * growing gets clamped to the height the browser saw at that moment. So this
 * retries, and snaps on the final attempt rather than leaving the reader
 * stranded halfway if the smooth scroll was interrupted.
 *
 * A timer rather than requestAnimationFrame: rAF is suspended entirely while
 * the document is hidden, which would leave the scroll pending forever on a
 * page restored from a background tab.
 */
export function scrollToAnchor(id: string, attempt = 0): void {
  window.setTimeout(
    () => {
      const isLast = attempt >= SCROLL_ATTEMPTS - 1;
      const target = document.getElementById(id);

      if (!target) {
        if (!isLast) scrollToAnchor(id, attempt + 1);
        return;
      }

      const { top } = target.getBoundingClientRect();
      if (top > -80 && top < window.innerHeight * 0.5) return;

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({
        behavior: isLast || reduced ? 'instant' : 'smooth',
        block: 'start',
      });

      if (!isLast) scrollToAnchor(id, attempt + 1);
    },
    attempt === 0 ? 40 : 320,
  );
}

/** Set when a navigation should land on a section instead of the top. */
let pendingAnchor: string | null = null;

export function navigate(route: Route, anchor?: string): void {
  const nextHash = hashFor(route);

  // Assigning the hash it already has fires no hashchange, so navigating to a
  // section of the page you are already on would otherwise do nothing at all.
  if (window.location.hash === nextHash) {
    if (anchor) scrollToAnchor(anchor);
    return;
  }

  pendingAnchor = anchor ?? null;
  window.location.hash = nextHash;
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(readRoute);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(readRoute());

      const anchor = pendingAnchor;
      pendingAnchor = null;

      if (anchor) {
        scrollToAnchor(anchor);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', onHashChange);
    if (!window.location.hash) window.location.hash = '#/';

    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route;
}
