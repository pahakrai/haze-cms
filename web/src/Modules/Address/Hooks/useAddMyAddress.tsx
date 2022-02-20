import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { ADD_MY_ADDRESS } from "../Apollo/gqls";

interface useuseAddMyAddressArgs {
  onCompleted?: (data: { addMyAddress: IAddress }) => void;
  onError?: () => void;
}
export const useAddMyAddress = (args?: useuseAddMyAddressArgs) => {
  const [addMyAddress, { loading, error }] = useMutation(
    ADD_MY_ADDRESS(),
    args
  );
  const _addMyAddress = useCallback((form: IAddressForm) => {
    return addMyAddress({
      variables: {
        addressCreateModel: form
      }
    });
  }, []);
  return {
    addMyAddress: _addMyAddress,
    loading,
    error
  };
};
