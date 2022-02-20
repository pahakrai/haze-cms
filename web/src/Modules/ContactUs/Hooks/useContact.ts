import React from "react";
import { useMutation } from "@apollo/client";
import {
  CREATE_CUSTOMER_ENQUIRY,
  CUSTOMER_ENQUIRY_CREATE_FIELDS
} from "../Apollo/gql";

interface useCustomerEnquiryCreateArgs {
  onCompleted?: (status: boolean) => void;
  onError?: () => void;
}
export const useCustomerEnquiryCreate = (
  args?: useCustomerEnquiryCreateArgs
) => {
  const [customerEnquiry, { loading, error }] = useMutation(
    CREATE_CUSTOMER_ENQUIRY(),
    {
      onCompleted: (data) => {
        args?.onCompleted?.(data?.forgotPassword);
      },
      onError: () => args?.onError?.()
    }
  );
  const _customerEnquiry = React.useCallback((data: any) => {
    customerEnquiry({
      variables: {
        customerEnquiryCreateModel: { ...data }
      }
    });
  }, []);
  return {
    customerEnquiry: _customerEnquiry,
    customerEnquiryLoading: loading,
    customerEnquiryError: error
  };
};
