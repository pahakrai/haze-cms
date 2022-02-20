import React from 'react';
import { Field } from 'redux-form';
import { Select } from 'antd';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { ErrorMessage } from '../../Form/Errors';

const { Option } = Select;

const Label = styled.div`
  padding: 3px 0,
  display: inline-block,
  fontWeight: 600,
  color: #666666,
  fontSize: 14px
`;

const SelectHook = ({
  intl,
  input,
  meta: { touched, error },
  input: { value, onChange, name },
  formValueIntegrations,
  defaultValue,
  disabled = false,
  noLabel = false,
  workspaceHooks,
  appType
}) => {
  const items = value && value.length > 0 ? value : [];
  const onSelect = selectHooks => {
    onChange([...items, selectHooks]);
  };
  const onDeselect = selectHooks => {
    onChange(items ? items.filter(item => item !== selectHooks) : ['']);
  };
  let _workspaceHooks = [];
  if (workspaceHooks) {
    _workspaceHooks = workspaceHooks.filter(v => v.appHook.app === appType);
  }

  return (
    <div>
      {!noLabel && <Label>Hooks</Label>}
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        value={Object.assign([], defaultValue) || []}
        placeholder={<FormattedMessage id="display_select" />}
        onSelect={onSelect}
        onDeselect={onDeselect}
        // onBlur={input.onBlur}
        disabled={disabled}
      >
        {_workspaceHooks && _workspaceHooks[0]
          ? _workspaceHooks[0].appHook.hooks.map(v => (
              <Option key={v.code}>{v.code}</Option>
            ))
          : []}
      </Select>
      {touched && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default props => {
  return <Field component={SelectHook} {...props} />;
};
