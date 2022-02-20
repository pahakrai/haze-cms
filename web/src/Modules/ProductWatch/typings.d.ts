

interface IProductWatch {
  _id: string;
  client?: IUser;
  product?: IProduct;
  createdAt?: string;
  updatedAt?: string;
}

interface IMyProductWatchSearchVariables {
  quer?: {};
  paginate?: Paginate;
  options?: IQueryOptions;
}