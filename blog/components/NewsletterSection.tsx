'use client';

import { useState } from 'react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    // Replace with your newsletter provider (e.g. Buttondown, ConvertKit, Resend)
    try {
      // await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) });
      await new Promise((r) => setTimeout(r, 800));
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="rounded-xl border border-border bg-surface-muted/50 p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
        Newsletter
      </h2>
      <p className="mt-2 text-sm text-ink-muted">
        Get updates on new posts and projects. No spam, unsubscribe anytime.
      </p>
      {status === 'success' ? (
        <p className="mt-4 text-sm font-medium text-green-600 dark:text-green-400">
          Thanks! Check your inbox to confirm.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            disabled={status === 'loading'}
            className="flex-1 rounded-lg border border-border bg-surface px-4 py-2.5 text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:opacity-50"
            aria-label="Email for newsletter"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-ink-inverse hover:opacity-90 disabled:opacity-50"
          >
            {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>
      )}
      {status === 'error' && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
