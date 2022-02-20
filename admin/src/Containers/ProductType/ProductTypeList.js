import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProductTypeList from '../../Components/App/ProductType/ProductTypeList';
import Loading from '../../Components/Common/Loading';
import { ProductTypeActions } from '../../Redux/ProductType/actions';
import { getProductTypes } from '../../Redux/selectors';
import { withRouter } from 'react-router-dom';
class ProductTypeListContainer extends React.PureComponent {
  componentDidMount() {
    this.getProductTypes();
  }

  getProductTypes(options = {}) {
    const { getProductTypes, query } = this.props;
    getProductTypes({
      ...options,
      query: { ...query, ...(options.query || {}), populates: [] }
    });
  }
  _onPageChange = (page, limit) => {
    this.getProductTypes({
      query: { page: Number(page), limit: Number(limit) }
    });
  };

  render() {
    const isLoading = false;
    const {
      intl,
      productTypes,
      getProductTypes,
      locale,
      pagination,
      renderFooter,
      header,
      gutter
    } = this.props;
    return isLoading ? (
      <Loading />
    ) : (
      <ProductTypeList
        locale={locale}
        intl={intl}
        onLoadMore={this._onLoadMore}
        productTypes={productTypes}
        getProductTypes={getProductTypes}
        // onDeleteClick={expense => true}
        renderFooter={renderFooter}
        gutter={gutter}
        header={header}
        isEnd={pagination.isEnd}
        loading={pagination.fetching}
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
const mapStateToProps = state => {
  return {
    locale: state.intl.locale,
    productTypes: getProductTypes(state),
    pagination: state.pagination.productTypes
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getProductTypes: ProductTypeActions.getProductTypes
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductTypeListContainer)
);
