import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, DatabaseService],
})
export class PostsModule {}
