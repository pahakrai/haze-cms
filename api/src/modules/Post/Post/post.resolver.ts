import {UseFilters, UseInterceptors} from '@nestjs/common';
import {
  Resolver,
  ResolveField,
  Parent,
  Args,
  Query,
  Mutation,
  Context
} from '@nestjs/graphql';
import {Types} from 'mongoose';

// core
import {
  processUpload,
  GraphQLExceptionFilter,
  CurrentUser,
  WorkspaceInterceptor,
  RequireLogin,
  AllowAction
} from 'src/core';
// services
import {PostService} from './post.service';
import {TagService} from 'src/modules/Tag/tag.service';
import {IUser} from 'src/modules/User';

const {ObjectId} = Types;

ObjectId.prototype.valueOf = function () {
  return this.toString();
};
const PostType: any = {};

// guards
@Resolver('Post')
@UseFilters(GraphQLExceptionFilter)
@UseInterceptors(WorkspaceInterceptor)
export class PostResolver {
  constructor(
    private readonly postService: PostService,

    // private readonly notificationService: NotificationService,
    private readonly tagService: TagService
  ) {}

  @Query()
  async feedPosts(
    @Args('paginate') paginate: any,
    @CurrentUser() currentUser: IUser
  ) {
    return currentUser
      ? this.postService.findWithCursorPaginate(
          {
            createdBy: currentUser?._id?.toHexString(),
            // TODO: currently default is blog can be type param later
            type: PostType.BLOG,
            isActive: true
          },
          {...paginate, sort: {postDate: -1, createdAt: -1}}
        )
      : [];
  }

  @Query()
  async postsByUser(
    @Args('userId') userId: string,
    @Args('paginate') paginate: any
  ) {
    return this.postService.findWithCursorPaginate(
      {
        createdBy: userId
      },
      {...paginate, sort: {postDate: -1}}
    );
  }

  @Query()
  async postsLikeByUser(
    @Args('userId') userId: string,
    @Args('paginate') paginate: any
  ) {
    return this.postService.findWithCursorPaginate(
      {
        likes: [userId],
        isActive: true
      },
      {...paginate, sort: {postDate: -1}}
    );
  }

  @Query()
  async postsLikeByUserCount(@Args('userId') userId: string) {
    const userPosts = await this.postService.find({likes: [userId]});
    return userPosts.length;
  }

  @Query()
  async postsByTag(@Args('tag') tag: string, @Args('paginate') paginate: any) {
    // TODO: the tags with post logic cursor is of tags
    // right now sends the tags with posts and should be filtered on frontend
    // FIXME: check how to manage the post cursor through tags and which service should handle it
    // as pagination goes though tags and if returned posts only by filtering tags
    const tagsWithPost = await this.tagService.findWithCursorPaginate(
      {
        q: tag,
        refTypes: ['Posts']
      },
      paginate
    );
    return this.tagService._populate(tagsWithPost, ['ref']);
  }

  @Query()
  async postsByUserCount(@Args('userId') userId: string) {
    return (await this.postService.find({createdBy: userId})).length;
  }

  @Query()
  async post(@Args('id') id: string) {
    const post = await this.postService.findById(id);
    return post;
  }

  @Query()
  async posts(@Args('query') query: any, @Args('paginate') paginate: any) {
    return this.postService.findWithCursorPaginate(query, {
      ...paginate,
      ...(paginate?.sort
        ? paginate?.sort
        : {sort: {postDate: -1, createdAt: -1, priority: 1}})
    });
  }

  @Query()
  async popularPosts(
    @Args('paginate') paginate: any,
    @Args('excludeIds') excludeIds: any
  ) {
    return this.postService.findWithCursorPaginate(
      {
        isActive: true,
        type: PostType.BLOG,
        excludeIds
      },
      {...paginate, sort: {createdAt: -1}}
    );
  }

  @Mutation()
  @RequireLogin()
  async togglePostLike(
    @Args('postId') postId: string,
    @Args('userId') userId: string,
    @Context() ctx
  ) {
    const {locale} = ctx.req;
    return this.postService.toggleLike(postId, userId, locale);
  }

  @Mutation()
  @AllowAction('Post:Create')
  async createPost(
    @Args('files') files,
    @Args('postCreateModel') postCreateModel
  ) {
    // update postCreateModel
    const {content} = postCreateModel;
    postCreateModel.content = {en: content, 'zh-hk': content, 'zh-cn': content};

    // save files to local storage first
    const uploadedFiles = await Promise.all(
      files.map(file => processUpload(file))
    );
    const post = await this.postService.createPost(
      postCreateModel,
      uploadedFiles
    );
    return post;
  }

  @ResolveField('title')
  async getTitle(@Parent() post, @Context() ctx) {
    const {
      locale: {currentLanguage}
    } = ctx.req;
    return post.title[currentLanguage || process.env.LANGUAGE_DEFAULT];
  }

  @ResolveField('tags')
  async getTags(@Parent() post) {
    const postTags = await this.tagService.find({
      refTypes: ['Posts'],
      ref: post?._id?.toHexString()
    });
    return postTags?.length > 0 ? postTags?.map(tag => tag?.text) : [];
  }

  @ResolveField('snippets')
  async getSnippets(@Parent() post, @Context() ctx) {
    const {
      locale: {currentLanguage}
    } = ctx.req;
    return post.snippets[currentLanguage || process.env.LANGUAGE_DEFAULT];
  }

  @ResolveField('content')
  async getContent(@Parent() post, @Context() ctx) {
    const {
      locale: {currentLanguage}
    } = ctx.req;
    return post.content[currentLanguage || process.env.LANGUAGE_DEFAULT];
  }

  @ResolveField('images')
  async images(@Parent() post) {
    const {images} = await this.postService._populate(post, [
      '$images.fileMeta'
    ]);
    return images;
  }

  @ResolveField('workspace')
  async workspace(@Parent() post) {
    return this.postService._populate(post, ['workspace']);
  }

  @ResolveField('likes')
  async likes(@Parent() post) {
    if (!(post?.likes?.length > 0)) {
      return [];
    }
    const {likes} = await this.postService._populate(post, ['likes']);
    return likes;
  }

  @ResolveField('createdBy')
  async createdBy(@Parent() post) {
    if (!post?.createdBy) {
      return null;
    }
    const {createdBy} = await this.postService._populate(post, ['createdBy']);
    return createdBy;
  }

  @ResolveField('updatedBy')
  async updatedBy(@Parent() post) {
    if (!post?.updatedBy) {
      return null;
    }
    const {updatedBy} = await this.postService._populate(post, ['updatedBy']);
    return updatedBy;
  }

  @ResolveField('likeCount')
  likeCount(@Parent() post) {
    return post?.likes?.length || 0;
  }
}
