import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(
    postId: string,
    createCommentDto: { content: string; authorId: string },
  ) {
    return this.prisma.comment.create({
      data: {
        content: createCommentDto.content,
        authorId: createCommentDto.authorId,
        postId,
      },
    });
  }

  async getAllComments() {
    return this.prisma.comment.findMany();
  }

  async getCommentByPostId(postId: string) {
    return this.prisma.comment.findMany({
      where: { postId },
      include: { author: true },
    });
  }

  async deleteComment(commentId: string) {
    return this.prisma.comment.delete({ where: { id: commentId } });
  }
}
