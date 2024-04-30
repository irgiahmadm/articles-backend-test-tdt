import { ApiProperty } from '@nestjs/swagger';

export class ArticleDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  titleSlug?: string;

  @ApiProperty()
  userId: string;
}

export class ArticleResponse {
  id: string;
  title: string;
  titleSlug: string;
  content: string;
  userId: string;
}
