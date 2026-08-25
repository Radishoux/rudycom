import { useCallback, useEffect, useRef, useState } from 'react';

const GRID = 17;
const TICK_START_MS = 150;
const TICK_FLOOR_MS = 70;
const STORAGE_KEY = 'rudycom.snake.best';

type Point = { x: number; y: number };
type Direction = 'up' | 'down' | 'left' | 'right';
type Status = 'idle' | 'running' | 'over';

const VECTORS: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITES: Record<Direction, Direction> = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
};

const KEY_MAP: Record<string, Direction> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  w: 'up',
  s: 'down',
  a: 'left',
  d: 'right',
};

function readBest(): number {
  const stored = Number(window.localStorage.getItem(STORAGE_KEY));
  return Number.isFinite(stored) && stored > 0 ? stored : 0;
}

function randomFreeCell(occupied: Point[]): Point {
  const free: Point[] = [];
  for (let y = 0; y < GRID; y += 1) {
    for (let x = 0; x < GRID; x += 1) {
      if (!occupied.some((p) => p.x === x && p.y === y)) free.push({ x, y });
    }
  }
  return free[Math.floor(Math.random() * free.length)] ?? { x: 0, y: 0 };
}

/**
 * A small game tucked into the CV page.
 *
 * Two rules shape the implementation. It must never take arrow keys away from
 * somebody scrolling the page, so keys are only captured while a round is
 * actually running. And it must disappear entirely when the CV is printed.
 */
export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  // Mutable game state lives in refs: the loop runs on a timer and must not
  // re-render React on every tick.
  const snake = useRef<Point[]>([]);
  const food = useRef<Point>({ x: 0, y: 0 });
  const direction = useRef<Direction>('right');
  const queued = useRef<Direction[]>([]);

  useEffect(() => setBest(readBest()), []);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const size = canvas.width;
    const cell = size / GRID;
    const styles = getComputedStyle(document.documentElement);
    const accent = styles.getPropertyValue('--accent').trim() || '#e879f9';
    const soft = styles.getPropertyValue('--accent-soft').trim() || '#f0abfc';
    const surface = styles.getPropertyValue('--surface-code').trim() || '#120a1e';

    ctx.fillStyle = surface;
    ctx.fillRect(0, 0, size, size);

    // Food, drawn as a soft dot.
    ctx.fillStyle = soft;
    ctx.beginPath();
    ctx.arc(
      (food.current.x + 0.5) * cell,
      (food.current.y + 0.5) * cell,
      cell * 0.28,
      0,
      Math.PI * 2,
    );
    ctx.fill();

    // Body, fading toward the tail so direction of travel is readable.
    snake.current.forEach((segment, index) => {
      const t = 1 - index / Math.max(snake.current.length, 1);
      ctx.globalAlpha = 0.35 + t * 0.65;
      ctx.fillStyle = index === 0 ? soft : accent;
      const pad = cell * 0.12;
      const radius = cell * 0.28;
      const x = segment.x * cell + pad;
      const y = segment.y * cell + pad;
      const w = cell - pad * 2;
      ctx.beginPath();
      ctx.roundRect(x, y, w, w, radius);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }, []);

  const reset = useCallback(() => {
    const start: Point[] = [
      { x: 8, y: 8 },
      { x: 7, y: 8 },
      { x: 6, y: 8 },
    ];
    snake.current = start;
    food.current = randomFreeCell(start);
    direction.current = 'right';
    queued.current = [];
    setScore(0);
  }, []);

  const start = useCallback(() => {
    reset();
    setStatus('running');
  }, [reset]);

  // Size the canvas to its container, accounting for device pixel ratio.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const css = canvas.clientWidth;
      canvas.width = Math.round(css * dpr);
      canvas.height = Math.round(css * dpr);
      paint();
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [paint]);

  useEffect(() => {
    if (status === 'idle') reset();
    paint();
  }, [status, reset, paint]);

  // The game loop.
  useEffect(() => {
    if (status !== 'running') return undefined;

    let timer = 0;
    let alive = true;

    const step = () => {
      const next = queued.current.shift();
      if (next && next !== OPPOSITES[direction.current]) direction.current = next;

      const vector = VECTORS[direction.current];
      const head = snake.current[0];
      const target = { x: head.x + vector.x, y: head.y + vector.y };

      const hitWall =
        target.x < 0 || target.y < 0 || target.x >= GRID || target.y >= GRID;
      const hitSelf = snake.current.some((p) => p.x === target.x && p.y === target.y);

      if (hitWall || hitSelf) {
        alive = false;
        setStatus('over');
        setScore((current) => {
          setBest((currentBest) => {
            if (current <= currentBest) return currentBest;
            window.localStorage.setItem(STORAGE_KEY, String(current));
            return current;
          });
          return current;
        });
        return;
      }

      const ate = target.x === food.current.x && target.y === food.current.y;
      const body = [target, ...snake.current];
      if (!ate) body.pop();
      snake.current = body;

      if (ate) {
        food.current = randomFreeCell(body);
        setScore((value) => value + 1);
      }

      paint();

      if (alive) {
        const speed = Math.max(TICK_FLOOR_MS, TICK_START_MS - snake.current.length * 2.5);
        timer = window.setTimeout(step, speed);
      }
    };

    timer = window.setTimeout(step, TICK_START_MS);
    return () => {
      alive = false;
      window.clearTimeout(timer);
    };
  }, [status, paint]);

  // Arrow keys are only intercepted while a round is running, so they keep
  // scrolling the page the rest of the time.
  useEffect(() => {
    if (status !== 'running') return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      const next = KEY_MAP[event.key] ?? KEY_MAP[event.key.toLowerCase()];
      if (!next) return;
      event.preventDefault();
      if (queued.current.length < 2) queued.current.push(next);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [status]);

  // Touch: swipe anywhere on the board.
  const touchStart = useRef<Point | null>(null);
  const onTouchStart = (event: React.TouchEvent) => {
    const t = event.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (event: React.TouchEvent) => {
    const origin = touchStart.current;
    if (!origin) return;
    const t = event.changedTouches[0];
    const dx = t.clientX - origin.x;
    const dy = t.clientY - origin.y;
    if (Math.abs(dx) < 24 && Math.abs(dy) < 24) return;
    const next: Direction =
      Math.abs(dx) > Math.abs(dy)
        ? (dx > 0 && 'right') || 'left'
        : (dy > 0 && 'down') || 'up';
    if (queued.current.length < 2) queued.current.push(next);
    touchStart.current = null;
  };

  return (
    <section className="game" aria-labelledby="game-heading">
      <div className="game-intro">
        <h2 id="game-heading">Take a break</h2>
        <p>
          You have read enough of a CV for one afternoon. Arrow keys or WASD on a
          keyboard, swipe on a phone.
        </p>
        <dl className="game-score">
          <div>
            <dt>Score</dt>
            <dd>{score}</dd>
          </div>
          <div>
            <dt>Best</dt>
            <dd>{best}</dd>
          </div>
        </dl>
        <button type="button" className="primary-button" onClick={start}>
          {status === 'running' ? 'Restart' : 'Play'}
        </button>
      </div>

      <div className="game-board" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <canvas ref={canvasRef} className="game-canvas" />
        {status !== 'running' ? (
          <div className="game-overlay">
            <p>{status === 'over' ? `Caught yourself out on ${score}.` : 'Snake'}</p>
            <button type="button" className="secondary-button" onClick={start}>
              {status === 'over' ? 'Play again' : 'Start'}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
