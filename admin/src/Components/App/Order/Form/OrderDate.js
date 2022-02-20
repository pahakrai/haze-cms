import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';

import { FieldLabel } from '../../../Form/form.styled';
import DatePicker from '../../../Form/DatePicker';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const OrderDate = styled(FieldLabel)`
  margin-bottom: 10px;
`;
const OrderDateField = injectIntl(({ intl, input, updateMode }) => (
  <Wrapper>
    {updateMode ? (
      <OrderDate>
        <FormattedMessage id="order_date_display" />
        {': '}
        <div>
          {input.value
            ? moment(input.value).format('YYYY-MM-DD HH:mm:ss')
            : '-'}
        </div>
      </OrderDate>
    ) : (
      <DatePicker
        label={intl.formatMessage({ id: 'order_date_display' })}
        name={input.name}
        placeholder={' '}
        containerStyle={{ width: '100%' }}
      />
    )}
  </Wrapper>
));

export default props => {
  return <Field {...props} component={OrderDateField} />;
};
