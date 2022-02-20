import React from 'react';
import { connect } from 'react-redux';
import { toast } from '../../Lib/Toast';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { formValueSelector, change as changeFormValue } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import CouponForm from '../../Components/App/Coupon/CouponForm';
import Loading from '../../Components/Common/Loading';
import { CouponActions } from '../../Redux/Coupon/actions';
import { CurrencyActions } from '../../Redux/Currency/actions';
import AccountSelector from '../../Redux/Account/selectors';
import EcommCommonType from '@golpasal/common';
import { hasIn } from 'lodash';
import { getCurrentWorkspace } from '../../Redux/Account/selectors';
import { ProductActions } from '../../Redux/Product/actions';
import {
  getCurrencies,
  getWorkspaces,
  getCouponById,
  getProducts,
  getAllPaymentMethod
} from '../../Redux/selectors';
import FormName from '../../Constants/Form';
import { WorkspaceActions } from '../../Redux/Workspace/actions';
import { PaymentMethodActions } from '../../Redux/PaymentMethod/actions';
const { OrderCreditType, LogicGateType } = EcommCommonType.type;

class CouponFormContainer extends React.PureComponent {
  static defaultProps = {
    onSubmitSuccess: () => true
  };
  state = {
    selectProducts: [],
    date: new Date(),
    hasUpdate: false
  };
  componentDidMount() {
    const {
      currencies,
      // coupon,
      couponId,
      fetchCouponById,
      fetchCurrencies,
      fetchWorkspaces,
      workspaces,
      paymentMethods,
      getAllPaymentMethod,
      getProducts
    } = this.props;
    if (couponId) {
      fetchCouponById(couponId, {
        populates: ['workspace', 'images']
      });
    }

    if (!currencies.length) {
      fetchCurrencies();
    }
    if (!workspaces.length) {
      fetchWorkspaces();
    }
    if (!paymentMethods.length) {
      getAllPaymentMethod();
    }
    getProducts();
  }

