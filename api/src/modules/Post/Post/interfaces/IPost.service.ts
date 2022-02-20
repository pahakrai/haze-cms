'use strict';

import {IPost} from './IPost';
import {PostCreateModel, PostUpdateModel, PostSearchModel} from '../models';

export interface IPostService {
  create(
    postCreateModel: PostCreateModel,
    files: any,
    workspaceId: string,
    user: any,
    locale: any
  ): Promise<IPost>;
  find(
    postSearchModel: PostSearchModel,
    paginateOptions: any,
    locale: any
  ): Promise<Array<IPost>>;
  findById(_id: string): Promise<IPost | null>;
  uploadFiles(uploadFiles: Array<any>): Promise<any>;
  toggleLike(_id: string, userId: string, locale: any, like?: boolean);
  removeFileByFileMetaId(postId: string, fileMetaId: string, user: any);
  update(
    _id: string,
    postUpdateModel: PostUpdateModel,
    files: any,
    user: any
  ): Promise<IPost | null>;
}
