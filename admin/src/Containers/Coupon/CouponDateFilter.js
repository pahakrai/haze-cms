import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import styled from 'styled-components';
import { filterTimeRangeFormat } from '../../Lib/util';

import FilterLayout from '../../Components/Common/FilterLayout';

const DatePickerContaier = styled.div`
  display: flex;
  flex: 1;
`;

export default class CouponDateFilter extends PureComponent {
  static propTypes = {
    onChanged: PropTypes.func
  };
  static defaultProps = {
    onChanged: () => {}
  };

  _onChanged = value => {
    this.setState({ ...value }, () => this.props.onChanged(this.state));
  };

  _onDateValueChanged = times => {
    const { onChanged } = this.props;

    if (times) {
      const [startTime, endTime] = filterTimeRangeFormat(times[0], times[1]);

      onChanged({
        ...this.state,
        startAt: startTime,
        expireAt: endTime
      });
    } else {
      onChanged({
        ...this.state,
        startAt: undefined,
        expireAt: undefined
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
          <DatePicker.RangePicker onChange={this._onDateValueChanged} />
        </DatePickerContaier>
      </FilterLayout.FilterRow>
    );
  }
}
