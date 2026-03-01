export interface TocItem {
  id: string;
  text: string;
  level: number; // 2 = h2, 3 = h3
}

const HEADING_REGEX = /^(#{2,3})\s+(.+)$/gm;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function extractToc(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  let match: RegExpExecArray | null;
  const re = new RegExp(HEADING_REGEX.source, 'gm');
  while ((match = re.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    items.push({ id: slugify(text), text, level });
  }
  return items;
}
