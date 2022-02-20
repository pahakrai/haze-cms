import React, { PureComponent } from 'react';

import styled from 'styled-components';
import { DatePicker } from 'antd';
import { withRouter } from 'react-router';
import moment from 'moment';

import { filterTimeRangeFormat } from '../../Lib/util';

import FilterLayout from '../../Components/Common/FilterLayout';

const DatePickerContaier = styled.div`
  display: flex;
  flex: 1;
`;

class DeviceDateFilter extends PureComponent {
  _onDatePickerValueChanged = (keynames, times) => {
    const { onChanged } = this.props;
    if (times) {
      const [startTime, endTime] = filterTimeRangeFormat(times[0], times[1]);
      onChanged({
        [keynames[0]]: startTime,
        [keynames[1]]: endTime
      });
    } else {
      onChanged({
        [keynames[0]]: undefined,
        [keynames[1]]: undefined
      });
    }
  };

  render() {
    const { intl, filterValues } = this.props;

    return (
      <FilterLayout.FilterRow>
        <FilterLayout.FilterLabel>
          {intl.formatMessage({ id: 'date' })}:{' '}
        </FilterLayout.FilterLabel>
        <DatePickerContaier>
          <DatePicker.RangePicker
            value={[
              filterValues.lastOnTimeFr
                ? moment(filterValues.lastOnTimeFr)
                : null,
              filterValues.lastOnTimeTo
                ? moment(filterValues.lastOnTimeTo)
                : null
            ]}
            onChange={this._onDatePickerValueChanged.bind(this, [
              'lastOnTimeFr',
              'lastOnTimeTo'
            ])}
          />
        </DatePickerContaier>
      </FilterLayout.FilterRow>
    );
  }
}

export default withRouter(DeviceDateFilter);
