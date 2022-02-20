import { useQuery } from "@apollo/client";
import { ADDRESS } from "../Apollo/gqls";

interface useAddressArgs {
  onCompleted?: (data: { address: IAddress }) => void;
  onError?: () => void;
  skip?: boolean;
  variables: {
    id?: string;
  };
}

export const useAddress = (options: useAddressArgs) => {
  const { data, loading, error, refetch } = useQuery<{
    address: IAddress;
  }>(ADDRESS(), options);
  return {
    refetch,
    error,
    loading,
    data: data?.address
  };
};
