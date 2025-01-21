import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async findAll() {
    return this.prisma.post.findMany({
      include: {
        author: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: {
        ...updatePostDto,
        updatedAt: new Date(),
      },
    });
  }

  async remove(id: string) {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
