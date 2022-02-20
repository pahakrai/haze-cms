import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import { withRouter } from 'react-router';

import FilterLayout from '../../Components/Common/FilterLayout';

class SalesVolumeYearFilter extends PureComponent {
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

  render() {
    const { intl, onChanged } = this.props;
    return (
      <FilterLayout.FilterRow>
        <DatePicker
          placeholder={intl.formatMessage({ id: 'display_select_year' })}
          onChange={date => {
            onChanged({
              ...this.state,
              year: (date && date.year()) || undefined,
              month: (date && date.month()) || 0
            });
          }}
          picker="year"
        />
      </FilterLayout.FilterRow>
    );
  }
}

export default withRouter(SalesVolumeYearFilter);
