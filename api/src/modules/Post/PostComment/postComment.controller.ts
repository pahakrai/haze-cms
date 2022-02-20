import {
  Controller,
  Get,
  Param,
  Query,
  Body,
  Post,
  Delete
} from '@nestjs/common';
import {UseFilters, UseInterceptors} from '@nestjs/common';

// core
import {
  HttpExceptionFilter,
  extractPaginateOptions,
  MapDisplayLocalizeInterceptor,
  RequireLogin
} from 'src/core';
// modules
import {PostCommentCreateModel} from './models';
import {PostCommentService} from './postComment.service';

@UseFilters(HttpExceptionFilter)
@Controller('post-comments')
export class PostCommentController {
  constructor(private readonly postCommentService: PostCommentService) {}

  /**
   * create a postComment
   * @param res response
   * @param PostCommentModel
   */

  @Post('/')
  public async create(@Body() postCommentCreateModel: PostCommentCreateModel) {
    const postComment = await this.postCommentService.createPostComment(
      postCommentCreateModel
    );
    return postComment;
  }

  /**
   * create a find
   * @param res response
   */
  @UseInterceptors(MapDisplayLocalizeInterceptor)
  @Get('/posts/:postsId')
  public async findByPost(@Param() params: any, @Query() query) {
    const postComment = await this.postCommentService.findByPost(
      params.postsId,
      extractPaginateOptions(query)
    );
    return postComment;
  }

  /**
   * delete a postComment by id
   * @param res response
   * @param param req.param
   * @param param._id postComment
   */
  @UseInterceptors(MapDisplayLocalizeInterceptor)
  @RequireLogin()
  @Delete('/posts/:_id')
  public async delete(@Param() param) {
    const result = await this.postCommentService.delete(param._id);
    return result;
  }
}
