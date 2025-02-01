import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CommunitiesController } from './communities.controller';
import { CommunitiesService } from './communities.service';

@Module({
  controllers: [CommunitiesController],
  providers: [CommunitiesService, DatabaseService],
})
export class CommunitiesModule {}
