import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ArticleCategoryService } from './article-category.service';
import {
  ArticleCategoryDto,
  ArticleCategoryResponse,
} from 'src/model/article-category.model';
import {
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { Roles } from 'src/common/roles.decorator';
import { Public } from 'src/common/public.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Article Category')
@Controller('v1/article-category')
export class ArticleCategoryController {
  constructor(private articleCategoryService: ArticleCategoryService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Create Article Category' })
  @ApiResponse({
    status: 201,
    description: 'The article category has been successfully created.',
    type: ArticleCategoryResponse,
  })
  async create(
    @Body() categoryDto: ArticleCategoryDto,
  ): Promise<ArticleCategoryResponse> {
    return await this.articleCategoryService.create(categoryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Article Category by ID' })
  @Public()
  @ApiResponse({
    status: 200,
    description: 'Return the article category with the given ID.',
    type: ArticleCategoryResponse,
  })
  async findById(
    @Param('id') id: string,
  ): Promise<ArticleCategoryResponse | null> {
    return await this.articleCategoryService.findById(id);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get All Article Categories' })
  @ApiResponse({
    status: 200,
    description: 'Return all article categories.',
    type: [ArticleCategoryResponse],
  })
  async findAll(): Promise<ArticleCategoryResponse[]> {
    return await this.articleCategoryService.findAll();
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Update Article Category' })
  @ApiResponse({
    status: 200,
    description: 'The article category has been successfully updated.',
    type: ArticleCategoryResponse,
  })
  async update(
    @Param('id') id: string,
    @Body() categoryDto: ArticleCategoryDto,
  ): Promise<ArticleCategoryResponse | null> {
    return await this.articleCategoryService.update(id, categoryDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete Article Category' })
  @ApiResponse({
    status: 200,
    description: 'The article category has been successfully deleted.',
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return await this.articleCategoryService.remove(id);
  }
}
