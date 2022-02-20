import React, { PureComponent } from 'react'
import { Field } from 'redux-form'
import styled from 'styled-components'
import Common from '@golpasal/common'
import moment from 'moment'
import StepLine from '../../../Common/StepLine'
import Button from '../../../Common/Button'
import { FormattedMessage } from 'react-intl'

const {
  OrderStatus: {
    CANCELLED,
    PENDING_PAYMENT,
    PREPARE_SHIPMENT,
    SHIPPED,
    COMPLETED
  }
} = Common.status

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const CancelWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  height: 79px;
`
const CancelIcon = styled.img`
  height: 40px;
`
const CancelText = styled.div`
  margin-left: 8px;
  font-size: 16px;
`

export class OrderStatusBar extends PureComponent {
  render() {
    const { input, intl, renderStatusButton, initialValues, formValueStatus } =
      this.props
    const OrderStatusLocale = Common.locales[intl.locale].status.OrderStatus
    const statusOptions = [
      [PENDING_PAYMENT, OrderStatusLocale.PENDING_PAYMENT], //0
      [PREPARE_SHIPMENT, OrderStatusLocale.PREPARE_SHIPMENT], //10
      [SHIPPED, OrderStatusLocale.SHIPPED], //50
      [COMPLETED, OrderStatusLocale.COMPLETED] //100
      // [
      //   101,
      //   intl.formatMessage({
      //     id: 'display_order_commentd'
      //   })
      // ]
    ].map((v) => ({ label: v[1], value: v[0] }))
    const statusText = [
      [CANCELLED, 'display_order_canceled'],
      [
        PENDING_PAYMENT,
        'display_order_status_bar_pending_payment_title',
        'display_order_status_bar_pending_payment_text'
      ],
      [
        PREPARE_SHIPMENT,
        'display_order_status_bar_prepare_shipment_title',
        'display_order_status_bar_prepare_shipment_text'
      ],
      [
        SHIPPED,
        'display_order_status_bar_shipped_title',
        'display_order_status_bar_shipped_text'
      ],
      [
        COMPLETED,
        'display_order_status_bar_completed_title',
        'display_order_status_bar_completed_text'
      ]
    ].reduce(
      (r, v) => ({ ...r, [v[0]]: { title: v[1], text: v[2] || v[1] } }),
      {}
    )
    const canceled = input.value === CANCELLED

    return (
      <Wrapper>
        {!canceled && (
          <StepLine
            stepOptions={statusOptions}
            value={input.value}
            style={{ marginBottom: 10 }}
          />
        )}
        <CancelWrapper>
          {canceled && (
            <CancelIcon src="/images/icons/exclamation_mark.png" alt="" />
          )}
          <CancelText>
            {statusText[input.value]
              ? intl.formatMessage({ id: statusText[input.value].text })
              : ''}
            {formValueStatus === COMPLETED && (
              <div style={{ fontSize: 12, color: '#aaa' }}>
                <FormattedMessage id="display_complete_time" />{' '}
                {moment(initialValues?.completeTime).format('YYYY-MM-DD hh:mm')}
              </div>
            )}
          </CancelText>
        </CancelWrapper>
        <Button.Right>{renderStatusButton()}</Button.Right>
      </Wrapper>
    )
  }
}

export default (props) => {
  return <Field {...props} component={OrderStatusBar} />
}
