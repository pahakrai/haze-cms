import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as Common from '@golpasal/common'
import { Select } from 'antd'
import FilterLayout from '../../Common/FilterLayout'

const INITIAL_FILTER_STATE = {
  type: '',
  status: '',
  notificationTime: [null, null]
}

class NotificationScheduleFilter extends PureComponent {
  static propTypes = {
    onChanged: PropTypes.func
  }
  static defaultProps = {
    onChanged: () => {}
  }
  constructor(props) {
    super(props)
    this.state = INITIAL_FILTER_STATE
  }
  _onChanged = () => {
    const { onChanged } = this.props
    onChanged(this.state)
  }

  render() {
    const { _onChanged } = this
    // const { intl, locale } = this.props;
    const { intl } = this.props
    const peopleOption = Common.helpers
      .getConstants('type', 'PushNotificationScheduleToPeople', intl.locale)
      .map((peopleType) => ({
        label: peopleType.text,
        value: peopleType.value
      }))
    return (
      <FilterLayout.FilterRow>
        <FilterLayout.FilterLabel>
          {intl.formatMessage({ id: 'display_user' })}:{' '}
        </FilterLayout.FilterLabel>
        <Select
          style={{ flex: 1 }}
          defaultValue=" "
          onChange={(value) => {
            this.setState(
              {
                toGroups: value === ' ' ? undefined : value
              },
              _onChanged
            )
          }}
        >
          <Select.Option value=" ">
            {intl.formatMessage({
              id: 'display_select'
            })}
          </Select.Option>
          {peopleOption.map((item) => (
            <Select.Option key={item.value} value={item.value}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
      </FilterLayout.FilterRow>
    )
  }
}

export default NotificationScheduleFilter
