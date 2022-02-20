import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Common, { helpers } from '@golpasal/common'
import { Select } from 'antd'

import FilterLayout from '../../Components/Common/FilterLayout'

const { WorkspaceType } = Common.type

export default class OrderStatusFilter extends PureComponent {
  static propTypes = {
    onChanged: PropTypes.func
  }
  static defaultProps = {
    onChanged: () => {}
  }
  constructor(props) {
    super(props)
    this.state = {
      createdAt: []
    }
  }

  render() {
    const { intl, onChanged, workspaceType } = this.props
    const orderStatusOptions = helpers
      .getConstants('status', 'OrderStatus', intl.locale)
      .map((status) => ({
        text: status.text,
        value: status.value
      }))

    const travelOrderStatusOptions = helpers
      .getConstants('status', 'TravelOrderStatus', intl.locale)
      .map((status) => ({
        text: status.text,
        value: status.value
      }))

    const statusOptions =
      workspaceType === WorkspaceType.LOGISTICS
        ? travelOrderStatusOptions
        : orderStatusOptions
    return (
      <FilterLayout.FilterRow>
        <FilterLayout.FilterLabel>
          {workspaceType === WorkspaceType.LOGISTICS
            ? intl.formatMessage({
                id: 'status'
              })
            : intl.formatMessage({
                id: 'display_order_status'
              })}
        </FilterLayout.FilterLabel>
        <Select
          style={{ flex: 1 }}
          defaultValue={''}
          onChange={(status) =>
            onChanged({
              ...this.state,
              statuses: status === '' ? undefined : [status]
            })
          }
        >
          <Select.Option value={''}>
            {intl.formatMessage({ id: 'all' })}
          </Select.Option>
          {statusOptions.map((item) => (
            <Select.Option key={item.value} value={item.value}>
              {item.text}
            </Select.Option>
          ))}
        </Select>
      </FilterLayout.FilterRow>
    )
  }
}
