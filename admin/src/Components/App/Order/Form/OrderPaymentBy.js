import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import Common, { helpers as HelpersEcommCommon } from '@golpasal/common'

import { FieldLabel } from '../../../Form/form.styled'

const { PaymentStatus: StatusPaymentStatus } = Common.status

const OrderPaymentBy = styled(FieldLabel)`
  margin-bottom: 20px;
`
const PaymentStatus = styled.div`
  color: ${({ active }) => (active ? '#35dc35' : '#DC143C')};
`

const OrderPaymentByField = ({ input, intl, style, updateMode, payment }) => {
  const paymentStatusResult = payment
    ? HelpersEcommCommon.getConstantByValue(
        'status',
        'PaymentStatus',
        payment.status,
        intl.locale
      )
    : ''
  return (
    <OrderPaymentBy style={style}>
      <FormattedMessage id="order_payment_by_display" />
      {': '}
      <PaymentStatus
        active={payment ? payment.status === StatusPaymentStatus.PAID : false}
      >
        {paymentStatusResult ? paymentStatusResult.text : '-'}
      </PaymentStatus>
    </OrderPaymentBy>
  )
}

export default (props) => {
  return props.updateMode && <OrderPaymentByField {...props} />
}
