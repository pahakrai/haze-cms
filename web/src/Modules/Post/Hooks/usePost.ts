import { useQuery } from "@apollo/client";
import isUndefined from "lodash/isUndefined";
import { POST_DETAIL_FIELDS, QUERY_POST } from "../Apollo/gql";
interface usePostArgs {
  _id?: string;
  field?: string;
  onCompleted?: (post?: IPost) => void;
  onError?: () => void;
}
interface usePostHook {
  post?: IPost;
  loading?: boolean;
}
export const usePost = (args?: usePostArgs): usePostHook => {
  const { data, loading } = useQuery<{
    post: IPost;
  }>(QUERY_POST(args?.field ? args.field : POST_DETAIL_FIELDS), {
    skip: isUndefined(args?._id),
    variables: { id: args?._id },
    onCompleted: (data) => {
      args?.onCompleted?.(data?.post);
    },
    onError: () => {
      args?.onError?.();
    }
  });
  return { post: data?.post, loading };
};
