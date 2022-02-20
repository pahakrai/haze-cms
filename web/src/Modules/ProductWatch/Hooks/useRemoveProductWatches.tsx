import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_PRODUCT_WATCHES } from "../Apollo/gqls";

interface useRemoveProductWatchesArgs {
  onCompleted?: (data) => void;
  onError?: () => void;
}

export const useRemoveProductWatches = (args?: useRemoveProductWatchesArgs) => {
  const [removeProductWatches, { loading, error }] = useMutation(
    REMOVE_PRODUCT_WATCHES(),
    args
  );
  const _removeProductWatches = useCallback((productIds: [string]) => {
    return removeProductWatches({
      variables: {
        productIds
      }
    });
  }, []);
  return {
    removeProductWatches: _removeProductWatches,
    loading,
    error
  };
};
