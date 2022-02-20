import React from 'react';
import { Field } from 'redux-form';
import { Select } from 'antd';
import { FormattedMessage } from 'react-intl';
import { helpers as EcommCommonHelpers } from '@golpasal/common';

import { ErrorMessage } from '../../Form/Errors';

const { Option } = Select;

const RecruitmentType = ({
  defaultValue,
  input,
  meta: { touched, error },
  input: { value, onChange, name },
  disabled = false,
  label,
  intl
}) => {
  const items = value && value.length > 0 ? value : [];
  const onSelect = v => {
    onChange([...items, v]);
  };
  const onDeselect = v => {
    onChange(items ? items.filter(item => item !== v) : []);
  };
  return (
    <div style={{ paddingBottom: 20 }}>
      <label
        style={{
          padding: '3px 0',
          display: 'inline-block',
          fontWeight: 600,
          color: '#666666',
          fontSize: 14
        }}
      >
        {label}
      </label>
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        value={Object.assign([], value) || []}
        placeholder={<FormattedMessage id="display_select" />}
        onSelect={onSelect}
        onDeselect={onDeselect}
        disabled={disabled}
      >
        {EcommCommonHelpers.getConstants(
          'type',
          'EmploymentType',
          intl.locale
        ).map(v => (
          <Option key={v.value}>{v.text}</Option>
        ))}
      </Select>
      {touched && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default props => {
  return <Field component={RecruitmentType} {...props} />;
};
