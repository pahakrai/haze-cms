import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProductActions } from '../../Redux/Product/actions';
import { withRouter } from 'react-router-dom';
import ProductImportForm from '../../Components/App/Product/ProductImportForm';
import FormName from '../../Constants/Form';

class ProductImportContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }
  onSubmit({ products }) {
    const { importProduct } = this.props;
    importProduct(products);
  }

  onSubmitSuccess() {
    const { history } = this.props;
    history.push('/products');
  }

  onSubmitFail() {}

  render() {
    const { intl } = this.props;
    return (
      <ProductImportForm
        onSubmit={this.onSubmit.bind(this)}
        onSubmitFail={this.onSubmitFail.bind(this)}
        onSubmitSuccess={this.onSubmitSuccess.bind(this)}
        form={FormName.IMPORT_PRODUCT}
        initialValues={{ products: [] }}
        intl={intl}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    imported: state.product.imported
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      importProduct: ProductActions.importProduct,
      resetImported: () => ProductActions.setImported(false)
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductImportContainer)
);
