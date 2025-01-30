import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './comments/comments.module';
import { CommunitiesModule } from './communities/communities.module';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    PostsModule,
    CommentsModule,
    CommunitiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
