import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';

import FilterLayout from '../../Components/Common/FilterLayout';

const DatePickerContaier = styled.div`
  display: flex;
  flex: 1;
`;
export default class UserGroupFilter extends PureComponent {
  static propTypes = {
    onChanged: PropTypes.func
  };
  static defaultProps = {
    onChanged: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      createdAt: []
    };
  }

  _onDatePickerValueChanged = (keynames, times) => {
    const { onChanged } = this.props;
    if (times) {
      const startTime = moment(times[0])
        .date(moment(times[0]).date())
        .hour(0)
        .minutes(0)
        .seconds(0)
        .format('YYYY-MM-DD hh:mmZ');
      const endTime = moment(times[1])
        .date(moment(times[1]).date() + 1)
        .hour(0)
        .minutes(0)
        .seconds(-1)
        .format('YYYY-MM-DD hh:mmZ');
      onChanged({
        ...this.state,
        [keynames[0]]: startTime,
        [keynames[1]]: endTime
      });
    } else {
      onChanged({
        ...this.state,
        [keynames[0]]: undefined,
        [keynames[1]]: undefined
      });
    }
  };
  render() {
    const { intl } = this.props;

    return (
      <FilterLayout.FilterRow>
        <FilterLayout.FilterLabel>
          {intl.formatMessage({ id: 'date' })}:{' '}
        </FilterLayout.FilterLabel>
        <DatePickerContaier>
          <DatePicker.RangePicker
            onChange={this._onDatePickerValueChanged.bind(this, [
              'createdAtFr',
              'createdAtTo'
            ])}
          />
        </DatePickerContaier>
      </FilterLayout.FilterRow>
    );
  }
}
