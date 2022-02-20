import { useQuery } from "@apollo/client";
import isUndefined from "lodash/isUndefined";
import { QUERY_MY_PRODUCT_WAITCH_EXIST } from "../Apollo/gql";
interface useMyProductWatchExistArgs {
  _id?: string;
  onCompleted?: (watched?: boolean) => void;
  onError?: () => void;
  skip?: boolean;
}
interface useMyProductWatchExistHook {
  watched?: boolean;
  loading?: boolean;
  refetch?();
}
export const useMyProductWatchExist = (
  args?: useMyProductWatchExistArgs
): useMyProductWatchExistHook => {
  const { data, loading, refetch } = useQuery<{
    myProductWatchExist: boolean;
  }>(QUERY_MY_PRODUCT_WAITCH_EXIST, {
    skip: args?.skip,
    variables: { productId: args?._id },
    onCompleted: (data) => {
      args?.onCompleted?.(data?.myProductWatchExist);
    },
    onError: () => {
      args?.onError?.();
    }
  });
  return { watched: data?.myProductWatchExist, loading, refetch };
};
