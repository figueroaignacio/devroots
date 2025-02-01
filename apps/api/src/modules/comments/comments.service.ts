import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CommentsService {
  constructor(private readonly db: DatabaseService) {}

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
