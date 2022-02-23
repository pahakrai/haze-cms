import React, { useEffect } from "react";
import {
  Container,
  Grid,
  Hidden,
  Typography,
  Button,
  MenuItem,
  Menu,
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

import { SSRCategoriesHandler } from "~/src/Modules/Category/SSRCategoriesHandler";
import { SSRShoppingCartHandler } from "~/src/Modules/ShoppingCart/SSRShoppingCartHandler";
import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { useCategories } from "~/src/Modules/Category/Hooks/useCategories";
import { useProductSearchResults } from "~/src/Modules/Product/Hooks/useProducts";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import { useRegions } from "~/src/Modules/Region/Hooks/useRegions";
import CollapseMenu, {
  Menu as IMenu
} from "~/src/Modules/App/Components/CollapseMenu";
import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";
import ProductCard from "~/src/Modules/Product/Components/ProductCard";
import { useCurrentUser } from "~/src/Modules/Auth/Hooks/useCurrentUser";
import { useShoppingCart } from "~/src/Modules/ShoppingCart/Hooks/useShoppingCart";
import { useToggleProductWatch } from "~/src/Modules/Product/Hooks/useToggleProductWatch";

import { ExpandMoreIcon, CloseIcon } from "~/src/Components/SvgIcon";
import { DatePicker } from "~/src/Components/DatePicker";

const ProductStatus = ECOMM.status.ProductStatus;
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
interface ProductsPageProps {
  pageParam: IPageParam;
}
const ProductsPage: NextPage<ProductsPageProps> = ({}) => {
  // const { currentUser } = useCurrentUser();
  // const { addToCart } = useShoppingCart();
  // const { toggleWatch } = useToggleProductWatch();
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
  const [productionDateFr, setProductionDateFr] = React.useState<string>("");
  const [productionDateTo, setProductionDateTo] = React.useState<string>("");
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
      if (query?.productionDateFr) {
        setProductionDateFr(
          getDate(dayjs(query?.productionDateFr).toISOString(), "start")
        );
        setProductionDateTo(
          getDate(dayjs(query?.productionDateTo).toISOString(), "start")
        );
      }
    };

    fn();
  }, [query]);

  const { products, productsLoading, productsFetchMore, productsIsEnd } =
    useProductSearchResults({
      variables: {
        query: {
          placeOfOrigin: query.placeOfOrigin,
          category: query?.category,
          statuses: [ProductStatus.ACTIVE],
          platformTypes: [PlatformType.WEB],
          productionDateFr: getDate(productionDateFr, "start"),
          productionDateTo: getDate(productionDateTo, "end"),
          q: query?.q || "",
          tag: qs.parse(router.asPath.replace(/[^?]+\??/, "")).tag
        },
        paginate: { first: limit },
        options: {
          sort: sort ? sort : undefined
        }
      },
      fetchPolicy: "network-only"
    });

  const _loadMore = () => {
    productsFetchMore?.();
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
      title: intl.formatMessage({ id: "display_all_products" }),
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
  // generated by api data
  const generatedMenus = prepareMenus(categories);
  // concat default and generated menus for display
  let menus = concat(defaultMenus, generatedMenus);
  return (
    <Layout classes={{ main: classes.d_flex }}>
      <PageHead title={intl.formatMessage({ id: "display_all_products" })} />
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Hidden smDown>
            <Grid item md={3}>
              <CollapseMenu
                menus={menus}
                onMenuClick={(menu) => {
                  // bind href and jump to
                  const href = menu.value
                    ? {
                        origin: `/products?category=${encodeURIComponent(
                          menu.value
                        )}&title=${encodeURIComponent(menu.title)}`,
                        as: `/products?category=${encodeURIComponent(
                          menu.value
                        )}`
                      }
                    : {
                        origin: `/products?title=${encodeURIComponent(
                          menu.title
                        )}`,
                        as: `/products`
                      };
                  router.push(href.origin, href.as);
                }}
              />
            </Grid>
          </Hidden>
          <Grid item sm={12} md={9}>
            <ListContentHeader
              title={
                title && title.length
                  ? title[0].name
                  : intl.formatMessage({ id: "display_all_products" })
              }
              pages={pages}
              onLimitChanged={(limit) => setLimit(limit)}
              sorts={sorts}
              productionDateFr={productionDateFr}
              productionDateTo={productionDateTo}
              onSortChanged={(sort) => setSort(sort)}
              onProductionDateFrChange={(date) => {
                if (!date) {
                  setProductionDateFr("");
                } else {
                  setProductionDateFr(dayjs(date).toISOString());
                }
              }}
              onProductionDateToChange={(date) => {
                if (!date) {
                  setProductionDateTo("");
                } else {
                  setProductionDateTo(dayjs(date).toISOString());
                }
              }}
            />
            {!isEmpty(products) && (
              <Grid container spacing={2}>
                {products.map((product: IProduct, idx: number) => {
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
                      <Link
                        href={`/products/${product._id}`}
                        key={idx}
                        passHref
                      >
                        <a className={classes.text_decoration_none}>
                          <ProductCard product={product} />
                        </a>
                      </Link>
                    </Grid>
                  );
                })}
                <Grid item>
                  {!productsIsEnd && (
                    <div className={clsx(classes.pagination, classes.py_3)}>
                      <Button
                        onClick={_loadMore}
                        variant="text"
                        disabled={productsLoading}
                      >
                        {intl.formatMessage({ id: "display_load_more" })}
                      </Button>
                    </div>
                  )}
                </Grid>
              </Grid>
            )}
            {isEmpty(products) && (
              <Grid container justify="center" className={classes.empty}>
                <Grid item>
                  <Typography className={classes.title}>
                    {intl.formatMessage({ id: "display_no_related_products" })}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
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
)(ProductsPage);

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
  productionDateFr?: string;
  productionDateTo?: string;
  onSortChanged?: (sort: { [key: string]: number }) => void;
  onProductionDateFrChange?: (date: string) => void;
  onProductionDateToChange?: (date: string) => void;
}
const ListContentHeader = ({
  title,
  pages = [],
  onLimitChanged,
  sorts = [],
  productionDateFr,
  productionDateTo,
  onSortChanged,
  onProductionDateFrChange,
  onProductionDateToChange
}: ListContentHeaderProps) => {
  const intl = useIntl();
  const router = useRouter();
  const classes = useClasses();
  const [sortAnchor, setSortAnchor] = React.useState(null);
  const [paginationAnchor, setPaginationAnchor] = React.useState(null);
  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={12} sm={12} md={3}>
        <Typography variant="body1" gutterBottom>
          {title}
        </Typography>
      </Grid>

      <Grid item xs={6} sm={6} md={3}>
        <span>
          {intl.formatMessage({
            id: "display_home_search_productionDate"
          })}
        </span>
        <div className={classes.date_wrapper}>
          <DatePicker
            initialSettings={{
              autoUpdateInput: false,
              autoApply: true
            }}
            onCallback={(val) => {
              onProductionDateFrChange?.(val.format("YYYY/MM/DD"));
            }}
          >
            <input
              className={classes.date_input}
              value={
                productionDateFr
                  ? dayjs(productionDateFr)?.format("YYYY/MM/DD")
                  : ""
              }
            />
          </DatePicker>
          {productionDateFr ? (
            <CloseIcon
              className={classes.date_icon}
              onClick={() => {
                onProductionDateFrChange?.("");
              }}
            />
          ) : (
            ""
          )}
        </div>
      </Grid>

      <Grid item xs={6} sm={6} md={3}>
        <span>
          {intl.formatMessage({
            id: "display_home_search_productExpiryDate"
          })}
        </span>
        <div className={classes.date_wrapper}>
          <DatePicker
            initialSettings={{
              autoUpdateInput: false,
              autoApply: true
            }}
            onCallback={(val) => {
              onProductionDateToChange?.(val.format("YYYY/MM/DD"));
            }}
          >
            <input
              className={classes.date_input}
              value={
                productionDateTo
                  ? dayjs(productionDateTo)?.format("YYYY/MM/DD")
                  : ""
              }
            />
          </DatePicker>
          {productionDateTo ? (
            <CloseIcon
              className={classes.date_icon}
              onClick={() => {
                onProductionDateToChange?.("");
              }}
            />
          ) : (
            ""
          )}
        </div>
      </Grid>

      <Grid item xs={6} sm={6} md={2}>
        {/* Sort Dropdown */}

        <Button
          variant="text"
          endIcon={<ExpandMoreIcon />}
          onClick={(event) => setSortAnchor(event.currentTarget)}
        >
          {sorts.find((_sort) => _sort.selected)?.key}
        </Button>
        <Menu anchorEl={sortAnchor} open={Boolean(sortAnchor)}>
          {sorts.map((_sort, idx) => {
            const active = _sort.selected;
            return (
              <MenuItem
                key={idx}
                selected={active}
                onClick={() => {
                  onSortChanged?.(_sort.value);
                  setSortAnchor(null);
                }}
              >
                {_sort.key}
              </MenuItem>
            );
          })}
        </Menu>
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        {/* Pagination Size Dropdown */}
        <Button
          variant="text"
          endIcon={<ExpandMoreIcon />}
          onClick={(event) => setPaginationAnchor(event.currentTarget)}
        >
          {pages.find((_page) => _page.selected)?.key}
        </Button>
        <Menu anchorEl={paginationAnchor} open={Boolean(paginationAnchor)}>
          {pages.map((_page, idx) => {
            const active = _page.selected;
            return (
              <MenuItem
                key={idx}
                selected={active}
                onClick={() => {
                  onLimitChanged?.(_page.value);
                  setPaginationAnchor(null);
                }}
              >
                {_page.key}
              </MenuItem>
            );
          })}
        </Menu>
      </Grid>
    </Grid>
  );
};
