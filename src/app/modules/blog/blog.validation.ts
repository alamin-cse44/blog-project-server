import { z } from 'zod';

const createBlogValidaitonSchema = z.object({
  body: z.object({
    title: z.string().min(5).max(255),
    content: z.string().min(20).max(5000),
  }),
});

export const BlogValidations = {
  createBlogValidaitonSchema,
};
