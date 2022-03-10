import React from 'react'
import { reduxForm } from 'redux-form'
import styled from 'styled-components'
import { Tabs } from 'antd'
import { Modal } from 'antd'
import Common from '@golpasal/common'

import ContentLoader from '../../../Common/ContentLoader'
import Title from '../../../Common/Title'
import _Card from '../../../Common/Card'

import {
  RowWrapper,
  LeftColWrapper,
  RightColWrapper,
  ColWrapper
} from '../../Form/Wrapper'
import Errors from '../../../Form/Errors'
import Form from '../../../Form/Form'
import TextInput from '../../../Form/TextInput'

import Button from '../../../Common/Button'
import Checkbox from '../../../Common/Checkbox'

import OrderSold from '../Form/OrderSold'
import OrderDate from '../Form/OrderDate'
import OrderPaymentBy from '../Form/OrderPaymentBy'
import OrderNumber from '../Form/OrderNumber'
import OrderQuotationNumber from '../Form/OrderQuotationNumber'
import OrderStatusBar from '../Form/OrderStatusBar'
import OrderProducts from '../Form/OrderProducts'
import OrderCharge from '../Form/OrderCharge'
import OrderAddressInput from '../Form/OrderAddressForm/OrderAddressInput'
import OrderPayment from '../Form/OrderPayment/OrderPayment'
import OrderShipment from '../Form/OrderShipment/OrderShipment'
import OrderChargeServices from '../Form/OrderChargeServices'
import OrderChargeOthers from '../Form/OrderChargeOthers'
import CopyTextContainer from '../../../App/CopyTextContainer'
import ShipmentStatusBar from './OrderShipment/ShipmentStatusBar'
import OrderLog from './OrderLog'
import {
  validate,
  asyncValidate,
  shouldAsyncValidate
} from '../../../../Containers/Order/OrderFormUtils'

const { OrderStatus, ShipmentStatus } = Common.status

const Card = styled(_Card)`
  margin: 10px 0;
`

const OrderStatusBarWrapper = styled(Card)`
  margin-top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`

const DetailInfoWrapper = styled.div``
const CancelButton = styled.div`
  cursor: pointer;
  color: #999;
  text-decoration-line: underline;
  margin-right: 30px;
`

