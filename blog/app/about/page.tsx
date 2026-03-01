import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Professional profile and mission: structural engineering, steel design, Python & C# automation, AI agents, and technical writing.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        About
      </h1>
      <div className="prose prose-invert mt-8 max-w-none dark:prose-invert">
        <p className="text-lg text-ink-muted">
          Technical creator focused on structural engineering, steel design & Tekla
          detailing, Python and C# automation, AI agents & RAG systems, and
          long-term capital compounding. This site is the home for essays, project
          notes, and how-tos.
        </p>

        <h2 className="font-display mt-10 text-xl font-semibold text-ink">
          What I do
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-ink-muted">
          <li>Structural engineering and steel connection design</li>
          <li>Tekla Structures modeling and automation</li>
          <li>Python & C# tooling for design and data pipelines</li>
          <li>AI agents and RAG systems for technical workflows</li>
          <li>Writing and teaching on engineering and software</li>
        </ul>

        <h2 className="font-display mt-10 text-xl font-semibold text-ink">
          Mission
        </h2>
        <p className="mt-3 text-ink-muted">
          Share practical knowledge at the intersection of structural engineering,
          automation, and emerging tech—so others can build better tools and
          systems.
        </p>

        <p className="mt-8 text-ink-muted">
          For projects and contact, see the{' '}
          <Link href="/projects" className="text-brand-600 hover:underline dark:text-brand-400">
            Projects
          </Link>{' '}
          and{' '}
          <Link href="/contact" className="text-brand-600 hover:underline dark:text-brand-400">
            Contact
          </Link>{' '}
          pages.
        </p>
      </div>
    </div>
  );
}
