import { useQuery, WatchQueryFetchPolicy } from "@apollo/client";
import { useInfiniteQuery, useQuery as useReactQuery } from "react-query";
import { usePaginate } from "~/lib/apollo/paginate";
import { REGIONS } from "../Apollo/gqls";
import { fetchRegions } from "../Api";

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

export const useRegionsQuery = (
  query?: any,
  options?: any,
  pagination: boolean = false
) => {
  const useQ = pagination ? useInfiniteQuery : useReactQuery;
  // const paginate = usePaginateQuery() // prepare helper for paginate query
  const { data } = useQ<any>(
    ["countries"],
    () => fetchRegions({ ...query, parent: null, localize: true }),
    {
      ...options,
      ...(pagination
        ? {
            getNextPageParam: (_lastPage, pages) => {
              // requires page length
              if (pages.length < 4) {
                return pages.length + 1;
              } else {
                return undefined;
              }
            }
          }
        : {})
    }
  );
  // hasNextPage, fetchNextPage, isFetching, isFetchingNextPage, isError, error, data
  return { regions: data };
};
