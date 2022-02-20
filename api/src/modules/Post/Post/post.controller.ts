import {
  Controller,
  Get,
  Param,
  Query,
  Body,
  UseFilters,
  Post,
  Patch,
  Put,
  Delete,
  // UsePipes,
  UseInterceptors,
  UploadedFiles
} from '@nestjs/common';
import {FilesInterceptor} from '@nestjs/platform-express';

// core
import {
  CurrentUser,
  RequireLogin,
  HttpExceptionFilter,
  DeserializeBodyInterceptor,
  MapDisplayLocalizeInterceptor
} from 'src/core';
// modules
import {PostService} from './post.service';
import {PostCreateModel, PostUpdateModel, PostSearchModel} from './models';
import {DiskStorage, FileFilter} from 'src/core/utils';
import {IUser} from 'src/modules/User';
@UseFilters(HttpExceptionFilter)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  /**
   * create a post
   * @param res response
   * @param postEditModel
   */
  @Post()
  @RequireLogin()
  @UseInterceptors(
    FilesInterceptor('files', 100, {
      storage: DiskStorage,
      fileFilter: (req, file, cb) =>
        FileFilter(
          req,
          file,
          cb
        )(['.jpg', '.png', '.jpeg', '.tiff', '.mp4', '.mov'])
    }),
    DeserializeBodyInterceptor
  )
  public async createPost(
    @Body() postCreateModel: PostCreateModel,
    @UploadedFiles() files: Array<any>
  ) {
    const post = await this.postService.createPost(postCreateModel, files);
    return post;
  }

  /**
   * find posts by query string
   * @param res response
   * @param query req.query
   */
  @UseInterceptors(MapDisplayLocalizeInterceptor)
  @Get()
  public async findPosts(@Query() postSearchModel: PostSearchModel) {
    return this.postService.find(postSearchModel);
  }

  /**
   * TODO: Get can do the same task might remove later
   * find post list by different way
   * @param param.by
   */
  @Get('/list/:by')
  public async findPostsBy(@Query() query, @Param() param) {
    return this.postService.find(query, {
      sort: param?.by || '-priority'
    });
  }

  /**
   * find post by id
   * @param res response
   * @param param req.param
   * @param param._id post ID
   */
  @UseInterceptors(MapDisplayLocalizeInterceptor)
  @Get(':_id')
  public async findById(@Param() param, @Query() query) {
    const post = await this.postService.findById(param._id);
    return this.postService._populate(post, query?.populates || []);
  }

  /**
   * delete post image by id
   * @param res response
   * @param param._fileMetaId _fileMetaId
   * @param param._id post ID
   */
  @Delete('/:_id/images/:fileMetaId')
  @RequireLogin()
  public async removeFile(@Param() param) {
    return this.postService.removeFileByFileMetaId(param._id, param.fileMetaId);
  }

  /**
   * update post like, dislike by user
   * /post/:_id/toggle-like?like=true
   * @param param
   * @param query req.query.like - true or false
   */
  @Put('/:_id/toggle-like')
  @RequireLogin()
  public async toggleLike(
    @Param() param,
    @Query() query,
    @CurrentUser() currentUser: IUser
  ) {
    const isLike = query.like !== undefined ? query.like === 'true' : undefined;
    const post = await this.postService.toggleLike(
      param._id,
      currentUser._id.toHexString(),
      isLike
    );
    return post;
  }

  /**
   * get post like
   */
  @Get('like/:_id')
  @RequireLogin()
  public async postsLikeByUser(@Param() param, @Query() query) {
    const result = await this.postService.find({likes: [param._id]});
    return this.postService._populate(result, query?.populates || []);
  }
  /**
   * update a post by id
   * @param param
   * @param res response
   * @param body req.body
   */
  @Patch(':_id')
  @RequireLogin()
  @UseInterceptors(
    FilesInterceptor('files', 100, {
      storage: DiskStorage,
      fileFilter: (req, file, cb) =>
        FileFilter(
          req,
          file,
          cb
        )(['.jpg', '.png', '.jpeg', '.tiff', '.mp4', '.mov'])
    }),
    DeserializeBodyInterceptor
  )
  public async updatePost(
    @Param() param,
    @Body() postUpdateModel: PostUpdateModel,
    @UploadedFiles() files: Array<any>
  ) {
    return this.postService.updatePost(param._id, postUpdateModel, files);
  }

  /**
   * put-job-to-update-metadata
   */
  @Post('put-job-to-update-metadata')
  public async putJobToUpdateMetadata() {
    return this.postService.putJobToUpdateMetadata();
  }
}
