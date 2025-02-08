import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { generateSlug } from 'src/lib/utils';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';

@Injectable()
export class CommunitiesService {
  constructor(private readonly db: DatabaseService) {}

  async createCommunity(createCommunityDto: CreateCommunityDto) {
    const { name, description, ownerId } = createCommunityDto;
    const slug = generateSlug(name);

    const community = await this.db.community.create({
      data: {
        name,
        description,
        ownerId,
        slug,
      },
    });

    return community;
  }

  async getAllCommunities() {
    return await this.db.community.findMany();
  }

  async getCommunityById(id: string) {
    const community = await this.db.community.findUnique({
      where: { id },
    });

    if (!community) {
      throw new NotFoundException(`Community with ID ${id} not found`);
    }

    return community;
  }

  async getCommunityBySlug(slug: string) {
    const community = await this.db.community.findUnique({
      where: { slug },
    });

    return community;
  }

  async updateCommunity(id: string, updateCommunityDto: UpdateCommunityDto) {
    const community = await this.db.community.update({
      where: { id },
      data: updateCommunityDto,
    });

    return community;
  }

  async removeCommunity(id: string) {
    await this.db.community.delete({
      where: { id },
    });

    return { message: `Community with ID ${id} has been deleted` };
  }

  async joinCommunity(userId: string, communityId: string) {
    const community = await this.db.community.findUnique({
      where: { id: communityId },
    });

    if (!community) {
      throw new NotFoundException(`Community with ID ${communityId} not found`);
    }

    const existingMember = await this.db.communityMember.findUnique({
      where: { userId_communityId: { userId, communityId } },
    });

    if (existingMember) {
      throw new ConflictException('User is already a member of this community');
    }

    return await this.db.communityMember.create({
      data: {
        userId,
        communityId,
      },
    });
  }

  async checkMembership(userId: string, communityId: string): Promise<boolean> {
    const community = await this.db.community.findUnique({
      where: { id: communityId },
    });

    if (!community) {
      throw new NotFoundException(`Community with ID ${communityId} not found`);
    }

    const member = await this.db.communityMember.findUnique({
      where: {
        userId_communityId: {
          userId,
          communityId,
        },
      },
    });

    return !!member;
  }
}
