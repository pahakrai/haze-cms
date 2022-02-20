import React, { PureComponent } from 'react'
import * as Common from '@golpasal/common'
import { Select } from 'antd'

import FilterLayout from '../../Components/Common/FilterLayout'

export default class ServiceStatusFilter extends PureComponent {
  _onChanged = (value) => {
    this.props.onChanged(value)
  }

  render() {
    const { intl, filterValues } = this.props
    const unitOptions = Common.helpers
      .getConstants('unit', 'ServiceUnit', intl.locale)
      .map((units) => (
        <Select.Option key={units.value} value={units.value}>
          {units.text}
        </Select.Option>
      ))
    return (
      <FilterLayout.FilterRow>
        <FilterLayout.FilterLabel>
          {intl.formatMessage({ id: 'display_service_unit' })}:{' '}
        </FilterLayout.FilterLabel>
        <Select
          style={{ flex: 1 }}
          value={filterValues.units !== undefined ? filterValues.units : ''}
          onChange={(v) => this._onChanged({ units: v })}
        >
          <Select.Option value={''}>
            {intl.formatMessage({ id: 'all' })}
          </Select.Option>
          {unitOptions}
        </Select>
      </FilterLayout.FilterRow>
    )
  }
}
