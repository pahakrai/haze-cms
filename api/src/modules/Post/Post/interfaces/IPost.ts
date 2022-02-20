import {Document, PaginateModel} from 'mongoose';

export interface IPost extends Document {
  workspace: string;
  type: string;
  title: object;
  postDate: Date;
  snippets: object;
  likes: any;
  images: Array<{
    fileMeta: any;
    _id: string;
  }>;
  content: {
    en: string;
    'zh-hk': string;
    'zh-cn': string;
  };
  priority: number;
  queries: Array<{
    query: string;
    queryType: string;
    title: string;
  }>;
  isActive: boolean;
  createdBy: string;
  updatedBy: string;
}

export type IPostModel = PaginateModel<IPost>;
