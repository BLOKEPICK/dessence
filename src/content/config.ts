import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    summary: z.string(),
    idealFor: z.array(z.string()).optional(),
    downtime: z.string().optional(),
    session: z.string().optional(),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
    ogImage: z.string().optional()
  })
});

const results = defineCollection({
  type: 'data',
  schema: z.object({
    serviceSlug: z.string(),
    title: z.string(),
    date: z.string().optional(),
    imageBefore: z.string(),
    imageAfter: z.string(),
    featured: z.boolean().optional().default(false),
    consent: z.boolean().optional().default(true),
    notes: z.string().optional()
  })
});

export const collections = {
  services,
  results
};