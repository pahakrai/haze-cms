export class PostUpdateModel {
  workspace: string;
  type: string;
  title: object;
  postDate: Date;
  snippets: object;
  images: Array<{
    fileMeta: any;
    _id: string;
  }>;
  queries: Array<{
    query: string;
    queryType: string;
    title: string;
  }>;
  industries: Array<string>;
  subjects: Array<string>;
  regions: Array<string>;
  content: object;
  priority: number;
  isActive: boolean;
  createdBy: string;
  updatedBy: string;
  platformTypes?: Array<string>;
}
