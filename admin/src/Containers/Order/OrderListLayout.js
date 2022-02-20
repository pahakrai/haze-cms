import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Common from '@golpasal/common';

import Layout1 from '../../Layouts/Layout1';
import { getCurrentWorkspace } from '../../Redux/Account/selectors';
import Breadcrumb, { getMatchPathId } from '../../Layouts/Layout1/Breadcrumb';

const { OrderType } = Common.type;
const OrderListLayout = ({
  order,
  history,
  location,
  match,
  staticContext,
  currentWorkspace,
  sitemap,
  ...props
}) => {
  const formatBreadcrumbData = useCallback(
    data => {
      if (data.url === '/orders') {
        const path = match?.path;

        let workspaceType = currentWorkspace?.type;
        if (match?.isExact && /orders\/[a-zA-Z]+$/.test(path)) {
          const execs = /orders\/([a-zA-Z-]+)$/.exec(path);
          if (execs?.[1]) {
            workspaceType = execs?.[1];
          }
        }
        if (
          workspaceType &&
          Object.values(OrderType).includes(workspaceType) &&
          workspaceType !== currentWorkspace?.type
        ) {
          return {
            url: `/orders/${workspaceType}`,
            name: getMatchPathId(sitemap, data.url)
          };
        }
      }
      return data;
    },
    [currentWorkspace, match, sitemap]
  );

  return (
    <Layout1
      sitemap={sitemap}
      breadcrumb={
        <Breadcrumb
          sitemap={sitemap}
          formatBreadcrumbData={formatBreadcrumbData}
        />
      }
      {...props}
    />
  );
};

const mapStateToProps = (state, { match }) => ({
  currentWorkspace: getCurrentWorkspace(state)
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderListLayout)
);
