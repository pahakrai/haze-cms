import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const OrderNumber = styled.div`
  font-weight: 500;
  font-size: 15px;
  margin-left: 10px;
  margin-bottom: 20px;
`;

const OrderCreateTimeField = ({ input }) => (
  <OrderNumber>
    <FormattedMessage id="create_time" />
    {': '}
    {input.value}
  </OrderNumber>
);

export default props => {
  return <Field {...props} component={OrderCreateTimeField} />;
};
