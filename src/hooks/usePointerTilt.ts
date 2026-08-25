import { useEffect, useRef } from 'react';

type TiltOptions = {
  /** Maximum rotation in degrees at the edge of the element. */
  max?: number;
  /** How far the element lifts toward the viewer, in pixels. */
  lift?: number;
  /** Disable entirely (reduced motion, coarse pointer). */
  disabled?: boolean;
};

/**
 * Real 3D tilt driven by pointer position.
 *
 * Transforms are written straight to the node inside a rAF, never through React
 * state: a state update per pointermove re-renders the tree on every frame and
 * falls apart on mid-range hardware. The element keeps a CSS `--tilt-glare`
 * custom property so a highlight can track the cursor without extra JS.
 */
export function usePointerTilt<T extends HTMLElement>({
  max = 9,
  lift = 14,
  disabled = false,
}: TiltOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || disabled) return undefined;

    // Tilt is a pointer affordance. On touch there is no hover, so skip it.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return undefined;
    }

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let active = false;

    const render = () => {
      // Ease toward the target so the card settles instead of snapping.
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      const rotateY = currentX * max;
      const rotateX = -currentY * max;
      const translateZ = active ? lift : 0;

      node.style.transform =
        `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) ` +
        `rotateY(${rotateY.toFixed(2)}deg) translateZ(${translateZ}px)`;
      node.style.setProperty('--tilt-x', `${((currentX + 1) / 2) * 100}%`);
      node.style.setProperty('--tilt-y', `${((currentY + 1) / 2) * 100}%`);

      const settled =
        Math.abs(targetX - currentX) < 0.001 && Math.abs(targetY - currentY) < 0.001;
      frame = settled && !active ? 0 : requestAnimationFrame(render);
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      // Normalised to -1..1 from the element centre.
      targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      targetY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      active = true;
      start();
    };

    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
      active = false;
      start();
    };

    node.addEventListener('pointermove', onPointerMove);
    node.addEventListener('pointerleave', onPointerLeave);

    return () => {
      node.removeEventListener('pointermove', onPointerMove);
      node.removeEventListener('pointerleave', onPointerLeave);
      if (frame) cancelAnimationFrame(frame);
      node.style.transform = '';
    };
  }, [max, lift, disabled]);

  return ref;
}
