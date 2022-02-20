import React from 'react';
import { Field } from 'redux-form';
import styled, { withTheme } from 'styled-components';
import { Tag } from 'antd';
import Loading from 'react-loading';

import TextInputComponent from '../Common/TextInput';
import { ErrorMessage } from './Errors';
import FieldContainer from './FieldContainer';
import {
  RequireMark,
  HorizontalContainer,
  HorizontalErrorContainer,
  ErrorContainer,
  HorizontalFieldLabel,
  TextInputWrapper,
  FieldLabel,
  HorizontalContainerWrapper
} from './form.styled';

const RelativeDiv = styled.div`
  position: relative;
`;

const AbsoluteSpan = styled.span`
  position: absolute;
  right: 0;
  cursor: pointer;
  font-weight: 600;
  color: #666666;
  font-size: ${props => props.theme.fonts.size.h5};
`;

export const TextInput = withTheme(props => {
  const {
    input,
    rows,
    label,
    noLabel = false,
    labelStyle,
    tagProps,
    type,
    disabled,
    meta: { touched, error, warning },
    placeholder,
    accessory,
    accessoryContainerStyle = {},
    onAccessoryClick,
    inputProps = {},
    horizontal = false,
    requireMark = false,
    error: hasErrorCompoennt = true,
    containerStyle,
    autoFocus,
    renderFooter,
    maxLength,
    theme,
    loading = false
    // onRef
  } = props;
  let Container = FieldContainer;
  let Label = FieldLabel;
  const errorMessage =
    hasErrorCompoennt &&
    touched &&
    ((error && <ErrorMessage>{error}</ErrorMessage>) ||
      (warning && <ErrorMessage>{warning}</ErrorMessage>));

  if (horizontal) {
    Container = HorizontalContainer;
    Label = HorizontalFieldLabel;
  }

  const labelComponent = !noLabel ? (
    <Label style={labelStyle}>
      {requireMark && <RequireMark>*</RequireMark>}
      <span>{label}</span>
      {tagProps && (
        <Tag color={tagProps.color} style={tagProps.style}>
          {tagProps.name}
        </Tag>
      )}
    </Label>
  ) : null;

  return (
    <HorizontalContainerWrapper
      style={horizontal ? containerStyle : undefined}
      horizontal={horizontal}
    >
      <Container
        style={horizontal ? undefined : containerStyle}
        error={Boolean(errorMessage)}
        center={rows === undefined}
      >
        {labelComponent}
        <TextInputWrapper horizontal={horizontal}>
          <RelativeDiv>
            <div>
              {loading ? (
                <Loading
                  type="spokes"
                  color={theme.color.primary}
                  height={15}
                  width={15}
                />
              ) : (
                <TextInputComponent
                  // onRef={onRef}
                  disabled={disabled}
                  rows={rows}
                  {...input}
                  placeholder={placeholder || label}
                  type={type}
                  {...inputProps}
                  autoFocus={autoFocus}
                  style={inputProps.style || {}}
                  maxLength={maxLength}
                />
              )}
            </div>
            {accessory && (
              <AbsoluteSpan
                style={{
                  ...accessoryContainerStyle,
                  ...(horizontal
                    ? {
                        left: '100%',
                        marginLeft: 16,
                        top: 10
                      }
                    : {})
                }}
                onClick={onAccessoryClick}
              >
                {accessory}
              </AbsoluteSpan>
            )}
          </RelativeDiv>
          <ErrorContainer>
            {(!horizontal && errorMessage) || <div />}
            {renderFooter && renderFooter(input.value)}
          </ErrorContainer>
        </TextInputWrapper>
      </Container>
      {horizontal && (
        <HorizontalErrorContainer leftComponent={labelComponent}>
          {errorMessage}
          {renderFooter && renderFooter(input.value)}
        </HorizontalErrorContainer>
      )}
    </HorizontalContainerWrapper>
  );
});

export const TextInputNoField = ({
  value,
  input = {},
  onChange,
  meta = {},
  ...props
}) => (
  <TextInput input={{ value, onChange, ...input }} meta={meta} {...props} />
);

export const MaxLength = ({ value, max }) => (
  <div
    style={{
      textAlign: 'right',
      fontSize: 12,
      color: value < max ? '#bbb' : '#f5222d'
    }}
  >
    {value}/{max}
  </div>
);

export default props => {
  return <Field component={TextInput} {...props} />;
};
