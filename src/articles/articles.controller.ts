import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ArticleDto, ArticleResponse } from 'src/model/article.model';
import { Roles } from 'src/common/roles.decorator';
import { Public } from 'src/common/public.decorator';

@ApiTags('Article')
@Controller('v1/article')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  @Post()
  @Roles('admin')
  @ApiBearerAuth()
  async create(@Body() articleDto: ArticleDto): Promise<ArticleResponse> {
    return this.articleService.create(articleDto);
  }

  @Public()
  @Get()
  async findAll(): Promise<ArticleResponse[]> {
    return this.articleService.findAll();
  }

  @Public()
  @Get(':id')
  async findById(@Param('id') id: string): Promise<ArticleResponse | null> {
    return this.articleService.findById(id);
  }

  @Public()
  @Get('/by-slug/:slug')
  async findBySlug(
    @Param('slug') slug: string,
  ): Promise<ArticleResponse | null> {
    return this.articleService.findBySlug(slug);
  }

  @Put(':id')
  @Roles('admin')
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() articleDto: ArticleDto,
  ): Promise<ArticleResponse | null> {
    return this.articleService.update(id, articleDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiBearerAuth()
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.articleService.remove(id);
  }
}
