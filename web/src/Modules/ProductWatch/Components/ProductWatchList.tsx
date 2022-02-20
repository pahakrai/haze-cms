import React from "react";
import {
  Button,
  Grid,
  makeStyles,
  Menu,
  MenuItem,
  Typography
} from "@material-ui/core";
import { useIntl } from "react-intl";
import { NextPage } from "next";
import isEqual from "lodash/isEqual";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

import { useToast } from "~/lib/toast";
import { getSymbolFromCurrency } from "~/lib/currencyMap";
import { useCurrentUser } from "../../Auth/Hooks/useCurrentUser";
import { useShoppingCart } from "../../ShoppingCart/Hooks/useShoppingCart";
import { useMyProductWatches } from "~/src/Modules/ProductWatch/Hooks/useMyProductWatches";
import { useRemoveProductWatches } from "../Hooks/useRemoveProductWatches";
import ProductCardBase from "../../Product/Components/ProductCard/ProductCardBase";
import { ExpandMoreIcon } from "~/src/Components/SvgIcon";

const useClasses = makeStyles((theme) => ({
  d_flex: {
    display: "flex"
  },
  align_items_center: {
    alignItems: "center"
  },
  justify_content_center: {
    justifyContent: "center"
  },
  p_5: {
    padding: theme.spacing(5)
  },
  py_3: {
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  text_decoration_none: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none"
    }
  }
}));
interface ProductWatchListProps {
  pageParam?: IPageParam;
}

const ProductWatchList: NextPage<ProductWatchListProps> = ({}) => {
  const classes = useClasses();
  const intl = useIntl();
  const router = useRouter();
  const { toast } = useToast();
  const title =
    (router.query.title as string) ||
    intl.formatMessage({ id: "display_product_watch" });
  const [sort, setSort] = React.useState<{ [key: string]: number }>(); // pagination sort
  const { currentUser } = useCurrentUser();
  const { addToCart } = useShoppingCart();

  const { removeProductWatches } = useRemoveProductWatches({
    onCompleted: (data) => {
      if (data.removeProductWatches) {
        toast({
          status: "success",
          title: intl.formatMessage({ id: "display_remove_successfully" })
        });
        myProductWatchesRefetch();
      } else {
        toast({
          status: "error",
          title: intl.formatMessage({ id: "display_remove_failure" })
        });
      }
    }
  });
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
  const [limit, setLimit] = React.useState(12);
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
  const {
    myProductWatches,
    myProductWatchesLoading,
    myProductWatchesFetchMore,
    myProductWatchesIsEnd,
    myProductWatchesRefetch
  } = useMyProductWatches({
    variables: {
      paginate: { first: limit },
      options: {
        sort: sort ? sort : undefined
      }
    },
    fetchPolicy: "network-only"
  });
  const _loadMore = () => {
    myProductWatchesFetchMore?.();
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ListContentHeader
          title={title}
          pages={pages}
          onLimitChanged={(limit) => setLimit(limit)}
          onSortChanged={(sort) => setSort(sort)}
        />
        {myProductWatches.length > 0 && (
          <Grid container spacing={2}>
            {myProductWatches.map((mpw: IProductWatch, idx: number) => {
              const sku = mpw.product.skus?.[0];
              return (
                <Grid item xs={6} sm={6} md={6} lg={4} xl={4} key={idx}>
                  <Link
                    href={`/products/${mpw.product._id}`}
                    key={idx}
                    passHref
                  >
                    <a className={classes.text_decoration_none}>
                      <ProductCardBase
                        image={mpw.product.images?.[0]?.thumbnailUri}
                        title={mpw.product.name}
                        priceText={`${getSymbolFromCurrency(sku.currency)}${
                          sku.discountAmount || sku.amount
                        }`}
                        watched={true}
                        onHeartClick={() => {
                          removeProductWatches([mpw.product._id]);
                        }}
                        onCartClick={() => {
                          if (currentUser)
                            addToCart?.(mpw.product._id, sku._id);
                          else {
                            router.push("/auth/login?redirect=/");
                          }
                        }}
                      />
                    </a>
                  </Link>
                </Grid>
              );
            })}
            <Grid item xs={12}>
              {!myProductWatchesIsEnd && (
                <div
                  className={clsx(
                    classes.d_flex,
                    classes.justify_content_center,
                    classes.justify_content_center,
                    classes.py_3
                  )}
                >
                  <Button
                    onClick={_loadMore}
                    disabled={myProductWatchesLoading}
                  >
                    {intl.formatMessage({ id: "display_load_more" })}
                  </Button>
                </div>
              )}
            </Grid>
          </Grid>
        )}
        {myProductWatches.length === 0 && (
          <Grid
            xs={12}
            className={clsx(
              classes.d_flex,
              classes.align_items_center,
              classes.justify_content_center,
              classes.p_5
            )}
          >
            <Typography>
              {intl.formatMessage({ id: "display_no_related_products" })}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
// components here (just use for this page)
interface ListContentHeaderProps {
  title: string;
  pages?: { key: string; value: number; selected?: boolean }[];
  onLimitChanged?: (limit: number) => void;
  sorts?: {
    key: string;
    value: { [key: string]: number };
    selected?: boolean;
  }[];
  onSortChanged?: (sort: { [key: string]: number }) => void;
}
const ListContentHeader = ({
  title,
  pages = [],
  onLimitChanged
}: ListContentHeaderProps) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  return (
    <Grid container justify="space-between" spacing={2}>
      <Grid item sm={4} md={6}>
        <Typography variant="h5">{title}</Typography>
      </Grid>
      {pages.length > 0 && (
        <Grid item>
          {/* Pagination Size Dropdown */}
          <Button
            endIcon={<ExpandMoreIcon />}
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
          >
            {pages.find((_page) => _page.selected)?.key}
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
            {pages.map((_page, idx) => {
              const active = _page.selected;
              return (
                <MenuItem
                  key={idx}
                  selected={active}
                  onClick={() => {
                    onLimitChanged?.(_page.value);
                    setAnchorEl(null);
                  }}
                >
                  {_page.key}
                </MenuItem>
              );
            })}
          </Menu>
        </Grid>
      )}
    </Grid>
  );
};

export default ProductWatchList;
