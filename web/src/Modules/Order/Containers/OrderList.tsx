import React from "react";
import { useRouter } from "next/router";
import makeStyles from "@material-ui/core/styles/makeStyles";

import { ListFooter } from "~/src/Components/List";

import { useMyOrders } from "../Hooks/useMyOrders";
import { OrderListItem, OrderListEmptyView } from "../Components";

interface OrderListProps {}
export const OrderList = ({}: OrderListProps) => {
  const router = useRouter();
  const classes = useClasses();
  const {
    myOrders: data,
    myOrdersLoading: loading,
    myOrdersIsEnd: isEnd,
    myOrdersFetchMore: fetchMore,
    myOrdersTotalNumber: total
  } = useMyOrders({
    variables: {
      options: { sort: { date: -1 } }
    },
    fetchPolicy: "network-only"
  });

  const onViewDetailClick = (order: IOrder) => {
    router.push("/orders/" + order?._id);
  };

  const empty = !loading && isEnd && data?.length === 0;

  return (
    <div className={classes.root}>
      {empty ? (
        <OrderListEmptyView />
      ) : (
        <>
          {data?.map((order: IOrder) => {
            return (
              <OrderListItem
                key={order?._id}
                order={order}
                onViewDetailClick={onViewDetailClick}
              />
            );
          })}
          <ListFooter
            total={total}
            loadMore={fetchMore}
            isEnd={isEnd}
            loading={loading}
          />
        </>
      )}
    </div>
  );
};

const useClasses = makeStyles(() => ({
  root: {
    fontFamily: "PingFangHK-Regular, PingFangHK",
    paddingBottom: 54,
    borderTop: 0
  }
}));
export default OrderList;
