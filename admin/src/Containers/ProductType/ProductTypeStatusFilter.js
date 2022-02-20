import React, { PureComponent } from 'react'

import * as Common from '@golpasal/common'
import { Select } from 'antd'

import FilterLayout from '../../Components/Common/FilterLayout'

class ProductTypeStatusFilter extends PureComponent {
  _onChanged = (value) => {
    this.props.onChanged(value)
  }
  render() {
    const { intl, filterValues } = this.props
    const statusOptions = Common.helpers
      .getConstants('status', 'ProductTypeStatus', intl.locale)
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
            filterValues.statuses !== undefined ? filterValues.statuses : ''
          }
          onChange={(v) =>
            this._onChanged({ statuses: v === '' ? undefined : [v] })
          }
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
export default ProductTypeStatusFilter
