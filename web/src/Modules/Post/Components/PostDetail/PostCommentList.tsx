import React from "react";
import { useIntl } from "react-intl";
import moment from "moment";
import { Grid, makeStyles, Typography, Container } from "@material-ui/core";

import { usePostCommentList } from "~/src/Modules/Post/Hooks/usePostCommentList";

const useClasses = makeStyles((theme) => ({
  wrapper: {
    maxWidth: 460,
    padding: "50px 0 50px 0",
    margin: "auto"
  }
}));

export const PostCommentList = (id: any) => {
  const intl = useIntl();
  const classes = useClasses();
  const {
    postComments,
    postCommentsLoading,
    postCommentsFetchMore,
    postCommentsIsEnd
  } = usePostCommentList({
    variables: {
      post: id
    }
  });
  return (
    <>
      <Container fixed>show comment</Container>
    </>
  );
};

export default PostCommentList;
