import {ObjectId} from 'mongodb';
import {Document, Model} from 'mongoose';

export interface AutoNumber extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;

  /**
   * workspace of this auto number
   */
  workspace: ObjectId;

  /**
   * prefix of the number
   */
  prefix: string;

  /**
   * type, same as AutoNumberTemplate.type
   */
  type: string;

  /**
   * previous number used
   */
  lastNo: number;

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

export type AutoNumberModel = Model<AutoNumber>;
