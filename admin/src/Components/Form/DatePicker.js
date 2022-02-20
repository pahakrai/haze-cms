import React from 'react';
import { Field } from 'redux-form';
import TimePicker, { DATE_FORMAT } from '../Common/TimePicker';
import TextInput from '../Common/TextInput';

import { ErrorMessage } from './Errors';
import FieldContainer from './FieldContainer';

import {
  RequireMark,
  HorizontalContainer,
  HorizontalErrorContainer,
  HorizontalFieldLabel,
  TextInputWrapper,
  FieldLabel,
  HorizontalContainerWrapper
} from './form.styled';

const Picker = props => {
  const {
    input,
    label,
    meta: { touched, error, warning },
    horizontal = false,
    requireMark = false,
    labelStyle,
    containerStyle,
    disabled,
    noLabel = false,
    placeholder,
    valueFormat = v => v,
    ...some
  } = props;
  let Container = FieldContainer;
  let Label = FieldLabel;
  const errorMessage =
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
    </Label>
  ) : null;

  const onChange = time => input.onChange(valueFormat(time));

  return (
    <HorizontalContainerWrapper
      style={horizontal ? containerStyle : undefined}
      horizontal={horizontal}
    >
      <Container style={horizontal ? undefined : containerStyle}>
        {labelComponent}
        <TextInputWrapper>
          <div>
            <TimePicker
              block
              customInput={
                <TextInput
                  dateInput
                  onChange={onChange}
                  style={{
                    borderRadius: 0,
                    borderColor: 'rgb(224,224,224)',
                    fontWeight: '600',
                    color: !disabled ? 'rgba(51,51,51,1)' : '#999999',
                    backgroundColor: !disabled
                      ? '#FFF'
                      : ' rgba(0, 0, 0, 0.03)',
                    fontSize: 16
                  }}
                  {...input}
                  placeholder={placeholder || label}
                />
              }
              inputProps={{ ...input }}
              onTimeChange={onChange}
              value={input.value}
              dateFormat={DATE_FORMAT}
              showTimeSelect={false}
              disabled={disabled}
              placeholderText={placeholder || label}
              {...some}
            />
            {horizontal && (
              <HorizontalErrorContainer>
                {errorMessage}
              </HorizontalErrorContainer>
            )}
          </div>
          {!horizontal && errorMessage}
        </TextInputWrapper>
      </Container>
    </HorizontalContainerWrapper>
  );
};

export const DatePickerNoField = ({
  value,
  input = {},
  meta = {},
  ...props
}) => <Picker input={{ value, ...input }} meta={meta} {...props} />;

export default props => {
  return <Field {...props} component={Picker} />;
};
