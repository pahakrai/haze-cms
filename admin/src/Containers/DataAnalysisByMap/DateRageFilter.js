import React, { PureComponent } from 'react';
import { DatePicker } from 'antd';
import styled from 'styled-components';
import moment from 'moment';

import { filterTimeRangeFormat } from '../../Lib/util';

import FilterLayout from '../../Components/Common/FilterLayout';

const DatePickerContaier = styled.div`
  display: flex;
  flex: 1;
`;

export default class DateRageFilter extends PureComponent {
  _onDatePickerValueChanged = times => {
    const { onChange } = this.props;
    const keynames = ['dateFr', 'dateTo'];

    if (times) {
      const [startTime, endTime] = filterTimeRangeFormat(times[0], times[1]);

      onChange({
        [keynames[0]]: startTime,
        [keynames[1]]: endTime
      });
    } else {
      onChange({
        [keynames[0]]: undefined,
        [keynames[1]]: undefined
      });
    }
  };

  render() {
    const { intl, dateFr, dateTo } = this.props;

    return (
      <FilterLayout.FilterRow>
        <FilterLayout.FilterLabel>
          {intl.formatMessage({ id: 'date' })}:{' '}
        </FilterLayout.FilterLabel>
        <DatePickerContaier>
          <DatePicker.RangePicker
            value={[
              dateFr ? moment(dateFr) : null,
              dateTo ? moment(dateTo) : null
            ]}
            onChange={this._onDatePickerValueChanged}
            style={{ width: '100%' }}
          />
        </DatePickerContaier>
      </FilterLayout.FilterRow>
    );
  }
}
