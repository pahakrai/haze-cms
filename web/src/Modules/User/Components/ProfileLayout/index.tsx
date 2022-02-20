import React from "react";
import clsx from "clsx";
import { Grid, Hidden, GridProps } from "@material-ui/core";

import NavMenu from "~/src/Modules/Member/Containers/NavMenu";

export * from "./NavMenu";
export * from "./HeaderTitle";

export interface ProfileLayoutProps extends GridProps {
  menu?: React.ReactElement;
  classes?: {
    root?: string;
    menu?: string;
    content?: string;
  };
}
export const ProfileLayout = ({
  menu = <NavMenu />, // default member nav menu
  children,
  className,
  classes: _classes,
  ...rest
}: ProfileLayoutProps) => {
  return (
    <Grid
      container
      className={clsx(_classes?.root, className)}
      spacing={2}
      {...rest}
    >
      <Hidden smDown>
        <Grid item md={3} className={clsx(_classes?.menu)}>
          {menu}
        </Grid>
      </Hidden>

      <Grid item xs={12} md={9} className={clsx(_classes?.content)}>
        {children}
      </Grid>
    </Grid>
  );
};
