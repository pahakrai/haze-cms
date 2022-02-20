import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const QuotationNumber = styled.div`
  font-weight: 500;
  font-size: 15px;
  margin-left: 10px;
  margin-bottom: 20px;
`;

const QuotationCreateTimeField = ({ input }) => (
  <QuotationNumber>
    <FormattedMessage id="create_time" />
    {': '}
    {input.value}
  </QuotationNumber>
);

export default props => {
  return <Field {...props} component={QuotationCreateTimeField} />;
};
