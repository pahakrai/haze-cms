import React from "react";
import { useMutation } from "@apollo/client";
import { POST_COMMENT_CREATE, POST_COMMENT_CREATE_FIELDS } from "../Apollo/gql";

interface usePostCommentCreateArgs {
  onCompleted?: (status: boolean) => void;
  onError?: () => void;
}
export const usePostCommentCreate = (args?: usePostCommentCreateArgs) => {
  const [postComment, { loading, error }] = useMutation(POST_COMMENT_CREATE(), {
    onCompleted: (data) => {
      args?.onCompleted?.(data?.forgotPassword);
    },
    onError: () => args?.onError?.()
  });
  const _postComment = React.useCallback((data: any) => {
    postComment({
      variables: {
        postCommentForm: { ...data }
      }
    });
  }, []);
  return {
    postComment: _postComment,
    postCommentLoading: loading,
    postCommentError: error
  };
};
