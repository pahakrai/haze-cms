import React from 'react';
import { Field } from 'redux-form';

import FormTextInput from '../../../Form/TextInput';

const ProductSkuFormDiscountAmountInput = ({
  input: { value },
  discountAmountFieldName,
  ...props
}) => {
  return (
    <Field
      disabled={!value}
      component={FormTextInput}
      {...props}
      name={discountAmountFieldName}
    />
  );
};

export default props => {
  return (
    <Field
      component={ProductSkuFormDiscountAmountInput}
      {...props}
      name={`${props.fieldName}.discountType`}
      discountAmountFieldName={props.name}
    />
  );
};
