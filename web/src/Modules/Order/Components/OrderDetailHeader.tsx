import React from "react";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import makeStyles from "@material-ui/core/styles/makeStyles";

interface OrderDetailHeaderProps {
  order?: IOrder;
}
export const OrderDetailHeader = ({ order }: OrderDetailHeaderProps) => {
  const classes = useClasses();
  const orderNo = order?.orderNo || "";
  const date = order?.date
    ? moment(order?.date).format("YYYY-MM-DD HH:mm:ss")
    : "";
  return (
    <div className={classes.header}>
      <div className={classes.item}>
        <FormattedMessage id="display_order_no" />：{orderNo}
      </div>
      <div className={classes.item}>
        <FormattedMessage id="display_order_date" />：{date}
      </div>
    </div>
  );
};

const useClasses = makeStyles((theme) => ({
  header: {
    display: "flex",
    flexDirection: "row",
    padding: 16,
    borderBottom: "1px solid  #dee2e6"
  },
  item: {
    fontSize: 14,
    fontWeight: 400,
    color: "#333333",
    lineHeight: "20px",
    marginRight: 96,
    "&:last-child": {
      marginRight: 0
    }
  },
  [theme.breakpoints.down("sm")]: {
    header: {
      flexDirection: "column"
    },
    item: {
      marginRight: 0
    }
  }
}));

export default OrderDetailHeader;
