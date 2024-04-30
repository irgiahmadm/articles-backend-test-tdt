import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';

import { ArticleCommentValidation } from './article-comment.validation';
import {
  ArticleCommentDto,
  ArticleCommentResponse,
} from 'src/model/article.comment';

@Injectable()
export class ArticleCommentService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async create(commentDto: ArticleCommentDto): Promise<ArticleCommentResponse> {
    try {
      const createComment: ArticleCommentDto = this.validationService.validate(
        ArticleCommentValidation.CREATE_UPDATE,
        commentDto,
      );

      const data = await this.prismaService.articleComment.create({
        data: createComment,
      });

      return this.mapCommentToResponse(data);
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<ArticleCommentResponse | null> {
    try {
      const comment = await this.prismaService.articleComment.findUnique({
        where: { id },
      });

      if (!comment) throw new NotFoundException();

      return this.mapCommentToResponse(comment);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<ArticleCommentResponse[]> {
    try {
      const comments = await this.prismaService.articleComment.findMany();
      return comments.map(this.mapCommentToResponse);
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    commentDto: ArticleCommentDto,
  ): Promise<ArticleCommentResponse | null> {
    try {
      const existingComment =
        await this.prismaService.articleComment.findUnique({
          where: { id },
        });

      if (!existingComment) throw new NotFoundException();

      const updatedComment = await this.prismaService.articleComment.update({
        where: { id },
        data: commentDto,
      });

      return this.mapCommentToResponse(updatedComment);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prismaService.articleComment.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  private mapCommentToResponse(comment: any): ArticleCommentResponse {
    return {
      id: comment.id,
      articleId: comment.articleId,
      userId: comment.userId,
      content: comment.content,
    };
  }
}
