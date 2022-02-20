import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Container,
  Hidden,
  IconButton,
  Toolbar,
  Badge
} from "@material-ui/core";
import clsx from "clsx";
import useMeasure from "react-use-measure";
import mergeRefs from "react-merge-refs";
import getConfig from "next/config";

import {
  ProfileIcon,
  ShoppingCartIcon,
  MenuIcon,
  Menu2Icon,
  HeartIcon,
  NavigateNextIcon,
  NavigateBeforeIcon
} from "~/src/Components/SvgIcon";
import { useShoppingCart } from "../../ShoppingCart/Hooks/useShoppingCart";
import { useWorkspace } from "../../Workspace/Hooks/useWorkspace";
import NavbarSearch from "./NavbarSearch";
import CategoryMenu from "./CategoryMenu/index";
import { VerticalMenu, HorizontalMenu } from "./MenuBar";
import { LanguageDropDown } from "./LanguageDropdown";
import RichShoppingCartIcon from "./RichShoppingCartIcon";

const { publicRuntimeConfig: Config } = getConfig();

const useClasses = makeStyles((theme) => ({
  root: {},
  toolbar: {
    height: 72,
    transition: "all 0.3s",
    "& a": {
      color: theme.palette.text.primary,
      "&:hover": {
        color: theme.palette.primary.main
      }
    }
  },
  menu: {},
  brand: {
    cursor: "pointer",
    "& img": {
      height: 32
    }
  },
  grow: {
    flexGrow: 1
  },
  top_menus: {
    display: "flex",
    justifyContent: "center"
  },
  gone: {},
  disabled: {
    color: "#E6E6E6"
  },
  [theme.breakpoints.up("md")]: {
    root: {
      boxShadow: "none"
    },
    toolbar: {
      height: 98
    },
    menu: {
      display: "none"
    },
    brand: {
      "& img": {
        height: 52
      }
    }
  },
  [theme.breakpoints.down(390)]: {
    brand: {
      display: "none",
      "& img": {
        height: 52
      }
    }
  }
}));
export interface NavbarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  onMenuClick?: () => void;
  onRightMenuClick?: () => void;
  authed?: boolean;
  enableSearch?: boolean;
}
export const Navbar = ({
  onMenuClick,
  onRightMenuClick,
  authed = false,
  enableSearch = false
}: NavbarProps) => {
  const classes = useClasses();
  const { workspace } = useWorkspace();
  const intl = useIntl();
  const router = useRouter();
  const { qty } = useShoppingCart();
  const handleSearch = (q: string) => {
    const path = {
      origin: `/products?q=${q}&&title=${intl.formatMessage({
        id: "display_search"
      })}`,
      as: `/products?q=${q}`
    };
    router.push(path.origin, path.as);
  };

  const [ref, bounds] = useMeasure();
  const menusRef = React.createRef<HTMLUListElement>();
  const [leftDisabled, setLeftDisabled] = React.useState(false);
  const [rightDisabled, setRightDisabled] = React.useState(false);
  const [gone, setGone] = React.useState(false);
  React.useEffect(() => {
    const _handleScroll = (event: Event) => {
      const element = event.target as Element;
      const scrollLeft = element.scrollLeft;
      const scrollLimit = element.scrollWidth - element.clientWidth;
      if (scrollLeft === scrollLimit) {
        setRightDisabled(true);
      } else {
        setRightDisabled(false);
      }
      if (scrollLeft == 0) {
        setLeftDisabled(true);
      } else {
        setLeftDisabled(false);
      }
    };
    menusRef.current?.addEventListener("scroll", _handleScroll);
    return () => {
      menusRef.current?.removeEventListener("scroll", _handleScroll);
    };
  }, [menusRef.current]);
  React.useEffect(() => {
    if (menusRef.current) {
      const scrollLeft = menusRef.current.scrollLeft;
      const scrollLimit =
        menusRef.current.scrollWidth - menusRef.current.clientWidth;
      if (scrollLimit === 0) {
        setGone(true);
      } else {
        setGone(false);
      }
      if (scrollLeft === scrollLimit) {
        setRightDisabled(true);
      } else {
        setRightDisabled(false);
      }
      if (scrollLeft == 0) {
        setLeftDisabled(true);
      } else {
        setLeftDisabled(false);
      }
    }
  }, [bounds]);
  return (
    <AppBar position="sticky" color="inherit" className={classes.root}>
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          {authed && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              className={classes.menu}
              onClick={onMenuClick}
            >
              <Menu2Icon />
            </IconButton>
          )}
          <Link href="/" passHref>
            <div className={classes.brand}>
              <img src={workspace?.setting?.headerLogo?.uri} />
            </div>
          </Link>

          <Hidden smDown>
            <div className={classes.grow}></div>
            <VerticalMenu />
          </Hidden>
          <div style={{ flex: 1 }} />
          {/* <Hidden mdUp>
            <NavigateBeforeIcon
              className={clsx(classes.icon, {
                [classes.disabled]: leftDisabled,
                [classes.gone]: gone
              })}
              onClick={() => {
                menusRef.current?.scrollTo({
                  left: 0
                });
              }}
            ></NavigateBeforeIcon>
            <HorizontalMenu ref={mergeRefs([menusRef, ref])} />
            <NavigateNextIcon
              className={clsx(classes.icon, {
                [classes.disabled]: rightDisabled,
                [classes.gone]: gone
              })}
              onClick={() => {
                menusRef.current?.scrollTo({
                  left: menusRef.current.scrollWidth
                });
              }}
            ></NavigateNextIcon>
          </Hidden> */}
          {enableSearch && (
            <a>
              <NavbarSearch onSearch={handleSearch} />
            </a>
          )}
          <Hidden smDown>
            <Link href="/user/product-watch" passHref>
              <a>
                <IconButton color="inherit">
                  <HeartIcon />
                </IconButton>
              </a>
            </Link>
          </Hidden>
          {workspace?.preferences?.product?.isEnableCart === true && (
            <React.Fragment>
              <Hidden smDown>
                <RichShoppingCartIcon />
              </Hidden>
              <Hidden mdUp>
                <Link href="/cart" passHref>
                  <a>
                    <IconButton color="inherit">
                      <Badge badgeContent={qty} color="secondary">
                        <ShoppingCartIcon />
                      </Badge>
                    </IconButton>
                  </a>
                </Link>
              </Hidden>
            </React.Fragment>
          )}

          <Hidden smDown>
            <Link href="/user/user-profile" passHref>
              <a>
                <IconButton color="inherit">
                  <ProfileIcon />
                </IconButton>
              </a>
            </Link>
          </Hidden>
          <Hidden mdUp>
            <a>
              <IconButton color="inherit" onClick={onRightMenuClick}>
                <MenuIcon />
              </IconButton>
            </a>
          </Hidden>
          <Hidden smDown>
            <LanguageDropDown />
          </Hidden>
        </Toolbar>
      </Container>
      <Hidden smDown>
        <Container maxWidth="lg" className={classes.top_menus}>
          <CategoryMenu />
        </Container>
      </Hidden>
    </AppBar>
  );
};
export default Navbar;
