import React from 'react';
import { formValueSelector } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'antd';
import { hasIn } from 'lodash';
import * as Common from '@golpasal/common';

import FormName from '../../Constants/Form';
import { toast } from '../../Lib/Toast';
import { strIsNumber, productSkuTextFormat } from '../../Lib/util';

import AddressService from '../../Services/APIServices/AddressService';
import MemberService from '../../Services/APIServices/MemberService';
import OrderService from '../../Services/APIServices/OrderService';
import CheckoutService from '../../Services/APIServices/CheckoutService';
import { getCouriers } from '../../Redux/selectors';

import {
  getPaymentByOrderId,
  getShipmentByOrderId,
  getShipments
} from '../../Redux/selectors';

import { getCurrentWorkspace } from '../../Redux/Account/selectors';

const { WorkspaceType, OrderType } = Common.default.type;
const { PaymentStatus } = Common.default.status;

export const validate = (
  values,
  { updateMode, currentWorkspaceType, currentWorkspace, intl }
) => {
  const errors = {};
  const required = <FormattedMessage id={'error.required'} />;
  const product = values.product || {};
  const charge = values.charge || {};
  const allowShoppingNoAddress =
    currentWorkspace?.preferences?.order?.allowShoppingNoAddress === true;

  if (!values.client) {
    errors.client = required;
  }
  if (!values.date) {
    errors.date = required;
  }
  if (!values.contactAddress && !allowShoppingNoAddress) {
    errors.contactAddress = required;
  }
  if (!values.billingContact && !allowShoppingNoAddress) {
    errors.billingContact = required;
  }
  // product items
  if (!product.items || !product.items.length) {
    errors.product = {};
    errors.product.items = (
      <FormattedMessage
        id={'error.pls_add_product'}
        values={{
          product: intl.formatMessage({
            id:
              {
                [WorkspaceType.EDUCATION]: 'product_education_display'
              }[currentWorkspaceType] || 'product_base_display'
          })
        }}
      />
    );
  } else {
    const itemsErrors = [];
    product.items.forEach((v, i) => {
      if (!v.product) {
        itemsErrors[i] = itemsErrors[i] || {};
        itemsErrors[i].product = required;
      } else if (!v.productSKU) {
        itemsErrors[i] = itemsErrors[i] || {};
        itemsErrors[i].product = required;
      }
      if (!v.qty || !strIsNumber(v.qty + '') || Number(v.qty) <= 0) {
        itemsErrors[i] = itemsErrors[i] || {};
        itemsErrors[i].qty = <FormattedMessage id={'error.number.gtzero'} />;
      } else if (v.validateInventory && v.qty > v.allQty) {
        itemsErrors[i] = itemsErrors[i] || {};
        itemsErrors[i].qty = (
          <FormattedMessage id={'error.product_sku_inventory_shortage'} />
        );
      }
      if (!v.amount || !strIsNumber(v.amount + '') || Number(v.amount) <= 0) {
        itemsErrors[i] = itemsErrors[i] || {};
        itemsErrors[i].amount = <FormattedMessage id={'error.number.gtzero'} />;
      }
    });
    if (itemsErrors.length > 0) {
      errors.product = {};
      errors.product.items = itemsErrors;
    }
  }
  // services
  if (values.services && values.services.length) {
    const servicesErrors = [];
    values.services.forEach((v, i) => {
      if (!v.service) {
        servicesErrors[i] = servicesErrors[i] || {};
        servicesErrors[i].service = required;
      }
      if (
        v.value === undefined ||
        !strIsNumber(v.value + '') ||
        Number(v.value) < 0
      ) {
        servicesErrors[i] = servicesErrors[i] || {};
        servicesErrors[i].value = (
          <FormattedMessage id={'error.number.gtezero'} />
        );
      }
    });
    if (servicesErrors.length > 0) {
      errors.services = servicesErrors;
    }
  }
  // charge others
  if (charge && charge.others && charge.others.length) {
    const othersErrors = [];
    charge.others.forEach((v, i) => {
      if (!v.description) {
        othersErrors[i] = othersErrors[i] || {};
        othersErrors[i].description = required;
      }
      if (!v.amount || !strIsNumber(v.amount + '') || Number(v.amount) <= 0) {
        othersErrors[i] = othersErrors[i] || {};
        othersErrors[i].amount = (
          <FormattedMessage id={'error.number.gtzero'} />
        );
      }
    });
    if (othersErrors.length > 0) {
      errors.charge = errors.charge || {};
      errors.charge.others = othersErrors;
    }
  }
  return errors;
};

