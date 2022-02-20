import React, { PureComponent } from 'react';
import { Select } from 'antd';

import FilterLayout from '../../Components/Common/FilterLayout';

class CustomerEnquiryFollowFilter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFollow: ''
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
            id: 'display_is_follow_up'
          })}
        </FilterLayout.FilterLabel>
        <Select
          style={{ flex: 1 }}
          value={this.state.isFollow !== undefined ? this.state.isFollow : ''}
          allowClear={true}
          onChange={v => this._onChanged({ isFollow: v })}
        >
          <Select.Option value="">
            {intl.formatMessage({ id: 'all' })}
          </Select.Option>
          <Select.Option value="true">
            {intl.formatMessage({ id: 'display_yes' })}
          </Select.Option>
          <Select.Option value="false">
            {intl.formatMessage({ id: 'display_no' })}
          </Select.Option>
        </Select>
      </FilterLayout.FilterRow>
    );
  }
}

export default CustomerEnquiryFollowFilter;
