import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { FieldLabel } from '../../../Form/form.styled';

const QuotationNumber = styled(FieldLabel)`
  margin-bottom: 10px;
`;

const QuotationNumberField = ({ input }) => (
  <QuotationNumber>
    <FormattedMessage id="display_quotationNo" />
    {': '}
    <div>{input.value}</div>
  </QuotationNumber>
);
export default props => {
  return (
    props.updateMode && <Field {...props} component={QuotationNumberField} />
  );
};
