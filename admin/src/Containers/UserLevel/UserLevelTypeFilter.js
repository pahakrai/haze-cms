import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { helpers as EcommCommonHelpers } from '@golpasal/common';

import FilterLayout from '../../Components/Common/FilterLayout';

export default class UserLevelActiveFilter extends PureComponent {
  render() {
    const { intl, filterValues, onChanged } = this.props;
    return (
      <FilterLayout.FilterRow>
        <FilterLayout.FilterLabel>
          {intl.formatMessage({
            id: 'display_userLevel_userType'
          })}
          :
        </FilterLayout.FilterLabel>
        <Select
          style={{ flex: 1 }}
          value={
            filterValues.userType !== undefined ? filterValues.userType : ''
          }
          onChange={v => onChanged({ userType: v })}
          allowClear
        >
          <Select.Option value={''}>
            {intl.formatMessage({ id: 'all' })}
          </Select.Option>
          {EcommCommonHelpers.getConstants('type', 'UserType', intl.locale).map(
            v => (
              <Select.Option key={v.value} value={v.value}>
                {v.text}
              </Select.Option>
            )
          )}
        </Select>
      </FilterLayout.FilterRow>
    );
  }
}
