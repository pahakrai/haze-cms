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

export default class OrderDateFilter extends PureComponent {
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
          />
        </DatePickerContaier>
      </FilterLayout.FilterRow>
    );
  }
}
