import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Post()
  creacreateCommunityte(@Body() createCommunityDto: CreateCommunityDto) {
    return this.communitiesService.createCommunity(createCommunityDto);
  }

  @Get()
  getAllCommunities() {
    return this.communitiesService.getAllCommunities();
  }

  @Get(':id')
  figetCommunityByIdndOne(@Param('id') id: string) {
    return this.communitiesService.getCommunityById(id);
  }

  @Patch(':id')
  updateCommunity(
    @Param('id') id: string,
    @Body() updateCommunityDto: UpdateCommunityDto,
  ) {
    return this.communitiesService.updateCommunity(id, updateCommunityDto);
  }

  @Delete(':id')
  removeCommunity(@Param('id') id: string) {
    return this.communitiesService.removeCommunity(id);
  }
}
