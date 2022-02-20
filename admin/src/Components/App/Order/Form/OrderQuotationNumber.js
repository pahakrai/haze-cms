import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { FieldLabel } from '../../../Form/form.styled';

const OrderQuotationNumber = styled(FieldLabel)`
  margin-bottom: 10px;
`;

const OrderQuotationNumberField = ({ input }) =>
  input.value && input.value._id ? (
    <div>
      <OrderQuotationNumber>
        <FormattedMessage id="order_quotation_no_display" />
        {': '}
        <Link to={`/quotation/${input.value._id}`} target="_blank">
          {input.value.quotationNo}
        </Link>
      </OrderQuotationNumber>
    </div>
  ) : null;
export default props => {
  return (
    props.updateMode && (
      <Field {...props} component={OrderQuotationNumberField} />
    )
  );
};
