import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Common, { helpers as HelpersEcommCommon } from '@golpasal/common'
import moment from 'moment'
import { Col, Row } from 'react-flexa'

import FormName from '../../../../../Constants/Form'
import { ShipmentActions } from '../../../../../Redux/Shipment/actions'
import {
  getShipmentByOrderId,
  getCouriers
} from '../../../../../Redux/selectors'
import { CourierActions } from '../../../../../Redux/Courier/actions'

import Modal from '../../../../Modal'
import Button from '../../../../Common/Button'
import Card from '../../../../Common/Card'

import OrderShipmentForm from './OrderShipmentForm'

const { ShipmentStatus } = Common.status

const Container = styled.div`
  font-weight: 500;
  font-size: 15px;
  margin-left: 10px;
  margin-bottom: 20px;
`
const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
// const ShipmentStatusWrapper = styled.div`
//   display: flex;
// `;
// const ShipmentStatus = styled.div`
//   margin-left: 10px;
//   color: ${({ active }) => (active ? '#35dc35' : '#DC143C')};
// `;
const ShipmentList = styled.div``
const ShipmentItem = styled(Card)`
  margin-bottom: 10px;
  padding-bottom: 5px;
  cursor: pointer;
`
const ShipmentItemLabel = styled.div`
  margin-bottom: 5px;
`
const ShipmentItemValue = styled.div`
  display: flex;
  text-indent: 20px;
  margin-bottom: 10px;
`

