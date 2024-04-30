import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { ArticleDto, ArticleResponse } from 'src/model/article.model';
import { Logger } from 'winston';
import { ArticleValidation } from './article.validation';
import stringToSlug from 'src/helper/title-slug.helper';

@Injectable()
export class ArticlesService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async create(articleDto: ArticleDto): Promise<ArticleResponse> {
    try {
      this.logger.info(`Register new user ${JSON.stringify(articleDto)}`);

      const createArticle: ArticleDto = this.validationService.validate(
        ArticleValidation.CREATE_UPDATE,
        articleDto,
      );

      //add title slug
      createArticle.titleSlug = stringToSlug(articleDto.title);

      const data = await this.prismaService.article.create({
        data: createArticle,
      });

      return this.mapArticleToResponse(data);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<ArticleResponse[]> {
    try {
      const articles = await this.prismaService.article.findMany();
      return articles.map(this.mapArticleToResponse);
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<ArticleResponse | null> {
    try {
      const article = await this.prismaService.article.findUnique({
        where: { id },
      });

      if (!article) throw new NotFoundException();

      return this.mapArticleToResponse(article);
    } catch (error) {
      throw error;
    }
  }

  async findBySlug(titleSlug: string): Promise<ArticleResponse | null> {
    try {
      const article = await this.prismaService.article.findFirst({
        where: { titleSlug },
      });

      if (!article) return null;

      return this.mapArticleToResponse(article);
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    articleDto: ArticleDto,
  ): Promise<ArticleResponse | null> {
    try {
      const existingArticle = await this.prismaService.article.findUnique({
        where: { id },
      });

      if (!existingArticle) return null;

      const updatedArticle = await this.prismaService.article.update({
        where: { id },
        data: articleDto,
      });

      return this.mapArticleToResponse(updatedArticle);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prismaService.article.delete({
        where: { id },
      });
      return null;
    } catch (error) {
      throw error;
    }
  }

  private mapArticleToResponse(article: any): ArticleResponse {
    return {
      id: article.id,
      title: article.title,
      titleSlug: stringToSlug(article.title),
      content: article.content,
      userId: article.userId,
    };
  }
}
