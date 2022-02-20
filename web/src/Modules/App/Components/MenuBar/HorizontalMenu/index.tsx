import React from "react";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import clsx from "clsx";
import { MenusItem } from "../Constants";
import { makeStyles } from "@material-ui/core";

import Item from "./item";

const useClasses = makeStyles((theme) => ({
  root: {
    flex: 1,
    whiteSpace: "nowrap",
    scrollBehavior: "smooth",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    overflowX: "scroll",
    overflowY: "hidden",
    margin: 0,
    padding: "0px 20px",
    "scrollbar-width": "none",
    "&::-webkit-scrollbar": {
      display: "none"
    },
    "& li": {
      display: "inline-block"
    }
  },
  indicator: {},
  icon: {}
}));

interface HorizontalMenuProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {}
export const HorizontalMenu = React.forwardRef<
  HTMLUListElement,
  HorizontalMenuProps
>(function HorizontalMenu({ className, ...rest }: HorizontalMenuProps, ref) {
  const indicatorRef = React.createRef<HTMLDivElement>();
  const classes = useClasses();
  const intl = useIntl();
  const router = useRouter();
  return (
    <ul ref={ref} className={clsx(classes.root, className)} {...rest}>
      {MenusItem.map((menuItem, idx) => {
        const isActive = router.asPath === menuItem?.value;
        return (
          <Item
            key={idx}
            active={isActive}
            url={menuItem.value}
            indicatorRef={indicatorRef}
          >
            {intl.formatMessage({ id: menuItem?.key })}
          </Item>
        );
      })}
      <div className={classes.indicator} ref={indicatorRef}></div>
    </ul>
  );
});
export default HorizontalMenu;
