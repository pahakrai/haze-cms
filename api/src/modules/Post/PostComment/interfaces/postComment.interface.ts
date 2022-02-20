import {Document, PaginateModel} from 'mongoose';
import {Workspace} from 'src/modules/Workspace/interfaces';
import {IUser} from '../../../User';
import {IPost} from '../../Post';

export interface PostComment extends Document {
  title: string;
  comment: string;
  post: IPost | IPost['_id'];
  user: IUser | IUser['_id'];
  likes: IUser[] | IUser['_id'][];
  workspace: Workspace | Workspace['_id'];
}

export type PostCommentModel = PaginateModel<PostComment>;
