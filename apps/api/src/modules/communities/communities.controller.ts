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
  getCommunityById(@Param('id') id: string) {
    return this.communitiesService.getCommunityById(id);
  }

  @Get('slug/:slug')
  getCommunityBySlug(@Param('slug') slug: string) {
    return this.communitiesService.getCommunityBySlug(slug);
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

  @Post('join')
  async joinCommunity(@Body() body: { userId: string; communityId: string }) {
    return this.communitiesService.joinCommunity(body.userId, body.communityId);
  }

  @Post(':communityId/check-membership')
  async checkMembership(
    @Param('communityId') communityId: string,
    @Body('userId') userId: string,
  ) {
    const isMember = await this.communitiesService.checkMembership(
      userId,
      communityId,
    );
    return { isMember };
  }
}
