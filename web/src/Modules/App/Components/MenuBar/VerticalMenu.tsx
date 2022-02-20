import { DetailedHTMLProps, HTMLAttributes } from "react";
import { useIntl } from "react-intl";
import clsx from "clsx";
import { useRouter } from "next/router";

import { MenusItem } from "./Constants";

import { makeStyles, Typography } from "@material-ui/core";
const useClasses = makeStyles((theme) => ({
  root: {},
  menus: {
    display: "flex",
    alignItems: "center",
    listStyle: "none",
    margin: 0,
    padding: 0,
    "& li": {
      position: "relative",
      "&:hover > $menus": {
        visibility: "visible"
      }
    },
    "& a": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
    },
    "& $menus": {
      display: "block",
      minWidth: "16rem",
      position: "absolute",
      flexDirection: "column",
      alignItems: "start",
      visibility: "hidden",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3]
    }
  },
  title: {
    color: theme.palette.text.primary,
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main,
      textDecoration: "none"
    },
    "&$active": {
      color: theme.palette.primary.main,
      paddingBottom: 5,
      borderBottomStyle: "solid",
      borderBottomWidth: 3
    }
  },
  active: {}
}));
interface IMenu {
  key: string;
  value?: string;
}
export interface MenuBarProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {}
export const VerticalMenu = ({ className, ...rest }: MenuBarProps) => {
  const intl = useIntl();
  const router = useRouter(); // get router.query.category

  return (
    <Menus
      intl={intl}
      menus={MenusItem}
      onMenuClick={(menu) => {
        router.push(menu.value);
      }}
    />
  );
};

export default VerticalMenu;

const Menus = ({
  intl,
  menus = [],
  onMenuClick
}: {
  intl: any;
  menus?: IMenu[];
  onMenuClick?: (menu: IMenu) => void;
}) => {
  const classes = useClasses();
  const router = useRouter();
  return (
    <ul className={classes.menus}>
      {menus.map((menu, idx) => {
        const isActive = router.asPath === menu?.value;
        return (
          <li key={idx}>
            <a
              className={clsx(classes.title, { [classes.active]: isActive })}
              onClick={() => {
                onMenuClick?.(menu);
              }}
            >
              <Typography variant="subtitle1" color="inherit">
                {intl.formatMessage({ id: menu.key })}
              </Typography>
            </a>
          </li>
        );
      })}
    </ul>
  );
};
