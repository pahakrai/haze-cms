import React from "react";
import * as Common from "@golpasal/common";
import { FormattedMessage } from "react-intl";
import makeStyles from "@material-ui/core/styles/makeStyles";

interface OrderDetailChargeProps {
  order?: IOrder;
}

export const OrderDetailCharge = ({ order }: OrderDetailChargeProps) => {
  const classes = useClasses();
  const currencyFormat = (amount) =>
    Common.helpers.currencyFormat(amount, order?.charge?.currency);
  const base = currencyFormat(order?.charge?.base || 0);
  const amount = currencyFormat(order?.charge?.totalAmount || 0);
  const prices = [];
  const coupon = order?.charge?.coupons?.[0];

  order?.services?.forEach((v) => {
    prices.push({
      label: v?.service?.name,
      amount: currencyFormat(v?.value || 0)
    });
  });
  order?.charge?.others?.forEach((v) => {
    prices.push({
      label: v.description,
      amount: currencyFormat(v?.amount || 0)
    });
  });

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.item}>
          <div>
            <FormattedMessage id="display_subtotal" />：
          </div>
          <div className="value">{base}</div>
        </div>
        {prices.map((v, i) => (
          <div className={classes.item} key={i}>
            <div>{v.label}：</div>
            <div className="value">{v.amount}</div>
          </div>
        ))}
        {coupon ? (
          <>
            <div>
              <FormattedMessage id="display_coupon" />
            </div>
            <div className={classes.item}>
              <div>{coupon.code}：</div>
              <div className="value">
                {coupon.amount > 0 ? "-" : ""}
                {currencyFormat(coupon.amount || 0)}
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        <div className={classes.item}>
          <div>
            <FormattedMessage id="display_order_amount" />：
          </div>
          <div className="value">{amount}</div>
        </div>
      </div>
    </div>
  );
};

const useClasses = makeStyles((theme) => ({
  root: {
    padding: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  content: {
    width: "100%",
    maxWidth: 435
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 11,
    fontSize: 14,
    fontWeight: 400,
    color: " #333333",
    lineHeight: "20px",
    "&:last-child": {
      marginBottom: 0
    },
    "& .value": {
      flex: 1,
      textAlign: "right"
    }
  },
  [theme.breakpoints.down("sm")]: {
    content: { maxWidth: 255 }
  } as any
}));

export default OrderDetailCharge;
