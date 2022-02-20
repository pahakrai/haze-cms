import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import * as Common from '@golpasal/common'
import { change as formValueChange, touch as formTouchAction } from 'redux-form'

import Loading from '../../Components/Common/Loading'
import OrderDefaultForm from '../../Components/App/Order/Form'
import { ShipmentActions } from '../../Redux/Shipment/actions'
import { CourierActions } from '../../Redux/Courier/actions'

import { OrderActions } from '../../Redux/Order/actions'
import { PaymentActions } from '../../Redux/Payment/actions'
import ResourcesActions from '../../Redux/Resources/actions'

import * as OrderFormUtils from './OrderFormUtils'

class OrderEducationFormContainer extends React.PureComponent {
  state = {
    updateDefaultAddressloading: false,
    sameContactChecked: false,
    checkoutLoading: false
  }

  componentDidMount() {
    OrderFormUtils.componentDidMount(this)
  }

  onSubmit = async (order) => {
    OrderFormUtils.onSubmit(order, this)
  }

  onSubmitSuccess = () => {
    OrderFormUtils.onSubmitSuccess(this)
  }

  onSubmitFail = () => {
    OrderFormUtils.onSubmitFail(this)
  }

  getInitialValues = () => {
    const { order, updateMode, initialValues } = this.props
    const createValue = {
      orderType: Common.default.type.OrderType.EDUCATION,
      date: this.date,
      ...initialValues
    }
    return updateMode
      ? {
          ...OrderFormUtils.getUpdateModeInitialValues(order),
          eventCampaigns:
            order && order.eventCampaigns
              ? [...order.eventCampaigns].map(
                  (v) => v.eventCampaign && v.eventCampaign._id
                )
              : []
        }
      : createValue
  }

  componentDidUpdate(prevProps) {
    OrderFormUtils.componentDidUpdate(prevProps, this)
  }

  onSameContactClick = () => {
    OrderFormUtils.onSameContactClick(this)
  }

  cancelOrder = () => {
    OrderFormUtils.cancelOrder(this)
  }
  updateOrderStatus = (...args) => {
    OrderFormUtils.updateOrderStatus(this, ...args)
  }

  updateShipmentStatus = (...args) => {
    OrderFormUtils.updateShipmentStatus(this, ...args)
  }

  updateCheckOutUrl = () => {
    OrderFormUtils.updateCheckOutUrl(this)
  }
  onCopyRawText = () => {
    OrderFormUtils.onCopyRawText(this)
  }
  touchAllField = () => {
    OrderFormUtils.touchAllField(this)
  }
  getFormTexts = () => OrderFormUtils.getFormTexts(this)

  render() {
    const {
      updateMode,
      order,
      form,
      intl,
      currentWorkspaceType,
      cancelOrderLoading,
      currentWorkspace,
      formValueClient,
      formValueStatus,
      updateOrderStatusLoading,
      updateShipmentStatusLoading,
      orderId,
      payment,
      shipment,
      couriers
    } = this.props
    const {
      updateDefaultAddressloading,
      sameContactChecked,
      checkoutUrl,
      checkoutLoading
    } = this.state
    const initialValues = this.getInitialValues()

    const loading = updateMode && !order

    return loading ? (
      <Loading isLoading={loading} fill />
    ) : (
      <OrderDefaultForm
        key={order ? order._id : 'new'}
        form={form}
        initialValues={initialValues}
        onSubmit={this.onSubmit}
        onSubmitFail={this.onSubmitFail}
        onSubmitSuccess={this.onSubmitSuccess}
        //  others
        intl={intl}
        orderId={orderId}
        couriers={couriers}
        shipment={shipment}
        payment={payment}
        updateMode={updateMode}
        formValueClient={formValueClient}
        formValueStatus={formValueStatus}
        currentWorkspace={currentWorkspace}
        currentWorkspaceType={currentWorkspaceType}
        cancelOrder={this.cancelOrder}
        updateOrderStatus={this.updateOrderStatus}
        updateShipmentStatus={this.updateShipmentStatus}
        onCopyRawText={this.onCopyRawText}
        touchAllField={this.touchAllField}
        getFormTexts={this.getFormTexts}
        sameContactChecked={sameContactChecked}
        setSameContactChecked={this.onSameContactClick}
        checkoutUrl={checkoutUrl}
        checkoutLoading={checkoutLoading}
        cancelOrderLoading={cancelOrderLoading}
        updateOrderStatusLoading={updateOrderStatusLoading}
        updateShipmentStatusLoading={updateShipmentStatusLoading}
        updateDefaultAddressloading={updateDefaultAddressloading}
      />
    )
  }
}
const mapStateToProps = OrderFormUtils.mapStateToProps
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createOrder: OrderActions.createOrder,
      updateOrder: OrderActions.updateOrder,
      cancelOrder: OrderActions.cancelOrder,
      updateOrderStatus: OrderActions.updateOrderStatus,
      updateShipmentStatus: ShipmentActions.updateShipmentStatus,
      getOrders: OrderActions.getOrders,
      getOrderById: OrderActions.getOrderById,
      getShipments: ShipmentActions.getShipments,
      getCouriers: CourierActions.getCouriers,
      getShipmentByOrderId: ShipmentActions.getShipmentByOrderId,
      getPaymentByOrderId: PaymentActions.getPaymentByOrderId,
      removeOrder: ResourcesActions.removeOrder,
      formValueChange,
      formTouchAction
    },
    dispatch
  )
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderEducationFormContainer))
