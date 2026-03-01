import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="font-display text-4xl font-bold text-ink">404</h1>
      <p className="mt-2 text-ink-muted">This page could not be found.</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-ink-inverse hover:opacity-90"
      >
        Back to home
      </Link>
    </div>
  );
}
