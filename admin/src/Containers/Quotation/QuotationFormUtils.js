import React from 'react';
import { formValueSelector } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'antd';

import FormName from '../../Constants/Form';
import { toast } from '../../Lib/Toast';
import { strIsNumber } from '../../Lib/util';

import AccountSelector from '../../Redux/Account/selectors';
import { getQuotationById } from '../../Redux/selectors';
import { getCurrentWorkspace } from '../../Redux/Account/selectors';
import MemberService from '../../Services/APIServices/MemberService';
import AddressService from '../../Services/APIServices/AddressService';

export const validate = (
  values,
  { updateMode, currentWorkspaceType, intl }
) => {
  const errors = {};
  const required = <FormattedMessage id={'error.required'} />;
  const charge = values.charge || {};

  if (!values.date) {
    errors.date = required;
  }

  if (!values.billingModel) {
    errors.billingModel = required;
  }

  if (!values.details) {
    errors.details = required;
  }

  if (!values.client) {
    errors.client = required;
  }

  if (!values.contactModel) {
    errors.contactModel = required;
  }

  // services
  if (values.services && values.services.length) {
    const servicesErrors = [];
    values.services.forEach((v, i) => {
      if (!v.service) {
        servicesErrors[i] = servicesErrors[i] || {};
        servicesErrors[i].service = required;
      }
      if (!v.value || !strIsNumber(v.value + '') || Number(v.value) <= 0) {
        servicesErrors[i] = servicesErrors[i] || {};
        servicesErrors[i].value = (
          <FormattedMessage id={'error.number.gtzero'} />
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
  // let date = +new Date();
  // let errors = {};
  // return async (values, dispatch, props, field) => {
  //   let _errors = {};
  //   const _date = +new Date();
  //   date = _date;
  //   if (
  //     values.product &&
  //     values.product.items &&
  //     !validate(values, props).product
  //   ) {
  //     const result = await QuotationService.orderCharge({
  //       ...values,
  //       services: [],
  //       others: [],
  //       charge: {
  //         ...values.charge,
  //         services: [],
  //         others: []
  //       }
  //     });
  //     if (result && result.data && result.data.message) {
  //       _errors.charge = { calculation: result.data.message };
  //     }
  //   }
  //   if (date !== _date) {
  //     _errors = { ...errors };
  //   } else {
  //     errors = { ..._errors };
  //   }
  //   if (Object.keys(_errors).length >= 0) {
  //     throw _errors;
  //   }
  // };
})();

export const componentDidMount = that => {
  const {
    quotationId,
    getQuotationById
    // getPaymentByOrderId,
    // removeOrder
  } = that.props;

  if (quotationId) {
    // removeOrder(quotationId);
    // getPaymentByOrderId(quotationId);
    getQuotationById(quotationId, {
      populates: [
        '$details.product',
        '$details.productSKU',
        '$details.productSKU.$specs.spec',
        'workspace',
        'client',
        'billingContact',
        'contact',
        '$services.service'
      ]
    });
  }
};

export const componentDidUpdate = (prevProps, that) => {
  const { updateDefaultAddressloading, sameContactChecked } = that.state;
  const {
    getQuotationErrors,
    history,
    formValueChange,
    form,
    formValueClient,
    formValueContact,
    updateMode,
    intl
  } = that.props;

  if (getQuotationErrors) {
    history.push('/error');
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
    if (formValueContact && formValueContact.name) {
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

  if (sameContactChecked && formValueContact !== prevProps.formValueContact) {
    const newBillingContact = { ...formValueContact };
    delete newBillingContact._id;
    formValueChange(form, 'billingContact', newBillingContact);
  }
};

export const onSameContactClick = that => {
  const { sameContactChecked } = that.state;
  const { formValueContact, formValueChange, form } = that.props;
  const value = !sameContactChecked;
  that.setState({ sameContactChecked: value });
  if (value && formValueContact) {
    const newBillingContact = { ...formValueContact };
    delete newBillingContact._id;
    formValueChange(form, 'billingContact', newBillingContact);
  } else {
    formValueChange(form, 'billingContact', null);
  }
};

export const onSubmit = (quotation, that) => {
  const { createQuotation, updateQuotation, currentWorkspace } = that.props;
  const fn = quotation._id ? updateQuotation : createQuotation;
  const formValues = {
    ...quotation,
    workspace: currentWorkspace._id,
    currency: currentWorkspace.defaultCurrency,
    charge: {
      ...(quotation.charge ? quotation.charge : {}),
      currency: currentWorkspace.defaultCurrency
    }
  };

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
  const chargeServices = (formValues.services || []).map(v => ({
    ...v,
    amount: Number(v.value)
  }));

  let productAmount;
  productAmount =
    formValues.details && formValues.details.length > 0
      ? formValues.details.reduce((amount, v) => {
          return amount + Number(v.amount || 0);
        }, 0)
      : 0;

  let serviceAmount;
  serviceAmount =
    chargeServices && chargeServices.length > 0
      ? chargeServices.reduce((amount, v) => {
          return amount + Number(v.amount || 0);
        }, 0)
      : 0;
  let otherAmount;
  otherAmount =
    others && others.length > 0
      ? others.reduce((amount, v) => {
          return amount + Number(v.amount || 0);
        }, 0)
      : 0;
  const totalAmount = productAmount + otherAmount + serviceAmount;
  formValues.charge.others = others;
  formValues.services = services;
  formValues.charge.services = chargeServices;
  formValues.charge.totalAmount = totalAmount;
  formValues.charge.base = productAmount;

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
  const {
    updateMode,
    history,
    onSubmitSuccess,
    quotationSelectedId
  } = that.props;
  toast.success(
    <FormattedMessage
      id={updateMode ? 'updated_successfully' : 'created_successfully'}
    />
  );
  onSubmitSuccess && onSubmitSuccess();
  if (quotationSelectedId && !updateMode) {
    history.push('/quotation/' + quotationSelectedId);
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

export const getUpdateModeInitialValues = quotation => ({
  ...quotation,

  clientObject: quotation && quotation.client,
  client: quotation && quotation.client && quotation.client._id
  // services:
  //   quotation && quotation.services
  //     ? [...quotation.services].map(v => ({
  //         ...v,
  //         service: v.service._id
  //       }))
  //     : []
});

export const convertToOrder = (that, body) => {
  const { convertToOrder, quotationId } = that.props;
  convertToOrder(quotationId, body);
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
    details:
      formValueProduct &&
      formValueProduct.items &&
      formValueProduct.items.length
        ? formValueProduct.items
        : [],
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
  _values.details &&
    _values.details.forEach((v, i) => {
      fields = [
        ...fields,
        `details[${i}].product`,
        `details[${i}].productSKU`,
        `details[${i}].qty`
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
  formTouchAction(form, 'details', ...fields);
};

export const mapStateToProps = (state, { quotationId }) => {
  const { QUOTATION_CREATE, QUOTATION_UPDATE } = FormName;
  const updateMode = Boolean(quotationId);
  const form = updateMode ? QUOTATION_UPDATE : QUOTATION_CREATE;
  const quotation = getQuotationById(state, quotationId);
  const currentWorkspace = getCurrentWorkspace(state);
  const _formValueSelector = formValueSelector(form);

  return {
    form,
    quotation,
    updateMode,
    currentWorkspace,
    currentWorkspaceType:
      currentWorkspace && currentWorkspace.type
        ? currentWorkspace.type
        : undefined,
    getQuotationErrors: state.error.getQuotation,
    // payment: getPaymentByOrderId(state, quotationId),
    currentUser: AccountSelector.getCurrentUser(state),
    cancelOrderLoading: state.loading.cancelOrder,
    updateOrderStatusLoading: state.loading.updateOrderStatus,
    quotationSelectedId: state.quotation.selected,
    formValueContact: _formValueSelector(state, 'contactAddress'),
    formValueBilling: _formValueSelector(state, 'billingContact'),
    formValueClient: _formValueSelector(state, 'client'),
    formValueProduct: _formValueSelector(state, 'product'),
    formValueCharge: _formValueSelector(state, 'charge'),
    formValueServices: _formValueSelector(state, 'services'),
    formValueStatus: _formValueSelector(state, 'status')
  };
};
