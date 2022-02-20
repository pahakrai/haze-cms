import React, { useCallback, useMemo } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Common from '@golpasal/common';

import Layout1 from '../../Layouts/Layout1';
import { getCurrentWorkspace } from '../../Redux/Account/selectors';
import Breadcrumb, {
  breadcrumbItem,
  getMatchPathId
} from '../../Layouts/Layout1/Breadcrumb';

import { getOrderById } from '../../Redux/selectors';

const { OrderType } = Common.type;
const OrderFormLayout = ({
  order,
  history,
  location,
  match,
  staticContext,
  currentWorkspace,
  sitemap,
  ...props
}) => {
  const locationSearch = location?.search;

  const formatBreadcrumbData = useCallback(
    data => {
      if (data.url === '/orders') {
        let orderType = queryString.parse(locationSearch)?.orderType;
        if (order && order.orderType) {
          orderType = order.orderType;
        }
        if (
          orderType &&
          Object.values(OrderType).includes(orderType) &&
          orderType !== currentWorkspace?.type
        ) {
          return {
            url: `/orders/${orderType}`,
            name: getMatchPathId(sitemap, data.url)
          };
        }
      }
      return data;
    },
    [locationSearch, currentWorkspace, order, sitemap]
  );
  return (
    <Layout1
      sitemap={sitemap}
      breadcrumb={
        <Breadcrumb
          sitemap={sitemap}
          formatBreadcrumbData={formatBreadcrumbData}
          appendBreadcrumbItems={useMemo(
            () =>
              order && order.orderNo
                ? [
                    breadcrumbItem({
                      url: '/orders/' + order._id,
                      name: 'nav.orderNo',
                      intlMessagesProps: { values: { no: order.orderNo } }
                    })
                  ]
                : [],
            [order]
          )}
        />
      }
      {...props}
    />
  );
};

const mapStateToProps = (state, { match }) => ({
  currentWorkspace: getCurrentWorkspace(state),
  order: getOrderById(state, match.params.orderId)
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderFormLayout)
);
