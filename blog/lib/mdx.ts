import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
  tags?: string[];
  image?: string;
  published?: boolean;
  slug?: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  readingTime: string;
  readingTimeMinutes: number;
}

export const CATEGORIES = [
  'Structural Engineering',
  'Steel Design & Tekla',
  'Python & C# Automation',
  'AI Agents & RAG',
  'Stock Market & Investing',
  'Quantum & Emerging Tech',
] as const;

export type Category = (typeof CATEGORIES)[number];

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.mdx?$/, '');
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(getSlugFromFilename);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const extensions = ['.mdx', '.md'];
  for (const ext of extensions) {
    const fullPath = path.join(BLOG_DIR, `${slug}${ext}`);
    if (!fs.existsSync(fullPath)) continue;
    const raw = fs.readFileSync(fullPath, 'utf-8');
    const { data, content } = matter(raw);
    const stats = readingTime(content);
    return {
      slug,
      frontmatter: data as BlogFrontmatter,
      content,
      readingTime: stats.text,
      readingTimeMinutes: Math.ceil(stats.minutes),
    };
  }
  return null;
}

export function getAllPosts(publishedOnly = true): BlogPost[] {
  const slugs = getAllSlugs();
  const posts = slugs
    .map((s) => getPostBySlug(s))
    .filter((p): p is BlogPost => p !== null)
    .filter((p) => !publishedOnly || p.frontmatter.published !== false)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
  return posts;
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter(
    (p) => p.frontmatter.category?.toLowerCase() === category.toLowerCase()
  );
}

export function getCategoriesWithCounts(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const map = new Map<string, number>();
  for (const p of posts) {
    const cat = p.frontmatter.category || 'Uncategorized';
    map.set(cat, (map.get(cat) ?? 0) + 1);
  }
  return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
}
