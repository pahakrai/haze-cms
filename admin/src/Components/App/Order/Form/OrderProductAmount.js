import React from 'react'
import { Field } from 'redux-form'
import { FormattedMessage } from 'react-intl'
import Common from '@golpasal/common'

import TextInput from '../../../../Components/Form/TextInput'

const { OrderStatus } = Common.status

export const OrderProductAmount = ({
  isQuotation,
  formValueStatus,
  input,
  intl
}) => {
  return !isQuotation || formValueStatus > OrderStatus.PENDING_PAYMENT ? (
    <>
      <FormattedMessage id="display_cart_price" />: ${input.value || 0}
    </>
  ) : (
    <TextInput
      type="number"
      inputProps={{ formatValue: v => Number(v) }}
      label={intl.formatMessage({ id: 'display_cart_price' }) + ': '}
      placeholder={intl.formatMessage({ id: 'display_cart_price' })}
      containerStyle={{ maxWidth: 300, marginBottom: 0 }}
      name={input.name}
    />
  )
}

export default props => {
  return <Field {...props} component={OrderProductAmount} />
}
