import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Automation tools, AI agents, and engineering systems built for structural design and technical workflows.',
};

const PROJECTS = [
  {
    title: 'Tekla automation scripts',
    description: 'Python and C# scripts for Tekla Structures: model checks, drawing macros, and data export.',
    category: 'Steel Design & Tekla',
    href: '#',
  },
  {
    title: 'Design calculation pipelines',
    description: 'Automated load take-down, connection checks, and report generation from 3D models.',
    category: 'Structural Engineering',
    href: '#',
  },
  {
    title: 'RAG-based design assistant',
    description: 'AI agent over codes and standards for quick lookups and clause summaries.',
    category: 'AI Agents & RAG',
    href: '#',
  },
  {
    title: 'Portfolio & compounding tracker',
    description: 'Tools for tracking positions, returns, and long-term compounding metrics.',
    category: 'Stock Market & Investing',
    href: '#',
  },
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <header className="mb-12">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Projects
        </h1>
        <p className="mt-3 text-ink-muted">
          Automation tools, AI agents, and engineering systems.
        </p>
      </header>

      <ul className="grid gap-6 sm:grid-cols-2">
        {PROJECTS.map((project) => (
          <li key={project.title}>
            <Link
              href={project.href}
              className="block rounded-xl border border-border bg-surface-elevated p-6 transition-colors hover:border-border-strong hover:shadow-md"
            >
              <span className="text-sm font-medium text-ink-muted">
                {project.category}
              </span>
              <h2 className="mt-2 font-display text-xl font-semibold text-ink">
                {project.title}
              </h2>
              <p className="mt-2 text-sm text-ink-muted">{project.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
