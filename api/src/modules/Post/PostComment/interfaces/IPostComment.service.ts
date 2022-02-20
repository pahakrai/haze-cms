'use strict';

import {PostCommentCreateModel} from '../models';
import {PaginateOptionsQueryModel} from 'src/core';

export interface IPostCommentService {
  create(postComment: PostCommentCreateModel);
  findByPost(_id: string, paginateOptions: PaginateOptionsQueryModel);
}
