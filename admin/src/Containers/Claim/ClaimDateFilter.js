import React, { PureComponent } from 'react';
import { DatePicker } from 'antd';
import styled from 'styled-components';
import { filterTimeRangeFormat } from '../../Lib/util';

import FilterLayout from '../../Components/Common/FilterLayout';

const DatePickerContaier = styled.div`
  display: flex;
  flex: 1;
`;

export default class ClaimDateFilter extends PureComponent {
  _onDatePickerValueChanged = (keynames, times) => {
    const { onChanged } = this.props;
    if (times) {
      const [startTime, endTime] = filterTimeRangeFormat(times[0], times[1]);

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
              'dateFr',
              'dateTo'
            ])}
            style={{ width: '100%' }}
          />
        </DatePickerContaier>
      </FilterLayout.FilterRow>
    );
  }
}
