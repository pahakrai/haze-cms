import React from 'react';
import { Select } from 'antd';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import { ErrorMessage } from './Errors';
import FieldContainer from './FieldContainer';
import FieldLabel from './FieldLabel';
const Option = Select.Option;

const generateOption = function (selects) {
  const children = [];
  if (selects) {
    for (let i = 0; i < selects.length; i++) {
      children.push(
        <Option key={selects[i].key || i}>{selects[i].value}</Option>
      );
    }
  }
  return children;
};

const SelectList = props => {
  const {
    selects,
    input,
    label,
    meta: { touched, error, warning },
    selectMode = 'tags',
    disabled,
    controlled
  } = props;
  const children = generateOption(selects);
  const _props = {};
  function handleChange(value) {
    input.onChange(value);
  }
  const defaultValue = [];
  if (input.value) {
    input.value.forEach(item => {
      defaultValue.push(item);
    });
  }
  if (controlled) {
    if (['multiple', 'tags'].includes(selectMode)) {
      _props.value = Array.isArray(input.value) ? [...input.value] : [];
    } else {
      _props.value = input.value || '';
    }
  } else {
    _props.defaultValue = defaultValue || [];
  }
  return (
    <FieldContainer>
      <FieldLabel>{label}</FieldLabel>
      <div>
        <Select
          disabled={disabled}
          mode={selectMode}
          size={'default'}
          placeholder=<FormattedMessage id="display_select" />
          onChange={handleChange}
          style={{ width: '100%' }}
          {..._props}
        >
          {children}
        </Select>
        {touched &&
          ((error && <ErrorMessage>{error}</ErrorMessage>) ||
            (warning && <ErrorMessage>{warning}</ErrorMessage>))}
      </div>
    </FieldContainer>
  );
};

export default props => {
  return <Field {...props} component={SelectList} />;
};
