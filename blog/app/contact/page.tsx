import { NewsletterSection } from '@/components/NewsletterSection';
import { SITE } from '@/lib/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch for consulting, collaboration, or newsletter updates.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Contact
      </h1>
      <p className="mt-3 text-ink-muted">
        For consulting, collaboration, or general inquiries.
      </p>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
            Email
          </h2>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-2 block font-medium text-brand-600 hover:underline dark:text-brand-400"
          >
            {SITE.email}
          </a>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
            Connect
          </h2>
          <ul className="mt-3 flex gap-6">
            <li>
              <a
                href={SITE.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-muted hover:text-ink"
              >
                Twitter / X
              </a>
            </li>
            <li>
              <a
                href={SITE.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-muted hover:text-ink"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={SITE.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-muted hover:text-ink"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </section>

        <section id="newsletter">
          <NewsletterSection />
        </section>
      </div>
    </div>
  );
}
