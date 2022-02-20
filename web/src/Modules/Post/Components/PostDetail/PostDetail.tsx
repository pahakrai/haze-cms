import React from "react";
import { useRouter } from "next/router";
import moment from "moment";
import { makeStyles, Typography } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { usePost } from "~/src/Modules/Post/Hooks/usePost";
import { POST_DETAIL_PAGE_FIELDS } from "~/src/Modules/Post/Apollo/PostDetailPageQueryFields";

import PostCommentForm from "./PostCommenForm";
// import PostCommentList from "./PostCommentList";

const useClasses = makeStyles<string>((): any => ({
  wrapper: {
    // maxWidth: 460,
    padding: "50px 0 50px 0",
    margin: "auto"
  },
  title: {
    backgroundColor: " #f9f9f9",
    textAlign: "center",
    fontSize: 40,
    fontWeight: 600
  },
  image: {
    margin: "auto",
    textAlign: "center"
  },
  commentWrapper: {
    paddingTop: 15,
    marginBottom: 30,
    borderBottom: "1px solid #dce0e0"
  },
  content: {
    paddingTop: 50,
    "& img": {
      height: (props: any) => {
        if (props?.isMobile) {
          return "100% !important";
        }
      }
    }
  }
}));

export const PostDetail = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useClasses({
    isMobile
  });
  const _id = router.query._id as string;
  const { post } = usePost({ _id, field: POST_DETAIL_PAGE_FIELDS });

  return (
    <>
      {/* <Container fixed> */}
      <div className={classes.wrapper}>
        <div
          className={classes.title}
          style={{
            padding: isMobile ? "0 20px 0 20px" : "",
            lineHeight: isMobile ? "40px" : ""
          }}
        >
          {post?.title}
        </div>

        <Typography variant="body1" align="center">
          {moment(post?.postDate).format("YYYY-MM DD")}
        </Typography>
      </div>

      <div
        className={classes.content}
        style={{
          backgroundColor: "#fff",
          padding: isMobile ? "0 20px 0 20px" : ""
        }}
      >
        {/* image */}
        {post?.images && (
          <div className={classes.image}>
            <img
              style={{
                maxWidth: 846,
                width: "100%"
              }}
              src={post?.images?.[0]?.fileMeta?.uri}
            />
          </div>
        )}
        <div
          style={{
            textAlign: "center",
            margin: "auto",
            maxWidth: 846,
            width: "100%"
          }}
          dangerouslySetInnerHTML={{ __html: post?.content }}
        ></div>

        {/* <div className={classes.commentWrapper}>
          <Typography variant="body1" align="left">
            {intl.formatMessage({ id: "display_post_leave_reply" })}
          </Typography>
        </div> */}
        {/* <PostCommentList id={_id} /> */}
        <div style={{ marginTop: 50 }}></div>
        <PostCommentForm id={_id} />
      </div>
      {/* </Container> */}
    </>
  );
};

export default PostDetail;
