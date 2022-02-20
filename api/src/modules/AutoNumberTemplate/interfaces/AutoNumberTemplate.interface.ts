import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';

export interface AutoNumberTemplate extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;

  /**
   * unique type
   */
  type: string;

  /**
   * workspace of this auto number template
   */
  workspace: ObjectId;

  /**
   * prefix pattern of the auto number
   */
  prefix: string;

  /**
   * AutoNumber expression
   */
  expression: string;

  /**
   * date format (e.g. YYYYMMDD)
   * used for prefix generaton
   */
  dateFormat: string;

  /**
   * no. of digits for auto-increment number
   */
  digits: number;

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

export type AutoNumberTemplateModel = PaginateModel<AutoNumberTemplate>;
