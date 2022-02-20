import { useQuery, FetchPolicy } from "@apollo/client";
import { usePaginate } from "~/lib/apollo/paginate";
import { QUERY_POSTS } from "../Apollo/gql";

interface usePostsArgs {
  variables: IPostSearchVariables;
  fetchPolicy?: FetchPolicy;
}
export const usePosts = (
  options: usePostsArgs = { variables: { query: {} } }
) => {
  const paginate = usePaginate(
    "posts",
    options?.variables?.paginate || { first: 10 }
  );
  const queryResult = useQuery<{
    posts: PaginationResult<IPost>;
  }>(QUERY_POSTS(), {
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
