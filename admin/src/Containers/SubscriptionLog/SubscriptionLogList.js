import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '../../Components/Common/Loading';
import SubscriptionLogList from '../../Components/App/SubscriptionLog/SubscriptionLogList';
import { SubscriptionLogActions } from '../../Redux/SubscriptionLog/actions';
import { getSubscriptionLogs } from '../../Redux/selectors';
import { withRouter } from 'react-router-dom';

class SubscriptionLogListContainer extends React.PureComponent {
  componentDidMount() {
    const { subscriptionLogs } = this.props;
    if (!subscriptionLogs.length) {
      this.fetchSubscriptionLogs({ refresh: true });
    }
  }

  _onLoadMore = () => {
    const { fetchSubscriptionLogs } = this.props;
    fetchSubscriptionLogs({ append: true });
  };

  fetchSubscriptionLogs(options = {}) {
    const { fetchSubscriptionLogs, query } = this.props;
    fetchSubscriptionLogs({
      ...options,
      query: { ...query, ...(options.query || {}), populates: [] }
    });
  }

  _onPageChange = (page, limit) => {
    this.fetchSubscriptionLogs({
      query: { page: Number(page), limit: Number(limit) }
    });
  };

  render() {
    const isLoading = false;
    const {
      subscriptionLogs,
      locale,
      intl,
      pagination,
      renderFooter,
      header,
      gutter
    } = this.props;

    return isLoading ? (
      <Loading />
    ) : (
      <SubscriptionLogList
        locale={locale}
        intl={intl}
        onLoadMore={this._onLoadMore}
        subscriptionLogs={subscriptionLogs}
        renderFooter={renderFooter}
        gutter={gutter}
        header={header}
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          showQuickJumper: true,
          total: pagination.total,
          onChange: this._onPageChange
        }}
      />
    );
  }
}
const mapStateToProps = state => ({
  locale: state.intl.locale,
  subscriptionLogs: getSubscriptionLogs(state),
  pagination: state.pagination.subscriptionLogs
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchSubscriptionLogs: SubscriptionLogActions.getSubscriptionLogs
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SubscriptionLogListContainer)
);
