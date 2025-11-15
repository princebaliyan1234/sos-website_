import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    description: z.string(),
    author: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([])
  })
});

const booksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    platform: z.string(),
    genre: z.string(),
    theme: z.string(),
    tropes: z.array(z.string()),
    description: z.string(),
    coverImage: z.string(),
    link: z.string(),
    publishDate: z.date()
  })
});

export const collections = {
  'blog': blogCollection,
  'books': booksCollection
};