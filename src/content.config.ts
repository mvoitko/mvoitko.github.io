import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const timeline = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/timeline' }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    category: z.enum(['career', 'education', 'life']),
    tags: z.array(z.string()),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    status: z.enum(['draft', 'published']).default('draft'),
    description: z.string().optional(),
  }),
});

export const collections = { timeline, blog };
