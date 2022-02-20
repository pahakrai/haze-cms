import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { helpers } from '@golpasal/common';

import { Select } from 'antd';
import { withRouter } from 'react-router';

import FilterLayout from '../../Components/Common/FilterLayout';

class QuotationFilter extends PureComponent {
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
    const statusOptions = helpers
      .getConstants('status', 'QuotationStatus', intl.locale)
      .map(status => ({
        label: status.text,
        value: status.value
      }));
    return (
      <FilterLayout.FilterRow>
        <FilterLayout.FilterLabel>
          {intl.formatMessage({ id: 'status' })}:{' '}
        </FilterLayout.FilterLabel>
        <Select
          style={{ flex: 1 }}
          defaultValue={''}
          onChange={status => {
            onChanged({
              ...this.state,
              status: status === '' ? undefined : status
            });
          }}
        >
          <Select.Option value={''}>
            {intl.formatMessage({ id: 'all' })}
          </Select.Option>
          {statusOptions.map(item => (
            <Select.Option key={item.value} value={item.value}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
      </FilterLayout.FilterRow>
    );
  }
}

export default withRouter(QuotationFilter);
