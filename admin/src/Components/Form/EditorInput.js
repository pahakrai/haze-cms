import React from 'react';
import { Field } from 'redux-form';
import Editor from '../Common/Editor';
import { ErrorMessage } from './Errors';
import FieldContainer from './FieldContainer';
import FieldLabel from './FieldLabel';

const Text = props => {
  const {
    input,
    label,
    meta: { touched, error, warning }
  } = props;
  return (
    <FieldContainer>
      <FieldLabel>{label}</FieldLabel>
      <div>
        <Editor {...input} placeholder={label} />
        {touched &&
          ((error && <ErrorMessage>{error}</ErrorMessage>) ||
            (warning && <ErrorMessage>{warning}</ErrorMessage>))}
      </div>
    </FieldContainer>
  );
};

export default props => {
  return <Field {...props} component={Text} />;
};
