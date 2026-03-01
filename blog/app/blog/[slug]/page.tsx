import { notFound } from 'next/navigation';
import { getAllSlugs, getPostBySlug } from '@/lib/mdx';
import { BlogPostContent } from '@/components/BlogPostContent';
import { TableOfContents } from '@/components/TableOfContents';
import { formatDate } from '@/utils/formatDate';
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post not found' };
  const { title, description, image } = post.frontmatter;
  const url = `${SITE.url}/blog/${slug}`;
  const ogImage = image ? `${SITE.url}${image}` : SITE.defaultImage;

  return {
    title,
    description,
    openGraph: {
      title,
      description: description ?? undefined,
      url,
      type: 'article',
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description ?? undefined,
    },
    alternates: { canonical: url },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content, readingTime, readingTimeMinutes } = post;

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_200px]">
        <div className="min-w-0">
          <header className="mb-8">
            <span className="text-sm font-medium text-ink-muted">
              {frontmatter.category}
            </span>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {frontmatter.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-ink-muted">
              <time dateTime={frontmatter.date}>
                {formatDate(frontmatter.date)}
              </time>
              <span>·</span>
              <span>{readingTime}</span>
            </div>
          </header>

          <BlogPostContent source={content} />
        </div>

        <aside className="hidden lg:block">
          <TableOfContents source={content} />
        </aside>
      </div>
    </article>
  );
}
