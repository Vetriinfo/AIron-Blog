import Link from 'next/link';
import { formatDateShort } from '@/utils/formatDate';
import { cn } from '@/utils/cn';

interface PostCardProps {
  slug: string;
  title: string;
  date: string;
  category: string;
  className?: string;
}

export function PostCard({
  slug,
  title,
  date,
  category,
  className,
}: PostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        'group block rounded-lg border border-border bg-surface-elevated p-4 transition-colors hover:border-border-strong',
        className
      )}
    >
      <span className="text-xs font-medium text-ink-muted">{category}</span>
      <h3 className="mt-1 font-medium text-ink group-hover:text-brand-600 dark:group-hover:text-brand-400 line-clamp-2">
        {title}
      </h3>
      <time className="mt-2 block text-xs text-ink-muted" dateTime={date}>
        {formatDateShort(date)}
      </time>
    </Link>
  );
}
