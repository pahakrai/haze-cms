'use strict';
import {Injectable, Inject} from '@nestjs/common';
import {Types} from 'mongoose';
const {ObjectId} = Types;
import {InjectModel} from '@nestjs/mongoose';

// core

// model
import {IUser} from '../../User';
import {BaseCRUDService, NotFoundException} from 'src/core';
import {PostCommentModel, PostComment} from './interfaces';
import {PostCommentCreateModel, PostCommentSearchModel} from './models';
import {REQUEST} from '@nestjs/core';

@Injectable()
export class PostCommentService extends BaseCRUDService<
  PostComment,
  PostCommentCreateModel,
  {},
  PostCommentSearchModel
> {
  constructor(
    @InjectModel('PostComments')
    private readonly postCommentRepository: PostCommentModel,
    @Inject(REQUEST) request
  ) {
    super(postCommentRepository, request);
  }

  public _castQuery(searchModel: PostCommentSearchModel) {
    let workspace: string;
    const user = this.getCurrentUser<IUser>();
    const query: any = {};
    const {post} = searchModel;
    // handle workspace
    if (user?.currentWorkspace) {
      workspace = user.currentWorkspace.toHexString();
    } else if (searchModel.workspace) {
      workspace = searchModel.workspace;
    } else {
      workspace = this.getHeaderWorkspace();
    }
    // always pass workspace as query
    query.workspace = new ObjectId(workspace) || null;

    if (post) {
      query.post = post;
    }

    return query;
  }

  /* for resolver, because don't want populate */
  public async _findById(postCommentId: string): Promise<any> {
    const result = await this.postCommentRepository.findById(postCommentId);
    return result;
  }

  /* for resolver, because don't want populate */
  public async _findByPost(postId: string): Promise<any> {
    const result = await this.postCommentRepository
      .find({post: postId})
      .sort({createdAt: -1});
    return result;
  }

  /* for resolver */
  public async _toggleLike(
    postCommentId: string,
    userId: string,
    locale: any,
    like?: boolean
  ): Promise<any> {
    // returns post object if found or not throws post not found error
    const postComment = await this.postCommentRepository.findById(
      postCommentId
    );
    if (!postComment) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {
          key: 'key_post'
        }
      });
    }
    const userInThelist = postComment.likes.some(id => id.equals(userId));
    // if it is undefined, if haven’t like -> like now, if liked -> unlike now
    const userLikeAction = like || !userInThelist;

    let updatedPostComment: any;
    if (userLikeAction && !userInThelist) {
      updatedPostComment = await this._findOneAndPush(
        {_id: postCommentId},
        {likes: userId}
      );
    }
    if (!userLikeAction && userInThelist) {
      updatedPostComment = await this._findOneAndPull(
        {_id: postCommentId},
        {likes: userId}
      );
    }
    return updatedPostComment;
  }

  /**
   * create a postComment
   * @param body
   */
  public async createPostComment(
    postCommentCreateModel: PostCommentCreateModel
  ) {
    // get current user
    const user = this.getCurrentUser<IUser>();
    const workspace =
      user?.currentWorkspace.toHexString() || this.getHeaderWorkspace();
    postCommentCreateModel.user = user ? user._id.toHexString() : null;
    postCommentCreateModel.workspace = workspace;
    const postComment = super.create(postCommentCreateModel);
    return postComment;
  }

  /**
   * find a postComment by query
   * @param query req.query
   * @param req req
   */
  public async findByPost(post: string, paginateOptions: any): Promise<any> {
    const query = this._castQuery({post});
    const result = await this.postCommentRepository.paginate(query, {
      ...paginateOptions,
      populate: [
        {
          path: 'user',
          populate: {
            path: 'avatars.fileMeta'
          },
          select: '-password -loginChannel'
        }
      ]
    });
    return result;
  }

  public async _findOneAndPush(query, postModel): Promise<any> {
    return this.postCommentRepository.findOneAndUpdate(
      query,
      {$push: postModel},
      {new: true, session: this.getMongoSession()}
    );
  }

  public async _findOneAndPull(query, postModel): Promise<any> {
    return this.postCommentRepository.findOneAndUpdate(
      query,
      {$pull: postModel},
      {new: true, session: this.getMongoSession()}
    );
  }
}
