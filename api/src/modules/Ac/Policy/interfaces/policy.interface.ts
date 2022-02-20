import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';
import {Workspace} from 'src/modules/Workspace/interfaces';

export interface Policy extends Document {
  _id: ObjectId;
  workspaceTypes: string[];
  workspaceAccess: Workspace['_id'][];
  Statement: [
    {
      Effect: 'Allow' | 'Deny';
      Action: string[];
      Resource?: string;
    }
  ];
}
export type PolicyModel = PaginateModel<Policy>;
