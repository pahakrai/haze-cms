import React from 'react'
import { Field } from 'redux-form'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import Common from '@golpasal/common'

import { FieldLabel } from '../../../Form/form.styled'
import SelectUser from '../../../../Containers/Form/SelectUser'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const QuotationSolder = styled(FieldLabel)`
  margin-bottom: 10px;
`
// const QuotationToWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
// `;

const QuotationClientField = ({ input }) => {
  return (
    <div>
      {input && input.value && input.value.username ? input.value.username : ''}
    </div>
  )
}
const QuotationSoldField = ({ intl, currentWorkspace, updateMode }) => {
  // const label = (
  //   <QuotationSolder style={updateMode ? {} : { marginBottom: 0 }}>
  //     <FormattedMessage id="order_sold_by_display" />
  //     {': '}
  //     <div>
  //       {currentWorkspace && currentWorkspace.name
  //         ? currentWorkspace.name
  //         : '-'}
  //     </div>
  //   </QuotationSolder>
  // );

  if (updateMode) {
    return (
      <Wrapper>
        {/* {label} */}
        <QuotationSolder>
          <FormattedMessage id="display_user" />
          {': '}
          <Field name="clientObject" component={QuotationClientField} />
        </QuotationSolder>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      {/* {label} */}

      <SelectUser
        containerStyle={{ marginBottom: 0, width: '100%' }}
        placeholder=" "
        label={intl.formatMessage({ id: 'display_user' })}
        query={{
          userTypes: [Common.type.UserType.MEMBER],
          statuses: [Common.status.UserStatus.ACTIVE]
        }}
        name="client"
      />
    </Wrapper>
  )
}

export default (props) => {
  return <Field {...props} component={QuotationSoldField} />
}
