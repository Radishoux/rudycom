import { useEffect, useState } from 'react';
import { profile } from '../data/profile';

type CopyState = 'idle' | 'done' | 'failed';

type ContactRow = {
  key: string;
  label: string;
  value: string;
  href: string;
  external: boolean;
};

const ROWS: ContactRow[] = [
  {
    key: 'email',
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    external: false,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/rudy-quinternet',
    href: profile.linkedin,
    external: true,
  },
  {
    key: 'github',
    label: 'GitHub',
    value: 'github.com/Radishoux',
    href: profile.github,
    external: true,
  },
].filter((row) => Boolean(row.href));

/**
 * Copies to the clipboard, falling back to a scratch textarea, and says so if
 * both fail. A mailto: link that silently does nothing when no mail client is
 * registered is what made the old contact button look broken.
 */
async function copyToClipboard(value: string): Promise<CopyState> {
  try {
    await navigator.clipboard.writeText(value);
    return 'done';
  } catch {
    // The async clipboard API needs a secure context and permission.
  }

  try {
    const scratch = document.createElement('textarea');
    scratch.value = value;
    scratch.setAttribute('readonly', '');
    scratch.style.position = 'fixed';
    scratch.style.opacity = '0';
    document.body.appendChild(scratch);
    scratch.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(scratch);
    return ok ? 'done' : 'failed';
  } catch {
    return 'failed';
  }
}

function ContactLine({ label, value, href, external }: Omit<ContactRow, 'key'>) {
  const [copied, setCopied] = useState<CopyState>('idle');

  useEffect(() => {
    if (copied === 'idle') return undefined;
    const timer = window.setTimeout(() => setCopied('idle'), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const onCopy = async () => setCopied(await copyToClipboard(value));

  return (
    <li className="contact-row">
      <span className="contact-label">{label}</span>
      <a
        className="contact-value"
        href={href}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {value}
      </a>
      <button
        type="button"
        className={`copy-button${copied === 'done' ? ' is-copied' : ''}`}
        onClick={onCopy}
        aria-label={`Copy ${label.toLowerCase()} to clipboard`}
      >
        <span aria-hidden="true">
          {copied === 'done' ? 'Copied' : copied === 'failed' ? 'Select it' : 'Copy'}
        </span>
        <span className="visually-hidden" role="status">
          {copied === 'done' ? `${label} copied to clipboard` : ''}
          {copied === 'failed' ? `Could not copy automatically. ${label} is ${value}.` : ''}
        </span>
      </button>
    </li>
  );
}

export function ContactPanel() {
  return (
    <ul className="contact-panel">
      {ROWS.map(({ key, ...row }) => (
        <ContactLine key={key} {...row} />
      ))}
    </ul>
  );
}
