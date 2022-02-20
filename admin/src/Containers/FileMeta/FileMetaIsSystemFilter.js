import React, { PureComponent } from 'react';
import { Select } from 'antd';

import FilterLayout from '../../Components/Common/FilterLayout';

export default class FileMetaIsSystemFilter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSystemFile: undefined
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
          {intl.formatMessage({ id: 'display_file_isSystem_file' })}:{' '}
        </FilterLayout.FilterLabel>
        <Select
          style={{ flex: 1 }}
          value={
            this.state.isSystemFile !== undefined ? this.state.isSystemFile : ''
          }
          onChange={v => this._onChanged({ isSystemFile: v })}
        >
          <Select.Option value={''}>
            {intl.formatMessage({ id: 'all' })}
          </Select.Option>
          <Select.Option value={true}>
            {intl.formatMessage({ id: 'display_yes' })}
          </Select.Option>
          <Select.Option value={false}>
            {intl.formatMessage({ id: 'display_no' })}
          </Select.Option>
        </Select>
      </FilterLayout.FilterRow>
    );
  }
}
