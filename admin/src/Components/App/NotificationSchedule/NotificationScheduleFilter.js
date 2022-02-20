import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as Common from '@golpasal/common'
import { Select, DatePicker, Row, Col } from 'antd'
import Title from '../../Common/H5'

const INITIAL_FILTER_STATE = {
  type: '',
  status: '',
  notificationTime: [null, null]
}

const FilterLabel = styled(Title)`
  display: block;
  margin-right: 0.5em;
`

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
      <div>
        <Row>
          <Col xs={24} span={6}>
            <FilterLabel>
              {intl.formatMessage({
                id: 'display_pushnotificationschedule_status'
              })}
            </FilterLabel>
            <Select
              style={{ width: 120 }}
              defaultValue=" "
              onChange={(value) => {
                this.setState(
                  {
                    status: value === ' ' ? undefined : value
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
              <Select.Option value="1">
                {intl.formatMessage({
                  id: 'display_pending'
                })}
              </Select.Option>
              <Select.Option value="20">
                {intl.formatMessage({
                  id: 'display_approved'
                })}
              </Select.Option>
              <Select.Option value="50">
                {intl.formatMessage({
                  id: 'display_sending'
                })}
              </Select.Option>
              <Select.Option value="100">
                {intl.formatMessage({
                  id: 'display_COMPLETE'
                })}
              </Select.Option>
            </Select>
          </Col>
          <Col xs={24} span={6}>
            <FilterLabel>
              {intl.formatMessage({
                id: 'display_user'
              })}
            </FilterLabel>
            <Select
              style={{ width: 120 }}
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
          </Col>
        </Row>

        <Row style={{ marginTop: '0.5em' }}>
          <Col xs={24} span={8}>
            <FilterLabel>
              {intl.formatMessage({
                id: 'display_pushnotificationschedule_time'
              })}
            </FilterLabel>
            <DatePicker.RangePicker
              defaultValue={this.state.notificationTime}
              onChange={(value) => {
                this.setState(
                  {
                    notificationTime: value
                  },
                  _onChanged
                )
              }}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default NotificationScheduleFilter
