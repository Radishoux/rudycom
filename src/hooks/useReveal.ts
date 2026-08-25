import { useEffect } from 'react';

const REVEAL_SELECTOR = '[data-reveal]:not(.is-visible)';
const FAILSAFE_MS = 2500;

/**
 * Reveals elements marked [data-reveal] as they enter the viewport.
 *
 * The hidden starting state is applied by the `js-reveal` class this hook adds,
 * never by the stylesheet alone. If scripting is off, or the observer never runs
 * (it stays idle while the document is hidden), the content is simply visible
 * rather than an invisible page. A failsafe covers anything still pending.
 */
export function useReveal(routeKey: string, reduced: boolean): void {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    if (nodes.length === 0) return undefined;

    const reveal = (node: Element) => node.classList.add('is-visible');

    if (reduced || typeof IntersectionObserver === 'undefined') {
      nodes.forEach(reveal);
      return undefined;
    }

    document.documentElement.classList.add('js-reveal');

    // Anything already on screen animates in right away; only what is below the
    // fold waits for the observer.
    const pending: HTMLElement[] = [];
    nodes.forEach((node) => {
      const box = node.getBoundingClientRect();
      const onScreen = box.top < window.innerHeight * 0.94 && box.bottom > 0;
      if (onScreen) {
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
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    );
    pending.forEach((node) => observer.observe(node));

    const failsafe = window.setTimeout(() => pending.forEach(reveal), FAILSAFE_MS);

    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
    };
  }, [routeKey, reduced]);
}
