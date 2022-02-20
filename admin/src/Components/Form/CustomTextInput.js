import React from 'react';
import { Field } from 'redux-form';
import TextInput from '../Common/TextInput';
import { ErrorMessage } from './Errors';
import FieldContainer from './FieldContainer';
import FieldLabel from './FieldLabel';

//custom(...)
//  container
//  label
//  input
//  warning&&error
const Text = props => {
  const {
    input,
    label,
    type,
    meta: { touched, error, warning },
    dark,
    rows,
    custom
  } = props;

  return custom(
    FieldContainer,
    <FieldLabel dark={dark}>{label}</FieldLabel>,
    <TextInput {...input} rows={rows} placeholder={label} type={type} />,
    touched &&
      ((error && <ErrorMessage>{error}</ErrorMessage>) ||
        (warning && <ErrorMessage>{warning}</ErrorMessage>))
  );
};

export default props => {
  return <Field {...props} component={Text} />;
};
