import React, { PureComponent } from 'react'
import { Field } from 'redux-form'
import styled from 'styled-components'
import Common from '@golpasal/common'

import StepLine from '../../../../Common/StepLine'
import Button from '../../../../Common/Button'

const {
  ShipmentStatus: { CANCELLED, PENDING, IN_PROGRESS, COMPLETED }
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
// const CancelIcon = styled.img`
//   height: 30px;
// `;
const InfoTextWrapper = styled.div`
  font-size: 13px;
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`
// const InfoTitle = styled.div`
//   color: #333;
//   margin-bottom: 7px;
// `;
// const InfoText = styled.div`
//   color: #999;
// `;

export class ShipmentStatusBar extends PureComponent {
  render() {
    const { intl, renderStatusButton, valueStatus } = this.props
    const ShipmentStatusLocale =
      Common.locales[intl.locale].status.ShipmentStatus
    const statusOptions = [
      [PENDING, ShipmentStatusLocale.PENDING], //0
      [IN_PROGRESS, ShipmentStatusLocale.IN_PROGRESS], //10
      [COMPLETED, ShipmentStatusLocale.COMPLETED] //100
    ].map((v) => ({ label: v[1], value: v[0] }))
    // const statusText = [
    //   [CANCELLED, 'display_order_canceled'],
    //   [
    //     PENDING,
    //     'display_order_status_bar_pending_payment_title',
    //     'display_order_status_bar_pending_payment_text'
    //   ],
    //   [
    //     IN_PROGRESS,
    //     'display_order_status_bar_shipped_title',
    //     'display_order_status_bar_shipped_text'
    //   ],
    //   [
    //     COMPLETED,
    //     'display_order_status_bar_completed_title',
    //     'display_order_status_bar_completed_text'
    //   ]
    // ].reduce(
    //   (r, v) => ({ ...r, [v[0]]: { title: v[1], text: v[2] || v[1] } }),
    //   {}
    // );
    const canceled = valueStatus === CANCELLED

    return (
      <Wrapper>
        {!canceled && (
          <StepLine
            stepOptions={statusOptions}
            value={valueStatus}
            style={{ marginBottom: 10 }}
          />
        )}
        <InfoWrapper>
          <InfoTextWrapper></InfoTextWrapper>
          {/* <div>
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
          </div> */}
          <Button.Right>{renderStatusButton()}</Button.Right>
        </InfoWrapper>
      </Wrapper>
    )
  }
}

export default (props) => {
  return <Field {...props} component={ShipmentStatusBar} />
}
