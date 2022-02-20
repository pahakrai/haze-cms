import React, { PureComponent } from 'react';
import { Select } from 'antd';

import FilterLayout from '../../Components/Common/FilterLayout';

export default class FileMetaSortFilter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sort: undefined
    };
  }

  _onChanged = value => {
    this.setState({ ...value }, () => this.props.onChanged(this.state));
  };

  render() {
    const { intl } = this.props;

    return (
      <FilterLayout.FilterRow>
        <FilterLayout.FilterLabel>
          {intl.formatMessage({ id: 'display_file_sort' })}:{' '}
        </FilterLayout.FilterLabel>
        <Select
          style={{ flex: 1 }}
          value={this.state.sort ? this.state.sort : '-1'}
          onChange={v => this._onChanged({ sort: v })}
        >
          <Select.Option value="1">
            {intl.formatMessage({ id: 'ascending' })}
          </Select.Option>
          <Select.Option value="-1">
            {intl.formatMessage({ id: 'descending' })}
          </Select.Option>
        </Select>
      </FilterLayout.FilterRow>
    );
  }
}