export const asyncValidate = (() => {
  let date = +new Date();
  let errors = {};
  return async (values, dispatch, props, field) => {
    let _errors = {};
    const _date = +new Date();
    date = _date;
    if (
      values.product &&
      values.product.items &&
      !validate(values, props).product
    ) {
      const result = await OrderService.orderCharge({
        ...values,
        services: [],
        others: [],
        charge: {
          ...values.charge,
          services: [],
          others: []
        }
      });
      if (result && result.data && result.data.message) {
        _errors.charge = { calculation: result.data.message };
      }
    }

    if (date !== _date) {
      _errors = { ...errors };
    } else {
      errors = { ..._errors };
    }
    if (Object.keys(_errors).length >= 0) {
      throw _errors;
    }
  };
})();
export const shouldAsyncValidate = ({ blurredField, ...args }) => {
  const result =
    blurredField === 'coupon' ||
    (/^product\.items/.test(blurredField) &&
      blurredField !== 'product.items[0].product');
  return result;
};

export const componentDidMount = that => {
  const {
    orderId,
    updateMode,
    getShipments,
    getCouriers,
    getPaymentByOrderId,
    getShipmentByOrderId
  } = that.props;
  that.date = new Date().toISOString();
  orderId && updateMode && that.updateCheckOutUrl();
  getShipments();
  getCouriers();
  if (orderId) {
    getPaymentByOrderId(orderId);
    getShipmentByOrderId(orderId);
  }
};

export const componentDidUpdate = (prevProps, that) => {
  const { updateDefaultAddressloading, sameContactChecked } = that.state;
  const {
    getOrderErrors,
    history,
    formValueChange,
    form,
    formValueClient,
    formValueContactAddress,
    updateMode,
    intl,
    orderId,
    getOrderById,
    payment
  } = that.props;

  if (getOrderErrors) {
    history.push('/error');
  }
  if (updateMode && prevProps.orderId !== orderId && orderId) {
    that.updateCheckOutUrl();
  }
  // use client updated Form Address
  if (
    !updateDefaultAddressloading &&
    formValueClient &&
    formValueClient !== prevProps.formValueClient &&
    !updateMode
  ) {
    const updatedFormAddress = async () => {
      that.setState({ updateDefaultAddressloading: true });
      let memberId = '';
      const membersData = await MemberService.getMembers({
        user: formValueClient
      });
      if (membersData && membersData.data && membersData.data[0]) {
        memberId = membersData.data[0]._id;
      }
      const data = await AddressService.getAddresss({
        refType: 'Members',
        ref: memberId
      });
      if (data && data.data && data.data.length) {
        let defaultAddress =
          data.data.find && data.data.find(v => v && v.isDefault);
        if (defaultAddress) {
          defaultAddress = { ...defaultAddress };
          delete defaultAddress._id;
          formValueChange(form, 'contactAddress', defaultAddress);
        }
      } else {
        formValueChange(form, 'contactAddress', null);
      }

      that.setState({ updateDefaultAddressloading: false });
    };
    if (formValueContactAddress && formValueContactAddress.name) {
      Modal.confirm({
        title: intl.formatMessage(
          {
            id: 'msg.is_replace_order_contact'
          },
          {
            value: intl.formatMessage({
              id: 'order_contact_display'
            })
          }
        ),
        okText: intl.formatMessage({ id: 'display_yes' }),
        cancelText: intl.formatMessage({ id: 'cancel' }),
        onOk: () => {
          updatedFormAddress();
          return Promise.resolve();
        }
      });
    } else {
      updatedFormAddress();
    }
  }

  if (
    sameContactChecked &&
    formValueContactAddress !== prevProps.formValueContactAddress
  ) {
    const newBillingContact = { ...formValueContactAddress };
    delete newBillingContact._id;
    formValueChange(form, 'billingContact', newBillingContact);
  }
  if (!updateMode && formValueClient !== prevProps.formValueClient) {
    formValueChange(form, 'eventCampaigns', []);
  }

  // paid
  if (
    payment &&
    prevProps.payment &&
    !prevProps.payment !== payment &&
    payment.status === PaymentStatus.PAID
  ) {
    getOrderById(orderId);
  }
};

