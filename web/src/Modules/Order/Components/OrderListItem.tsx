import React from "react";
import moment from "moment";
import clsx from "clsx";
import { FormattedMessage } from "react-intl";
import * as Common from "@golpasal/common";
import makeStyles from "@material-ui/core/styles/makeStyles";

import { useLocale } from "~/lib/intl";
import { useGetCheckOutUrl } from "~/src/Modules/Checkout/Hooks/useGetCheckOutUrl";

import OrderDetailProductItem from "./OrderDetailProductItem";

const { PaymentStatus } = Common.default.status;

interface OrderListItemProps {
  order?: IOrder;
  onViewDetailClick?(order?: IOrder): any;
}
export const OrderListItem = ({
  order,
  onViewDetailClick
}: OrderListItemProps) => {
  const { locale } = useLocale();
  const classes = useClasses();
  const paid = order?.payment?.status !== PaymentStatus.NOT_PAID;
  const { url: checkoutUrl } = useGetCheckOutUrl({
    orderId: order?._id,
    skip: !order?._id || paid
  });
  const isQuotation = !!order?.quotation;
  const orderNo = order?.orderNo || "";
  const date = order?.date
    ? moment(order?.date).format("YYYY-MM-DD HH:mm")
    : "";
  const currency = order?.charge?.currency || "";
  const amount = Common.helpers.currencyFormat(
    order?.charge?.totalAmount || 0,
    currency
  );
  let paymentStatus: any =
    order?.payment?.status !== undefined
      ? Common.helpers.getConstantByValue(
          "status",
          "PaymentStatus",
          order?.payment?.status,
          locale
        )
      : { text: "" };
  paymentStatus = paymentStatus?.text;

  return (
    <div className={classes.item} onClick={() => onViewDetailClick(order)}>
      <div className={classes.header}>
        <div className={classes.header_left}>
          <div className={classes.header_text}>
            <FormattedMessage id="display_order_no" />：{orderNo}
          </div>
          <div className={classes.header_text}>
            <FormattedMessage id="display_order_date" />：{date}
          </div>
          <div className={classes.header_text}>
            <FormattedMessage id="display_order_amount" />：{amount}
          </div>
        </div>
        {paid ? (
          <span className={clsx(classes.header_text, "status")}>
            {paymentStatus}
          </span>
        ) : (
          <a
            href={checkoutUrl || "#"}
            target="blank"
            className={clsx(classes.header_text, "status")}
          >
            {paymentStatus}
          </a>
        )}
      </div>
      {order?.product?.items?.map((item, index) => (
        <OrderDetailProductItem
          key={index}
          productItem={item}
          isQuotation={isQuotation}
        />
      ))}
    </div>
  );
};

const useClasses = makeStyles((theme) => ({
  item: {
    cursor: "pointer",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    marginBottom: 32,
    borderBottom: 0,
    "&:last-child": {
      marginBottom: 0
    }
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
  },
  header_left: {
    display: "flex",
    flexDirection: "row"
  },
  header_text: {
    fontSize: 14,
    fontWeight: 400,
    color: "#333333",
    lineHeight: "20px",
    marginRight: 45,
    "&:last-child": {
      marginRight: 0
    },
    "&.status": {
      color: theme.palette.primary.main,
      marginBottom: 0
    }
  },
  [theme.breakpoints.down("sm")]: {
    header: {
      flexDirection: "column",
      justifyContent: "flex-start"
    },
    header_left: { flexDirection: "column" },
    header_text: { marginBottom: 12 }
  }
}));

export default OrderListItem;
