import { getAllPosts } from '@/lib/mdx';
import { HomePageClient } from '@/components/HomePageClient';

export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts.slice(0, 2);
  const rest = posts.slice(2, 6);

  return <HomePageClient featured={featured} latest={rest} />;
}
