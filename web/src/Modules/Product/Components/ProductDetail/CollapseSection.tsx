import React from "react";
import clsx from "clsx";
import { Collapse, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { PlusIcon } from "~/src/Components/SvgIcon/Icons/PlusIcon";
import { ReduceIcon } from "~/src/Components/SvgIcon/Icons/ReduceIcon";

const useClasses = makeStyles((theme) => ({
  root: {
    "& $header": {
      display: "flex",
      flelDirection: "row",
      alignItems: "center",
      minHeight: 48,
      cursor: "pointer",
      "& $title": {
        flex: 1
      },
      "& $icon": {
        backgroundColor: theme.palette.background.paper,
        borderRadius: "50%",
        color: theme.palette.primary.main,
        display: "inline-block",
        "&$hide": {
          display: "none"
        }
      }
    }
  },
  header: {},
  title: {},
  icon: {},
  hide: {}
}));

interface CollapseSectionProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title: string;
  children: React.ReactElement;
  open?: boolean;
}

export const CollapseSection = ({
  title,
  children,
  open = false,
  className,
  ...rest
}: CollapseSectionProps) => {
  const classes = useClasses();
  const [_open, setOpen] = React.useState(open);
  return (
    <div className={clsx(className, classes.root)} {...rest}>
      {/* header */}
      <div className={clsx(classes.header)} onClick={() => setOpen(!_open)}>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <PlusIcon
          className={clsx(classes.icon, { [classes.hide]: _open })}
          size={20}
        />
        <ReduceIcon
          className={clsx(classes.icon, { [classes.hide]: !_open })}
          size={20}
        />
      </div>
      {/* content */}
      <Collapse in={_open}>{children}</Collapse>
    </div>
  );
};
