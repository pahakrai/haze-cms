import React, { PureComponent } from 'react';
import { Select } from 'antd';

import FilterLayout from '../../Components/Common/FilterLayout';

export default class UserLevelActiveFilter extends PureComponent {
  render() {
    const { intl, filterValues, onChanged } = this.props;
    return (
      <FilterLayout.FilterRow>
        <FilterLayout.FilterLabel>
          {intl.formatMessage({
            id: 'display_pushnotificationschedule_isActive'
          })}{' '}
          :
        </FilterLayout.FilterLabel>
        <Select
          style={{ flex: 1 }}
          value={
            filterValues.isActive !== undefined ? filterValues.isActive : ''
          }
          onChange={v => onChanged({ isActive: v })}
          allowClear
        >
          <Select.Option value={''}>
            {intl.formatMessage({ id: 'all' })}
          </Select.Option>
          <Select.Option value="true">
            {intl.formatMessage({ id: 'display_available' })}
          </Select.Option>
          <Select.Option value="false">
            {intl.formatMessage({ id: 'display_unavailable' })}
          </Select.Option>
        </Select>
      </FilterLayout.FilterRow>
    );
  }
}
