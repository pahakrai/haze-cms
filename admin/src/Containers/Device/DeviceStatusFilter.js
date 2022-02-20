import React, { PureComponent } from 'react'

import * as Common from '@golpasal/common'
import { Select } from 'antd'

import FilterLayout from '../../Components/Common/FilterLayout'

class DeviceFilter extends PureComponent {
  _onChanged = (value) => {
    this.props.onChanged(value)
  }
  render() {
    const { intl, filterValues } = this.props
    const statusOptions = Common.helpers
      .getConstants('status', 'DeviceStatus', intl.locale)
      .map((status) => (
        <Select.Option key={status.value} value={status.value}>
          {status.text}
        </Select.Option>
      ))
    return (
      <FilterLayout.FilterRow>
        <FilterLayout.FilterLabel>
          {intl.formatMessage({ id: 'status' })}:{' '}
        </FilterLayout.FilterLabel>
        <Select
          style={{ flex: 1 }}
          value={
            filterValues.deviceStatus !== undefined
              ? filterValues.deviceStatus
              : ''
          }
          onChange={(v) => this._onChanged({ deviceStatus: v === '' ? '' : v })}
        >
          <Select.Option value={''}>
            {intl.formatMessage({ id: 'all' })}
          </Select.Option>
          {statusOptions}
        </Select>
      </FilterLayout.FilterRow>
    )
  }
}
export default DeviceFilter
