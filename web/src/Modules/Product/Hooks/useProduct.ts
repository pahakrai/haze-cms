import { useQuery } from "@apollo/client";
import isUndefined from "lodash/isUndefined";
import { PRODUCT_DETAIL_FIELDS, QUERY_PRODUCT } from "../Apollo/gql";
interface useProductArgs {
  _id?: string;
  field?: string;
  onCompleted?: (product?: IProduct) => void;
  onError?: () => void;
}
interface useProductHook {
  product?: IProduct;
  loading?: boolean;
}
export const useProduct = (args?: useProductArgs): useProductHook => {
  const { data, loading } = useQuery<{
    product: IProduct;
  }>(QUERY_PRODUCT(args?.field ? args.field : PRODUCT_DETAIL_FIELDS), {
    skip: isUndefined(args?._id),
    variables: { id: args?._id },
    onCompleted: (data) => {
      args?.onCompleted?.(data?.product);
    },
    onError: () => {
      args?.onError?.();
    }
  });
  return { product: data?.product, loading };
};
