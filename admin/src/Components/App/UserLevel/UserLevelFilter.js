import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Select } from 'antd';
import { helpers as EcommCommonHelpers } from '@golpasal/common';

import Title from '../../Common/H5';

const FilterLabel = styled(Title)`
  display: block;
  margin-right: 0.5em;
`;
export default class UserLevelFilter extends PureComponent {
  static propTypes = {
    onChanged: PropTypes.func
  };
  static defaultProps = {
    onChanged: () => {}
  };

  render() {
    const { intl, onChanged } = this.props;
    const userTypes = EcommCommonHelpers.getConstants(
      'type',
      'UserType',
      intl.locale
    ).map(status => ({
      text: status.text,
      value: status.value
    }));
    return (
      <div>
        <FilterLabel>{intl.formatMessage({ id: 'status' })}</FilterLabel>
        <Select
          style={{ width: '100%' }}
          defaultValue=""
          onChange={status => onChanged({ status })}
        >
          <Select.Option value="">
            {intl.formatMessage({ id: 'all' })}
          </Select.Option>

          {userTypes.map(item => (
            <Select.Option key={item.value} value={item.value}>
              {item.text}
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  }
}
