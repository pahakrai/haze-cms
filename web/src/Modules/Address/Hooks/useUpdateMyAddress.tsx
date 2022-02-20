import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_MY_ADDRESS } from "../Apollo/gqls";

interface useUpdateMyAddressArgs {
  onCompleted?: (data: { updateAddress: IAddress }) => void;
  onError?: () => void;
}
export const useUpdateMyAddress = (args?: useUpdateMyAddressArgs) => {
  const [updateMyAddress, { loading, error }] = useMutation(
    UPDATE_MY_ADDRESS(),
    args
  );
  const _updateMyAddress = useCallback(
    (id: string, form: Partial<IAddressForm>) => {
      return updateMyAddress({
        variables: {
          id,
          addressUpdateModel: form
        }
      });
    },
    []
  );
  return {
    updateMyAddress: _updateMyAddress,
    loading,
    error
  };
};
