import {Document, PaginateModel} from 'mongoose';

export interface IPage extends Document {
  title: object;
  path: string;
  type: string;
  workspace: string;
  layout: string;
  remarks: string;
  content: object;
  version: number;
  diffNodes: Array<{version: number; up: object; down: object; date: string}>;
  isSystem: boolean;
  isActive: boolean;
  isTemplate: boolean;
  isSection: boolean;
  meta?: {
    description: string;
    keywords: string;
    version: number;
  };
}

export type IPageModel = PaginateModel<IPage>;