export const onSubmit = (order, that) => {
  const { createOrder, updateOrder, currentWorkspace } = that.props;
  const fn = order._id ? updateOrder : createOrder;
  const defaultCurrency = currentWorkspace.defaultCurrency || 'HKD';
  const formValues = {
    ...order,
    workspace: currentWorkspace._id,
    currency: defaultCurrency,
    charge: {
      ...(order.charge ? order.charge : {}),
      currency: defaultCurrency
    },
    product: {
      ...(order.product ? order.product : {}),
      items:
        order.product && order.product.items
          ? order.product.items.map(v => {
              const _v = {
                ...v,
                currency: defaultCurrency
              };
              delete _v.allQty;
              delete _v.validateInventory;
              return _v;
            })
          : []
    },
    eventCampaigns: order.eventCampaigns
      ? order.eventCampaigns.map(v => {
          return { eventCampaign: v };
        })
      : []
  };
  delete formValues.isQuotation;
  delete formValues.quotationObject;

  if (!formValues.coupon) {
    delete formValues.coupon;
  }

  const others = ((formValues.charge && formValues.charge.others) || []).map(
    v => ({
      ...v,
      amount: Number(v.amount)
    })
  );

  // services and others
  const services = (formValues.services || []).map(v => ({
    ...v,
    value: Number(v.value)
  }));
  formValues.others = others;
  formValues.charge.others = [];
  formValues.services = services;
  formValues.charge.services = [];

  if (formValues._id) {
    delete formValues.client;
    // delete formValues.charge;
    delete formValues.workspace;
    delete formValues.clientObject;

    fn(formValues);
  } else {
    fn(formValues);
  }
};

export const onSubmitSuccess = that => {
  const { updateMode, history, onSubmitSuccess, orderSelectedId } = that.props;
  toast.success(
    <FormattedMessage
      id={updateMode ? 'updated_successfully' : 'created_successfully'}
    />
  );
  onSubmitSuccess && onSubmitSuccess();
  if (orderSelectedId && !updateMode) {
    history.push('/orders/' + orderSelectedId);
  } else {
    that.componentDidMount();
  }
};

export const onSubmitFail = that => {
  const { updateMode } = that.props;

  toast.error(
    <FormattedMessage id={updateMode ? 'updated_failure' : 'created_failure'} />
  );
};

export const getUpdateModeInitialValues = order => {
  return {
    ...order,
    clientObject: order && order.client,
    client: order && order.client && order.client._id,
    services:
      order && order.services
        ? [...order.services].map(v => ({
            ...v,
            service: v.service._id
          }))
        : [],
    product:
      order && order.product && order.product.items
        ? {
            items: [...order.product.items].map(v => ({
              ...v,
              product: v.product && v.product._id,
              productSKU: v.productSKU && v.productSKU._id
            }))
          }
        : undefined,
    quotationObject: order && order.quotation,
    quotation: order && order.quotation && order.quotation._id,
    isQuotation:
      order &&
      order.quotation &&
      [OrderType.EDUCATION, OrderType.SHOPPING].includes(
        order && order.workspace && order.workspace.type
      )
  };
};

