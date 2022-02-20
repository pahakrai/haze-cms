import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { registAuthListener } from "~/lib/auth";
import {
  MUTATION_ADD_TO_SHOPPING_CART,
  MUTATION_REMOVE_ITEM_FROM_CART,
  MUTATION_UPDATE_CART_ITEM,
  PRODUCT_MY_SHOPPING_CART_FIELDS,
  QUERY_MY_SHOPPING_CART
} from "../Apollo/gqls";
import {
  calculateCartQty,
  calculateCartAmount,
  getCartCurrency
} from "../utils";

interface useMyShoppingArgs {
  onCompleted?: (product?: IShoppingCart) => void;
  onRemoveItemsFromCartSuccess?: () => void;
  onRemoveItemsFromCartFailed?: () => void;
  onError?: () => void;
}
interface useShoppingCartHook {
  cart?: IShoppingCart;
  amount?: number;
  qty?: number;
  currency?: string;
  addToCart?: (_id: string, _sku: string, quantity?: number) => void;
  updateCartItem?: (_id: string, _sku: string, quantity?: number) => void;
  removeItemFromCart?: (_itemId: string) => void;
  removeItemsFromCart?: (_itemIds: string[]) => void;
  reloadCart?: () => void;
  loading?: boolean;
}
export const useShoppingCart = (
  args?: useMyShoppingArgs
): useShoppingCartHook => {
  const [authed, setAuthed] = React.useState(false);
  const [shoppingCart, setShoppingCart] = React.useState<
    IShoppingCart | undefined
  >(undefined);
  const [currency, setCurrency] = React.useState<string | undefined>(undefined);
  const [amount, setAmount] = React.useState<number>(0);
  const [qty, setQty] = React.useState<number>(0);
  const { data, loading, refetch } = useQuery<{
    myShoppingCart: IShoppingCart;
  }>(QUERY_MY_SHOPPING_CART(PRODUCT_MY_SHOPPING_CART_FIELDS), {
    fetchPolicy: "network-only",
    skip: !authed,
    onCompleted: ({ myShoppingCart }) => {
      args?.onCompleted?.(myShoppingCart);
    },
    onError: () => {
      args?.onError?.();
    }
  });
  const [addToCart] = useMutation(
    MUTATION_ADD_TO_SHOPPING_CART(PRODUCT_MY_SHOPPING_CART_FIELDS)
  );
  const [updateCartItem] = useMutation(
    MUTATION_UPDATE_CART_ITEM(PRODUCT_MY_SHOPPING_CART_FIELDS)
  );
  const [removeItemFromCart] = useMutation(
    MUTATION_REMOVE_ITEM_FROM_CART(PRODUCT_MY_SHOPPING_CART_FIELDS),
    {
      onCompleted: () => {},
      onError: () => {}
    }
  );
  const [removeItemsFromCart] = useMutation(
    MUTATION_REMOVE_ITEM_FROM_CART(PRODUCT_MY_SHOPPING_CART_FIELDS),
    {
      onCompleted: () => {
        args?.onRemoveItemsFromCartSuccess?.();
      },
      onError: () => {
        args?.onRemoveItemsFromCartFailed?.();
      }
    }
  );
  const _addToCart = React.useCallback(
    (_id: string, _sku: string, quantity?: number) => {
      addToCart({
        variables: {
          item: {
            product: _id,
            productSku: _sku,
            qty: quantity ? quantity : 1
          }
        }
      });
    },
    []
  );
  const _updateCartItem = React.useCallback(
    (_item: string, _sku: string, quantity?: number) => {
      updateCartItem({
        variables: {
          itemsUpdateModel: [
            {
              itemId: _item,
              qty: quantity ? quantity : 1
            }
          ]
        }
      });
    },
    []
  );
  const _removeItemFromCart = React.useCallback((_itemId: string) => {
    removeItemFromCart({
      variables: {
        itemId: _itemId
      }
    });
  }, []);
  const _removeItemsFromCart = React.useCallback((_itemIds: string[]) => {
    removeItemsFromCart({
      variables: {
        itemIds: _itemIds
      }
    });
  }, []);
  React.useEffect(() => {
    const cart = data?.myShoppingCart;
    if (cart) {
      const currency = getCartCurrency(cart);
      const total = calculateCartAmount(cart);
      const qty = calculateCartQty(cart);
      setCurrency(currency);
      setAmount(total);
      setQty(qty);
    }
    setShoppingCart(cart);
  }, [data]);
  React.useEffect(() => {
    const handler = registAuthListener((authed: boolean) => {
      setAuthed(authed);
    });
    return () => {
      handler();
    };
  }, []);
  return {
    cart: shoppingCart,
    amount,
    qty,
    currency,
    loading,
    addToCart: _addToCart,
    removeItemFromCart: _removeItemFromCart,
    updateCartItem: _updateCartItem,
    removeItemsFromCart: _removeItemsFromCart,
    reloadCart: refetch
  };
};
