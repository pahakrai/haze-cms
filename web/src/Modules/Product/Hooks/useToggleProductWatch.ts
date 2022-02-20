import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import {
  MUTATION_TOGGLE_PRODUCT_WATCH,
  PRODUCT_WATCH_ITEM_FIELDS
} from "../Apollo/gql";

interface useToggleProductWatchArgs {
  field?: string;
}
interface useToggleProductWatchHook {
  toggleWatch: (_id: string) => void;
  loading?: boolean;
}
export const useToggleProductWatch = (
  args?: useToggleProductWatchArgs
): useToggleProductWatchHook => {
  const [_toggleWatch, { loading }] = useMutation<{
    product: IProduct;
  }>(
    MUTATION_TOGGLE_PRODUCT_WATCH(
      args?.field ? args.field : PRODUCT_WATCH_ITEM_FIELDS
    )
  );
  const toggleWatch = useCallback((_id: string) => {
    return _toggleWatch({
      variables: {
        productId: _id
      }
    });
  }, []);
  return { toggleWatch, loading };
};
