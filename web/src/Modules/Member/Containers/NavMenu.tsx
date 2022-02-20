import React from "react";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  makeStyles
} from "@material-ui/core";

import {
  PasswordIcon,
  ProfileIcon,
  LogoutIcon,
  HeartIcon,
  OrderIcon,
  LocationIcon
} from "~/src/Components/SvgIcon";
import { NavMenuList } from "~/src/Modules/User/Components/ProfileLayout/NavMenu";
import { useLogout } from "../../Auth/Hooks/useLogout";

const useClasses = makeStyles(() => ({
  dialog_paper: {
    minWidth: 240
  }
}));
export interface NavMenuProps {
  style?: object;
}
export const NavMenu = ({ style = {}, ...rest }: NavMenuProps) => {
  const classes = useClasses();
  const router = useRouter();
  const intl = useIntl();
  const [logoutModalVisible, setLogoutModalVisible] = React.useState(false);
  const { logout } = useLogout({
    onCompleted: () => {
      router.replace("/");
    }
  });
  const activeUrl = router.pathname;
  const menus = useMenus(() => {
    setLogoutModalVisible(true);
  }).map((item) => ({ ...item, active: item.href === activeUrl }));
  return (
    <React.Fragment>
      <NavMenuList items={menus} />
      <Dialog
        open={logoutModalVisible}
        classes={{ paper: classes.dialog_paper }}
        onClose={() => {
          setLogoutModalVisible(!logoutModalVisible);
        }}
      >
        <DialogTitle>
          {intl.formatMessage({ id: "display_logout" })}
        </DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => setLogoutModalVisible(false)}
          >
            {intl.formatMessage({ id: "display_cancel" })}
          </Button>
          <Button
            variant="text"
            color="default"
            disableElevation
            onClick={() => {
              logout();
              setLogoutModalVisible(false);
            }}
          >
            {intl.formatMessage({ id: "display_confirm" })}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export const useMenus = (onLogoutClick?: () => void) => {
  const intl = useIntl();
  return [
    {
      title: intl.formatMessage({ id: "display_my_profile" }),
      href: "/user/user-profile",
      icon: <ProfileIcon />
    },
    {
      title: intl.formatMessage({ id: "display_watch_list" }),
      href: "/user/product-watch",
      icon: <HeartIcon />
    },
    {
      title: intl.formatMessage({ id: "display_my_orders" }),
      href: "/orders",
      icon: <OrderIcon />
    },
    {
      title: intl.formatMessage({ id: "display_my_addresses" }),
      href: "/user/address",
      icon: <LocationIcon />
    },
    {
      title: intl.formatMessage({ id: "display_change_password" }),
      href: "/auth/change-password",
      icon: <PasswordIcon />
    },
    {
      title: intl.formatMessage({
        id: "display_logout",
        defaultMessage: "display_logout"
      }),
      onClick: onLogoutClick,
      icon: <LogoutIcon />
    }
  ];
};
export default NavMenu;
