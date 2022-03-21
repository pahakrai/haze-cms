import React, { useEffect } from "react";
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
}

const PostsPage: NextPage<PostsPageParam> = ({}) => {
  const intl = useIntl();
  const router = useRouter();
  const classes = useClasses();
  const query = router?.query as Record<string, string>;

  const getDate = (date: string, key: string): string => {
    if (!date) return;
    return key === "start"
      ? dayjs(dayjs(date).startOf("day").valueOf()).toISOString()
      : dayjs(dayjs(date).startOf("day").valueOf() - 1).toISOString();
  };
  const [sort, setSort] = React.useState<{ [key: string]: number }>(); // pagination sort
  const [createdFr, setCreatedDateFr] = React.useState<string>("");
  const [createdTo, setCratedDateTo] = React.useState<string>("");
  const [limit, setLimit] = React.useState(12); // default page size

  const prepareSorts = (sort?: { [key: string]: number }) => {
    return [
      {
        key: intl.formatMessage({ id: "display_sort_by" }),
        value: undefined,
        selected: isEqual(sort, undefined)
      },
      {
        key: intl.formatMessage({ id: "display_sort_by_created_at_desc" }),
        value: {
          createdAt: 1
        },
        selected: isEqual(sort, { createdAt: 1 })
      },
      {
        key: intl.formatMessage({ id: "display_sort_by_created_at_asc" }),
        value: {
          createdAt: -1
        },
        selected: isEqual(sort, { createdAt: -1 })
      }
    ];
  };
  const sorts = prepareSorts(sort);
  const preparePages = (current?: number) => {
    return [
      {
        key: intl.formatMessage(
          { id: "display_items_per_page" },
          { count: 12 }
        ),
        value: 12,
        selected: current === 12
      },
      {
        key: intl.formatMessage(
          { id: "display_items_per_page" },
          { count: 24 }
        ),
        value: 24,
        selected: current === 24
      }
    ];
  };
  const pages = preparePages(limit);

  useEffect(() => {
    const fn = async () => {
      if (query?.createdFr) {
        setCreatedDateFr(
          getDate(dayjs(query?.createdFr).toISOString(), "start")
        );
        setCratedDateTo(
          getDate(dayjs(query?.createdTo).toISOString(), "start")
        );
      }
    };

    fn();
  }, [query]);

  const { posts, postsLoading, postsFetchMore, postsIsEnd } = usePosts({
    variables: {
      query: {
        // regions: query?.regions || [],
        // industries: query?.industries || [],
        // subjects: query?.subjects || [],
        statuses: [PostStatus.ACTIVE],
        platformTypes: [PlatformType.WEB],
        // createdFr: getDate(createdFr, "start"),
        // createdTo: getDate(createdTo, "end"),
        q: query?.q || ""
        // tag: qs.parse(router.asPath.replace(/[^?]+\??/, "")).tag
      },
      paginate: { first: limit },
      options: {
        sort: sort ? sort : undefined
      }
    },
    fetchPolicy: "network-only"
  });

  const _loadMore = () => {
    postsFetchMore?.();
  };
  const { categories } = useCategories({
    variables: { query: { isActive: true, parent: null } }
  });
  const category = router.query.category;
  let _categories = cloneDeep(categories);
  const title = _categories?.filter((i) => {
    if (i.code === category) {
      return i.code;
    }

    i.children.map((j) => {
      if (j.code === category) {
        return j.code;
      }
    });
  });
  // default menus just
  let defaultMenus: IMenu[] = [
    {
      title: intl.formatMessage({ id: "display_all_posts" }),
      value: undefined
    }
  ];
  const prepareMenus = (categories: ICategory[]): IMenu[] => {
    return (
      categories?.map<IMenu>((category) => ({
        title: category.name,
        value: category.code,
        menus: category.children ? prepareMenus(category.children) : undefined
      })) || []
    );
  };
  const { industries } = useFilters();
  // generated by api data
  const generatedMenus = prepareMenus(categories);
  // concat default and generated menus for display
  let menus = concat(defaultMenus, generatedMenus);
  return (
    <Layout classes={{ main: classes.d_flex }}>
      {JSON.stringify(industries)}
      <PageHead title={intl.formatMessage({ id: "display_all_posts" })} />
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item sm={12} md={9}>
            {!isEmpty(posts) && (
              <Grid container spacing={2}>
                {posts.map((post: IPost, idx: number) => {
                  return (
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      md={6}
                      lg={4}
                      xl={4}
                      className={classes.mb_3}
                      key={idx}
                    >
                      <Link href={`/posts/${post._id}`} key={idx} passHref>
                        <a className={classes.text_decoration_none}>
                          <PostCard post={post} />
                        </a>
                      </Link>
                    </Grid>
                  );
                })}
                <Grid item>
                  {!postsIsEnd && (
                    <div className={clsx(classes.pagination, classes.py_3)}>
                      <Button
                        onClick={_loadMore}
                        variant="text"
                        disabled={postsLoading}
                      >
                        {intl.formatMessage({ id: "display_load_more" })}
                      </Button>
                    </div>
                  )}
                </Grid>
              </Grid>
            )}
            {isEmpty(posts) && (
              <Grid container justify="center" className={classes.empty}>
                <Grid item>
                  <Typography className={classes.title}>
                    {intl.formatMessage({ id: "display_no_related_posts" })}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Hidden smDown>
            <Grid item md={3}>
              <CollapseMenu
                menus={menus}
                onMenuClick={(menu) => {
                  // bind href and jump to
                  const href = menu.value
                    ? {
                        origin: `/posts?category=${encodeURIComponent(
                          menu.value
                        )}&title=${encodeURIComponent(menu.title)}`,
                        as: `/posts?category=${encodeURIComponent(menu.value)}`
                      }
                    : {
                        origin: `/posts?title=${encodeURIComponent(
                          menu.title
                        )}`,
                        as: `/posts`
                      };
                  router.push(href.origin, href.as);
                }}
              />
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </Layout>
  );
};
export default compose(
  withSSRScaffold([
    SSRWorkspaceHandler,
    SSRShoppingCartHandler,
    SSRCategoriesHandler
  ])
)(PostsPage);
