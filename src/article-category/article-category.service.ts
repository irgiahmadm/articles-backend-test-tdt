import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import {
  ArticleCategoryDto,
  ArticleCategoryResponse,
} from 'src/model/article-category.model';
import { ArticleCategoryValidation } from './article-category.validation';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class ArticleCategoryService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async create(
    categoryDto: ArticleCategoryDto,
  ): Promise<ArticleCategoryResponse> {
    try {
      const createCategory: ArticleCategoryDto =
        this.validationService.validate(
          ArticleCategoryValidation.CREATE_UPDATE,
          categoryDto,
        );

      const data = await this.prismaService.articleCategory.create({
        data: createCategory,
      });

      return this.mapCategoryToResponse(data);
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<ArticleCategoryResponse | null> {
    try {
      const category = await this.prismaService.articleCategory.findUnique({
        where: { id },
      });

      if (!category) throw new NotFoundException();

      return this.mapCategoryToResponse(category);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<ArticleCategoryResponse[]> {
    try {
      const categories = await this.prismaService.articleCategory.findMany();
      return categories.map(this.mapCategoryToResponse);
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    categoryDto: ArticleCategoryDto,
  ): Promise<ArticleCategoryResponse | null> {
    try {
      const existingCategory =
        await this.prismaService.articleCategory.findUnique({
          where: { id },
        });

      if (!existingCategory) throw new NotFoundException();

      const updatedCategory = await this.prismaService.articleCategory.update({
        where: { id },
        data: categoryDto,
      });

      return this.mapCategoryToResponse(updatedCategory);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prismaService.articleCategory.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  private mapCategoryToResponse(category: any): ArticleCategoryResponse {
    return {
      id: category.id,
      name: category.name,
      // Add other properties as needed
    };
  }
}