  imageFormValueFormat(paramValues, newImages = []) {
    if (!hasIn(paramValues, `length`) || !paramValues.length) {
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
  onSubmit(coupon) {
    const { createCoupon, updateCoupon, currentUser } = this.props;
    let formatCoupon = {
      ...coupon,
      criteria: {
        ...coupon.criteria
      },
      effect: {
        ...coupon.effect
      }
    };
    const fn = Boolean(formatCoupon._id) ? updateCoupon : createCoupon;

    const newImages = [];
    // imageFormValueFormat
    formatCoupon.images = this.imageFormValueFormat(
      formatCoupon.images,
      newImages
    );
    const productItems =
      formatCoupon.criteria && formatCoupon.criteria.products;
    let productIds = [];
    if (productItems.length > 0) {
      productIds = productItems.map(v => v._id);
    }

    formatCoupon.criteria.products =
      formatCoupon.criteria.productsLogicGate === LogicGateType.ANY
        ? []
        : productIds;
    formatCoupon.criteria.paymentMethods =
      formatCoupon.criteria.paymentMethodsLogicGate === LogicGateType.ANY
        ? []
        : formatCoupon.criteria.paymentMethods;
    formatCoupon.effect.creditType =
      productIds.length <= 0
        ? OrderCreditType.WHOLE_ORDER
        : formatCoupon.effect.creditType;
    if (currentUser && currentUser.currentWorkspace) {
      formatCoupon.workspace = currentUser.currentWorkspace;
    }
    if (formatCoupon.workspace) {
      fn(formatCoupon, newImages);
    } else {
      this.onSubmitFail();
    }
  }

  onSubmitSuccess() {
    const { updateMode, onSubmitSuccess, history, fetchCoupons } = this.props;
    toast.success(
      <FormattedMessage
        id={updateMode ? 'updated_successfully' : 'created_successfully'}
      />
    );
    fetchCoupons({
      query: {},
      refresh: true
    });
    onSubmitSuccess();

    history.push('/coupons');
  }
  onCloseButtonClick = () => {
    const { history, fetchCoupons } = this.props;

    history.push('/coupons');
    fetchCoupons({
      query: {},
      refresh: true
    });
  };

  onSubmitFail() {
    const { updateMode } = this.props;
    toast.error(
      <FormattedMessage
        id={updateMode ? 'updated_failure' : 'created_failure'}
      />
    );
  }
  getInitialCoupon = () => {
    const { coupon } = this.props;

    return coupon
      ? {
          ...coupon,
          images: Array.isArray(coupon.images)
            ? coupon.images.map(v => ({ fileMeta: v }))
            : [],
          workspace:
            coupon.workspace && coupon.workspace._id
              ? coupon.workspace._id
              : coupon.workspace
        }
      : {
          images: [],
          redeemLimitPerUser: 0,
          criteria: {
            products: [],
            paymentMethods: []
          }
        };
  };

  render() {
    const key = this.props.coupon ? this.props.coupon._id : 'new';
    const isLoading = false; // dummy
    const {
      coupon,
      updateMode,
      locale,
      intl,
      currencies,
      workspaces,
      currency,
      currentUser,
      form,
      products,
      paymentMethods,
      currentWorkspaceType,
      formValueProductsLogic,
      formValuePaymentMethodLogic,
      //  formValueIsRange,
      formValueUnit,
      formValueType,
      formValueDetail
    } = this.props;
    const initialCoupon = this.getInitialCoupon();
    return isLoading ? (
      <Loading />
    ) : (
      <CouponForm
        locale={locale}
        intl={intl}
        key={key}
        currency={currency}
        formValueDetail={formValueDetail}
        paymentMethods={paymentMethods}
        workspaces={workspaces}
        currentUser={currentUser}
        updateMode={updateMode}
        coupon={coupon}
        images={initialCoupon ? initialCoupon.icon : []}
        currencies={currencies}
        currentWorkspaceType={currentWorkspaceType}
        products={products}
        formValueUnit={formValueUnit}
        formValueType={formValueType}
        formValuePaymentMethodLogic={formValuePaymentMethodLogic}
        formValueProductsLogic={formValueProductsLogic}
        onCloseButtonClick={this.onCloseButtonClick}
        // form
        form={form}
        initialValues={initialCoupon} //need to use common
        onSubmit={this.onSubmit.bind(this)}
        onSubmitFail={this.onSubmitFail.bind(this)}
        onSubmitSuccess={this.onSubmitSuccess.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const updateMode = !!ownProps.couponId;
  const { COUPON_CREATE, COUPON_UPDATE } = FormName;
  const form = updateMode ? COUPON_UPDATE : COUPON_CREATE;
  const _formValueSelector = formValueSelector(form);
  const currentWorkspace = getCurrentWorkspace(state);

  return {
    locale: state.intl.locale,
    coupon: getCouponById(state, ownProps.couponId),
    selected: state.coupon.selected,
    currencies: getCurrencies(state),
    workspaces: getWorkspaces(state),
    form,
    updateMode,
    formValueType: _formValueSelector(state, 'effect.type'),
    formValueProductsLogic: _formValueSelector(
      state,
      'criteria.productsLogicGate'
    ),
    formValuePaymentMethodLogic: _formValueSelector(
      state,
      'criteria.paymentMethodsLogicGate'
    ),
    formValueDetail: _formValueSelector(state, 'criteria.products'),
    currentUser: AccountSelector.getCurrentUser(state),
    products: getProducts(state),
    paymentMethods: getAllPaymentMethod(state),
    currentWorkspaceType:
      currentWorkspace && currentWorkspace.type
        ? currentWorkspace.type
        : undefined
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateCoupon: CouponActions.updateCoupon,
      createCoupon: CouponActions.createCoupon,
      fetchCoupons: CouponActions.getCoupons,
      fetchCouponById: CouponActions.getCouponById,
      fetchCurrencies: CurrencyActions.getCurrencies,
      fetchWorkspaces: WorkspaceActions.getWorkspaces,
      setSelected: CouponActions.setSelected,
      searchProducts: ProductActions.searchProducts,
      getProducts: ProductActions.getProducts,
      getAllPaymentMethod: PaymentMethodActions.getAllPaymentMethod,
      changeFormValue
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CouponFormContainer)
);
