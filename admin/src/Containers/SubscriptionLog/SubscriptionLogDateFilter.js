import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { DatePicker } from 'antd';

import { filterTimeRangeFormat } from '../../Lib/util';

import FilterLayout from '../../Components/Common/FilterLayout';

const DatePickerContaier = styled.div`
  display: flex;
  flex: 1;
`;
class SubscriptionLogDateFilter extends PureComponent {
  _onDateValueChanged = times => {
    const { onChanged } = this.props;
    const [startTime, endTime] = filterTimeRangeFormat(
      times && times[0],
      times && times[1]
    );
    onChanged({
      dateFr: startTime,
      dateTo: endTime
    });
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

export default SubscriptionLogDateFilter;
