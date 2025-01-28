import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommunitiesController } from './communities.controller';
import { CommunitiesService } from './communities.service';

@Module({
  controllers: [CommunitiesController],
  providers: [CommunitiesService, PrismaService],
})
export class CommunitiesModule {}
