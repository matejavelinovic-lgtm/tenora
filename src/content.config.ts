// Content collections — Markdown files in src/content/<collection>/.
// Imported once from tenora.com (Webflow CMS); edit the files to change content.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: new URL('./content/team', import.meta.url) }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    /** Position in the leadership grid on /about-us. */
    order: z.number(),
    /** Large portrait on the team-member page. */
    photo: z.string(),
    /** Cut-out used in the about-page grid (with its responsive variants). */
    avatar: z.string(),
    avatarSrcset: z.string().optional(),
    avatarSizes: z.string().optional(),
    linkedin: z.string().optional(),
  }),
});

const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: new URL('./content/insights', import.meta.url) }),
  schema: z.object({
    title: z.string(),
    /** Lead paragraph under the title; also the card text in listings. */
    excerpt: z.string(),
    /** Publish date. Posts sort newest first; add a time to order two posts on the same day. */
    date: z.coerce.date(),
    author: z.string().optional(),
    /** Hero image on the post, and the card image everywhere else. */
    image: z.string(),
    imageSrcset: z.string().optional(),
    /** The large card at the top of /insights. */
    featured: z.boolean().default(false),
    /** false: published (and in "latest" teasers) but left out of the /insights grid. */
    listed: z.boolean().default(true),
    /** JSON-LD (e.g. FAQPage) emitted in the post's page. */
    schema: z.string().optional(),
  }),
});

export const collections = { team, insights };
