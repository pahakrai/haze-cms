import React from "react";
import { compose } from "recompose";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography, Container } from "@material-ui/core";
import { NextPage } from "next";
import { useIntl } from "react-intl";
import clsx from "clsx";
import ECOMM from "@golpasal/common";
import Link from "next/link";
import { cloneDeep } from "lodash";

import { PageSection } from "~/src/Modules/Page/Components";
import { ProductCard } from "~/src/Modules/Product/Components/ProductCard";
import { PostCard } from "~/src/Modules/Post/Components/PostCard";
import { StoreCard } from "~/src/Modules/Store/StoreCard";
import { DestinationCard } from "~/src/Modules/Destination/Components/Destination";
import { SSRCategoriesHandler } from "~/src/Modules/Category/SSRCategoriesHandler";
import { SSRShoppingCartHandler } from "~/src/Modules/ShoppingCart/SSRShoppingCartHandler";
import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { usePagesSectionResult } from "~/src/Modules/Page/hooks";
import { useProductsByTag } from "~/src/Modules/Product/Hooks/useProducts";
import { usePosts } from "~/src/Modules/Post/Hooks/usePosts";
import { useRegions } from "~/src/Modules/Destination/Hooks/useRegions";
import { useStores } from "~/src/Modules/Store/Hooks/useStores";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";
import HomeSearch from "~/src/Modules/HomeSearch/Components/index";

const ProductStatus = ECOMM.status.ProductStatus;
const PlatformType = ECOMM.type.PlatformType;
const StoreStatus = ECOMM.status.StoreStatus;

