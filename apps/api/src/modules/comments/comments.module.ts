import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, DatabaseService],
})
export class CommentsModule {}
