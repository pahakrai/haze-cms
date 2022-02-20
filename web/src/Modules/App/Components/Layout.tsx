import React, { useMemo } from "react";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import clsx from "clsx";
import Link from "next/link";
import concat from "lodash/concat";
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  Drawer,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Switch,
  Button,
  DialogActions,
  Divider
} from "@material-ui/core";
import { makeStyles, fade, createMuiTheme } from "@material-ui/core/styles";

import { HeartIcon, MenuIcon, ProfileIcon } from "~/src/Components/SvgIcon";
import { useLogout } from "../../Auth/Hooks/useLogout";
import { useMenus } from "../../Member/Containers/NavMenu";
import { useCurrentUser } from "../../Auth/Hooks/useCurrentUser";
import { useThemeSwitcher } from "../Hooks/useThemeSwitcher";
import Navbar from "./Navbar";
import { Footer } from "./Footer";
import CollapseMenu, { Menu } from "./CollapseMenu";
import { useCategories } from "../../Category/Hooks/useCategories";
import { MenusItem as HeaderMenusItem } from "./MenuBar/Constants";
import { LanguageDropDown } from "./LanguageDropdown";

const DEV_MODE = process.env.APP_ENV === "development";

interface LayoutProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  loading?: boolean;
  classes?: {
    root?: string;
    main?: string;
  };
}
const useClasses = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  main: {
    flex: "1 0 auto",
    padding: `${theme.spacing(2)}px 0`
  },
  footer: {
    flexShrink: 0,
    backgroundColor: "#333"
  },
  drawer_root: {
    width: 240
  },
  drawer_pager: {
    width: 240
  },
  floating: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  loading: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99999
  },
  theme_pattle_root: {},
  theme_pattle_circles: {
    display: "flex",
    flexDirection: "row"
  },
  logout: {
    minWidth: 320
  },
  [theme.breakpoints.up("md")]: {
    drawer_root: {
      display: "none"
    }
  }
}));