const useClasses = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  content: {
    flex: "1 0 auto"
  },
  pagination: {
    flexShrink: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  py_3: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  mb_3: {
    marginBottom: theme.spacing(3)
  },
  mb_5: {
    marginBottom: theme.spacing(5)
  },
  text_center: {
    textAlign: "center",
    fontWeight: 600
  },
  text_decoration_none: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none"
    }
  },
  post: {
    marginTop: 50
  }
}));
interface HomePageProps {
  pageParam: IPageParam;
}
const HomePage: NextPage<HomePageProps> = ({}) => {
  const classes = useClasses();
  const intl = useIntl();

  const {
    productsByTag,
    productsByTagLoading,
    productsByTagFetchMore,
    productsByTagIsEnd
  } = useProductsByTag({
    variables: {
      query: {
        tags: ["#recommended"],
        statuses: [ProductStatus.ACTIVE],
        platformTypes: [PlatformType.WEB]
      }
    }
  });

  const { posts, postsLoading, postsFetchMore, postsIsEnd } = usePosts({
    variables: {
      query: {
        isActive: true
      }
    }
  });

  const { stores } = useStores({
    variables: {
      query: {
        status: StoreStatus.ACTIVE
      }
    }
  });

  const { regions } = useRegions({
    variables: {
      query: {
        parent: null,
        isActive: true,
        isAddress: false
      }
    }
  });

  const _loadMore = () => {
    productsByTagFetchMore?.();
  };
  const pagesResult = usePagesSectionResult({
    prefix: "home",
    sections: ["banner", "why-choose-us", "banner2"]
  });
  return (
    <Layout>
      <PageHead title={intl.formatMessage({ id: "display_home" })} />
      <PageSection prefix="home" section="banner" pagesResult={pagesResult}>
        <HomeSearch />
      </PageSection>
      <Container maxWidth="lg">
        <div className={classes.py_3}>
          <Destinations destinations={regions} />
        </div>
        <HomeRecommendProducts products={productsByTag} />
        {!productsByTagIsEnd && (
          <div className={clsx(classes.pagination, classes.py_3)}>
            <Button onClick={_loadMore} disabled={productsByTagLoading}>
              {intl.formatMessage({ id: "display_load_more" })}
            </Button>
          </div>
        )}
        {/* not need for now */}
        {/* <HomeRecommendStores stores={stores} /> */}
        <PageSection
          prefix="home"
          section="why-choose-us"
          pagesResult={pagesResult}
        />
      </Container>

      <div
        style={{
          paddingTop: 50,
          position: "relative",
          overflow: "hidden"
        }}
      >
        <PageSection
          prefix="home"
          section="banner2"
          pagesResult={pagesResult}
        ></PageSection>
      </div>

      <Container
        maxWidth="lg"
        style={{
          paddingTop: 50
        }}
      >
        <HomeRecommendPosts posts={posts} />
        {!postsIsEnd && (
          <div className={clsx(classes.pagination, classes.py_3)}>
            <Button onClick={_loadMore} disabled={postsLoading}>
              {intl.formatMessage({ id: "display_load_more" })}
            </Button>
          </div>
        )}
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
)(HomePage);

interface HomeRecommendProductsProps {
  products?: IProduct[];
}
const HomeRecommendProducts = ({
  products,
  ...rest
}: HomeRecommendProductsProps) => {
  const classes = useClasses();
  const intl = useIntl();
  return (
    <div className={classes.mb_5} {...rest}>
      <Typography
        variant="h4"
        className={clsx(classes.text_center, classes.mb_5)}
      >
        {intl.formatMessage({ id: "display_recommend_products" })}
      </Typography>
      <Grid container spacing={3}>
        {products.map((product: IProduct, idx) => {
          return (
            <Grid item xs={6} sm={6} md={6} lg={3} xl={3}>
              <Link href={`/products/${product._id}`} key={idx} passHref>
                <a className={classes.text_decoration_none}>
                  <ProductCard product={product} />
                </a>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

interface HomeRecommendPostsProps {
  posts?: IPost[];
}
const HomeRecommendPosts = ({ posts, ...rest }: HomeRecommendPostsProps) => {
  const classes = useClasses();
  const intl = useIntl();
  let _posts = [];

  if (posts.length) {
    // only show top 3 latest
    _posts = JSON.parse(JSON.stringify(posts))?.splice(0, 3);
  }

  return (
    <div className={(classes.mb_5, classes.post)} {...rest}>
      <Typography variant="h4" className={clsx(classes.text_center)}>
        {intl.formatMessage({ id: "display_post" })}
      </Typography>
      <div
        className={clsx(classes.text_center, classes.mb_5)}
        style={{ color: "#8D9199" }}
      >
        {intl.formatMessage({ id: "display_post_sub" })}
      </div>
      <Grid container spacing={3}>
        {_posts.map((post: IPost, idx) => {
          return (
            <Grid item xs={12} sm={12} md={4} lg={4} style={{ height: 583 }}>
              <Link href={`/posts/${post._id}`} key={idx} passHref>
                <a className={classes.text_decoration_none}>
                  <PostCard post={post} />
                </a>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

// popular destinations
interface DestinationsProps {
  destinations?: IDestinations[];
}
const Destinations = ({ destinations, ...rest }: DestinationsProps) => {
  const classes = useClasses();
  const intl = useIntl();

  return (
    <div className={classes.mb_5} {...rest}>
      <Typography variant="h4" className={clsx(classes.text_center)}>
        {intl.formatMessage({ id: "display_destination" })}
      </Typography>
      <div
        className={clsx(classes.text_center, classes.mb_5)}
        style={{ color: "#8D9199" }}
      >
        {intl.formatMessage({ id: "display_destination_sub" })}
      </div>
      <Grid container spacing={3}>
        {destinations.map((destination: IDestinations, idx) => {
          return (
            <Grid item xs={6} sm={6} md={6} lg={3} xl={3} key={destination._id}>
              <Link
                href={`/products?placeOfOrigin=${destination.code}`}
                key={idx}
                passHref
              >
                <a className={classes.text_decoration_none}>
                  <DestinationCard regions={destination} thumbnail={false} />
                </a>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

// store list
interface HomeRecommendStoresProps {
  stores?: IStore[];
}
const HomeRecommendStores = ({ stores, ...rest }: HomeRecommendStoresProps) => {
  const classes = useClasses();
  const intl = useIntl();
  return (
    <div className={classes.mb_5} {...rest}>
      <Typography
        variant="h4"
        className={clsx(classes.text_center, classes.mb_5)}
      >
        {intl.formatMessage({ id: "display_stores" })}
      </Typography>
      <Grid container spacing={3}>
        {stores?.map((store: IStore, idx) => {
          return (
            <Grid item xs={6} sm={6} md={6} lg={3} xl={3} key={store._id}>
              <Link href={`/stores/${store._id}`} key={idx} passHref>
                <a className={classes.text_decoration_none}>
                  <StoreCard store={store} />
                </a>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
