import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';
import {LocalizeString} from 'src/core';
export interface UserLevel extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;

  /**
   * name
   */
  name: LocalizeString;

  /**
   * workspace
   */
  workspace: string;

  /**
   * userType
   */
  userType: string;

  // generated by mongoose
  /**
   * create time of this document
   */
  createdAt: Date;

  /**
   * update time of this document
   */
  updatedAt: Date;
}

export type UserLevelModel = PaginateModel<UserLevel>;