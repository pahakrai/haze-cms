import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';
import {Workspace} from 'src/modules/Workspace/interfaces';

export interface TagRecommendation extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;

  /**
   * tag content
   */
  text: string;

  /**
   * type of the recommendation
   */
  type: string;

  /**
   * workspace
   */
  workspace: Workspace | Workspace['_id'];

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

export type TagRecommendationModel = PaginateModel<TagRecommendation>;