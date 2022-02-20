import { useQuery, FetchPolicy } from "@apollo/client";
import { usePaginate } from "~/lib/apollo/paginate";
import { QUERY_REGIONS } from "../Apollo/gql";

interface useRegionsArgs {
  variables: IRegionSearchVariables;
  fetchPolicy?: FetchPolicy;
}
export const useRegions = (
  options: useRegionsArgs = { variables: { query: {} } }
) => {
  const paginate = usePaginate(
    "regions",
    options?.variables?.paginate || { first: 10 }
  );
  const queryResult = useQuery<{
    regions: PaginationResult<IRegion>;
  }>(QUERY_REGIONS(), {
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
