import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { SET_MY_DEFAULT_ADDRESS } from "../Apollo/gqls";

interface useSetMyDefaultAddressArgs {
  onCompleted?: (data: { updateAddress: IAddress }) => void;
  onError?: () => void;
}
export const useSetMyDefaultAddress = (args?: useSetMyDefaultAddressArgs) => {
  const [setMyDefaultAddress, { loading, error }] = useMutation(
    SET_MY_DEFAULT_ADDRESS(),
    args
  );
  const _setMyDefaultAddress = useCallback((id: string) => {
    return setMyDefaultAddress({
      variables: {
        id
      }
    });
  }, []);
  return {
    setMyDefaultAddress: _setMyDefaultAddress,
    loading,
    error
  };
};
