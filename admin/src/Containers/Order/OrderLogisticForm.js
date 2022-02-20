import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector, change as formValueChange } from 'redux-form';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import Common from '@golpasal/common';
import cloneDeep from 'lodash/cloneDeep';

import { toast } from '../../Lib/Toast';
import { formatUserName } from '../../Lib/util';

import OrderLogisticForm from '../../Components/App/Order/OrderLogisticForm';
import Loading from '../../Components/Common/Loading';
import {
  getAllUnitOfMeasure,
  getAllVehicleType,
  getUserById
} from '../../Redux/selectors';
import { UnitOfMeasureActions } from '../../Redux/UnitOfMeasure/actions';
import { VehicleTypeActions } from '../../Redux/VehicleType/actions';
import AccountSelector from '../../Redux/Account/selectors';
import { OrderActions } from '../../Redux/Order/actions';
import CheckoutService from '../../Services/APIServices/CheckoutService';
import OrderService from '../../Services/APIServices/OrderService';
import FormName from '../../Constants/Form';
import { generateOrderPriceByPriceType } from './utils';

const { OrderType, OrderLogisticLocationType } = Common.type;
const { TravelOrderStatus } = Common.status;

class OrderLogisticFormContainer extends React.Component {
  static defaultProps = {
    onSubmitSuccess: () => true
  };
  state = {
    checkoutLoading: false,
    checkoutUrl: ''
  };
  componentDidMount() {
    const {
      orderId,
      updateMode,
      getAllUnitOfMeasure,
      getAllVehicleType
    } = this.props;
    getAllUnitOfMeasure();
    getAllVehicleType({ isActive: true });
    this.date = new Date().toISOString();
    orderId && updateMode && this.updateCheckOutUrl();
  }

  async componentDidUpdate(prevProps) {
    const {
      getOrderErrors,
      history,
      orderId,
      updateMode,
      form,
      formValueLogisticItems,
      formValueClient,
      formValueClientObject,
      formValueContact,
      formValueChange
    } = this.props;

    if (updateMode && prevProps.orderId !== orderId && orderId) {
      this.updateCheckOutUrl();
    }

    const prevCapacity = prevProps.formValueLogisticItems;
    if (
      JSON.stringify(prevProps.formValueLogisticItems) !==
      JSON.stringify(formValueLogisticItems)
    ) {
      formValueLogisticItems &&
        formValueLogisticItems.forEach((v, index) => {
          if (
            v &&
            v.dimensions?.length > 0 &&
            v.dimensions?.height > 0 &&
            v.dimensions?.width > 0 &&
            v.dimensions?.unit &&
            v.weight &&
            v.weightUnit &&
            (prevCapacity?.dimensions?.length !== v?.dimensions?.length ||
              prevCapacity?.dimensions?.height !== v?.dimensions?.height ||
              prevCapacity?.dimensions?.width !== v?.dimensions?.width ||
              prevCapacity?.dimensions?.unit !== v?.dimensions?.unit ||
              prevCapacity?.weight !== v?.weight ||
              prevCapacity?.weightUnit !== v?.weightUnit ||
              prevCapacity?.weight2 !== v?.weight2 ||
              prevCapacity?.weightUnit2 !== v?.weightUnit2)
          ) {
            return this.getCbmAndRt(v, index);
          }
        });
    }

    // update contact
    if (
      formValueClient !== prevProps.formValueClient &&
      !formValueContact?.name &&
      !formValueContact?.phone &&
      formValueClientObject
    ) {
      formValueChange(
        form,
        'contact.name',
        formatUserName(formValueClientObject)
      );
      formValueChange(form, 'contact.phone', formValueClientObject.phone);
    }

    if (getOrderErrors) {
      history.push('/error');
    }
  }

  async getCbmAndRt(v, index) {
    const { formValueChange, form, formValueLogisticItems } = this.props;
    if (formValueLogisticItems) {
      const { data } = await OrderService.getCbmAndRt(v);
      formValueChange(form, `logisticItems[${index}].rt`, data?.rt);
      formValueChange(form, `logisticItems[${index}].cbm`, data?.cbm);
    }
  }

