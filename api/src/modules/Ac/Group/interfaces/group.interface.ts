import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';
import {Policy} from '../../Policy/interfaces';
import {IUser} from 'src/modules/User/interfaces';
import {Workspace} from 'src/modules/Workspace/interfaces';

export interface Group extends Document {
  _id: ObjectId;
  name: string;
  workspace: Workspace['_id'];
  users?: IUser[] | IUser['_id'][];
  policies?: Policy[] | Policy['_id'][];
}

export type GroupModel = PaginateModel<Group>;
