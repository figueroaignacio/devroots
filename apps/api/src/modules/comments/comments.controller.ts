import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':postId')
  createComment(
    @Param('postId') postId: string,
    @Body() createCommentDto: { content: string; authorId: string },
  ) {
    return this.commentsService.createComment(postId, createCommentDto);
  }

  @Get()
  getAllComments() {
    return this.commentsService.getAllComments();
  }

  @Get(':postId')
  getCommentsByPost(@Param('postId') postId: string) {
    return this.commentsService.getCommentByPostId(postId);
  }

  @Delete(':commentId')
  deleteComment(@Param('commentId') commentId: string) {
    return this.commentsService.deleteComment(commentId);
  }
}