  updateCheckOutUrl = async () => {
    try {
      const { orderId, currentWorkspace } = this.props;
      this.setState({ checkoutLoading: true });
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

      this.setState({ checkoutUrl: url });
    } catch (e) {
    } finally {
      this.setState({ checkoutLoading: false });
    }
  };

  onSubmit = order => {
    const { createOrder, updateOrder } = this.props;
    const fn = order._id ? updateOrder : createOrder;
    const formValues = {
      ...order,
      logistic: {
        ...((order && order.logistic) || {}),
        logisticItems: order.logisticItems
      }
    };
    delete formValues.signature;
    fn(formValues);
  };

  getInitialValues = () => {
    const { order, updateMode, initialValues, currentWorkspace } = this.props;
    const locationType = currentWorkspace?.preferences?.order?.locationType;
    const createValue = {
      date: this.date,
      time: { duration: 0 },
      logistic:
        locationType === OrderLogisticLocationType.LOCATION
          ? { locTo: [{}] }
          : {},
      orderType: OrderType.LOGISTICS,
      ...initialValues
    };
    if (updateMode) {
      const updateValue = {
        ...order,
        logistic: {
          ...((order && order.logistic) || {}),
          locFr: {
            ...((order && order.logistic && order.logistic.locFr) || {}),
            properties: {
              ...order.logistic?.locFr?.properties,
              district: order?.logistic?.locFr?.properties?.district?._id
            }
          },
          locTo: [
            ...((order && order.logistic && order.logistic.locTo) || [])
          ].map(v => {
            const _locToObj = cloneDeep(v);
            const district = _locToObj?.properties?.district?._id;
            _locToObj.properties.district = district;
            return _locToObj;
          }),
          peopleInCharge: [
            ...((order && order.logistic && order.logistic.peopleInCharge) ||
              [])
          ].map(v => v._id)
        },
        logisticItems: order?.logisticItems || [],
        time: { ...((order && order.time) || {}) },
        services:
          order && order.services
            ? [...order.services].map(v => ({
                ...v,
                service: v.service._id
              }))
            : [],

        driver:
          order &&
          order.logistic &&
          order.logistic.peopleInCharge &&
          order.logistic.peopleInCharge[0]
      };
      delete updateValue.logistic.order;
      delete updateValue.time.order;

      return updateValue;
    } else {
      return createValue;
    }
  };

  onSubmitSuccess = () => {
    const {
      updateMode,
      history,
      onSubmitSuccess,
      orderSelectedId
    } = this.props;
    toast.success(
      <FormattedMessage
        id={updateMode ? 'updated_successfully' : 'created_successfully'}
      />
    );
    onSubmitSuccess && onSubmitSuccess();
    if (orderSelectedId && !updateMode) {
      history.push('/orders/' + orderSelectedId);
    } else {
      this.componentDidMount();
    }
  };

  onSubmitFail = () => {
    const { updateMode } = this.props;
    toast.error(
      <FormattedMessage
        id={updateMode ? 'updated_failure' : 'created_failure'}
      />
    );
  };

