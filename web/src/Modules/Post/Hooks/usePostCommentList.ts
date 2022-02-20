import { useQuery, FetchPolicy } from "@apollo/client";
import { usePaginate } from "~/lib/apollo/paginate";
import { QUERY_COMMENTS } from "../Apollo/gql";

interface usePostCommentlistArgs {
  variables: IPostCommentSearchVariables;
  fetchPolicy?: FetchPolicy;
}
export const usePostCommentList = (
  options: usePostCommentlistArgs = { variables: { post: "" } }
) => {
  const paginate = usePaginate(
    "postComments",
    options?.variables?.paginate || { first: 10 }
  );
  const queryResult = useQuery<{
    postComments: PaginationResult<IPost>;
  }>(QUERY_COMMENTS(), {
    ...options,
    variables: {
      postId: options?.variables?.post
    }
  });
  return paginate.useProps(queryResult);
};
