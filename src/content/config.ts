import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    author: z.string(),
    category: z.enum(['business', 'technical', 'case-study', 'tutorial', 'insights']),
    tags: z.array(z.string()),
    featured: z.boolean().optional(),
    readingTime: z.number().optional(),
    coverImage: z.string().optional(),
  }),
});

export const collections = { blog };
