import React from "react";
import { useIntl } from "react-intl";
import { compose } from "recompose";
import clsx from "clsx";
import {
  Grid,
  makeStyles,
  Container,
  Typography,
  Button,
  MenuItem,
  Menu,
  InputBase
} from "@material-ui/core";
import { useRouter } from "next/router";
import { NextPage } from "next";
import isEmpty from "lodash/isEmpty";
import ECOMM from "@golpasal/common";
import Link from "next/link";
import { StoreCard } from "~/src/Modules/Store/StoreCard";
import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";
import { ExpandMoreIcon } from "~/src/Components/SvgIcon";
import { useStores } from "~/src/Modules/Store/Hooks/useStores";
const StoreStatus = ECOMM.status.StoreStatus;

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
  d_flex: {
    display: "flex",
    marginTop: theme.spacing(2)
  },
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
  input: {
    backgroundColor: "#fff",
    backgroundClip: "padding-box",
    border: "1px solid #ced4da",
    lineHeight: 1.5,
    paddingLeft: "0.5rem",
    borderRadius: "0.25rem"
  }
}));

interface StorePageProps {
  pageParam: IPageParam;
}
const StorePage: NextPage<StorePageProps> = ({}) => {
  const intl = useIntl();
  const router = useRouter();
  const classes = useClasses();
  const [searchValue, setSearchValue] = React.useState<string>();
  const [limit, setLimit] = React.useState(12); // default page size
  const { stores, storesLoading, storesFetchMore, storesIsEnd } = useStores({
    variables: {
      query: {
        status: StoreStatus.ACTIVE,
        q: searchValue
      },
      paginate: { first: limit }
    }
  });

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
  const _loadMore = () => {
    storesFetchMore?.();
  };
  return (
    <Layout classes={{ main: classes.d_flex }}>
      <PageHead title={intl.formatMessage({ id: "display_all_products" })} />
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid container spacing={2}>
            <ListContentHeader
              pages={pages}
              searchValue={searchValue}
              onLimitChanged={(limit) => setLimit(limit)}
              onSearchFrChange={(value) => {
                if (!value) {
                  setSearchValue("");
                } else {
                  setSearchValue(value);
                }
              }}
            />
            {!isEmpty(stores) && (
              <Grid container spacing={2}>
                {stores?.map((store: IStore, idx) => {
                  return (
                    <Grid item xs={6} sm={6} md={6} lg={4} xl={4}>
                      <Link href={`/stores/${store._id}`} key={idx} passHref>
                        <a className={classes.text_decoration_none}>
                          <StoreCard store={store} />
                        </a>
                      </Link>
                    </Grid>
                  );
                })}

                <Grid item>
                  {!storesIsEnd && (
                    <div className={clsx(classes.pagination, classes.py_3)}>
                      <Button
                        onClick={_loadMore}
                        variant="text"
                        disabled={storesLoading}
                      >
                        {intl.formatMessage({ id: "display_load_more" })}
                      </Button>
                    </div>
                  )}
                </Grid>
              </Grid>
            )}
            {isEmpty(stores) && (
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
export default compose(withSSRScaffold([SSRWorkspaceHandler]))(StorePage);

interface ListContentHeaderProps {
  pages?: { key: string; value: number; selected?: boolean }[];
  onLimitChanged?: (limit: number) => void;
  searchValue?: string;
  onSearchFrChange?: (value: string) => void;
}
const ListContentHeader = ({
  pages = [],
  onLimitChanged,
  searchValue,
  onSearchFrChange
}: ListContentHeaderProps) => {
  const intl = useIntl();
  const classes = useClasses();
  const [paginationAnchor, setPaginationAnchor] = React.useState(null);
  return (
    <Grid container spacing={10}>
      <Grid item xs={6} sm={6} md={6}>
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
        <InputBase
          className={classes.input}
          onChange={(value) => {
            onSearchFrChange?.(value.target.value);
          }}
          value={searchValue}
          placeholder={intl.formatMessage({ id: "display_search" })}
        />
      </Grid>
    </Grid>
  );
};
