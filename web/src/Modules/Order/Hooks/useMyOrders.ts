import { useQuery, FetchPolicy } from "@apollo/client";
import { usePaginate } from "~/lib/apollo/paginate";
import { ORDER_DETAIL_FIELD, QUERY_MY_ORDERS } from "../Apollo/gqls";
interface useMyOrdersArgs {
  variables?: {
    query?: {};
    paginate?: Paginate;
    options?: any;
  };
  fetchPolicy?: FetchPolicy;
}
export const useMyOrders = (
  _options: useMyOrdersArgs = { variables: { query: {} } }
) => {
  const options = {
    ..._options,
    variables: {
      paginate: { first: 10 },
      ...(_options?.variables || {})
    }
  };
  const paginate = usePaginate("myOrders", options.variables.paginate);
  const queryResult = useQuery<{
    myOrders: PaginationResult<IOrder>;
  }>(QUERY_MY_ORDERS(ORDER_DETAIL_FIELD), {
    ...options
  });

  return paginate.useProps(queryResult);
};
