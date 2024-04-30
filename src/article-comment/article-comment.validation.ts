import { z, ZodType } from 'zod';

export class ArticleCommentValidation {
  static readonly CREATE_UPDATE: ZodType = z.object({
    content: z.string().min(1),
    userId: z.string().min(1),
    articleId: z.string().min(1),
  });
}
