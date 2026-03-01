import { getAllPosts, getCategoriesWithCounts } from '@/lib/mdx';
import { Suspense } from 'react';
import { BlogList } from '@/components/BlogList';
import { BlogSearch } from '@/components/BlogSearch';
import { slugify } from '@/utils/slugify';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles on structural engineering, steel design, Python & C# automation, AI agents & RAG, investing, and emerging tech.',
};

interface PageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const { category: categorySlug, q } = await searchParams;
  let posts = getAllPosts();

  if (categorySlug) {
    const slugMatch = (name: string) =>
      slugify(name).toLowerCase() === categorySlug.toLowerCase();
    posts = posts.filter((p) => slugMatch(p.frontmatter.category || ''));
  }

  if (q?.trim()) {
    const lower = q.trim().toLowerCase();
    posts = posts.filter(
      (p) =>
        p.frontmatter.title.toLowerCase().includes(lower) ||
        (p.frontmatter.description || '').toLowerCase().includes(lower)
    );
  }

  const categories = getCategoriesWithCounts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <header className="mb-12">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Blog
        </h1>
        <p className="mt-3 text-ink-muted">
          Technical writing on engineering, automation, AI, and investing.
        </p>
      </header>

      <div className="mb-8">
        <Suspense fallback={<div className="h-10 rounded-lg border border-border bg-surface-muted/50" />}>
          <BlogSearch />
        </Suspense>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="lg:w-56 shrink-0">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
            Categories
          </h2>
          <ul className="mt-3 space-y-1">
            <li>
              <a
                href="/blog"
                className="text-sm text-ink-muted hover:text-ink"
              >
                All ({posts.length})
              </a>
            </li>
            {categories.map(({ name, count }) => (
              <li key={name}>
                <a
                  href={`/blog?category=${encodeURIComponent(slugify(name))}`}
                  className="text-sm text-ink-muted hover:text-ink"
                >
                  {name} ({count})
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="min-w-0 flex-1">
          <BlogList posts={posts} />
        </div>
      </div>
    </div>
  );
}
