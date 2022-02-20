import React, { ReactNode } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";

const useClasses = makeStyles((theme) => ({
  title: {
    fontSize: 24,
    fontWeight: 500,
    color: theme.palette.text.primary,
    lineHeight: "33px",
    marginBottom: 16
  }
}));
export const HeaderTitle = ({
  title,
  className
}: {
  title?: ReactNode;
  className?: string;
}) => {
  const classes = useClasses();
  return <div className={clsx(classes.title, className)}>{title}</div>;
};
export default HeaderTitle;
