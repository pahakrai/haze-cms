import React, { useMemo } from 'react';
import { Field } from 'redux-form';
import CreatableSelect from 'react-select/creatable';

import { ErrorMessage } from '../../../../Components/Form/Errors';
import FieldContainer from '../../../../Components/Form/FieldContainer';
import { selectStyles } from '../../../../Components/Form/Dropdown';
import { FieldLabel } from '../../../../Components/Form/form.styled';

const SubTypesInput = ({
  input: { value, onChange },
  meta: { error, warning, touched },
  label,
  disabled,
  intl
}) => {
  const values = useMemo(() => {
    const arr = [];
    try {
      value &&
        value.length &&
        value.forEach(v => {
          arr.push({
            label: v,
            value: v
          });
        });
    } catch (e) {}

    return arr;
  }, [value]);
  return (
    <FieldContainer>
      <FieldLabel>{label}</FieldLabel>
      <div>
        <CreatableSelect
          isDisabled={disabled}
          isMulti
          value={values}
          options={values}
          placeholder=" "
          styles={selectStyles({ disabled })}
        />
        {touched &&
          ((error && <ErrorMessage>{error}</ErrorMessage>) ||
            (warning && <ErrorMessage>{warning}</ErrorMessage>))}
      </div>
    </FieldContainer>
  );
};

export default props => <Field component={SubTypesInput} {...props} />;