export const Layout = ({
  children,
  className,
  classes: _classes,
  loading,
  ...rest
}: LayoutProps) => {
  const classes = useClasses();
  const [leftDrawerOpen, setLeftDrawerOpen] = React.useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = React.useState(false);
  const [themeDrawer, setThemeDrawer] = React.useState(false);
  const { currentUser } = useCurrentUser();
  return (
    <div className={clsx(classes.root, className, _classes?.root)} {...rest}>
      <Navbar
        onMenuClick={() => setLeftDrawerOpen(true)}
        onRightMenuClick={() => setRightDrawerOpen(true)}
        authed={currentUser ? true : false}
      />
      <main className={clsx(classes.main, _classes?.main)}>{children}</main>
      <footer className={clsx(classes.footer)}>
        <Footer />
      </footer>
      {/* Drawer */}
      {currentUser && (
        <Drawer
          open={leftDrawerOpen}
          anchor="left"
          className={classes.drawer_root}
          classes={{ paper: classes.drawer_pager }}
          onClose={() => setLeftDrawerOpen(false)}
        >
          <LeftMenus />
        </Drawer>
      )}
      <Drawer
        open={rightDrawerOpen}
        anchor="right"
        className={classes.drawer_root}
        classes={{ paper: classes.drawer_pager }}
        onClose={() => setRightDrawerOpen(false)}
      >
        <RightMenus />
      </Drawer>
      {/* just display DEV mode */}
      {DEV_MODE && (
        <React.Fragment>
          <ThemeFloating onClick={() => setThemeDrawer(true)} />
          <Drawer
            open={themeDrawer}
            anchor="bottom"
            onClose={() => setThemeDrawer(false)}
          >
            <ThemePattle />
          </Drawer>
        </React.Fragment>
      )}
      {/* Loading */}
      {loading && (
        <div className={classes.loading}>
          <CircularProgress color="primary" />
        </div>
      )}
    </div>
  );
};
export const LeftMenus = () => {
  const router = useRouter();
  const intl = useIntl();
  const classes = useClasses();
  const [logoutModalVisible, setLogoutModalVisible] = React.useState(false);
  const activeUrl = router.pathname;
  const { logout } = useLogout({
    onCompleted: () => {
      router.replace("/");
    }
  });
  const menus = useMenus(() => setLogoutModalVisible(true));
  return (
    <React.Fragment>
      <List>
        {menus.map((menu, idx) => {
          return (
            <Link href={menu.href || "#"} passHref key={idx}>
              <a>
                <ListItem
                  selected={activeUrl === menu.href}
                  button
                  key={idx}
                  onClick={menu.onClick}
                >
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.title} />
                </ListItem>
              </a>
            </Link>
          );
        })}
      </List>
      <Dialog open={logoutModalVisible} classes={{ paper: classes.logout }}>
        <DialogTitle>
          {intl.formatMessage({ id: "display_logout" })}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => setLogoutModalVisible(false)}
            color="primary"
            variant="outlined"
          >
            {intl.formatMessage({ id: "display_cancel" })}
          </Button>
          <Button
            onClick={() => {
              logout();
              setLogoutModalVisible(false);
            }}
            color="default"
            variant="outlined"
            autoFocus
          >
            {intl.formatMessage({ id: "display_confirm" })}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export const RightMenus = () => {
  const intl = useIntl();
  const router = useRouter();
  const { categories } = useCategories({
    variables: { query: { isActive: true, parent: null } }
  });
  // default menus just
  let defaultMenus: Menu[] = [
    {
      title: intl.formatMessage({ id: "display_all_products" }),
      value: undefined
    }
  ];
  const prepareMenus = (categories: ICategory[]): Menu[] => {
    return (
      categories?.map<Menu>((category) => ({
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
    <React.Fragment>
      <List>
        <ListItem>
          <ListItemIcon>
            <Link href="/user/user-profile" passHref>
              <a>
                <IconButton edge="start">
                  <ProfileIcon />
                </IconButton>
              </a>
            </Link>
            <Link href="/user/product-watch" passHref>
              <a>
                <IconButton edge="start">
                  <HeartIcon></HeartIcon>
                </IconButton>
              </a>
            </Link>
          </ListItemIcon>
          <ListItemSecondaryAction>
            <LanguageDropDown />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <CollapseMenu
        disablePadding
        menus={useMemo(
          () =>
            HeaderMenusItem.map((v) => ({
              title: intl.formatMessage({ id: v.key }),
              value: v.value
            })),
          [intl.locale]
        )}
        renderItem={(menu) => <ListItemText primary={menu.title} />}
        onMenuClick={(menu) => {
          // bind href and jump to
          const href = menu.value;
          router.push(href);
        }}
      />
      <Divider />
      <ListSubheader>
        {intl.formatMessage({ id: "display_category" })}
      </ListSubheader>
      <CollapseMenu
        disablePadding
        menus={menus}
        renderItem={(menu) => <ListItemText primary={menu.title} />}
        onMenuClick={(menu) => {
          // bind href and jump to
          const href = menu.value
            ? {
                origin: `/products?category=${encodeURIComponent(
                  menu.value
                )}&title=${encodeURIComponent(menu.title)}`,
                as: `/products?category=${encodeURIComponent(menu.value)}`
              }
            : {
                origin: `/products?title=${encodeURIComponent(menu.title)}`,
                as: `/products`
              };
          router.push(href.origin, href.as);
        }}
      />
    </React.Fragment>
  );
};
export const ThemeFloating = ({ onClick }: { onClick?: () => void }) => {
  const classes = useClasses();
  return (
    <Fab className={classes.floating} onClick={onClick}>
      <MenuIcon />
    </Fab>
  );
};
export const ThemePattle = () => {
  const classes = useClasses();
  const { current, dark, themes, changeTheme } = useThemeSwitcher();
  return (
    <List>
      {themes.map((theme) => {
        const themeObj = createMuiTheme({ ...theme.theme });
        return (
          <ListItem
            alignItems="flex-start"
            onClick={() => {
              changeTheme(theme.name);
            }}
          >
            <ListItemAvatar>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: themeObj.palette.primary.main,
                  marginRight: 8
                }}
              ></div>
            </ListItemAvatar>
            <ListItemText>
              {theme.name}
              <div className={classes.theme_pattle_circles}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    backgroundColor: themeObj.palette.primary.main,
                    marginRight: 8
                  }}
                ></div>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    backgroundColor: themeObj.palette.secondary.main,
                    marginRight: 8
                  }}
                ></div>
              </div>
            </ListItemText>
            <ListItemSecondaryAction>
              <Switch
                disabled={theme.name !== current}
                checked={dark}
                onChange={() => {
                  changeTheme(theme.name, !dark);
                }}
              ></Switch>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};
export default Layout;
