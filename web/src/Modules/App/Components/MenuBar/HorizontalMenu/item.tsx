import React from "react";
import clsx from "clsx";
import { makeStyles, Typography } from "@material-ui/core";

const useClasses = makeStyles((theme) => ({
  root: {
    display: "inline-block",
    padding: "10px 0px",
    margin: "0px 18px",
    fontFamily: "Adobe Heiti Std",
    fontSize: "16px",
    fontWeight: 400,
    textDecoration: "none",
    cursor: "pointer",
    whiteSpace: "nowrap",
    "&$active": {
      color: theme.palette.primary.main,
      paddingBottom: 5,
      borderBottomStyle: "solid",
      borderBottomWidth: 3
    }
  },
  active: {}
}));

interface ItemProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  > {
  title?: string;
  url?: string;
  active?: boolean;
  indicatorRef?: React.RefObject<HTMLDivElement>;
}
export const Item = ({
  url,
  active = false,
  children,
  indicatorRef
}: ItemProps) => {
  const itemRef = React.createRef<HTMLAnchorElement>();
  const classes = useClasses();
  return (
    <li>
      <a
        ref={itemRef}
        href={url}
        className={clsx(classes.root, { [classes.active]: active })}
      >
        {children}
      </a>
    </li>
  );
};

export default Item;
