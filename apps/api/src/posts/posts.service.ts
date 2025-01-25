import { Injectable } from '@nestjs/common';
import { generateSlug } from 'src/lib/utils';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(createPostDto: CreatePostDto) {
    const slug = generateSlug(createPostDto.title);

    return this.prisma.post.create({
      data: {
        ...createPostDto,
        slug,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async getAllPosts() {
    return this.prisma.post.findMany({
      include: {
        author: true,
      },
    });
  }

  async getPostById(id: string) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  }

  async getPostBySlug(slug: string) {
    return this.prisma.post.findUnique({
      where: { slug },
      include: { author: true },
    });
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    const updatedSlug = updatePostDto.title
      ? generateSlug(updatePostDto.title)
      : undefined;

    return this.prisma.post.update({
      where: { id },
      data: {
        ...updatePostDto,
        ...(updatedSlug && { slug: updatedSlug }),
        updatedAt: new Date(),
      },
    });
  }

  async removePost(id: string) {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
