import React from 'react';
import styled from 'styled-components';

const CheckboxContainer = styled.label`
  position: relative;
  display: block;
  color: rgba(0, 0, 0, 0.87);
  cursor: pointer;
  font-size: 14px;
  line-height: 18px;

  & > input {
    appearance: none;
    position: absolute;
    z-index: -1;
    left: -15px;
    top: -15px;
    display: block;
    margin: 0;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    background-color: rgba(0, 0, 0, 0.42);
    outline: none;
    opacity: 0;
    transform: scale(1);
    transition: opacity 0.5s, transform 0.5s;
  }

  & > input:checked {
    background-color: #2196f3;
  }

  &:active > input {
    opacity: 1;
    transform: scale(0);
    transition: opacity 0s, transform 0s;
  }

  & > input:disabled {
    opacity: 0;
  }

  & > input:disabled + span {
    cursor: initial;
  }

  & > span::before {
    content: '';
    display: inline-block;
    margin-right: ${props => props.labelIndent}px;
    border: solid 2px rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    width: 14px;
    height: 14px;
    vertical-align: -2px;
    transition: border-color 0.5s, background-color 0.5s;
  }

  & > input:checked + span::before {
    border-color: #2196f3;
    background-color: #2196f3;
  }

  & > input:active + span::before {
    border-color: #2196f3;
  }

  & > input:checked:active + span::before {
    border-color: transparent;
    background-color: rgba(0, 0, 0, 0.2);
  }

  & > span::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 2px;
    left: 0;
    width: 5px;
    height: 10px;
    border: solid 2px transparent;
    border-left: none;
    border-top: none;
    transform: translate(5.5px, 1px) rotate(45deg);
  }

  & > input:checked + span::after {
    border-color: #fff;
  }
  &.disabled > span::before {
    background-color: #e6e6e6;
  }
  &.disabled > input:checked + span::before {
    border-color: #2d3a44;
    background-color: #4b6579;
  }
`;

export default class Checkbox extends React.PureComponent {
  render() {
    const {
      checked,
      disabled,
      label,
      onChange,
      labelIndent = 15,
      containerStyle,
      ...rest
    } = this.props;
    return (
      <CheckboxContainer
        className={disabled ? 'disabled' : ''}
        labelIndent={labelIndent}
        style={containerStyle}
      >
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          {...rest}
        />
        <span>{label}</span>
      </CheckboxContainer>
    );
  }
}
