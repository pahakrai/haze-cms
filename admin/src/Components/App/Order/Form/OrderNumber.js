import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { FieldLabel } from '../../../Form/form.styled';

const OrderNumber = styled(FieldLabel)`
  margin-bottom: 10px;
`;

const OrderNumberField = ({ input }) => (
  <OrderNumber>
    <FormattedMessage id="order_no_display" />
    {': '}
    <div>{input.value}</div>
  </OrderNumber>
);
export default props => {
  return props.updateMode && <Field {...props} component={OrderNumberField} />;
};
