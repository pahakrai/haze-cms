interface IDestinations {
  _id?: string;
  code?: string;
  idx?: number;
  isActive?: boolean;
  name?: any;
  parent?: string;
  type?: string;
  subTypes?: string[];
  filemeta?: any;
}

interface IRegionSearchVariables {
  query: IRegionSearchModel;
  paginate?: Paginate;
  options?: IQueryOptions;
}

interface IRegionSearchModel {
  parent?: string;
  isActive?: boolean;
  isAddress?: boolean;
}
