import React from 'react';
import styled from 'styled-components';
import { Checkbox } from 'antd';

const CheckboxContainer = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const CheckboxLabel = styled.span`
  margin-left: 10px;
`;

export default class _Checkbox extends React.PureComponent {
  render() {
    const {
      checked,
      disabled,
      label,
      onChange,
      style,
      checkboxStyle,
      children,
      ...rest
    } = this.props;

    return (
      <CheckboxContainer className={disabled ? 'disabled' : ''} style={style}>
        <Checkbox
          style={checkboxStyle}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          {...rest}
        />
        <div />
        {label && <CheckboxLabel>{label}</CheckboxLabel>}
        {children}
      </CheckboxContainer>
    );
  }
}
