import { useQuery } from "@apollo/client";
import { ORDER_DETAIL_FIELD, QUERY_MY_ORDER } from "../Apollo/gqls";

interface useMyOrderArgs {
  _id: string;
}
interface useMyOrderHook {
  order?: IOrder;
  loading?: boolean;
  refetch(): any;
}
export const useMyOrder = (args: useMyOrderArgs): useMyOrderHook => {
  const { data, loading, refetch } = useQuery<{
    myOrder: IOrder;
  }>(QUERY_MY_ORDER(ORDER_DETAIL_FIELD), {
    variables: { orderId: args._id },
    skip: !args._id
  });
  return {
    order: data?.myOrder,
    loading,
    refetch
  };
};
