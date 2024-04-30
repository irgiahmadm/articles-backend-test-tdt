import { z, ZodType } from 'zod';

export class ArticleCategoryValidation {
  static readonly CREATE_UPDATE: ZodType = z.object({
    name: z.string().min(1),
  });
}
