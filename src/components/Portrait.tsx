import { usePointerTilt } from '../hooks/usePointerTilt';
import { useReducedMotion } from '../hooks/useReducedMotion';
import portraitUrl from '../assets/rudy-portrait.jpg';

type PortraitProps = {
  name: string;
  caption: string;
};

/**
 * The one photograph on the site. Tilts in 3D toward the pointer with a glare
 * that tracks the cursor, so it reads as a physical card rather than a headshot
 * dropped into a circle.
 */
export function Portrait({ name, caption }: PortraitProps) {
  const reduced = useReducedMotion();
  const tiltRef = usePointerTilt<HTMLDivElement>({ max: 10, lift: 16, disabled: reduced });

  return (
    <figure className="portrait">
      <div ref={tiltRef} className="portrait-card">
        <img
          className="portrait-image"
          src={portraitUrl}
          alt={`${name}, software engineer`}
          width={400}
          height={400}
          loading="eager"
          decoding="async"
        />
        <span className="portrait-glare" aria-hidden="true" />
      </div>
      <figcaption className="portrait-caption">{caption}</figcaption>
    </figure>
  );
}
