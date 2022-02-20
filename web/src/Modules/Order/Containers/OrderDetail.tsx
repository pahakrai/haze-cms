import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import {
  OrderDetailProductItem,
  OrderDetailHeader,
  OrderDetailCharge,
  OrderDetailInfo
} from "../Components";

interface OrderDetailProps {
  order: IOrder;
}
export const OrderDetail = ({ order }: OrderDetailProps) => {
  const isQuotation = !!order?.quotation;
  const classes = useClasses();

  return (
    <>
      <div className={classes.root}>
        <OrderDetailHeader order={order} />
        <div>
          {order?.product?.items?.map((item, index) => (
            <OrderDetailProductItem
              key={index}
              productItem={item}
              isQuotation={isQuotation}
            />
          ))}
        </div>
        <OrderDetailCharge order={order} />
      </div>
      <OrderDetailInfo order={order} />
    </>
  );
};

const useClasses = makeStyles(() => ({
  root: {
    fontFamily: "PingFangHK-Regular, PingFangHK",
    border: "1px solid #dee2e6"
  }
}));

export default OrderDetail;
