import React from "react";
import { useMutation } from "@apollo/client";
import {
  CREATE_QUOTATION
} from "../Apollo/gqls";

interface useCreateQuotationArgs {
  onCompleted?: (status: boolean) => void;
  onError?: () => void;
}
export const useCreateQuotation = (
  args?: useCreateQuotationArgs
) => {
  const [createQuotation, { loading, error }] = useMutation(
    CREATE_QUOTATION(),
    {
      onCompleted: (data) => {
        args?.onCompleted?.(data?.forgotPassword);
      },
      onError: () => args?.onError?.()
    }
  );
  const _createQuotation = React.useCallback((data: any) => {
    createQuotation({
      variables: {
        values: { ...data }
      }
    });
  }, []);
  return {
    createQuotation: _createQuotation,
    createQuotationLoading: loading,
    createQuotationError: error
  };
};
