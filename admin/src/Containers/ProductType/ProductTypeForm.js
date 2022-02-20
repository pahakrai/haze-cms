import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import FormName from '../../Constants/Form';
import { toast } from '../../Lib/Toast';
import { hasIn } from 'lodash';
import Loading from '../../Components/Common/Loading';

import AccountSelector from '../../Redux/Account/selectors';
import ProductTypeForm from '../../Components/App/ProductType/ProductTypeForm';
import { ProductTypeActions } from '../../Redux/ProductType/actions';
import { getProductTypeById } from '../../Redux/selectors';
import { getCurrentWorkspace } from '../../Redux/Account/selectors';

class ProductTypemContainer extends React.PureComponent {
  static defaultProps = {
    onSubmitSuccess: () => true
  };

  componentDidMount() {
    const { fetchProductTypeById, productTypeId } = this.props;
    if (productTypeId) {
      fetchProductTypeById(productTypeId);
    }
  }
  imageFormValueFormat(paramValues, newImages = []) {
    if (!paramValues) {
      return [];
    }
    const values = [...paramValues];
    const newValues = [];
    values.forEach(image => {
      const hasFildMeta = hasIn(image, 'fileMeta') && image.fileMeta;
      const fileMeta = hasFildMeta ? image.fileMeta : '';

      if (hasFildMeta && typeof fileMeta === 'string') {
        newValues.push(fileMeta);
      } else if (hasFildMeta && fileMeta._id) {
        newValues.push(fileMeta._id);
      } else {
        newImages.push(image);
      }
    });

    return newValues;
  }
  onSubmit(_productType) {
    const { currentUser } = this.props;
    let formatProductType = Object.assign({}, _productType);
    const { createProductType, updateProductType } = this.props;
    const fn = Boolean(formatProductType._id)
      ? updateProductType
      : createProductType;
    const newImages = [];
    // imageFormValueFormat
    formatProductType.images = this.imageFormValueFormat(
      formatProductType.images,
      newImages
    );
    if (currentUser && currentUser.currentWorkspace) {
      formatProductType.workspace = currentUser.currentWorkspace;
    }
    if (formatProductType.workspace) {
      fn(formatProductType);
    } else {
      this.onSubmitFail();
    }
  }

  onSubmitSuccess() {
    const {
      onSubmitSuccess,
      history,
      fetchProductType,
      updateMode
    } = this.props;
    fetchProductType({
      query: { populates: [], refresh: true }
    });
    toast.success(
      <FormattedMessage
        id={updateMode ? 'updated_successfully' : 'created_successfully'}
      />
    );
    onSubmitSuccess();
    history.push('/productTypes');
  }

  onSubmitFail() {
    const { updateMode } = this.props;

    toast.error(
      <FormattedMessage
        id={updateMode ? 'updated_failure' : 'created_failure'}
      />
    );
  }

  getInitialValues = () => {
    const { productType, updateMode } = this.props;
    const createValue = {
      images: []
    };
    let updateValue = {};
    if (productType && updateMode) {
      updateValue = {
        ...productType,
        images: Array.isArray(productType.images)
          ? productType.images.map(v => ({ fileMeta: v }))
          : []
      };
    }

    return updateMode ? { ...updateValue } : createValue;
  };

  render() {
    let isLoading = true;
    const {
      updateMode,
      locale,
      intl,
      productType,
      currentWorkspace,
      formValueUnit,
      form
    } = this.props;
    if (productType) {
      isLoading = false;
    }
    if (!updateMode) {
      isLoading = false;
    }
    const initialValues = this.getInitialValues();
    return isLoading ? (
      <Loading />
    ) : (
      <ProductTypeForm
        locale={locale}
        intl={intl}
        form={form}
        initialValues={initialValues}
        updateMode={updateMode}
        formValueUnit={formValueUnit}
        currentWorkspace={currentWorkspace}
        onSubmit={this.onSubmit.bind(this)}
        onSubmitFail={this.onSubmitFail.bind(this)}
        onSubmitSuccess={this.onSubmitSuccess.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const updateMode = ownProps.productTypeId !== undefined;
  const { PRODUCT_TYPE_CREATE, PRODUCT_TYPE_UPDATE } = FormName;
  const form = updateMode ? PRODUCT_TYPE_UPDATE : PRODUCT_TYPE_CREATE;
  // const currentWorkspace = getCurrentWorkspace(state);

  return {
    locale: state.intl.locale,
    updateMode,
    productType: getProductTypeById(state, ownProps.productTypeId),
    currentWorkspace: getCurrentWorkspace(state),
    form,
    currentUser: AccountSelector.getCurrentUser(state)
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateProductType: ProductTypeActions.updateProductType,
      createProductType: ProductTypeActions.createProductType,
      fetchProductType: ProductTypeActions.getProductTypes,
      fetchProductTypeById: ProductTypeActions.getProductTypeById
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductTypemContainer)
);
