import { useQuery } from "@apollo/client";
import isUndefined from "lodash/isUndefined";
import { STORE_ITEM_FIELDS, QUERY_STORE } from "../Apollo/gql";
interface useStoreArgs {
  _id?: string;
  field?: string;
  onCompleted?: (store?: IStore) => void;
  onError?: () => void;
}
interface useStoreHook {
  store?: IStore;
  loading?: boolean;
}
export const useStore = (args?: useStoreArgs): useStoreHook => {
  const { data, loading } = useQuery<{
    store: IStore;
  }>(QUERY_STORE(args?.field ? args.field : STORE_ITEM_FIELDS), {
    skip: isUndefined(args?._id),
    variables: { id: args?._id },
    onCompleted: (data) => {
      args?.onCompleted?.(data?.store);
    },
    onError: () => {
      args?.onError?.();
    }
  });
  return { store: data?.store, loading };
};
