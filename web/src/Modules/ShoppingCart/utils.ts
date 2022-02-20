import reduce from "lodash/reduce";
import { getSymbolFromCurrency } from "~/lib/currencyMap";
export const calculateCartAmount = (cart: IShoppingCart) => {
  return reduce(
    cart.items,
    (result, value, key) => {
      const _productSku = value.productSku as IProductSku;
      const _unit = _productSku.discountAmount || _productSku.amount;
      return (result += (value.qty || 1) * _unit);
    },
    0
  );
};
export const calculateCartQty = (cart: IShoppingCart) => {
  return reduce(
    cart.items,
    (result, value, key) => {
      return (result += value.qty || 1);
    },
    0
  );
};
export const calculateItemsTotal = (items: IShoppingCartItem[]) => {
  return reduce(
    items,
    (result, value, key) => {
      const _productSku = value.productSku as IProductSku;
      // if discountAmount <=0 use amount
      const _unit = _productSku.discountAmount || _productSku.amount;
      return (result += (value.qty || 1) * _unit);
    },
    0
  );
};
export const calculateItemsSubTotal = (items: IShoppingCartItem[]) => {
  return reduce(
    items,
    (result, value, key) => {
      const _productSku = value.productSku as IProductSku;
      // if discountAmount <=0 use amount
      const _unit = _productSku.amount;
      return (result += (value.qty || 1) * _unit);
    },
    0
  );
};
export const calculateItemsDiscount = (items: IShoppingCartItem[]) => {
  return reduce(
    items,
    (result, value, key) => {
      const _productSku = value.productSku as IProductSku;
      // if discountAmount <=0 use amount
      const _unit = _productSku.discountAmount - _productSku.amount;
      return (result += (value.qty || 1) * _unit);
    },
    0
  );
};
export const getCartCurrency = (cart: IShoppingCart) => {
  const sku = cart.items?.[0]?.productSku as IProductSku | undefined;
  const currency = sku?.currency;
  return getSymbolFromCurrency(currency);
};
