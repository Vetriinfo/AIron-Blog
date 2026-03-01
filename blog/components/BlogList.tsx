import { PostCard } from './PostCard';
import type { BlogPost } from '@/lib/mdx';

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <p className="rounded-lg border border-border bg-surface-muted/50 p-8 text-center text-ink-muted">
        No posts yet. Check back soon.
      </p>
    );
  }

  return (
    <ul className="space-y-6">
      {posts.map((post) => (
        <li key={post.slug}>
          <PostCard
            slug={post.slug}
            title={post.frontmatter.title}
            date={post.frontmatter.date}
            category={post.frontmatter.category}
            className="p-5"
          />
        </li>
      ))}
    </ul>
  );
}
