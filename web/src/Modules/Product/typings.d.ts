interface IProduct {
  _id: string;
  name?: string;
  description?: string;
  category?: ICategory;
  content: string;
  remarks?: string;
  images?: IFileMeta[];
  priceRange?: IProductPriceRange;
  skus?: IProductSku[];
  specs?: IProductSpec[];
  tags?: ITag[];
  mediaList1?: {
    image?: {
      _id: string;
      uri?: string;
      thumbnailUri?: string;
      mimetype?: string;
    };
    description?: string;
  }[];
  mediaList2?: {
    image?: {
      _id: string;
      uri?: string;
      thumbnailUri?: string;
      mimetype?: string;
    };
    description?: string;
  }[];
  isWatched?: boolean;
  workspace: string;
  createdAt?: string;
  updatedAt?: string;
  productionDate?: string;
  productExpiryDate?: string;
}

interface IProductSku {
  _id: string;
  currency: string;
  amount: number;
  qty: number;
  specs: IProductSkuSpecs[];
  discountAmount: number;
  validateInventory?: boolean;
  isQuote?: boolean;
  createdAt: string;
  updatedAt: string;
  image: IFileMeta;
}
interface IProductSpecValues {
  _id: string;
  name?: string;
}
interface IProductPriceRange {
  min: number;
  max: number;
}
interface IProductSpec {
  _id: string;
  product?: IProduct;
  name?: string;
  values?: IProductSpecValues[];
  icon?: IFileMeta;
  activeIcon?: IFileMeta;
}

interface IProductSkuSpecs {
  spec: IProductSpec;
  value: string;
}

interface IProductWatch {
  _id: string;
  client?: IUser;
  product?: IProduct;
  createdAt?: string;
  updatedAt?: string;
}

interface IProductSearchModel {
  q?: string;
  placeOfOrigin?: string;
  category?: string;
  platformTypes?: string[];
  statuses?: number[];
  tag?: string;
  tags?: string[];
  productionDateFr?: string;
  productionDateTo?: string;
  productExpiryDateFr?: string;
  productExpiryDateTo?: string;
}
interface IProductSearchVariables {
  query: IProductSearchModel;
  paginate?: Paginate;
  options?: IQueryOptions;
}
interface IProductSByTagearchModel {
  q?: string;
  category?: string;
  platformTypes?: string[];
  statuses?: number[];
  tags?: string[];
}
interface IProductByTagSearchVariables {
  query: IProductSByTagearchModel;
  paginate?: Paginate;
  options?: IQueryOptions;
}

interface IQueryOptions {
  sort?: any;
  limit?: number;
}
interface ITag {
  _id: string;
  text?: string;
}
