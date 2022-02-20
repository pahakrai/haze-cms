import { useQuery, FetchPolicy } from "@apollo/client";
import { usePaginate } from "~/lib/apollo/paginate";
import { QUERY_STORES } from "../Apollo/gql";

interface useStoresArgs {
  variables: IStoreSearchVariables;
  fetchPolicy?: FetchPolicy;
}
export const useStores = (
  options: useStoresArgs = { variables: { query: {} } }
) => {
  const paginate = usePaginate(
    "stores",
    options?.variables?.paginate || { first: 10 }
  );
  const queryResult = useQuery<{
    stores: PaginationResult<IStore>;
  }>(QUERY_STORES(), {
    ...options,
    variables: {
      ...(options?.variables || {}),
      query: {
        ...(options?.variables?.query || {})
      }
    }
  });
  return paginate.useProps(queryResult);
};
