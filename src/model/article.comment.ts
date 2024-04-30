import { ApiProperty } from '@nestjs/swagger';

export class ArticleCommentDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  articleId: string;
}

export class ArticleCommentResponse {
  id: string;
  content: string;
  userId: string;
  articleId: string;
}
