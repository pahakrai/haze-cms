import { useQuery } from "@apollo/client";
import { MY_ADDRESSS } from "../Apollo/gqls";

interface useMyAddresssArgs {
  onCompleted?: () => void;
  onError?: () => void;
  skip?: boolean;
  variables?: {};
}

export const useMyAddresss = (options?: useMyAddresssArgs) => {
  const { data, loading, error, refetch } = useQuery<{
    myAddresses: IAddress[];
  }>(MY_ADDRESSS(), options);
  return {
    refetch,
    error,
    loading,
    addresses: data?.myAddresses || []
  };
};
