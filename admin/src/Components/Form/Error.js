import React from 'react';
import { Field } from 'redux-form';
import { ErrorMessage } from './Errors';

const Error = props => {
  const {
    // meta: { touched, error }
    meta: { error, touched: metaTouched },
    input,
    customText,
    touched,
    ...otherProps
  } = props;
  const error_text =
    !error ||
    Object.prototype.toString.call(error) === '[object Array]' ||
    (Object.prototype.toString.call(error) === '[object Object]' &&
      (!error.$$typeof ||
        error.$$typeof.toString() !== Symbol('react.element').toString()))
      ? ''
      : error;
  const _customText =
    typeof customText === 'function' ? customText(error_text) : customText;

  const msg = error ? (
    <ErrorMessage {...otherProps}>{_customText || error_text}</ErrorMessage>
  ) : null;

  // touched
  if (touched) {
    return metaTouched ? msg : null;
  } else {
    return msg;
  }
};

export default props => {
  return <Field {...props} component={Error} />;
};
