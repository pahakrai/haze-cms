import { useQuery, FetchPolicy } from "@apollo/client";
import { useInfiniteQuery } from "react-query";
import {
  usePaginate,
  hasNextPage,
  transformPaginate
} from "~/lib/apollo/paginate";
import { QUERY_POSTS } from "../Apollo/gql";
import { fetchPosts } from "../Api";

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

export const usePostsQuery = (query?: any, options?: any) => {
  // const useQ = useInfiniteQuery;
  const queryResult = useInfiniteQuery<any>(
    ["posts"],
    ({ pageParam }) => fetchPosts(transformPaginate({ ...query, pageParam })),
    {
      getNextPageParam: hasNextPage,
      ...options
    }
  );
  // hasNextPage, fetchNextPage, isFetching, isFetchingNextPage, isError, error, data
  return queryResult;
};
