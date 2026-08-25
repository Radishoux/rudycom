import { useReducedMotion } from '../hooks/useReducedMotion';
import { useTypewriter } from '../hooks/useTypewriter';

const CODE_LINES = [
  "const engineer = 'Rudy Quinternet';",
  'ship({ api, web, mobile, cloud });',
  'harden({ tests, ci, types });',
  'while (learning) buildBetter();',
  'export default productMindset;',
];

/**
 * A code sample that types itself out, holds, then restarts.
 *
 * Deliberately not dressed up as a fake macOS window. Traffic-light dots and
 * chrome around a div is one of the most recognisable AI-built-this tells, and
 * the code is more convincing without a costume.
 */
export function CodeSample() {
  const reduced = useReducedMotion();
  const { rendered, fading, activeLine, done } = useTypewriter(CODE_LINES, reduced);

  return (
    <aside className={`code-sample${fading ? ' is-fading' : ''}`}>
      <p className="code-sample-label">rudy.profile.ts</p>
      <pre aria-hidden="true">
        {rendered.map((text, index) => (
          <span className="code-line" key={CODE_LINES[index]}>
            <span className="code-lineno">{String(index + 1).padStart(2, '0')}</span>
            <span className="code-text">{text}</span>
            {index === activeLine ? <i className="code-caret" /> : null}
          </span>
        ))}
      </pre>
      {/* The animation is decorative; assistive tech gets the finished text once. */}
      <span className="visually-hidden">{done ? CODE_LINES.join(' ') : ''}</span>
    </aside>
  );
}
