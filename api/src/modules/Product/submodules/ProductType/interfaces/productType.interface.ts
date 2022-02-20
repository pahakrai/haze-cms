import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';
import {LocalizeString} from 'src/core';
import {FileMeta} from 'src/modules/File';
import {Workspace} from 'src/modules/Workspace/interfaces';

export interface ProductType extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;

  /**
   * workspace
   */
  workspace: Workspace | Workspace['_id'];

  /**
   * product name
   */
  name: LocalizeString;

  /**
   * product description
   */
  description: LocalizeString;

  /**
   * product type content
   */
  content: string;

  /**
   * images of this product type
   */
  images: FileMeta[] | FileMeta['_id'][];

  /**
   * product type status
   */
  status: FileMeta[] | FileMeta['_id'][];
}

export type ProductTypeModel = PaginateModel<ProductType>;
