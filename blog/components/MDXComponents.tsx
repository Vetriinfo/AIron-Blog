import type { MDXComponents } from 'mdx/types';

const shared: MDXComponents = {
    h1: ({ children }) => (
      <h1 className="font-display mt-10 mb-4 text-2xl font-bold text-ink first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children, id }) => (
      <h2
        id={id ?? undefined}
        className="font-display mt-10 mb-3 text-xl font-semibold text-ink scroll-mt-20"
      >
        {children}
      </h2>
    ),
    h3: ({ children, id }) => (
      <h3
        id={id ?? undefined}
        className="font-display mt-8 mb-2 text-lg font-semibold text-ink scroll-mt-20"
      >
        {children}
      </h3>
    ),
    p: ({ children }) => <p className="mb-4 leading-7 text-ink">{children}</p>,
    ul: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-1 text-ink">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1 text-ink">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-7">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="mb-4 border-l-4 border-brand-500 pl-4 italic text-ink-muted">
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="font-medium text-brand-600 underline hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    pre: ({ children }) => (
      <pre className="mb-4 overflow-x-auto rounded-lg border border-border bg-surface-elevated p-4 text-sm">
        {children}
      </pre>
    ),
    code: ({ children, className }) => {
      const isBlock = className?.includes('language-');
      if (isBlock) {
        return (
          <code className={className ? `block ${className}` : ''}>
            {children}
          </code>
        );
      }
      return (
        <code className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-sm">
          {children}
        </code>
      );
    },
    hr: () => <hr className="my-8 border-border" />,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...shared, ...components };
}

export const MDXComponentsMap = shared;