  cancelOrder = () => {
    const { cancelOrder, cancelOrderLoading, orderId } = this.props;
    !cancelOrderLoading && cancelOrder(orderId);
  };
  updateOrderStatus = status => {
    const { updateOrderStatus, updateOrderStatusLoading, orderId } = this.props;
    !updateOrderStatusLoading && updateOrderStatus(orderId, status);
  };
  getAmountText = () => {
    const { formValueCharge, intl } = this.props;
    return generateOrderPriceByPriceType(intl, formValueCharge);
  };
  render() {
    const key = this.props.order ? this.props.order._id : 'new';
    let isLoading = false; // dummy
    const {
      updateMode,
      intl,
      order,
      form,
      formValueType,
      cancelOrderLoading,
      formValueScheduleTime,
      formValueOrderNo,
      orderId,
      formValueStatus,
      formValueDriver,
      formValueLogisticItems,
      currentWorkspace,
      unitOfMeasures,
      formValueVehicleType,
      vehicleTypes
    } = this.props;
    const { checkoutUrl, checkoutLoading } = this.state;
    if (updateMode && !order) {
      isLoading = true;
    }
    const hasConsignee = currentWorkspace?.preferences?.order?.hasConsignee;
    const initialValues = this.getInitialValues();
    const orderDisabled =
      initialValues.status === TravelOrderStatus.ARRIVE_DESTINATION;
    return isLoading ? (
      <Loading />
    ) : (
      <OrderLogisticForm
        // form props
        key={key}
        form={form}
        disabled={orderDisabled}
        onSubmit={this.onSubmit}
        onSubmitFail={this.onSubmitFail}
        onSubmitSuccess={this.onSubmitSuccess}
        updateMode={updateMode}
        initialValues={initialValues}
        hasConsignee={hasConsignee}
        // other props
        intl={intl}
        orderId={orderId}
        vehicleTypes={vehicleTypes}
        formValueLogisticItems={formValueLogisticItems}
        formValueVehicleType={formValueVehicleType}
        unitOfMeasures={unitOfMeasures}
        currentWorkspace={currentWorkspace}
        checkoutUrl={checkoutUrl}
        checkoutLoading={checkoutLoading}
        cancelOrder={this.cancelOrder}
        cancelOrderLoading={cancelOrderLoading}
        updateOrderStatus={this.updateOrderStatus}
        formValueType={formValueType}
        formValueStatus={formValueStatus}
        formValueScheduleTime={formValueScheduleTime}
        formValueOrderNo={formValueOrderNo}
        formValueDriver={formValueDriver}
        amountText={this.getAmountText()}
      />
    );
  }
}
const mapStateToProps = (state, { orderId, order }) => {
  const { ORDER_CREATE, ORDER_UPDATE } = FormName;
  const updateMode = Boolean(orderId);
  const form = updateMode ? ORDER_UPDATE : ORDER_CREATE;
  const selector = formValueSelector(form);
  const currentWorkspace = AccountSelector.getCurrentWorkspace(state);
  const formValueClient = selector(state, 'client');
  const formValueClientObject = getUserById(state, formValueClient);

  return {
    form,
    order,
    getOrderErrors: state.error.getOrder,
    updateMode,
    updateOrderStatusLoading: state.loading.updateOrderStatus,
    formValueStatus: selector(state, 'status'),
    formValueType: selector(state, 'type'),
    formValueScheduleTime: selector(state, 'scheduleTime'),
    formValueOrderNo: selector(state, 'orderNo'),
    formValueCharge: selector(state, 'charge'),
    formValueDriver: selector(state, 'driver'),
    formValueLogisticItems: selector(state, 'logisticItems'),
    formValueVehicleType: selector(state, 'logistic.vehicleType'),
    formValueContact: selector(state, 'contact'),
    formValueClient,
    formValueClientObject,
    cancelOrderLoading: state.loading.cancelOrder,
    unitOfMeasures: getAllUnitOfMeasure(state),
    vehicleTypes: getAllVehicleType(state),
    currentWorkspace,
    // releaseOrderLoading: state.loading.releaseOrder,
    orderSelectedId: state.order.selected
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createOrder: OrderActions.createOrder,
      updateOrder: OrderActions.updateOrder,
      cancelOrder: OrderActions.cancelOrder,
      updateOrderStatus: OrderActions.updateOrderStatus,
      getAllUnitOfMeasure: UnitOfMeasureActions.getAllUnitOfMeasure,
      getAllVehicleType: VehicleTypeActions.getAllVehicleType,
      // releaseOrder: OrderActions.releaseOrder,
      formValueChange
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderLogisticFormContainer)
);
