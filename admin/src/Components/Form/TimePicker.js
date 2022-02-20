import React from 'react';
import { Field } from 'redux-form';
import TimePicker from '../Common/TimePicker';
import TextInput from '../Common/TextInput';

import FieldLabel from './FieldLabel';
import { ErrorMessage } from './Errors';
import FieldContainer from './FieldContainer';

const Picker = props => {
  const {
    input,
    label,
    meta: { touched, error, warning },
    ...some
  } = props;
  return (
    <FieldContainer>
      <FieldLabel>{label}</FieldLabel>
      <TimePicker
        block
        customInput={
          <TextInput
            dateInput
            onChange={time => input.onChange(time)}
            {...input}
          />
        }
        inputProps={{ ...input }}
        onTimeChange={time => input.onChange(time)}
        value={input.value}
        {...some}
      />
      {touched &&
        ((error && <ErrorMessage>{error}</ErrorMessage>) ||
          (warning && <ErrorMessage>{warning}</ErrorMessage>))}
    </FieldContainer>
  );
};

export default props => {
  return <Field {...props} component={Picker} />;
};
