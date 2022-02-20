import React from "react";
import {
  Checkbox,
  makeStyles,
  Typography,
  Divider,
  IconButton
} from "@material-ui/core";
import { CloseIcon } from "~/src/Components/SvgIcon";
import { Counter } from "~/src/Components/Counter";
import { useIntl } from "react-intl";
import clsx from "clsx";
const useClasses = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box"
  },
  header_root: {
    display: "grid",
    gridTemplateColumns: "3fr 2fr 2fr 2fr 2fr 1fr",
    "& > $header_item": {},
    "& > $divider": {
      gridColumn: "span 12",
      marginBottom: theme.spacing(2)
    },
    "& > $cell": {
      padding: `0 ${theme.spacing(2)}px`
    }
  },
  product_root: {
    display: "grid",
    gridTemplateColumns: "3fr 2fr 2fr 2fr 2fr 1fr",
    padding: `${theme.spacing(2)}px 0`
  },
  detail: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    "& $thumbnail": {
      width: 60,
      height: 60,
      marginRight: theme.spacing(1)
    },
    "& $content": {
      display: "flex",
      flexDirection: "column",
      "& $title": {},
      "& $specs": {}
    }
  },
  thumbnail: {},
  content: {},
  title: {},
  specs: {},
  cell: {},
  divider: {},
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));
export const PCProduct = ({
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
          <Divider className={classes.divider} />
        </React.Fragment>
      )}
      {/* HEADER END*/}
      <div className={classes.product_root}>
        <div>
          <div className={classes.detail}>
            <Checkbox
              color="primary"
              checked={checked}
              onChange={onCheckChanged}
            />
            <img src={image} className={classes.thumbnail} />
            <div className={classes.content}>
              <Typography variant="subtitle2" className={classes.title}>
                {title}
              </Typography>
              <div className={classes.specs}>
                {specs.map((item, idx) => (
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    key={idx}
                  >{`${item.spec}:${item.value}`}</Typography>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={clsx(classes.center)}>
          <Typography>{subtotal}</Typography>
        </div>
        <div className={clsx(classes.center)}>
          <Typography>{discount}</Typography>
        </div>
        <div className={clsx(classes.center)}>
          <Counter value={qty} onChange={onQtyChanged} />
        </div>
        <div className={clsx(classes.center)}>
          <Typography>{total}</Typography>
        </div>
        <div className={clsx(classes.center)}>
          <IconButton>
            <CloseIcon onClick={onDeleteClick} />
          </IconButton>
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
        })} ${intl.formatMessage({ id: "display_product_info" })}`}
      </div>
      <div className={clsx(classes.center)}>{`${intl.formatMessage({
        id: "display_unit_price"
      })}`}</div>
      <div className={clsx(classes.center)}>{`${intl.formatMessage({
        id: "display_discount"
      })}`}</div>
      <div className={clsx(classes.center)}>{`${intl.formatMessage({
        id: "display_quantity"
      })}`}</div>
      <div className={clsx(classes.center)}>{`${intl.formatMessage({
        id: "display_subtotal"
      })}`}</div>
      <div></div>
    </div>
  );
};
