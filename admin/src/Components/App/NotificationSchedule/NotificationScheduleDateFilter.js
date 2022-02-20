import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DatePicker } from 'antd';
import FilterLayout from '../../Common/FilterLayout';

const INITIAL_FILTER_STATE = {
  type: '',
  status: '',
  notificationTime: [null, null]
};

const DatePickerContaier = styled.div`
  display: flex;
  flex: 1;
`;

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
    const { intl } = this.props;
    return (
      <FilterLayout.FilterRow>
        <FilterLayout.FilterLabel>
          {intl.formatMessage({ id: 'display_pushnotificationschedule_time' })}:{' '}
        </FilterLayout.FilterLabel>
        <DatePickerContaier>
          <DatePicker.RangePicker
            defaultValue={this.state.notificationTime}
            onChange={value => {
              this.setState(
                {
                  notificationTime: value
                },
                _onChanged
              );
            }}
          />
        </DatePickerContaier>
      </FilterLayout.FilterRow>
    );
  }
}

export default NotificationScheduleFilter;
