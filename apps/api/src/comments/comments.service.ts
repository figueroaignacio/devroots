import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly db: PrismaService) {}

  async createComment(
    postId: string,
    createCommentDto: { content: string; authorId: string },
  ) {
    return this.db.comment.create({
      data: {
        content: createCommentDto.content,
        authorId: createCommentDto.authorId,
        postId,
      },
    });
  }

  async getAllComments() {
    return this.db.comment.findMany();
  }

  async getCommentByPostId(postId: string) {
    return this.db.comment.findMany({
      where: { postId },
      include: { author: true },
    });
  }

  async deleteComment(commentId: string) {
    return this.db.comment.delete({ where: { id: commentId } });
  }
}
