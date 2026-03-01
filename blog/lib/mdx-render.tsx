import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import { MDXComponentsMap } from '@/components/MDXComponents';

interface MdxRenderProps {
  source: string;
}

export function MdxRender({ source }: MdxRenderProps) {
  return (
    <MDXRemote
      source={source}
      components={MDXComponentsMap}
      options={{
        mdxOptions: {
          rehypePlugins: [rehypeSlug],
        },
      }}
    />
  );
}
