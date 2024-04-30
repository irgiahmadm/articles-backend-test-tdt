import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ArticleCommentService } from './article-comment.service';
import {
  ArticleCommentDto,
  ArticleCommentResponse,
} from 'src/model/article-comment.model';
import {
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { Public } from 'src/common/public.decorator';

@ApiTags('Article Comment')
@Controller('v1/article-comment')
export class ArticleCommentController {
  constructor(private articleCommentService: ArticleCommentService) {}

  @Post()
  @ApiOperation({ summary: 'Create Article Comment' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The article comment has been successfully created.',
    type: ArticleCommentResponse,
  })
  async create(
    @Body() commentDto: ArticleCommentDto,
  ): Promise<ArticleCommentResponse> {
    return await this.articleCommentService.create(commentDto);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get Article Comment by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the article comment with the given ID.',
    type: ArticleCommentResponse,
  })
  async findById(
    @Param('id') id: string,
  ): Promise<ArticleCommentResponse | null> {
    return await this.articleCommentService.findById(id);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get All Article Comments' })
  @ApiResponse({
    status: 200,
    description: 'Return all article comments.',
    type: [ArticleCommentResponse],
  })
  async findAll(): Promise<ArticleCommentResponse[]> {
    return await this.articleCommentService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Article Comment' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The article comment has been successfully updated.',
    type: ArticleCommentResponse,
  })
  async update(
    @Param('id') id: string,
    @Body() commentDto: ArticleCommentDto,
  ): Promise<ArticleCommentResponse | null> {
    return await this.articleCommentService.update(id, commentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Article Comment' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The article comment has been successfully deleted.',
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return await this.articleCommentService.remove(id);
  }
}
