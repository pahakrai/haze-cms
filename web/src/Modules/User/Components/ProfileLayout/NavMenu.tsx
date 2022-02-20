import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

const useClasses = makeStyles((theme) => ({
  nav_menus: {
    display: "flex",
    flexDirection: "column",
    border: `1px solid ${theme.palette.divider}`,
    "& $item": {
      textDecoration: "none",
      cursor: "pointer",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: theme.spacing(2),
      color: theme.palette.text.primary,
      borderBottom: `1px solid ${theme.palette.divider}`,
      "&:last-child": {
        borderBottom: 0
      },
      "&$active,&:hover": {
        color: theme.palette.primary.main
      },
      "& $icon": {
        color: "inherit"
      },
      "& $title": {
        display: "inline-block",
        fontSize: theme.spacing(2),
        lineHeight: "22px",
        fontWeight: 400,
        color: "inherit",
        marginLeft: 4,
        textDecoration: "none",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "100%",
        cursor: "pointer"
      }
    }
  },
  active: {},
  item: {},
  icon: {},
  title: {},
  d_flex: {
    display: "flex"
  },
  flex_row: {
    flexDirection: "row"
  },
  align_items_center: {
    alignItems: "center"
  },
  my_0: {
    marginBottom: 0,
    marginTop: 0
  },
  mx_2: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
}));
export interface Item {
  icon: React.ReactElement;
  title: string;
  onClick?: () => void;
  active?: boolean;
  href?: string;
}
export interface NavMenuListProps {
  items?: Item[];
}
export const NavMenuList = ({ items = [] }: NavMenuListProps) => {
  const classes = useClasses();
  return (
    <div className={classes.nav_menus}>
      {items.map((item, idx) => {
        return (
          <Link href={item.href || "#"} passHref key={idx}>
            <a
              className={clsx(classes.item, {
                [classes.active]: item.active
              })}
              onClick={item.onClick}
            >
              <p
                className={clsx(
                  classes.my_0,
                  classes.d_flex,
                  classes.flex_row,
                  classes.align_items_center
                )}
                onClick={item.onClick}
              >
                {item.icon}
                <span className={classes.mx_2}>{item.title}</span>
              </p>
            </a>
          </Link>
        );
      })}
    </div>
  );
};
