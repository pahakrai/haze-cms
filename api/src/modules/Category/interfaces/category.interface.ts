import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';
import {LocalizeStringModel} from 'src/core';
import {Workspace} from 'src/modules/Workspace/interfaces';
import {FileMeta} from 'src/modules/File/FileMeta/interfaces';

export interface ICategory extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;

  /**
   * unique code
   */
  code: string;

  /**
   * name
   */
  name: LocalizeStringModel;

  /**
   * icon for display
   */
  icon: FileMeta | FileMeta['_id'];

  type: string;

  /**
   * all parents of this category
   */
  ancestors: ICategory[] | ICategory['_id'][];

  /**
   * parent of this category
   */
  parent: ICategory | ICategory['_id'];

  /**
   * is category active
   */
  isActive: boolean;

  // populated field
  children: ICategory[] | ICategory['_id'][];

  /**
   * category's workspace
   */
  workspace: Workspace | Workspace['_id'];

  /**
   * category's index for sorting in particular
   */
  idx: number;
}

export type ICategoryModel = PaginateModel<ICategory>;
