'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SITE } from '@/lib/site';
import { FeaturedCard } from '@/components/FeaturedCard';
import { PostCard } from '@/components/PostCard';
import type { BlogPost } from '@/lib/mdx';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

interface HomePageClientProps {
  featured: BlogPost[];
  latest: BlogPost[];
}

export function HomePageClient({ featured, latest }: HomePageClientProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-16 text-center"
      >
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
          {SITE.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-muted">
          {SITE.description}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-ink-inverse hover:opacity-90"
          >
            Read the blog
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium text-ink hover:bg-surface-muted"
          >
            View projects
          </Link>
        </div>
      </motion.section>

      {featured.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-ink-muted">
            Featured posts
          </h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-8 sm:grid-cols-2"
          >
            {featured.map((post) => (
              <motion.div key={post.slug} variants={item}>
                <FeaturedCard
                  slug={post.slug}
                  title={post.frontmatter.title}
                  description={post.frontmatter.description}
                  date={post.frontmatter.date}
                  category={post.frontmatter.category}
                  readingTime={post.readingTime}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {latest.length > 0 && (
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
              Latest posts
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-brand-600 hover:underline dark:text-brand-400"
            >
              View all →
            </Link>
          </div>
          <motion.ul
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {latest.map((post) => (
              <motion.li key={post.slug} variants={item}>
                <PostCard
                  slug={post.slug}
                  title={post.frontmatter.title}
                  date={post.frontmatter.date}
                  category={post.frontmatter.category}
                />
              </motion.li>
            ))}
          </motion.ul>
        </section>
      )}

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-20 rounded-2xl border border-border bg-surface-muted/50 p-8 text-center"
      >
        <h2 className="font-display text-xl font-semibold text-ink">
          Newsletter
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          Get updates on new posts, projects, and automation tools. No spam.
        </p>
        <Link
          href="/contact#newsletter"
          className="mt-4 inline-block text-sm font-medium text-brand-600 hover:underline dark:text-brand-400"
        >
          Subscribe →
        </Link>
      </motion.section>
    </div>
  );
}
