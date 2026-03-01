import { MdxRender } from '@/lib/mdx-render';

interface BlogPostContentProps {
  source: string;
}

export function BlogPostContent({ source }: BlogPostContentProps) {
  return (
    <div className="prose max-w-none dark:prose-invert">
      <MdxRender source={source} />
    </div>
  );
}