export const onSameContactClick = that => {
  const { sameContactChecked } = that.state;
  const { formValueContactAddress, formValueChange, form } = that.props;
  const value = !sameContactChecked;
  that.setState({ sameContactChecked: value });
  if (value && formValueContactAddress) {
    const newBillingContact = { ...formValueContactAddress };
    delete newBillingContact._id;
    formValueChange(form, 'billingContact', newBillingContact);
  } else {
    formValueChange(form, 'billingContact', null);
  }
};

export const cancelOrder = that => {
  const { cancelOrder, cancelOrderLoading, orderId } = that.props;
  !cancelOrderLoading && cancelOrder(orderId);
};
export const updateOrderStatus = (that, status) => {
  const { updateOrderStatus, updateOrderStatusLoading, orderId } = that.props;
  !updateOrderStatusLoading && updateOrderStatus(orderId, status);
};

export const updateShipmentStatus = (that, _id, status) => {
  const { updateShipmentStatus, updateShipmentStatusLoading } = that.props;
  !updateShipmentStatusLoading && updateShipmentStatus(_id, status);
};

export const onCopyRawText = that => {
  const { order, intl, currentWorkspaceType } = that.props;
  // text
  const title = intl.formatMessage({
    id: 'display_copy_order_raw_text_msg_title'
  });
  const msg1 = intl.formatMessage({
    id: 'display_copy_order_raw_text_msg_1'
  });
  const msg2 = intl.formatMessage({
    id: 'display_copy_order_raw_text_msg_2'
  });
  //  base
  const baseLable = intl.formatMessage({
    id:
      {
        [WorkspaceType.EDUCATION]: 'order_charge_base_education_display'
      }[currentWorkspaceType] || 'order_charge_base_display'
  });
  const productTexts = hasIn(order, 'product.items[0]')
    ? order.product.items.reduce(
        (texts, item) =>
          texts +
          `
${item.product.name[intl.locale]} $${
            item.productSKU.amount
          }/${productSkuTextFormat(item.productSKU, intl.locale, specs =>
            specs.join('/')
          )}`,
        ''
      )
    : '';
  // charge services
  const servicesTexts = hasIn(order, 'services[0]')
    ? order.services.reduce(
        (texts, item) =>
          texts +
          `
${item.service.name[intl.locale]}
$${item.value}`,
        ''
      )
    : '';
  // charge others
  const otherTexts = hasIn(order, 'charge.others[0]')
    ? order.charge.others.reduce(
        (texts, item) =>
          texts +
          `
${item.description}
$${item.amount}`,
        ''
      )
    : '';
  //coupon
  const couponLable = intl.formatMessage({ id: 'order_coupon_display' });
  const couponCode = hasIn(order, 'charge.coupons[0].code')
    ? order.charge.coupons[0].code
    : '';
  const couponAmount = hasIn(order, 'charge.coupons[0].amount')
    ? order.charge.coupons[0].amount
    : 0;
  const couponText = couponCode
    ? `
${couponLable}
${couponCode} $${couponAmount}`
    : '';
  // total
  const totalAmountLabel = intl.formatMessage({ id: 'order_total_display' });
  const totalAmount = hasIn(order, 'charge.totalAmount')
    ? order.charge.totalAmount
    : 0;

  const text = `${title}😊:

${baseLable}${productTexts}${servicesTexts}${otherTexts}${couponText}
${totalAmountLabel}
$${totalAmount}

${msg1}😄
${msg2}`;
  return text;
};

