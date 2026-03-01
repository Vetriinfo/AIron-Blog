import { extractToc, type TocItem } from '@/lib/toc';

interface TableOfContentsProps {
  source: string;
}

export function TableOfContents({ source }: TableOfContentsProps) {
  const items = extractToc(source);
  if (items.length === 0) return null;

  return (
    <nav
      className="sticky top-24 rounded-lg border border-border bg-surface-muted/50 p-4"
      aria-label="Table of contents"
    >
      <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
        On this page
      </h2>
      <ul className="mt-3 space-y-1.5">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: item.level === 3 ? '1rem' : 0 }}
          >
            <a
              href={`#${item.id}`}
              className="text-sm text-ink-muted hover:text-ink"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
