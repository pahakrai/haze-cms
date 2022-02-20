import { useQuery } from "@apollo/client";
import {
  QUERY_STORES_PLACE_ORDER,
  QUERY_STORES_PLACE_ORDER_FIELDS
} from "../Apollo/useStoresPlaceOrder.gqls";

interface useStoresPlaceOrderArgs {}
interface useStoresPlaceOrderHook {
  stores?: IStore[];
  loading?: boolean;
}
export const useStoresPlaceOrder = (
  args?: useStoresPlaceOrderArgs
): useStoresPlaceOrderHook => {
  const { data, loading } = useQuery<{
    storesPlaceOrder: PaginationResult<IStore>;
  }>(QUERY_STORES_PLACE_ORDER(QUERY_STORES_PLACE_ORDER_FIELDS), {
    variables: {
      query: {}
    }
  });
  return {
    stores: data?.storesPlaceOrder?.nodes || [],
    loading
  };
};
