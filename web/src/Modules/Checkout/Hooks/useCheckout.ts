import { useMutation } from "@apollo/client";
import { useCallback, useState } from "react";
import { CHECKOUT_FIELDS, MUTATION_CHECKOUT } from "../Apollo/gqls";
interface useCheckoutArgs {
  onComplete?: (checkout?: ICheckout) => void;
  onError?: (errors?: string) => void;
}
interface useCheckoutHook {
  checkout: (modal: ICheckoutOrderModel, finalize?: boolean) => void;
  loading: boolean;
  errors?: string;
  data?: any;
}
export const useCheckout = (args?: useCheckoutArgs): useCheckoutHook => {
  const [data, setData] = useState<ICheckout | undefined>(undefined);
  const [errors, setErrors] = useState<string | undefined>(undefined);
  const [gqlCheckout, { loading }] = useMutation<{
    checkout: ICheckout;
  }>(MUTATION_CHECKOUT(CHECKOUT_FIELDS), {
    onCompleted: ({ checkout }) => {
      setData(checkout);
      args?.onComplete?.(checkout);
    },
    onError: () => {
      setErrors("useCheckout Errors");
      args?.onError?.("useCheckout Errors");
    }
  });
  const _checkout = useCallback(
    (modal: ICheckoutOrderModel, finalize?: boolean) => {
      setErrors(undefined);
      return gqlCheckout({
        variables: {
          checkoutOrderModel: modal,
          finalize: finalize !== undefined ? finalize : true
        }
      });
    },
    []
  );
  return { checkout: _checkout, loading, errors, data };
};
