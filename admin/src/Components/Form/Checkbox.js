import React from 'react';
import { Field } from 'redux-form';
import FieldContainer from './FieldContainer';

import CCheckbox from '../Common/Checkbox';

function Checkbox({ input, label, disabled, labelIndent, style }) {
  return (
    <FieldContainer style={style}>
      <CCheckbox
        label={label}
        disabled={disabled}
        checked={input.value}
        labelIndent={labelIndent}
        {...input}
      />
      {/* <label>
        <input
          type="checkbox"
          disabled={disabled}
          checked={input.value}
          {...input}
        />
        {label}
        <span />
      </label> */}
    </FieldContainer>
  );
}

export default props => {
  return <Field {...props} component={Checkbox} />;
};
