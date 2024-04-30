import { ApiProperty } from '@nestjs/swagger';

export class ArticleCategoryDto {
  @ApiProperty()
  name: string;
}

export class ArticleCategoryResponse {
  id: string;
  name: string;
}
