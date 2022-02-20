import {
  Resolver,
  ResolveField,
  Parent,
  Args,
  Query,
  Mutation,
  Context,
  Subscription
} from '@nestjs/graphql';
import {Types} from 'mongoose';
const {ObjectId} = Types;
import {PubSub, withFilter} from 'graphql-subscriptions';

// services
import {PostCommentService} from './postComment.service';
import {UseFilters} from '@nestjs/common';
import {PostService} from '../Post/post.service';
import {GraphQLExceptionFilter, BypassSecretGuard} from 'src/core';
// import {PostCommentCreateModel} from './models';

ObjectId.prototype.valueOf = function () {
  return this.toString();
};

// guards
@Resolver('PostComment')
@UseFilters(GraphQLExceptionFilter)
export class PostCommentResolver {
  pubsub: PubSub;
  constructor(
    private readonly postCommentService: PostCommentService,
    private readonly postService: PostService
  ) {
    this.pubsub = new PubSub();
  }

  @ResolveField('workspace')
  async getWorkspace(@Parent() postComment) {
    if (!postComment.workspace) {
      return null;
    }
    const {workspace} = await this.postCommentService._populate(postComment, [
      'workspace'
    ]);
    return workspace;
  }

  @ResolveField('post')
  async getPost(@Parent() postComment) {
    if (!postComment.workspace) {
      return null;
    }
    const {post} = await this.postCommentService._populate(postComment, [
      'post'
    ]);
    return post;
  }

  @ResolveField('user')
  async user(@Parent() postComment) {
    if (!postComment?.user) {
      return null;
    }
    const {user} = await this.postService._populate(postComment, ['user']);
    return user;
  }

  @ResolveField('likes')
  async likes(@Parent() postComment) {
    if (!(postComment?.likes?.length > 0)) {
      return [];
    }
    const {likes} = await this.postService._populate(postComment, ['likes']);
    return likes;
  }

  @Query()
  async postComment(@Args('id') id: string) {
    return this.postCommentService._findById(id);
  }

  @Query()
  async postComments(
    @Args('postId') postId: string,
    @Args('paginate') paginate: any
  ) {
    return this.postCommentService.findWithCursorPaginate(
      {post: postId},
      paginate
    );
  }

  @Query()
  async postCommentCount(@Args('postId') postId: string) {
    const postComments = await this.postCommentService._findByPost(postId);
    return postComments.length;
  }

  @Mutation()
  async postCommentCreate(@Args('postCommentForm') postCommentForm: any) {
    const postCommentCreated = await this.postCommentService.createPostComment(
      postCommentForm
    );
    this.pubsub.publish('postCommentCreated', {postCommentCreated});
    return postCommentCreated;
  }

  @Mutation()
  async togglePostCommentLike(
    @Args('postCommentId') postCommentId: string,
    @Args('userId') userId: string,
    @Context() ctx
  ) {
    const {locale} = ctx.req;
    const post = await this.postCommentService._toggleLike(
      postCommentId,
      userId,
      locale
    );
    return post;
  }

  @ResolveField('post')
  async post(@Parent() postComment) {
    return this.postService.findById(postComment.post);
  }

  @BypassSecretGuard()
  @Subscription('postCommentCreated')
  postCommentCreated() {
    return {
      subscribe: withFilter(
        () => this.pubsub.asyncIterator('postCommentCreated'),
        (rootValue?: any, args?: any, context?: any, info?: any) => {
          if (!rootValue) return false;
          const {postCommentCreated} = rootValue;
          const {postId} = args;
          const currentPostId = postCommentCreated.post.toString();
          return currentPostId === postId;
        }
      )
    };
  }
}
