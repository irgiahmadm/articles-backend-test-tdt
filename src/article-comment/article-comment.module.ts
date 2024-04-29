import { Module } from '@nestjs/common';
import { ArticleCommentController } from './article-comment.controller';
import { ArticleCommentService } from './article-comment.service';

@Module({
  controllers: [ArticleCommentController],
  providers: [ArticleCommentService],
})
export class ArticleCommentModule {}
