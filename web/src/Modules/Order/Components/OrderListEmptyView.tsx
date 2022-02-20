import React from "react";
import { useIntl } from "react-intl";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

export const OrderListEmptyView = ({}) => {
  const intl = useIntl();
  const classes = useClasses();

  return (
    <div className={classes.empty}>
      <div className={classes.title}>
        {intl.formatMessage({ id: "display_order_empty_title" })}
      </div>
      <div className={classes.content}>
        {intl.formatMessage({ id: "display_order_empty_content" })}
      </div>
      <Link href="/">
        <Button variant="contained" color="primary">
          {intl.formatMessage({ id: "display_continue_shopping" })}
        </Button>
      </Link>
    </div>
  );
};

const useClasses = makeStyles(() => ({
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: " 65px",
    paddingBottom: " 65px",
    textAlign: "center",
    border: "1px solid rgba(0, 0, 0, 0.12)"
  },
  title: {
    fontSize: 30,
    fontWeight: 600,
    color: "#333333",
    lineHeight: "42px",
    marginBottom: 16
  },
  content: {
    fontSize: 14,
    fontWeight: 400,
    color: "#666666",
    lineHeight: "20px",
    marginBottom: 32
  }
}));

export default OrderListEmptyView;
