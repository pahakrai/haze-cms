import React from 'react';
import { Select } from 'antd';

import FilterLayout from '../../Components/Common/FilterLayout';

class CourierFilter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isActive: undefined
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
          {intl.formatMessage({
            id: 'display_pushnotificationschedule_isActive'
          })}
        </FilterLayout.FilterLabel>

        <Select
          style={{ flex: 1 }}
          value={this.state.isActive !== undefined ? this.state.isActive : ''}
          allowClear={true}
          onChange={v => this._onChanged({ isActive: v })}
        >
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
export default CourierFilter;
