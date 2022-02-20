import React from 'react'
import { Field } from 'redux-form'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import Common from '@golpasal/common'

import { formatUserName } from '../../../../Lib/util'
import { FieldLabel } from '../../../Form/form.styled'
import SelectUser from '../../../../Containers/Form/SelectUser'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const OrderSolder = styled(FieldLabel)`
  margin-bottom: 10px;
`
const OrderToWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const OrderClientField = ({ input }) => {
  return (
    <div>{(input && input.value && formatUserName(input.value)) || ''}</div>
  )
}
const OrderSoldField = ({ intl, currentWorkspace, updateMode }) => {
  const label = (
    <OrderSolder style={updateMode ? {} : { marginBottom: 0 }}>
      <FormattedMessage id="order_sold_by_display" />
      {': '}
      <div>
        {currentWorkspace && currentWorkspace.name
          ? currentWorkspace.name
          : '-'}
      </div>
    </OrderSolder>
  )

  if (updateMode) {
    return (
      <Wrapper>
        {label}
        <OrderSolder>
          <FormattedMessage id="order_sold_to_display" />
          {': '}
          <Field name="clientObject" component={OrderClientField} />
        </OrderSolder>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      {label}
      <OrderToWrapper style={{ width: '45%' }}>
        <SelectUser
          containerStyle={{ marginBottom: 0, width: '100%' }}
          placeholder=" "
          label={intl.formatMessage({ id: 'order_sold_to_display' })}
          query={{
            userTypes:
              currentWorkspace?.preferences?.order?.clientUserTypes || [],
            statuses: [Common.status.UserStatus.ACTIVE]
          }}
          name="client"
          formatOption={(user) =>
            `${formatUserName(user) ? `${formatUserName(user)} ` : ''}${
              (user && user.phone) || ''
            }`
          }
        />
      </OrderToWrapper>
    </Wrapper>
  )
}

export default (props) => {
  return <Field {...props} component={OrderSoldField} />
}
