import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Switch as AntdSwitch } from 'antd';
// import Toggle from 'react-toggle';
import 'react-toggle/style.css';

import H6 from './H6';

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;
const ToggleLabel = styled(H6)`
  margin-right: 10px;
`;

export default class Switch extends React.PureComponent {
  static propTypes = {
    size: PropTypes.number,
    onToggle: PropTypes.func,
    value: PropTypes.bool,
    defaultValue: PropTypes.bool,
    label: PropTypes.string,
    disabled: PropTypes.bool
  };
  static defaultProps = {
    size: 15,
    onToggle: () => true,
    disabled: false,
    defaultValue: true
  };

  render() {
    const {
      onToggle,
      label,
      defaultValue,
      value = defaultValue,
      disabled,
      checkedChildren,
      unCheckedChildren
    } = this.props;
    return (
      <SwitchContainer>
        {label && <ToggleLabel>{label}</ToggleLabel>}
        <AntdSwitch
          checked={value}
          disabled={disabled}
          onChange={checked => {
            onToggle(checked);
          }}
          checkedChildren={checkedChildren}
          unCheckedChildren={unCheckedChildren}
        />
        {/* <Toggle
          checked={value}
          icons={false}
          disabled={disabled}
          onChange={e => {
            onToggle(e.target.checked);
          }}
        /> */}
      </SwitchContainer>
    );
  }
}
