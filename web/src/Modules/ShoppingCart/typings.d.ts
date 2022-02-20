interface IShoppingCart {
  _id: string;
  user?: string | IUser;
  items?: IShoppingCartItem[];
  createdAt?: string;
  updatedAt?: string;
}
interface IShoppingCartItem {
  _id: string;
  product?: string | IProduct;
  productSku?: string | IProductSku;
  qty?: number;
}
