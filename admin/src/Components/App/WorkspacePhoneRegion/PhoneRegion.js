import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { ErrorMessage } from '../../Form/Errors';
import WorkspacePhoneRegionService from '../../../Services/APIServices/WorkspacePhoneRegionService';

const { Option } = Select;

const Label = styled.div`
  padding: 3px 0;
  display: inline-block;
  font-weight: 600;
  color: #666666;
  font-size: 14px;
`;

const PhoneRegion = ({
  intl,
  input,
  meta: { touched, error },
  input: { value, onChange, name },
  defaultValue,
  disabled = false,
  noLabel = false,
  ...props
}) => {
  const [phoneRegion, setPhoneRegion] = useState([]);
  useEffect(() => {
    const fn = async () => {
      try {
        const { data } = await WorkspacePhoneRegionService.getPhoneRegion({});

        setPhoneRegion(data);
      } catch (e) {}
    };

    fn();
  }, []);
  const items = value && value.length > 0 ? value : [];
  const onSelect = v => {
    onChange([v]);
  };
  const onDeselect = v => {
    onChange(items ? items.filter(item => item !== v) : '');
  };
  return (
    <div>
      {!noLabel && (
        <Label>
          <FormattedMessage id="display_user_phone_region_code" />
        </Label>
      )}
      <Select
        listHeight={150}
        style={{ width: '100%' }}
        value={
          defaultValue
            ? typeof defaultValue === 'string'
              ? [defaultValue]
              : defaultValue
            : []
        }
        placeholder={<FormattedMessage id="display_select" />}
        onSelect={onSelect}
        onDeselect={onDeselect}
        disabled={disabled}
      >
        {phoneRegion
          ? phoneRegion.map(v => <Option key={v._id}>{v.code}</Option>)
          : []}
      </Select>
      {touched && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default props => {
  return <Field component={PhoneRegion} {...props} />;
};
