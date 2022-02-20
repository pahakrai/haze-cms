import React, { useMemo } from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import CreatableSelect from 'react-select/creatable';

import { ErrorMessage } from '../../../../Components/Form/Errors';
import FieldContainer from '../../../../Components/Form/FieldContainer';
import { selectStyles } from '../../../../Components/Form/Dropdown';
import { FieldLabel } from '../../../../Components/Form/form.styled';

const AncestorsInput = ({
  input: { value, onChange },
  meta: { error, warning, touched },
  label,
  disabled,
  regions,
  intl
}) => {
  const options = useMemo(() => {
    const arr = [];
    try {
      value &&
        value.length &&
        value.forEach(v => {
          if (regions[v]) {
            const label = regions[v].name[intl.locale];
            const regionValue = regions[v]._id;
            arr.push({
              label,
              value: regionValue
            });
          }
        });
    } catch (e) {}
    return arr;
  }, [regions, value, intl.locale]);
  return (
    <FieldContainer>
      <FieldLabel>{label}</FieldLabel>
      <div>
        <CreatableSelect
          isDisabled={disabled}
          isMulti
          value={options}
          options={options}
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

export default connect(
  state => ({
    regions: state.resources.regions
  }),
  {}
)(props => <Field component={AncestorsInput} {...props} />);
