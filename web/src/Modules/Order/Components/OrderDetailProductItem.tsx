import React from "react";
import * as Common from "@golpasal/common";
import { FormattedMessage } from "react-intl";
import clsx from "clsx";
import Truncate from "react-text-truncate";
import makeStyles from "@material-ui/core/styles/makeStyles";

interface OrderDetailProductItemProps {
  productItem?: IOrderProductItem;
  isQuotation?: boolean;
}
export const OrderDetailProductItem = ({
  productItem,
  isQuotation
}: OrderDetailProductItemProps) => {
  const classes = useClasses();
  const { product, productSKU, currency, amount, qty } = productItem;
  const name = product?.name || "";
  const image = productSKU?.image?.uri || product?.images?.[0]?.uri;
  const _amount = Common.helpers.currencyFormat(
    (amount || 0) * qty,
    currency || undefined
  );
  // const unitAmount = Common.helpers.currencyFormat(
  //   productItem.amount,
  //   currency || undefined
  // );
  const originalPrice = Common.helpers.currencyFormat(
    productSKU?.amount || 0,
    currency || undefined
  );
  const _discountAmount = Common.helpers.currencyFormat(
    amount || 0,
    currency || undefined
  );
  const isDiscount = isQuotation ? false : productSKU?.amount !== amount;
  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <div className="image" style={{ backgroundImage: `url(${image})` }} />
        <div className="info">
          <div className="name">
            <Truncate line={2} text={name}></Truncate>
          </div>
          {productSKU?.specs?.map((spec, index) => {
            return (
              <div className="spec" key={index}>
                {spec?.spec?.name}：
                {spec?.spec?.values?.find((v) => v._id === spec?.value)?.name}
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes.right}>
        <div className={classes.right_space}>
          <div className={classes.qty}>* {qty}</div>
        </div>
        <div className={classes.right_content}>
          <div className={classes.amount}>{_discountAmount}</div>
          {isDiscount && <div className="discount">{originalPrice}</div>}
          <div className={clsx(classes.qty_mobiile)}>* {qty}</div>
          <div className="subtotal">
            <FormattedMessage id="display_subtotal" />：{_amount}
          </div>
        </div>
      </div>
    </div>
  );
};

const useClasses = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px solid  #dee2e6",
    padding: 16
  },
  left: {
    display: "flex",
    flexDirection: "row",
    "& .image": {
      height: 80,
      width: 80,
      marginRight: 12,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover"
    },
    "& .info": {
      "& .name": {
        fontSize: 14,
        fontWeight: 400,
        color: "#333333",
        lineHeight: "20px",
        width: 186
      },
      "& .spec": {
        marginTop: 4,
        fontSize: 13,
        fontWeight: 400,
        color: "#666666",
        lineHeight: "18px"
      }
    }
  },
  right: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "right",
    fontSize: 14,
    fontWeight: 500,
    color: "#333333",
    lineHeight: "20px"
  },
  right_space: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  right_content: {
    minWidth: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    "& .subtotal": {
      marginTop: 4
    },
    "& .discount": {
      marginTop: 4,
      fontWeight: 400,
      color: "#666666",
      lineHeight: "16px",
      textDecoration: "line-through",
      fontSize: 12
    }
  },
  qty: {
    position: "relative"
  },
  qty_mobiile: { right: 0, display: "block" },
  [theme.breakpoints.down("sm")]: {
    root: {
      flexDirection: "column",
      justifyContent: "flex-start"
    },
    right: {
      justifyContent: "flex-start"
    },
    right_space: { width: 80, marginRight: 12 },
    right_content: {
      minWidth: 186,
      textAlign: "left"
    }
  } as any,
  [theme.breakpoints.down("md")]: {
    right_content: {
      minWidth: "unset"
    },
    qty: {
      display: "none"
    }
  } as any,
  [theme.breakpoints.up("lg")]: {
    qty_mobiile: {
      display: "none"
    }
  } as any
}));

export default OrderDetailProductItem;
