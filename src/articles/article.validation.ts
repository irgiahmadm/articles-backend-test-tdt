import { z, ZodType } from 'zod';

export class ArticleValidation {
  static readonly CREATE_UPDATE: ZodType = z.object({
    title: z.string().min(1).max(100),
    content: z.string().min(100),
    userId: z.string().min(1),
  });
}
