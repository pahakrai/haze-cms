import React from "react";
import clsx from "clsx";
import {
  Checkbox,
  Divider,
  IconButton,
  makeStyles,
  Typography
} from "@material-ui/core";
import { CloseIcon } from "~/src/Components/SvgIcon";
import { Counter } from "~/src/Components/Counter";
import { useIntl } from "react-intl";

const useClasses = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  header_root: {
    padding: `0 ${theme.spacing(2)}px`
  },
  product_root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: theme.spacing(2)
  },
  product_left_panel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: theme.spacing(1),
    "& $thumbnail": {
      width: 60,
      height: 60
    }
  },
  product_content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    "& $title_root": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      "& $title": {
        flex: 1,
        display: "box",
        lineClamp: 2,
        overflow: "hidden",
        textOverflow: "ellipsis",
        boxOrient: "vertical"
      }
    },
    "& $specs": {
      marginBottom: theme.spacing(2)
    },
    "& $description": {
      display: "flex",
      flexDirection: "row",
      "& $counter": {
        maxWidth: 320
      },
      "& $prices": {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(2)
      }
    },
    "& $total": {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end"
    }
  },
  thumbnail: {},
  title_root: {},
  title: {},
  close: {},
  specs: {},
  description: {},
  counter: {},
  prices: {},
  subtotal: {},
  discount: {},
  footer: {},
  total: {}
}));
export const MobileProduct = ({
  checked,
  image,
  title,
  specs,
  qty,
  subtotal,
  discount,
  total,
  onCheckChanged,
  onQtyChanged,
  onDeleteClick,
  headerProps
}: {
  checked?: boolean;
  image?: string;
  title?: string;
  specs?: { spec: string; value: string }[];
  qty?: number;
  subtotal?: string;
  discount?: string;
  total?: string;
  onCheckChanged?: () => void;
  onQtyChanged?: (count: number) => void;
  onDeleteClick?: () => void;
  headerProps?: HeaderProps;
}) => {
  const classes = useClasses();
  return (
    <div className={classes.root}>
      {/* HEADER START*/}
      {headerProps && (
        <React.Fragment>
          <Header {...headerProps} />
          <Divider />
        </React.Fragment>
      )}
      {/* HEADER END*/}
      <div className={classes.product_root}>
        <div className={classes.product_left_panel}>
          <Checkbox
            color="primary"
            checked={checked}
            onChange={onCheckChanged}
          />
          <img src={image} className={clsx(classes.thumbnail)} />
        </div>
        <div className={classes.product_content}>
          <div className={clsx(classes.title_root)}>
            <Typography variant="subtitle1" className={clsx(classes.title)}>
              {title}
            </Typography>
            <IconButton onClick={onDeleteClick}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className={clsx(classes.specs)}>
            {specs.map((item, idx) => (
              <Typography
                variant="caption"
                color="textSecondary"
                key={idx}
              >{`${item.spec}:${item.value}`}</Typography>
            ))}
          </div>
          <div className={classes.description}>
            <div className={classes.counter}>
              <Counter value={qty} onChange={onQtyChanged} />
            </div>
            <div className={classes.prices}>
              <Typography variant="subtitle2">{subtotal}</Typography>
              <Typography variant="caption">{discount}</Typography>
            </div>
          </div>
          <div className={classes.total}>
            <Typography variant="subtitle2">{total}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
interface HeaderProps {
  allSelected?: boolean;
  onAllSelectChanged?: () => void;
}

const Header = ({ allSelected, onAllSelectChanged }: HeaderProps) => {
  const intl = useIntl();
  const classes = useClasses();
  return (
    <div className={classes.header_root}>
      <div>
        <Checkbox
          color="primary"
          checked={allSelected}
          onChange={onAllSelectChanged}
        />
        {`${intl.formatMessage({
          id: "display_select_all"
        })}`}
      </div>
    </div>
  );
};
