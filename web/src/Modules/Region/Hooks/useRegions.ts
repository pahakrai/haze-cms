import { useQuery, WatchQueryFetchPolicy } from "@apollo/client";
import { usePaginate } from "~/lib/apollo/paginate";
import { REGIONS } from "../Apollo/gqls";

interface useRegionsArgs {
  onCompleted?: () => void;
  onError?: () => void;
  variables?: {
    query?: {
      parent?: string | null;
      subTypes?: string[];
      isActive?: boolean;
      isAddress?: boolean;
      code?: string;
    };
    paginate?: Paginate;
  };
  skip?: boolean;
  fetchPolicy?: WatchQueryFetchPolicy;
}

export const useRegions = (options?: useRegionsArgs) => {
  const paginate = usePaginate(
    "regions",
    options?.variables?.paginate || { first: 10 }
  );
  const queryResult = useQuery<{
    regions: PaginationResult<IAddress>;
  }>(REGIONS(), options);
  return paginate.useProps(queryResult);
};
