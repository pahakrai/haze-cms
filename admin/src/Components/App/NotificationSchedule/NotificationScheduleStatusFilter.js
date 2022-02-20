import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import FilterLayout from '../../Common/FilterLayout';

const INITIAL_FILTER_STATE = {
  type: '',
  status: '',
  notificationTime: [null, null]
};

class NotificationScheduleFilter extends PureComponent {
  static propTypes = {
    onChanged: PropTypes.func
  };
  static defaultProps = {
    onChanged: () => {}
  };
  constructor(props) {
    super(props);
    this.state = INITIAL_FILTER_STATE;
  }
  _onChanged = () => {
    const { onChanged } = this.props;
    onChanged(this.state);
  };

  render() {
    const { _onChanged } = this;
    // const { intl, locale } = this.props;
    const { intl } = this.props;
    return (
      <FilterLayout.FilterRow>
        <FilterLayout.FilterLabel>
          {intl.formatMessage({
            id: 'display_pushnotificationschedule_status'
          })}
          :{' '}
        </FilterLayout.FilterLabel>
        <Select
          style={{ flex: 1 }}
          defaultValue=" "
          onChange={value => {
            this.setState(
              {
                status: value === ' ' ? undefined : value
              },
              _onChanged
            );
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
      </FilterLayout.FilterRow>
    );
  }
}

export default NotificationScheduleFilter;
