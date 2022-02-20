import { useQuery, FetchPolicy } from '@apollo/client';
import { usePaginate } from "~/lib/apollo/paginate";
import { QUERY_MY_PRODUCT_WATCHES } from '../Apollo/gqls';

interface useMyProductWatchesArgs {
  variables: IMyProductWatchSearchVariables,
  fetchPolicy?: FetchPolicy
}

export const useMyProductWatches = (
  options: useMyProductWatchesArgs = { variables: {} }
) => {
  const paginate = usePaginate(
    "myProductWatches",
    options?.variables?.paginate || { first: 10 }
  );
  const queryResult = useQuery<{
    myProductWatches: PaginationResult<IProductWatch>;
  }>(QUERY_MY_PRODUCT_WATCHES(), {
    ...options,
    variables: {
      ...(options?.variables || {})
    }
  });
  return paginate.useProps(queryResult);
};
