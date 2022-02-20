import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '../../Components/Common/Loading';
import ProductList from '../../Components/App/Product/ProductList';
import { ProductActions } from '../../Redux/Product/actions';
import { getProducts } from '../../Redux/selectors';
import { withRouter } from 'react-router-dom';

class ProductListContainer extends React.PureComponent {
  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts(options = {}) {
    const { fetchProducts, query } = this.props;
    fetchProducts({
      ...options,
      query: { ...query, ...(options.query || {}), populates: [] }
    });
  }

  _onPageChange = (page, limit) => {
    this.fetchProducts({ query: { page: Number(page), limit: Number(limit) } });
  };

  render() {
    const isLoading = false;
    const {
      products,
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
      <ProductList
        locale={locale}
        intl={intl}
        products={products}
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
const mapStateToProps = state => ({
  locale: state.intl.locale,
  products: getProducts(state),
  pagination: state.pagination.products
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProducts: ProductActions.getProducts
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductListContainer)
);
