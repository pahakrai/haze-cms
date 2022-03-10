import React from 'react'
import { Field } from 'redux-form'
import Select from 'react-select'
import styled from 'styled-components'
import { injectIntl } from 'react-intl'

import { ErrorMessage } from './Errors'
import FieldContainer from './FieldContainer'

import {
  HorizontalContainer,
  HorizontalErrorContainer,
  HorizontalFieldLabel,
  FieldLabel,
  HorizontalContainerWrapper
} from './form.styled'

const SelectWrapper = styled.div`
  flex: 1;
`
export const Dropdown = (props) => {
  const {
    input,
    label,
    labelStyle,
    options: _options,
    disabled,
    meta: { touched, error, warning } = {},
    containerStyle,
    horizontal = false,
    noLabel,
    intl,
    isMulti,
    placeholder,
    ...res
  } = props
  let Container = FieldContainer
  let Label = FieldLabel
  const options = [...(_options || [])]
  const errorMessage =
    touched &&
    ((error && <ErrorMessage>{error}</ErrorMessage>) ||
      (warning && <ErrorMessage>{warning}</ErrorMessage>))

  if (horizontal) {
    Container = HorizontalContainer
    Label = HorizontalFieldLabel
  }

  const labelComponent = !noLabel ? (
    <Label style={labelStyle}>{label}</Label>
  ) : null
  const value =
    (!isMulti
      ? options.find((opt) => opt.value === (input && input.value))
      : options.filter((opt) =>
          ((input && input.value) || []).includes(opt.value)
        )) || undefined
  return (
    <HorizontalContainerWrapper
      style={horizontal ? containerStyle : undefined}
      horizontal={horizontal}
    >
      <Container
        style={horizontal ? undefined : containerStyle}
        error={Boolean(errorMessage)}
      >
        {labelComponent}
        <SelectWrapper>
          <Select
            {...input}
            placeholder={
              placeholder || intl.formatMessage({ id: 'display_select' })
            }
            options={options}
            isDisabled={disabled}
            onChange={(opt) => {
              input.onChange(
                !isMulti
                  ? opt
                    ? opt.value
                    : ''
                  : opt?.map((v) => v && v.value) || [],
                opt
              )
            }}
            onBlur={(opt) => input.onBlur && input.onBlur(opt ? opt.value : '')}
            value={value || null}
            styles={selectStyles({ disabled })}
            isMulti={isMulti}
            {...res}
          />
        </SelectWrapper>
        {!horizontal && errorMessage}
      </Container>
      <HorizontalErrorContainer leftComponent={labelComponent}>
        {horizontal && errorMessage}
      </HorizontalErrorContainer>
    </HorizontalContainerWrapper>
  )
}

export const selectStyles = ({ disabled }) => ({
  control: (provided) => ({
    ...provided,
    borderWidth: 1,
    borderRadius: 0,
    borderColor: 'rgb(224,224,224)',
    fontWeight: '600',
    color: !disabled ? 'rgba(51,51,51,1)' : '#999999',
    backgroundColor: !disabled ? '#fff' : ' rgba(0, 0, 0, 0.03)',
    fontSize: 16,
    padding: '2px 0px'
  })
})

export default injectIntl((props) => {
  return <Field {...props} component={Dropdown} />
})
