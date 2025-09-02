import { defineCollection, z } from 'astro:content';

export const collections = {
  services: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      slug: z.string(),
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      summary: z.string(),
      idealFor: z.array(z.string()).optional(),
      downtime: z.string().optional(),
      session: z.string().optional(),
      faqs: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
      ogImage: z.string().optional()
    })
  })
};
