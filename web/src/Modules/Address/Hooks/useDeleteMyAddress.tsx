import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_MY_ADDRESS } from "../Apollo/gqls";

interface useDeleteMyAddressArgs {
  onCompleted?: (data: { updateAddress: IAddress }) => void;
  onError?: () => void;
}
export const useDeleteMyAddress = (args?: useDeleteMyAddressArgs) => {
  const [deleteAddress, { loading, error }] = useMutation(
    DELETE_MY_ADDRESS(),
    args
  );
  const _deleteAddress = useCallback((id: string) => {
    return deleteAddress({
      variables: {
        id
      }
    });
  }, []);
  return {
    deleteAddress: _deleteAddress,
    loading,
    error
  };
};
