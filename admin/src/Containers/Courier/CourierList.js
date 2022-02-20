import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import Loading from '../../Components/Common/Loading';
import CourierList from '../../Components/App/Courier/CourierList';

import { CourierActions } from '../../Redux/Courier/actions';
import { getCouriers } from '../../Redux/selectors';

class CourierListContainer extends React.PureComponent {
  componentDidMount() {
    const { couriers } = this.props;
    if (!couriers.length) {
      this.fetchCourier({ refresh: true });
    }
  }

  _onLoadMore = () => {
    const { fetchCourier } = this.props;
    fetchCourier({ append: true });
  };

  fetchCourier(options = {}) {
    const { fetchCourier, query } = this.props;
    fetchCourier({
      ...options,
      query: { ...query, ...(options.query || {}), populates: [] }
    });
  }

  onPageChange = (page, limit) => {
    this.fetchCourier({ query: { page: Number(page), limit: Number(limit) } });
  };
  render() {
    const isLoading = false;
    const {
      couriers,
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
      <CourierList
        locale={locale}
        intl={intl}
        isNextPageLoading={pagination.fetching}
        isEnd={pagination.isEnd}
        onLoadMore={this._onLoadMore}
        couriers={couriers}
        renderFooter={renderFooter}
        gutter={gutter}
        header={header}
        loading={pagination.fetching}
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          showQuickJumper: true,
          total: pagination.total,
          onChange: this.onPageChange
        }}
      />
    );
  }
}
const mapStateToProps = state => {
  // const currentWorkspace = getCurrentWorkspace(state);
  return {
    locale: state.intl.locale,
    couriers: getCouriers(state),
    pagination: state.pagination.couriers
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCourier: CourierActions.getCouriers
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CourierListContainer)
);
