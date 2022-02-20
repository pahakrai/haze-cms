interface IPost {
  _id: string;
  type: string;
  title: string;
  content: any;
  postDate: string;
  snippets?: string;
  likes?: IUser;
  images?: {
    _id: string;
    fileMeta: {
      uri?: string;
      thumbnailUri?: string;
      mimetype?: string;
    };
  };
  createdBy?: IUser;
  updatedBy?: IUser;
  updateDate?: string;
  workspace: string;
  createdAt?: string;
  updatedAt?: string;
  likeCount?: number;
  commentCount?: number;
  tags: string[];
  platformTypes?: string[];
}

interface IPostSearchModel {
  q?: string;
  type?: string;
  isActive?: boolean;
}
interface IPostSearchVariables {
  query: IPostSearchModel;
  paginate?: Paginate;
  options?: IQueryOptions;
}

interface IQueryOptions {
  sort?: any;
  limit?: number;
}

interface IPostComment {
  user?: string;
  post?: string;
  email?: string;
  comment: string;
}

interface IPostCommentSearchVariables {
  post?: string;
  paginate?: Paginate;
  options?: IQueryOptions;
}
