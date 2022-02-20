import React, { useEffect, useState } from 'react';
import { Field } from 'redux-form';
import { Select } from 'antd';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { ErrorMessage } from '../../Components/Form/Errors';
import serviceTypeService from '../../Services/APIServices/ServiceTypeService';

const { Option } = Select;

const Label = styled.div`
  padding: 3px 0;
  display: inline-block;
  font-weight: 600;
  color: #666666;
  font-size: 14px;
`;

const SelectServiceType = ({
  defaultValue,
  input,
  meta: { touched, error },
  input: { value, onChange, name },
  disabled = false,
  noLabel = false,
  formValueType,
  intl
}) => {
  const items = value ? value : '';
  const [data, setData] = useState([]);
  useEffect(() => {
    const func = async () => {
      const { data } =
        (await serviceTypeService.getServiceTypesByWorkspaceType({})) || {};
      if (data) {
        setData(data);
      }
    };
    func();
  }, []);
  const onSelect = selectTags => {
    onChange(selectTags);
  };
  const onDeselect = selectTags => {
    onChange(items ? items.filter(item => item !== selectTags) : ['']);
  };
  return (
    <div>
      {!noLabel && (
        <Label>{intl.formatMessage({ id: 'display_survey_user_types' })}</Label>
      )}

      <Select
        style={{ width: '100%', paddingTop: 1 }}
        // value={Object.assign([], defaultValue) || ''}
        value={formValueType}
        placeholder={<FormattedMessage id="display_select" />}
        onSelect={onSelect}
        onDeselect={onDeselect}
        disabled={disabled}
      >
        {data.length > 0
          ? data.map(v => <Option key={v.type}>{v.name}</Option>)
          : []}
      </Select>

      {touched && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default props => {
  return <Field component={SelectServiceType} {...props} />;
};
