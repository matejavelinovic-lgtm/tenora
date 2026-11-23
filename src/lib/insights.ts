// Insights (blog) helpers shared by the listing, the post pages and the
// "latest posts" teasers.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Insight = CollectionEntry<'insights'>;

/** Every post, newest first. */
export async function getInsights(): Promise<Insight[]> {
  const posts = await getCollection('insights');
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** The n most recent posts, for the teaser bands. */
export async function latestInsights(n = 3): Promise<Insight[]> {
  return (await getInsights()).slice(0, n);
}

export const insightHref = (post: Insight) => `/insights/${post.id}`;

/** "November 16, 2026", as the original prints it. */
export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
