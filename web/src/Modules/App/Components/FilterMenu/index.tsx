import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Hidden,
  Typography,
  Button,
  MenuItem,
  Menu,
  makeStyles,
  Select,
  FormControl,
  ListItemIcon,
  Checkbox,
  ListItemText
} from "@material-ui/core";
import { compose } from "recompose";
import { NextPage } from "next";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import concat from "lodash/concat";
import isEqual from "lodash/isEqual";
import ECOMM from "@golpasal/common";
import dayjs from "dayjs";
import { cloneDeep } from "lodash";
import { useFilters } from "~/lib/filter/provider";
import { SSRCategoriesHandler } from "~/src/Modules/Category/SSRCategoriesHandler";
import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import {
  useCategories,
  useRQIndustries,
  useRQSubjects
} from "~/src/Modules/Category/Hooks/useCategories";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
// import { useRegions } from "~/src/Modules/Region/Hooks/useRegions";
import CollapseMenu, {
  Menu as IMenu
} from "~/src/Modules/App/Components/CollapseMenu";

import { ExpandMoreIcon, CloseIcon } from "~/src/Components/SvgIcon";
import { DatePicker } from "~/src/Components/DatePicker";
import FilterSelect from "./Select";
import { useRegionsQuery } from "~/src/Modules/Region/Hooks/useRegions";
import { useRQMemberOrganizations } from "~/src/Modules/Member/Hooks/useMemberOrganizations";

interface Option {
  _id: string;
  name_display: string;
}

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

const options: Option[] = [
  { _id: "1", name_display: "Oliver Hansen" },
  { _id: "2", name_display: "Van Henry" },
  { _id: "3", name_display: "April Tucker" },
  { _id: "4", name_display: "Ralph Hubbard" },
  { _id: "5", name_display: "Omar Alexander" },
  { _id: "6", name_display: "Carlos Abott" }
];

interface PostsFilterProps {
  pageParam: IPageParam;
}

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
  createdFr?: string;
  createdTo?: string;
  onSortChanged?: (sort: { [key: string]: number }) => void;
  onDateFrChange?: (date: string) => void;
  onDateToChange?: (date: string) => void;
}
const ListContentHeader = ({
  title,
  pages = [],
  onLimitChanged,
  sorts = [],
  createdFr,
  createdTo,
  onSortChanged,
  onDateFrChange,
  onDateToChange
}: ListContentHeaderProps) => {
  // const options = [];
  const intl = useIntl();
  const router = useRouter();
  const classes = useClasses();
  const { industries } = useRQIndustries();
  const { subjects } = useRQSubjects();
  const { regions } = useRegionsQuery({});
  const { organizations } = useRQMemberOrganizations();
  const { setIndustries, setSubjects, setRegions, setOrganizations } =
    useFilters();

  const onChangeFilter = (type: string, values: string[]) => {
    switch (type) {
      case "industries":
        setIndustries(values);
        break;
      case "subjects":
        setSubjects(values);
        break;
      case "regions":
        setRegions(values);
        break;
      case "organizations":
        setOrganizations(values);
        break;
      default:
        console.log("default filter");
    }
  };

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={4} sm={4} md={2}>
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
              onDateFrChange?.(val.format("YYYY/MM/DD"));
            }}
          >
            <input
              className={classes.date_input}
              value={createdFr ? dayjs(createdFr)?.format("YYYY/MM/DD") : ""}
            />
          </DatePicker>
          {createdFr ? (
            <CloseIcon
              className={classes.date_icon}
              onClick={() => {
                onDateFrChange?.("");
              }}
            />
          ) : (
            ""
          )}
        </div>
      </Grid>
      <Grid item xs={4} sm={4} md={2}>
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
              onDateToChange?.(val.format("YYYY/MM/DD"));
            }}
          >
            <input
              className={classes.date_input}
              value={createdTo ? dayjs(createdTo)?.format("YYYY/MM/DD") : ""}
            />
          </DatePicker>
          {createdTo ? (
            <CloseIcon
              className={classes.date_icon}
              onClick={() => {
                onDateToChange?.("");
              }}
            />
          ) : (
            ""
          )}
        </div>
      </Grid>
      <Grid item xs={4} sm={4} md={2}>
        <span>
          {intl.formatMessage({
            id: "display_industry"
          })}
        </span>
        <div className={classes.date_wrapper}>
          <FilterSelect
            options={industries}
            type={"industries"}
            onChange={onChangeFilter}
          />
        </div>
      </Grid>
      <Grid item xs={4} sm={4} md={2}>
        <span>
          {intl.formatMessage({
            id: "display_subject"
          })}
        </span>
        <div className={classes.date_wrapper}>
          <FilterSelect
            options={subjects}
            onChange={onChangeFilter}
            type={"subjects"}
          />
        </div>
      </Grid>
      <Grid item xs={4} sm={4} md={2}>
        <span>
          {intl.formatMessage({
            id: "display_region"
          })}
        </span>
        <div className={classes.date_wrapper}>
          <FilterSelect options={regions} type={"regions"} />
        </div>
      </Grid>
      <Grid item xs={4} sm={4} md={2}>
        <span>
          {intl.formatMessage({
            id: "display_organization"
          })}
        </span>
        <div className={classes.date_wrapper}>
          <FilterSelect
            options={organizations?.map((og) => ({
              name_display: og.organizationName,
              _id: og.user
            }))}
            type={"organizations"}
          />
        </div>
      </Grid>
      {/* <Grid item xs={4} sm={4} md={1}>
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
      <Grid item xs={4} sm={4} md={1}>
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
      </Grid> */}
    </Grid>
  );
};

const PostsFilter: NextPage<PostsFilterProps> = ({}) => {
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
  const [createdTo, setCreatedDateTo] = React.useState<string>("");
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
        setCreatedDateTo(
          getDate(dayjs(query?.createdTo).toISOString(), "start")
        );
      }
    };

    fn();
  }, [query]);

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
  // generated by api data
  const generatedMenus = prepareMenus(categories);
  // concat default and generated menus for display
  let menus = concat(defaultMenus, generatedMenus);
  return (
    <ListContentHeader
      title={
        title && title.length
          ? title[0].name
          : intl.formatMessage({ id: "display_all_posts" })
      }
      pages={pages}
      onLimitChanged={(limit) => setLimit(limit)}
      sorts={sorts}
      createdFr={createdFr}
      createdTo={createdTo}
      onSortChanged={(sort) => setSort(sort)}
      onDateFrChange={(date) => {
        if (!date) {
          setCreatedDateFr("");
        } else {
          setCreatedDateFr(dayjs(date).toISOString());
        }
      }}
      onDateToChange={(date) => {
        if (!date) {
          setCreatedDateTo("");
        } else {
          setCreatedDateTo(dayjs(date).toISOString());
        }
      }}
    />
  );
};
export default compose(
  withSSRScaffold([SSRWorkspaceHandler, SSRCategoriesHandler])
)(PostsFilter);
