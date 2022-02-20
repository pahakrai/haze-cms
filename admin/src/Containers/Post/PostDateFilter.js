import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DatePicker } from 'antd';
import moment from 'moment';

import FilterLayout from '../../Components/Common/FilterLayout';

const DatePickerContaier = styled.div`
  display: flex;
  flex: 1;
`;

export default class Filter extends PureComponent {
  static propTypes = {
    onChanged: PropTypes.func
  };
  static defaultProps = {
    onChanged: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  _onChanged = value => {
    const { onChanged } = this.props;
    const createdAt =
      value && value.length
        ? moment(value[0]).format('YYYY-MM-DD hh:mmZ') +
          ',' +
          moment(value[1]).format('YYYY-MM-DD hh:mmZ')
        : '';
    onChanged({
      ...this.state,
      createdAt
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
          <DatePicker.RangePicker
            style={{ width: '100%' }}
            onChange={value => this._onChanged(value)}
          />
        </DatePickerContaier>
      </FilterLayout.FilterRow>
    );
  }
}
