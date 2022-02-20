import React, { useCallback } from 'react'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import Common, { helpers as EcommCommonHelpers } from '@golpasal/common'
import { ShipmentActions } from '../../../../../Redux/Shipment/actions'
import { getShipments } from '../../../../../Redux/selectors'

import Button from '../../../../Common/Button'
import Loading from '../../../../Common/Loading'
import {
  LeftColWrapper,
  RightColWrapper,
  RowWrapper
} from '../../../../App/Form/Wrapper'
import TrackingLogServices from './TrackingLogServices'
import Errors from '../../../../Form/Errors'
import Dropdown from '../../../../Form/Dropdown'
// import DatePicker from '../../../../Form/DatePicker';
import TextInput from '../../../../Form/TextInput'
import Form from '../../../../Form/Form'
import { Col, Row } from 'react-flexa'

const { ShipmentStatus } = Common.status
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const validate = (values) => {
  const errors = {
    tracking: {
      courier: null,
      no: null
    }
  }
  const tracking = values.tracking || {}
  const required = <FormattedMessage id={'error.required'} />

  if (!tracking.courier) {
    errors.tracking.courier = required
  }
  if (!tracking.no) {
    errors.tracking.no = required
  }

  return errors
}

const OrderShipmentForm = ({
  onSubmit,
  onSubmitSuccess,
  shipment,
  form,
  intl,
  loading,
  couriers,
  currentWorkspace,
  updateMode
}) => {
  const couriersOptions = []
  if (couriers) {
    couriers.forEach((v) => {
      couriersOptions.push({
        value: v._id,
        label: v.name && v.name[intl.locale] ? v.name[intl.locale] : ''
      })
    })
  }
  const disabled =
    shipment?.status === ShipmentStatus.COMPLETED ||
    shipment?.status === ShipmentStatus.CANCELLED
  return (
    <Form form={form} onSubmit={onSubmit} onSubmitSuccess={onSubmitSuccess}>
      <Loading isLoading={loading} />
      <Errors />
      <RowWrapper>
        <LeftColWrapper xs={12} md={6}>
          <Dropdown
            name="tracking.courier"
            label={intl.formatMessage({
              id: 'nav.couriers'
            })}
            options={couriersOptions}
            disabled={disabled}
          />
          <TextInput
            name="tracking.no"
            disabled={disabled}
            label={intl.formatMessage({
              id: 'display_tracking_no'
            })}
          />
        </LeftColWrapper>
        <RightColWrapper xs={12} md={6}>
          {updateMode && (
            <Dropdown
              name="status"
              label={intl.formatMessage({
                id: 'status'
              })}
              disabled={disabled}
              options={EcommCommonHelpers.getConstants(
                'status',
                'ShipmentStatus',
                intl.locale
              ).map((status) => ({
                label: status.text,
                value: status.value
              }))}
            />
          )}
        </RightColWrapper>
      </RowWrapper>

      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <TrackingLogServices
            name="tracking.logs"
            intl={intl}
            updateMode={updateMode}
          />
        </Col>
      </Row>

      {!updateMode && (
        <ButtonWrapper>
          <Button.Primary type="submit">
            {intl.formatMessage({ id: 'create_btn' })}
          </Button.Primary>
        </ButtonWrapper>
      )}

      {updateMode && !disabled && (
        <ButtonWrapper>
          <Button.Primary type="submit">
            {intl.formatMessage({ id: 'update_btn' })}
          </Button.Primary>
        </ButtonWrapper>
      )}
    </Form>
  )
}

const OrderShipmentFormContainer = connect(
  (state) => ({
    shipments: getShipments(state)
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getShipments: ShipmentActions.getShipments
      },
      dispatch
    )
)(
  ({
    getShipments,
    createTransacton,
    updateTransacton,
    form,
    initialValues = {},
    ...props
  }) => {
    const onSubmit = useCallback(
      (values) => {
        values?._id
          ? updateTransacton({ ...values })
          : createTransacton({ ...values })
      },
      [createTransacton, updateTransacton]
    )

    return (
      <OrderShipmentForm
        form={form}
        initialValues={initialValues}
        onSubmit={onSubmit}
        {...props}
      />
    )
  }
)

export default reduxForm({
  validate,
  destroyOnUnmount: true,
  initialValues: {}
})(OrderShipmentFormContainer)
