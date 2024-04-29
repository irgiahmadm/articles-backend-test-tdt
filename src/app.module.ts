import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { ArticlesModule } from './articles/articles.module';
import { ArticleCommentModule } from './article-comment/article-comment.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ArticlesModule,
    ArticleCommentModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
