/* eslint-disable @typescript-eslint/no-empty-interface */
import {ObjectId} from 'mongodb';
import {PaginateModel, Document} from 'mongoose';

export interface FileMeta extends Document {
  _id: ObjectId;
  folder: string;
  serviceType: string;
  tags: string;
  uri: string;
  thumbnailUri: string;
  originalName: string;
  fileExtension: string;
  displayName: string;
  uploadedName: string;
  workspace: string;
  size: string;
  isSystemFile: boolean;
}

export interface FileMetaModel<T extends Document> extends PaginateModel<T> {}
