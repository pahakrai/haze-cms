import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';

export interface IWorkspacePhoneRegion extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;

  workspace: ObjectId;

  phoneRegion: ObjectId;
}

export type IWorkspacePhoneRegionModel = PaginateModel<IWorkspacePhoneRegion>;
