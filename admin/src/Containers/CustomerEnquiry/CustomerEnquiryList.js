import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import Loading from '../../Components/Common/Loading';
import CustomerEnquiryList from '../../Components/App/CustomerEnquiry/CustomerEnquiryList';

import { CustomerEnquiryActions } from '../../Redux/CustomerEnquiry/actions';
import { getCustomerEnquiries } from '../../Redux/selectors';

class CustomerEnquiryListContainer extends React.PureComponent {
  componentDidMount() {
    const { customerEnquiries, getCustomerEnquiries } = this.props;
    if (!customerEnquiries.length) {
      getCustomerEnquiries({ refresh: true });
    }
  }

  _onLoadMore = () => {
    const { getCustomerEnquiries } = this.props;
    getCustomerEnquiries({ append: true });
  };

  getCustomerEnquiries(options = {}) {
    const { getCustomerEnquiries, query } = this.props;
    getCustomerEnquiries({
      ...options,
      query: { ...query, ...(options.query || {}), populates: [] }
    });
  }

  onPageChange = (page, limit) => {
    this.getCustomerEnquiries({
      query: { page: Number(page), limit: Number(limit) }
    });
  };

  onFollow = item => {
    const { updateToFollow } = this.props;
    updateToFollow(item._id);
  };

  render() {
    const isLoading = false;
    const {
      customerEnquiries,
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
      <CustomerEnquiryList
        locale={locale}
        intl={intl}
        isNextPageLoading={pagination.fetching}
        isEnd={pagination.isEnd}
        onLoadMore={this._onLoadMore}
        customerEnquiries={customerEnquiries}
        renderFooter={renderFooter}
        gutter={gutter}
        header={header}
        loading={pagination.fetching}
        onFollow={this.onFollow}
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
  return {
    locale: state.intl.locale,
    customerEnquiries: getCustomerEnquiries(state),
    pagination: state.pagination.customerEnquiries
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCustomerEnquiries: CustomerEnquiryActions.getCustomerEnquiries,
      updateToFollow: CustomerEnquiryActions.updateToFollow
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomerEnquiryListContainer)
);