const OrderForm = ({
  asyncValidating,
  form,
  intl,
  onSubmit,
  onSubmitSuccess,
  onSubmitFail,
  currentWorkspace,
  currentWorkspaceType,
  cancelOrder,
  initialValues,
  pristine,
  submitting,
  updateMode,
  updateOrderStatus,
  updateShipmentStatus,
  orderId,
  payment,
  couriers,
  shipment,
  updateDefaultAddressloading,
  formValueClient,
  formValueStatus,
  sameContactChecked,
  setSameContactChecked,
  checkoutUrl,
  checkoutLoading,
  touchAllField,
  getFormTexts
}) => {
  const canEditAddress = !updateMode || formValueStatus < OrderStatus.SHIPPED

  const allowEdit = currentWorkspace?.preferences?.order?.allowEdit
  const renderButtons = () => {
    const _onSubmit = () => {
      touchAllField()
    }
    const disabledButton = submitting || asyncValidating

    if (updateMode) {
      return (
        <Button.Primary
          disabled={pristine || disabledButton}
          type="submit"
          onClick={_onSubmit}
          style={{ width: '100%' }}
        >
          {intl.formatMessage({
            id: 'order_update'
          })}
        </Button.Primary>
      )
    }
    return (
      <Button.Primary
        disabled={disabledButton}
        loading={asyncValidating}
        type="submit"
        onClick={_onSubmit}
        style={{ width: '100%' }}
      >
        {intl.formatMessage({
          id: 'order_create'
        })}
      </Button.Primary>
    )
  }

  const renderStatusButton = () => {
    const confirm = (title, callback) =>
      Modal.confirm({
        title: intl.formatMessage({
          id: title
        }),
        okText: intl.formatMessage({ id: 'display_yes' }),
        cancelText: intl.formatMessage({ id: 'cancel' }),
        onOk: () => {
          callback()
          return Promise.resolve()
        }
      })
    const cancel = (
      <CancelButton
        onClick={() => confirm('msg.update_order_status', cancelOrder)}
      >
        {intl.formatMessage({
          id: 'display_order_cancel'
        })}
      </CancelButton>
    )
    const ship = (
      <Button.Primary
        margin={false}
        type="button"
        onClick={() =>
          confirm('msg.update_order_status', () =>
            updateOrderStatus(OrderStatus.SHIPPED)
          )
        }
      >
        {intl.formatMessage({
          id: 'display_order_ship'
        })}
      </Button.Primary>
    )
    const complete = (
      <Button.Primary
        margin={false}
        type="button"
        onClick={() =>
          confirm('msg.update_order_status', () =>
            updateOrderStatus(OrderStatus.COMPLETED)
          )
        }
      >
        {intl.formatMessage({
          id: 'display_order_complete'
        })}
      </Button.Primary>
    )
    const checkout = (
      <CopyTextContainer text={checkoutUrl}>
        {({ onCopy }) => (
          <Button.Primary
            margin={false}
            type="button"
            disabled={checkoutLoading}
            loading={checkoutLoading}
            onClick={onCopy}
          >
            {intl.formatMessage({
              id: 'display_copy_checkout_link'
            })}
          </Button.Primary>
        )}
      </CopyTextContainer>
    )

    switch (formValueStatus) {
      case OrderStatus.PENDING_PAYMENT:
        return (
          <>
            {cancel} {checkout}
          </>
        )
      case OrderStatus.PREPARE_SHIPMENT:
        return (
          <>
            {cancel} {ship}
          </>
        )
      case OrderStatus.SHIPPED:
        return <>{complete}</>
      case OrderStatus.COMPLETED:
      default:
    }
    return null
  }

  const renderShipmentStatusButton = () => {
    const confirm = (title, callback) =>
      Modal.confirm({
        title: intl.formatMessage({
          id: title
        }),
        okText: intl.formatMessage({ id: 'display_yes' }),
        cancelText: intl.formatMessage({ id: 'cancel' }),
        onOk: () => {
          callback()
          return Promise.resolve()
        }
      })
    const cancel = (
      <CancelButton
        margin={false}
        type="button"
        onClick={() =>
          confirm('msg.update_shipment_status', () =>
            updateShipmentStatus(shipment._id, ShipmentStatus.CANCELLED)
          )
        }
      >
        {intl.formatMessage({
          id: 'display_cancel'
        })}
      </CancelButton>
    )
    const inProgress = (
      <Button.Primary
        margin={false}
        type="button"
        onClick={() =>
          confirm('msg.update_shipment_status', () =>
            updateShipmentStatus(shipment._id, ShipmentStatus.IN_PROGRESS)
          )
        }
      >
        {intl.formatMessage({
          id: 'display_inProgress'
        })}
      </Button.Primary>
    )
    const complete = (
      <Button.Primary
        margin={false}
        type="button"
        onClick={() =>
          confirm('msg.update_shipment_status', () =>
            updateShipmentStatus(shipment._id, ShipmentStatus.COMPLETED)
          )
        }
      >
        {intl.formatMessage({
          id: 'display_complete'
        })}
      </Button.Primary>
    )

    switch (shipment.status) {
      case ShipmentStatus.PENDING:
        return (
          <>
            {cancel} {inProgress}
          </>
        )
      case ShipmentStatus.IN_PROGRESS:
        return <>{complete}</>
      case ShipmentStatus.COMPLETED:
      default:
    }
    return null
  }

  const orderForm = (
    <RowWrapper>
      {updateMode && (
        <LeftColWrapper xs={12}>
          <OrderStatusBarWrapper>
            <OrderStatusBar
              name="status"
              intl={intl}
              formValueStatus={formValueStatus}
              initialValues={initialValues}
              renderStatusButton={renderStatusButton}
            />
          </OrderStatusBarWrapper>
        </LeftColWrapper>
      )}
      <LeftColWrapper xs={12} md={8}>
        <Card style={{ marginTop: 0, paddingLeft: 20 }}>
          <Tabs type="card" tabBarStyle={{ marginBottom: 0 }}>
            <Tabs.TabPane
              tab={intl.formatMessage({ id: 'tab_order_base' })}
              key="1"
            >
              <div
                style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}
              >
                <OrderSold
                  name="workspace"
                  intl={intl}
                  currentWorkspace={currentWorkspace}
                  updateMode={updateMode}
                />
                <DetailInfoWrapper>
                  <div style={{ width: '45%' }}>
                    <OrderNumber name="orderNo" updateMode={updateMode} />
                    <OrderQuotationNumber
                      name="quotationObject"
                      updateMode={updateMode}
                    />
                    <OrderDate name="date" updateMode={updateMode} />
                  </div>
                  <OrderPaymentBy
                    payment={payment}
                    intl={intl}
                    style={{ marginBottom: 0 }}
                    updateMode={updateMode}
                  />
                  <TextInput
                    name="remarks"
                    rows={4}
                    placeholder=" "
                    label={intl.formatMessage({ id: 'display_remarks' })}
                  />
                </DetailInfoWrapper>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={intl.formatMessage({ id: 'tab_order_log' })}
              key="2"
            >
              <div
                style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 15 }}
              >
                <OrderLog
                  orderId={orderId}
                  intl={intl}
                  updateMode={updateMode}
                />
              </div>
            </Tabs.TabPane>
          </Tabs>
        </Card>
        <Card style={{ paddingBottom: 10, paddingTop: 10 }}>
          <OrderProducts
            name="product.items"
            editMode={
              !updateMode || formValueStatus <= OrderStatus.PENDING_PAYMENT
            }
            intl={intl}
            workspaceType={currentWorkspaceType}
            isQuotation={initialValues.isQuotation}
            formValueStatus={formValueStatus}
          />
        </Card>
      </LeftColWrapper>
      <RightColWrapper xs={12} md={4}>
        <Card style={{ marginTop: 0, minHeight: 147 }}>
          {!updateDefaultAddressloading ? (
            <OrderAddressInput
              form={form}
              intl={intl}
              updateMode={updateMode}
              name="contactAddress"
              label={intl.formatMessage({ id: 'order_contact_display' })}
              formValueClient={formValueClient}
              disabled={!canEditAddress}
              pickup
            />
          ) : (
            <ContentLoader
              width="100%"
              height={105}
              speed={1.5}
              primaryColor="#f3f3f3"
              secondaryColor="#ececec"
              style={{ width: '100%' }}
            >
              <rect x="0" y="0" rx="0.25" ry="0.25" width="100%" height="17" />
              <rect x="0" y="28" rx="0.25" ry="0.25" width="100%" height="17" />
              <rect x="0" y="56" rx="0.25" ry="0.25" width="100%" height="17" />
              <rect x="0" y="84" rx="0.25" ry="0.25" width="100%" height="17" />
            </ContentLoader>
          )}
          <OrderAddressInput
            form={form}
            intl={intl}
            updateMode={updateMode}
            name="billingContact"
            label={intl.formatMessage({ id: 'order_billing_contact_display' })}
            formValueClient={formValueClient}
            hiddenEditButton={sameContactChecked}
            disabled={!canEditAddress}
            renderRight={
              canEditAddress && (
                <Checkbox
                  checked={sameContactChecked}
                  labelIndent={5}
                  containerStyle={{ marginRight: 10 }}
                  onChange={setSameContactChecked}
                  label={intl.formatMessage({
                    id: 'order_same_contact_display'
                  })}
                />
              )
            }
          />
        </Card>
        <Card style={{ paddingBottom: 10, paddingTop: 10 }}>
          <OrderChargeServices
            name="services"
            intl={intl}
            updateMode={updateMode}
            formValueStatus={formValueStatus}
          />
        </Card>
        <Card style={{ paddingBottom: 10, paddingTop: 10 }}>
          <OrderChargeOthers
            name="charge.others"
            intl={intl}
            updateMode={updateMode}
            formValueStatus={formValueStatus}
          />
        </Card>
        <Card>
          <OrderCharge
            name="charge"
            form={form}
            intl={intl}
            getFormTexts={getFormTexts}
            updateMode={updateMode}
          />
          {allowEdit && renderButtons()}
        </Card>
      </RightColWrapper>
    </RowWrapper>
  )
  return (
    <Form
      name={form}
      onSubmit={onSubmit}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
    >
      <Errors />
      <Title.Wrapper>
        <Title>{intl.formatMessage({ id: 'nav.orders' })}</Title>
        {/* <Title.Right>{updateMode && renderStatusButton()}</Title.Right> */}
      </Title.Wrapper>
      {!updateMode ? (
        orderForm
      ) : (
        <Tabs
          hideAdd
          type="card"
          tabBarStyle={{
            marginBottom: 0,
            zIndex: 5,
            position: 'relative',
            top: 1
          }}
        >
          <Tabs.TabPane
            tab={intl.formatMessage({ id: 'order_detail_display' })}
            key="1"
          >
            {orderForm}
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={intl.formatMessage({ id: 'order_payment_detail_display' })}
            key="2"
          >
            <RowWrapper>
              <ColWrapper xs={12}>
                <Card style={{ marginTop: 0 }}>
                  <OrderPayment
                    name="payment"
                    intl={intl}
                    formValueStatus={formValueStatus}
                    orderId={orderId}
                    currentWorkspace={currentWorkspace}
                  />
                </Card>
              </ColWrapper>
            </RowWrapper>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={intl.formatMessage({ id: 'order_shipment_detail_display' })}
            key="3"
          >
            <RowWrapper>
              <ColWrapper xs={12}>
                <Card style={{ marginTop: 0 }}>
                  {updateMode && shipment && (
                    <LeftColWrapper xs={12}>
                      <OrderStatusBarWrapper>
                        <ShipmentStatusBar
                          name="shipment.status"
                          valueStatus={shipment.status}
                          intl={intl}
                          renderStatusButton={renderShipmentStatusButton}
                        />
                      </OrderStatusBarWrapper>
                    </LeftColWrapper>
                  )}
                  <OrderShipment
                    name="shipment"
                    intl={intl}
                    couriers={couriers}
                    formValueStatus={formValueStatus}
                    orderId={orderId}
                    currentWorkspace={currentWorkspace}
                  />
                </Card>
              </ColWrapper>
            </RowWrapper>
          </Tabs.TabPane>
        </Tabs>
      )}
    </Form>
  )
}

export default reduxForm({
  validate,
  asyncValidate,
  shouldAsyncValidate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {}
})(OrderForm)
