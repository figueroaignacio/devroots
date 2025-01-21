import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
})
export class PostsModule {}
