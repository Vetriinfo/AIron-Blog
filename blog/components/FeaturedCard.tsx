import Link from 'next/link';
import { formatDateShort } from '@/utils/formatDate';
import { slugify } from '@/utils/slugify';
import { cn } from '@/utils/cn';

interface FeaturedCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: string;
  className?: string;
}

export function FeaturedCard({
  slug,
  title,
  description,
  date,
  category,
  readingTime,
  className,
}: FeaturedCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        'group block rounded-xl border border-border bg-surface-elevated p-6 transition-colors hover:border-border-strong hover:shadow-md',
        className
      )}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-ink-muted">
        <span className="rounded-full bg-surface-muted px-2.5 py-0.5 font-medium">
          {category}
        </span>
        <span>{formatDateShort(date)}</span>
        <span>·</span>
        <span>{readingTime}</span>
      </div>
      <h3 className="font-display text-xl font-semibold text-ink group-hover:text-brand-600 dark:group-hover:text-brand-400">
        {title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm text-ink-muted">{description}</p>
    </Link>
  );
}
