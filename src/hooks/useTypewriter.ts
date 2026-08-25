import { useEffect, useMemo, useState } from 'react';

const CHAR_MS = 32;
const LINE_PAUSE_MS = 240;
const HOLD_MS = 3200;
const FADE_MS = 500;

/** Character counts at which one line has just finished. */
function lineBoundaries(lines: string[]): number[] {
  const stops: number[] = [];
  lines.reduce((total, line) => {
    const next = total + line.length;
    stops.push(next);
    return next;
  }, 0);
  return stops;
}

function sliceLines(lines: string[], count: number): string[] {
  let remaining = count;
  return lines.map((line) => {
    const take = Math.max(0, Math.min(line.length, remaining));
    remaining -= take;
    return line.slice(0, take);
  });
}

/**
 * Types the sample one character at a time, holds the finished block long enough
 * to read, then fades and starts over. Driven from state rather than CSS so the
 * cycle never restarts before the last line has actually landed.
 */
export function useTypewriter(lines: string[], reduced: boolean) {
  const stops = useMemo(() => lineBoundaries(lines), [lines]);
  const total = stops[stops.length - 1] ?? 0;

  const [count, setCount] = useState(() => (reduced ? total : 0));
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (reduced) {
      setCount(total);
      return undefined;
    }

    if (fading) {
      const timer = window.setTimeout(() => {
        setCount(0);
        setFading(false);
      }, FADE_MS);
      return () => window.clearTimeout(timer);
    }

    if (count >= total) {
      const timer = window.setTimeout(() => setFading(true), HOLD_MS);
      return () => window.clearTimeout(timer);
    }

    // Breathe at the end of each line instead of running straight on.
    const atLineEnd = count > 0 && stops.includes(count);
    const timer = window.setTimeout(
      () => setCount((value) => value + 1),
      atLineEnd ? LINE_PAUSE_MS : CHAR_MS,
    );
    return () => window.clearTimeout(timer);
  }, [count, total, fading, reduced, stops]);

  const rendered = useMemo(() => sliceLines(lines, count), [lines, count]);
  const activeLine = useMemo(() => {
    if (count >= total) return -1;
    return stops.findIndex((stop) => count < stop);
  }, [count, total, stops]);

  return { rendered, fading, activeLine, done: count >= total };
}
