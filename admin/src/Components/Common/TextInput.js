import React from 'react';
import styled from 'styled-components';

export const Input = styled.input`
  height: 42px;
  min-width: 100px;
  padding: 6px 10px;
  cursor: text;
  text-align: left;
  font-size: 16px;
  line-height: 1.5;
  color: rgba(51, 51, 51, 1);
  background-color: #fff;
  background-image: none;
  border: 1px solid #e9e9e9;
  font-weight: 600;
  -webkit-border-radius: 0px;
  -moz-border-radius: 0px;
  -o-border-radius: 0px;
  border-radius: 0px;
  -ms-transition: 4px;
  -webkit-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  -moz-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  -ms-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  -o-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  -webkit-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  box-sizing: border-box;
  margin: 0;
  list-style: none;
  position: relative;
  display: inline-block;
  width: 100%;
  &:disabled {
    cursor: default;
    background-color: rgba(0, 0, 0, 0.03);
    color: ${({ disabledTextColor }) => disabledTextColor || '#999999'};
  }
  border: 1px solid rgba(224, 224, 224, 1);
`;

const TextArea = styled.textarea`
  min-height: 28px;
  padding: 6px 10px;
  cursor: text;
  text-align: left;
  font-size: 16px;
  line-height: 1.5;
  color: rgba(51, 51, 51, 1);
  background-color: #fff;
  background-image: none;
  border: 1px solid #e9e9e9;
  font-weight: 600;
  -webkit-border-radius: 0px;
  -moz-border-radius: 0px;
  -o-border-radius: 0px;
  border-radius: 0px;
  -ms-transition: 4px;
  -webkit-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  -moz-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  -ms-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  -o-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  -webkit-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  box-sizing: border-box;
  margin: 0;
  list-style: none;
  position: relative;
  display: inline-block;
  width: 100%;
  &:disabled {
    cursor: default;
    background-color: rgba(0, 0, 0, 0.03);
    color: #999999;
  }
  border-radius: 0px;
  border: 1px solid rgba(224, 224, 224, 1);
`;

export default class TextInput extends React.PureComponent {
  static defaultProps = {
    onChange: () => true
  };
  constructor(props) {
    super(props);
    this.state = {
      text: props.value
    };
  }
  componentDidUpdate(preProps) {
    if (preProps.value !== this.props.value) {
      this.setState({
        text: this.props.value
      });
    }
  }

  onChange = ev => {
    const {
      onChange,
      dateInput,
      maxLength,
      value: prevValue,
      formatValue: formatValueFn
    } = this.props;
    const value = ev.target.value;
    const formatValue = formatValueFn ? formatValueFn(value) : value;

    if (maxLength) {
      if (value.length <= maxLength || prevValue.length > value.length) {
        onChange(formatValue);
        this.setState({
          text: value
        });
      }
    } else {
      if (dateInput) {
        onChange(ev);
      } else {
        onChange(formatValue);
      }
      this.setState({
        text: value
      });
    }
  };
  onBlur = ev => {
    const { onBlur, formatValue: formatValueFn } = this.props;
    const value = ev.target.value;
    const formatValue = formatValueFn ? formatValueFn(value) : value;
    onBlur && onBlur(formatValue);
  };

  focus() {
    if (this.input) {
      this.input.focus();
    }
    if (this.textarea) {
      this.textarea.focus();
    }
  }

  render() {
    const { onChange, onBlur } = this;
    const { text } = this.state;

    return this.props.rows ? (
      <TextArea
        {...this.props}
        value={text}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref => (this.textarea = ref)}
      />
    ) : (
      <Input
        {...this.props}
        value={text === 0 ? `${text}` : text || ''}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref => (this.input = ref)}
      />
    );
  }
}
