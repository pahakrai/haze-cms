import React, { PureComponent } from 'react'
import { Field } from 'redux-form'
import styled from 'styled-components'
import Common from '@golpasal/common'

import StepLine from '../../../Common/StepLine'
import Button from '../../../Common/Button'

const {
  QuotationStatus: {
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
const InfoWrapper = styled.div`
  width: 100%;
  background: #f5f5f5;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 79px;
  padding-left: 15px;
  padding-right: 15px;
  justify-content: space-between;
`
const CancelIcon = styled.img`
  height: 30px;
`
const InfoTextWrapper = styled.div`
  font-size: 13px;
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`
const InfoTitle = styled.div`
  color: #333;
  margin-bottom: 7px;
`
const InfoText = styled.div`
  color: #999;
`

export class QuotationStatusBar extends PureComponent {
  render() {
    const { input, intl, renderStatusButton } = this.props
    const QuotationStatusLocale =
      Common.locales[intl.locale].status.QuotationStatus
    const statusOptions = [
      [PENDING_PAYMENT, QuotationStatusLocale.PENDING_PAYMENT], //0
      [PREPARE_SHIPMENT, QuotationStatusLocale.PREPARE_SHIPMENT], //10
      [SHIPPED, QuotationStatusLocale.SHIPPED], //50
      [COMPLETED, QuotationStatusLocale.COMPLETED] //100
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
        <InfoWrapper>
          <div>
            {canceled && (
              <CancelIcon src="/images/icons/exclamation_mark.png" alt="" />
            )}
            <InfoTextWrapper>
              <InfoTitle>
                {statusText[input.value]
                  ? intl.formatMessage({ id: statusText[input.value].title })
                  : ''}
              </InfoTitle>
              <InfoText>
                {statusText[input.value]
                  ? intl.formatMessage({ id: statusText[input.value].text })
                  : ''}
              </InfoText>
            </InfoTextWrapper>
          </div>
          <Button.Right>{renderStatusButton()}</Button.Right>
        </InfoWrapper>
      </Wrapper>
    )
  }
}

export default (props) => {
  return <Field {...props} component={QuotationStatusBar} />
}