const OrderShipment = ({
  intl,
  shipment,
  createShipment,
  updateShipment,
  getShipmentByOrderId,
  orderId,
  createShipmentLoading,
  currentWorkspace,
  formValueStatus,
  couriers
}) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [appendFormProps, setAppendFormProps] = useState({})

  const onModalClose = useCallback(() => {
    setModalOpen(false)
    if (appendFormProps.updateMode) {
      setAppendFormProps({})
    }
  }, [setModalOpen, appendFormProps, setAppendFormProps])
  let shipmentValue = {}
  if (shipment) {
    const courierId = shipment.tracking.courier && shipment.tracking.courier._id
    const courier = courierId
      ? shipment.tracking.courier
      : couriers
      ? couriers.find((v) => v._id === shipment.tracking.courier)
      : []
    shipmentValue = {
      ...shipment,
      tracking: {
        ...shipment.tracking,
        courier: courier
      }
    }
  }
  const onItemClick = useCallback(
    (item) => {
      setModalOpen(true)
      setAppendFormProps({
        updateMode: true,
        initialValues: {
          ...item,
          tracking: {
            ...item.tracking,
            courier:
              item.tracking.courier &&
              item.tracking.courier._id &&
              item.tracking.courier._id
                ? item.tracking.courier._id
                : item.tracking.courier
          }
        }
      })
    },
    [setModalOpen, setAppendFormProps]
  )

  const createTransacton = useCallback(
    (values) => {
      createShipment({
        order: orderId,
        status: ShipmentStatus.PENDING,
        ...values
      })
    },
    [createShipment, orderId]
  )

  const updateTransacton = useCallback(
    (values) => {
      updateShipment({
        ...values
      })
    },
    [updateShipment]
  )
  const onSubmitSuccess = useCallback(() => {
    setModalOpen(false)
    getShipmentByOrderId(orderId)
  }, [getShipmentByOrderId, orderId])

  const renderModalContent = useCallback(
    (closeModal) => {
      const form = appendFormProps.updateMode
        ? FormName.SHIPMENT_UPDATE
        : FormName.SHIPMENT_CREATE
      return (
        <OrderShipmentForm
          key={form}
          intl={intl}
          closeModal={closeModal}
          couriers={couriers}
          shipment={shipment}
          createTransacton={createTransacton}
          updateTransacton={updateTransacton}
          createShipment={createShipment}
          updateShipment={updateShipment}
          loading={createShipmentLoading}
          onSubmitSuccess={onSubmitSuccess}
          currentWorkspace={currentWorkspace}
          {...appendFormProps}
          form={form}
        />
      )
    },
    [
      intl,
      shipment,
      createTransacton,
      updateTransacton,
      createShipment,
      updateShipment,
      couriers,
      createShipmentLoading,
      onSubmitSuccess,
      currentWorkspace,
      appendFormProps
    ]
  )
  const shipmentStatusResult = shipment
    ? HelpersEcommCommon.getConstantByValue(
        'status',
        'ShipmentStatus',
        shipment.status,
        intl.locale
      )
    : null
  return (
    <Container>
      <ListHeader>
        {!shipment && (
          <Button type="button" onClick={() => setModalOpen(true)}>
            <FormattedMessage id="order_add_shipment_display" />
          </Button>
        )}
      </ListHeader>
      <ShipmentList>
        {shipment ? (
          <ShipmentItem onClick={() => onItemClick(shipment)}>
            <Row>
              <Col xs={12} sm={12} md={6}>
                <ShipmentItemLabel>
                  {intl.formatMessage({
                    id: 'nav.couriers'
                  })}
                  {intl.formatMessage({
                    id: 'display_name'
                  })}
                </ShipmentItemLabel>
                <ShipmentItemValue>
                  {shipmentValue &&
                  shipmentValue.tracking &&
                  shipmentValue.tracking.courier &&
                  shipmentValue.tracking.courier.name &&
                  shipmentValue.tracking.courier.name[intl.locale]
                    ? shipmentValue.tracking.courier.name[intl.locale]
                    : '-'}
                </ShipmentItemValue>
              </Col>
              <Col xs={12} sm={12} md={6}>
                <ShipmentItemLabel>
                  {intl.formatMessage({
                    id: 'status'
                  })}
                </ShipmentItemLabel>
                <ShipmentItemValue>
                  {shipmentStatusResult ? shipmentStatusResult.text : '-'}
                </ShipmentItemValue>
              </Col>
            </Row>

            <ShipmentItemLabel>
              {intl.formatMessage({
                id: 'display_tracking_no'
              })}
            </ShipmentItemLabel>
            <ShipmentItemValue>
              {shipment.tracking && shipment.tracking.no
                ? shipment.tracking.no
                : '-'}
            </ShipmentItemValue>
            <ShipmentItemLabel>
              {intl.formatMessage({
                id: 'nav.log'
              })}
            </ShipmentItemLabel>
            {shipment &&
              shipment.tracking &&
              shipment.tracking.logs.map((v, index) => {
                return (
                  <Card key={index}>
                    <ShipmentItemLabel>
                      {intl.formatMessage({
                        id: 'date'
                      })}
                    </ShipmentItemLabel>
                    <ShipmentItemValue>
                      {v.time
                        ? moment(v.time).format('YYYY-MM-DD HH:mm:ss')
                        : '-'}
                    </ShipmentItemValue>
                    <ShipmentItemLabel>
                      {intl.formatMessage({
                        id: 'display_order_remarks'
                      })}
                    </ShipmentItemLabel>
                    <ShipmentItemValue>
                      {v.remarks ? v.remarks : '-'}
                    </ShipmentItemValue>
                  </Card>
                )
              })}
          </ShipmentItem>
        ) : undefined}
      </ShipmentList>
      <Modal.Default
        shouldOpenModal={modalOpen}
        title={intl.formatMessage({
          id: appendFormProps.updateMode
            ? 'order_shipment_detail_display'
            : 'create_btn'
        })}
        onModalClose={onModalClose}
        content={renderModalContent}
      />
    </Container>
  )
}

export default connect(
  (state, { orderId }) => ({
    shipment: getShipmentByOrderId(state, orderId),
    couriers: getCouriers(state),
    createShipmentLoading: state.form[FormName.SHIPMENT_CREATE]
      ? state.form[FormName.SHIPMENT_CREATE].submiting
      : false
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getCouriers: CourierActions.getCouriers,
        getShipmentByOrderId: ShipmentActions.getShipmentByOrderId,
        createShipment: ShipmentActions.createShipment,
        updateShipment: ShipmentActions.updateShipment
      },
      dispatch
    )
)(OrderShipment)
