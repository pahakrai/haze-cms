import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { usePostsQuery } from "~/src/Modules/Post/Hooks/usePosts";
import { convert } from "html-to-text";
// There is also an alias to `convert` called `htmlToText`.

const html = "<h1>Hello World</h1>";
const text = convert(html, {
  wordwrap: 130
});

import {
  Container,
  Grid,
  Hidden,
  Typography,
  Button,
  makeStyles
} from "@material-ui/core";
import { compose } from "recompose";
import { NextPage } from "next";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import clsx from "clsx";
import concat from "lodash/concat";
import isEqual from "lodash/isEqual";
import Link from "next/link";
import ECOMM from "@golpasal/common";
import isEmpty from "lodash/isEmpty";
import dayjs from "dayjs";
import { cloneDeep } from "lodash";
import qs from "qs";
import { useFilters } from "~/lib/filter/provider";

import { SSRCategoriesHandler } from "~/src/Modules/Category/SSRCategoriesHandler";
import { SSRShoppingCartHandler } from "~/src/Modules/ShoppingCart/SSRShoppingCartHandler";
import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { useCategories } from "~/src/Modules/Category/Hooks/useCategories";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import CollapseMenu, {
  Menu as IMenu
} from "~/src/Modules/App/Components/CollapseMenu";
import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";
import PostCard from "~/src/Modules/Post/Components/PostCard";
import { usePosts } from "~/src/Modules/Post/Hooks/usePosts";

const PostStatus = { ACTIVE: 1 };
const PlatformType = ECOMM.type.PlatformType;

const useClasses = makeStyles((theme) => ({
  empty: {
    "& $title": {
      marginTop: theme.spacing(6)
    }
  },
  title: {},
  py_3: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  mb_3: { paddingBottom: theme.spacing(3) },
  d_flex: { display: "flex" },
  pagination: {
    flexShrink: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  text_decoration_none: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none"
    }
  },
  date_wrapper: {
    position: "relative",
    minHeight: 50
  },
  date_input: {
    display: "block",
    width: "100%",
    height: "calc(1.5em + 0.75rem + 2px)",
    padding: "0.375rem 0.75rem",
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    color: "#495057",
    backgroundColor: "#fff",
    backgroundClip: "padding-box",
    border: "1px solid #ced4da",
    borderRadius: "0.25rem",
    transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
    position: "absolute"
  },
  date_icon: {
    position: "absolute",
    right: 0,
    top: 8,
    cursor: "pointer"
  }
}));
interface PostsPageParam {
  pageParam: IPageParam;
  initPosts: any[];
}

const PostsPage: NextPage<PostsPageParam> = ({ initPosts }) => {
  const [posts, setPosts] = useState(initPosts || []);
  // hasNextPage, fetchNextPage, isFetching, isFetchingNextPage, isError, error, data
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage, error } =
    usePostsQuery(
      {
        // regions: query?.regions || [],
        // industries: query?.industries || [],
        // subjects: query?.subjects || [],
        // statuses: [PostStatus.ACTIVE],
        // platformTypes: [PlatformType.WEB],
        // createdFr: getDate(createdFr, "start"),
        // createdTo: getDate(createdTo, "end"),
        // q: query?.q || ""
        // tag: qs.parse(router.asPath.replace(/[^?]+\??/, "")).tag
      }
      //   {
      //     sort: sort ? sort : undefined
      //   }
    );

  const intl = useIntl();
  const classes = useClasses();

  return (
    <Layout classes={{ main: classes.d_flex }}>
      <PageHead title={intl.formatMessage({ id: "display_all_posts" })} />
      <Container maxWidth="lg">
        <>
          <InfiniteScroll
            dataLength={
              data?.pages?.[0]?.docs ? data?.pages?.[0].docs.length : 0
            }
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<h3> Loading...</h3>}
            endMessage={<h4>Nothing more to show</h4>}
          >
            {data?.pages?.[0]?.docs.map((doc) => {
              const htmlText = convert(doc?.content.en, {
                wordwrap: 130,
                limits: {
                  ellipsis: "..."
                }
              });
              return (
                <div key={doc._id}>
                  <div className="back">
                    <strong>{doc.title.en}</strong>
                  </div>
                  <div
                  // dangerouslySetInnerHTML={{ __html: doc?.content.en }}
                  >
                    {htmlText}
                  </div>
                  {/* <Grid container spacing={3}> */}
                  <Link href={`/posts/${doc._id}`} key={doc._id} passHref>
                    <a className={classes.text_decoration_none}>Read More</a>
                  </Link>
                  {/* </Grid> */}
                </div>
              );
            })}
          </InfiniteScroll>
        </>
        {hasNextPage}
      </Container>
    </Layout>
  );
};

export default PostsPage;
