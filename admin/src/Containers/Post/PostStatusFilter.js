import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

import FilterLayout from '../../Components/Common/FilterLayout';

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

  render() {
    const { intl, onChanged } = this.props;

    return (
      <FilterLayout.FilterRow>
        <FilterLayout.FilterLabel>
          {intl.formatMessage({ id: 'display_page_status' })}:{' '}
        </FilterLayout.FilterLabel>
        <Select
          style={{ flex: 1 }}
          defaultValue={''}
          onChange={v => {
            onChanged({
              ...this.state,
              isActive: v === '' ? undefined : v
            });
          }}
        >
          <Select.Option value="">
            {intl.formatMessage({ id: 'all' })}
          </Select.Option>
          <Select.Option value="true">
            {intl.formatMessage({ id: 'display_available' })}
          </Select.Option>
          <Select.Option value="false">
            {intl.formatMessage({ id: 'display_unavailable' })}
          </Select.Option>
        </Select>
      </FilterLayout.FilterRow>
    );
  }
}