export const updateCheckOutUrl = async that => {
  try {
    const { orderId, currentWorkspace } = that.props;
    that.setState({ checkoutLoading: true });
    if (!currentWorkspace || !currentWorkspace.webHost || !orderId) {
      throw new Error('order id or url does not exist');
    }
    const result = await CheckoutService.checkout({ orderId });
    const checkoutId = result && result.data && result.data._id;
    if (!checkoutId) {
      throw new Error('checkout id does not exist');
    }
    const domain = currentWorkspace.webHost
      .replace(/[/]*$/, '')
      .replace(/^http:\/\//, '');
    const http = currentWorkspace.alwaysHttpsWebHost ? 'https' : 'http';
    const url = `${http}://${domain}/order/checkout?id=${checkoutId}`;

    that.setState({ checkoutUrl: url });
  } catch (e) {
  } finally {
    that.setState({ checkoutLoading: false });
  }
};

export const touchAllField = that => {
  const {
    formTouchAction,
    form,
    formValueProduct,
    formValueCharge,
    formValueServices
  } = that.props;
  let fields = [];
  const _values = {
    product: {
      items:
        formValueProduct &&
        formValueProduct.items &&
        formValueProduct.items.length
          ? formValueProduct.items
          : []
    },
    services:
      formValueServices && formValueServices.length ? formValueServices : [],
    charge: {
      others:
        formValueCharge &&
        formValueCharge.others &&
        formValueCharge.others.length
          ? formValueCharge.others
          : []
    }
  };
  _values.product.items.forEach((v, i) => {
    fields = [
      ...fields,
      `product.items[${i}].product`,
      `product.items[${i}].productSKU`,
      `product.items[${i}].qty`
    ];
  });
  _values.services.forEach((v, i) => {
    fields = [...fields, `services[${i}].service`, `services[${i}].value`];
  });
  _values.charge.others.forEach((v, i) => {
    fields = [
      ...fields,
      `charge.others[${i}].description`,
      `charge.others[${i}].amount`
    ];
  });
  formTouchAction(form, 'product.items', ...fields);
};

export const getFormTexts = that => {
  const { currentWorkspaceType: workspaceType, intl } = that.props;
  let texts = {};
  switch (workspaceType) {
    case WorkspaceType.EDUCATION:
      texts = {
        chargeBase: 'order_charge_base_education_display'
      };
      break;
    default:
      texts = {
        chargeBase: 'order_charge_base_display'
      };
  }

  return Object.keys(texts).reduce((r, v) => {
    return { ...r, [v]: intl.formatMessage({ id: texts[v] }) };
  }, {});
};
export const mapStateToProps = (state, { orderId, order }) => {
  const { ORDER_CREATE, ORDER_UPDATE } = FormName;
  const updateMode = Boolean(orderId);
  const form = updateMode ? ORDER_UPDATE : ORDER_CREATE;
  const currentWorkspace = getCurrentWorkspace(state);
  const _formValueSelector = formValueSelector(form);

  return {
    form,
    order,
    updateMode,
    currentWorkspace,
    currentWorkspaceType:
      currentWorkspace && currentWorkspace.type
        ? currentWorkspace.type
        : undefined,
    getOrderErrors: state.error.getOrder,
    payment: getPaymentByOrderId(state, orderId),
    couriers: getCouriers(state),
    shipments: getShipments(state),
    shipment: getShipmentByOrderId(state, orderId),
    cancelOrderLoading: state.loading.cancelOrder,
    updateOrderStatusLoading: state.loading.updateOrderStatus,
    updateShipmentStatusLoading: state.loading.updateShipmentStatus,
    searchEventCampaignsLoading: state.loading.searchEventCampaigns,
    orderSelectedId: state.order.selected,
    formValueClient: _formValueSelector(state, 'client'),
    formValueContactAddress: _formValueSelector(state, 'contactAddress'),
    formValueProduct: _formValueSelector(state, 'product'),
    formValueCharge: _formValueSelector(state, 'charge'),
    formValueServices: _formValueSelector(state, 'services'),
    formValueStatus: _formValueSelector(state, 'status')
  };
};
