import React from 'react'
import { Field } from 'redux-form'
import Select from 'react-select'
import { Row, Col } from 'react-flexa'
import { ErrorMessage } from '../../Form/Errors'
// common
import Common from '@golpasal/common'
// Form
import TextInput from '../../Common/TextInput'
import FieldContainer from '../../Form/FieldContainer'
import FieldLabel from '../../Form/FieldLabel'

// styled
import styled from 'styled-components'
// icon
import { FaEye } from 'react-icons/fa'
// util
import * as Regexps from '../../../Lib/common/regexps'

import { ScreenParameterForm } from './ScreenParameterForms'

const RelativeDiv = styled.div`
  position: relative;
`

const AbsoluteSpan = styled.span`
  position: absolute;
  right: 0;
  cursor: pointer;
`

const getScreenOption = (ScreenOption, screen) => {
  const option =
    ScreenOption &&
    Array.isArray(ScreenOption) &&
    ScreenOption.filter((i) => i.screen === screen)
  if (option && option.length && option[0]) return option[0]
  else return {}
}

class ScreenParametersInput extends React.PureComponent {
  constructor(props) {
    super(props)
    const screen = props.notification.data.screen
    const parameters = props.notification.data.parameters
    this.state = {
      value: props.notification.data,
      notificationMediaType: props.notificationMediaType,
      screen,
      parameters,
      setGroups: props.setGroups
    }
  }
  static defaultProps = {
    input: {
      value: { screen: null, parameters: null },
      onChange: () => true,
      onBlur: () => true
    }
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.notificationMediaType !== prevState.notificationMediaType) {
  //     if (nextProps.input.onChange)
  //       nextProps.input.onChange({
  //         screen: null,
  //         parameters: null
  //       });
  //     return {
  //       ...prevState,
  //       notificationMediaType: nextProps.notificationMediaType,
  //       screen: null,
  //       parameters: null
  //     };
  //   }
  //   if (
  //     nextProps.input &&
  //     nextProps.input.value &&
  //     nextProps.input.value !== prevState.value
  //   ) {
  //     const screen = nextProps.input.value.screen;
  //     const parameters = nextProps.input.value.parameters;
  //     return {
  //       ...prevState,
  //       notificationMediaType: nextProps.notificationMediaType,
  //       screen,
  //       parameters
  //     };
  //   }
  //   return null;
  // }

  _onChangeParameters = (parameters) => {
    const {
      input: { onChange }
    } = this.props
    const newState = { ...this.state, parameters }
    this.setState(newState, () => onChange(newState))
  }

  _onChangeDetailsDropdown = ({ value: option }) => {
    const {
      input: { onChange }
    } = this.props
    const newState = {
      screen: option,
      parameters: {}
    }
    this.setState(newState, () => onChange(newState))
  }

  _getScreenLabel = () => {
    const { intl, notificationMediaType } = this.props
    switch (notificationMediaType) {
      case Common.type.NotificationMediaType.EMAIL:
        return intl.formatMessage({
          id: 'display_pushnotificationschedule_email_template'
        })
      case Common.type.NotificationMediaType.SMS:
        return intl.formatMessage({
          id: 'display_pushnotificationschedule_sms_link'
        })
      case Common.type.NotificationMediaType.MOBILE:
        return intl.formatMessage({
          id: 'display_pushnotificationschedule_screen'
        })
      default:
        return ''
    }
  }

  _getParametersLabel = () => {
    const { intl, notificationMediaType, parametersLabel } = this.props
    switch (notificationMediaType) {
      case Common.type.NotificationMediaType.EMAIL:
        return intl.formatMessage({
          id: 'display_pushnotificationschedule_email_link'
        })
      case Common.type.NotificationMediaType.SMS:
      case Common.type.NotificationMediaType.MOBILE:
        return parametersLabel
      default:
        return ''
    }
  }

  // only EMAIL type use
  _onEmailChange = (text) => {
    const {
      input: { onChange }
    } = this.props
    const newState = {
      screen: text
    }
    this.setState(newState, () => onChange(newState))
  }

  // only SMS type use
  _onSmsChange = (text) => {
    const {
      input: { onChange }
    } = this.props
    const newState = {
      screen: text
    }
    this.setState(newState, () => onChange(newState))
  }

  // type Email
  _getEmailTypeParametersComp = () => {
    return ({ screen, ...props }) => (
      <RelativeDiv>
        <TextInput
          {...props}
          value={screen || ''}
          disabled={true}
          onChange={() => false}
        />
        <AbsoluteSpan
          style={{ right: 16, top: 13 }}
          onClick={() => {
            if (!screen) return
            if (Regexps.getURLPattern().test(screen)) window.open(screen)
            else window.open(`/edms/${screen}`)
          }}
        >
          {screen && <FaEye size={16} />}
        </AbsoluteSpan>
      </RelativeDiv>
    )
  }
  // type Email
  _onChangeEmailDropdown = ({ value }) => {
    const {
      input: { onChange }
    } = this.props
    const newState = {
      screen: value,
      parameters: {}
    }
    this.setState(newState, () => onChange(newState))
  }
  _renderError = (field, render = this._recurVaildElement) => {
    const {
      meta: { touched, error, warning }
    } = this.props
    return (
      touched &&
      ((error && error[field] && render(error[field])) ||
        (warning && warning[field] && (
          <ErrorMessage>{warning[field]}</ErrorMessage>
        )))
    )
  }
  setParameters = (value) => {
    const {
      input: { onChange }
    } = this.props
    const newState = { ...this.state, parameters: value }
    this.setState(newState, () => onChange(newState))
  }
  render() {
    const {
      intl,
      disabled,
      screenPlaceholder,
      screenOption,
      clientOptions,
      driverOptions,
      meta: { touched, error, warning },
      // placeholder,
      input: { value },
      notificationMediaType,
      // edms list
      emailTemplates
    } = this.props
    const { screen, parameters } = this.state
    // only mobile type use
    let { ParametersComp = null } =
      notificationMediaType === Common.type.NotificationMediaType.MOBILE &&
      getScreenOption(screenOption, screen)
    // only Email type use
    if (notificationMediaType === Common.type.NotificationMediaType.EMAIL)
      ParametersComp = this._getEmailTypeParametersComp()
    // get type label
    const screenLabel = this._getScreenLabel()
    const screenComp = (
      <FieldContainer>
        <FieldLabel
          style={{
            padding: '3px 0',
            display: 'inline-block',
            fontWeight: 600,
            color: '#666666',
            fontSize: '14px'
          }}
        >
          {screenLabel}
        </FieldLabel>
        {notificationMediaType === Common.type.NotificationMediaType.EMAIL && (
          <Select
            placeholder={screenPlaceholder}
            options={emailTemplates}
            isDisabled={disabled}
            onChange={this._onChangeEmailDropdown}
            value={
              emailTemplates &&
              Array.isArray(emailTemplates) &&
              emailTemplates.find((opt) => opt.value === screen)
            }
          />
        )}
        {notificationMediaType === Common.type.NotificationMediaType.SMS && (
          <TextInput value={screen || ''} onChange={this._onSmsChange} />
        )}
        {!value.screen &&
          touched &&
          ((error && <ErrorMessage>{error['screen']}</ErrorMessage>) ||
            (warning && <ErrorMessage>{warning['screen']}</ErrorMessage>))}
      </FieldContainer>
    )
    // only mobile type use
    const parametersLabel = this._getParametersLabel()
    const parametersComp = ParametersComp && (
      <FieldContainer>
        <FieldLabel>{parametersLabel}</FieldLabel>
        <ParametersComp
          intl={intl}
          disabled={disabled}
          value={parameters}
          screen={screen}
          onChange={this._onChangeParameters}
        />
        {value.screen &&
          touched &&
          ((error && <ErrorMessage>{error}</ErrorMessage>) ||
            (warning && <ErrorMessage>{warning}</ErrorMessage>))}
      </FieldContainer>
    )
    return (
      <React.Fragment>
        {screenComp && !parametersComp && (
          <Row>
            <Col md={12} sm={24}>
              {screenComp}
            </Col>
          </Row>
        )}
        {screenComp && parametersComp && (
          <Row>
            <Col md={6} sm={12}>
              {screenComp}
            </Col>
            <Col md={6} sm={12}>
              {parametersComp}
            </Col>
          </Row>
        )}
        {notificationMediaType === Common.type.NotificationMediaType.MOBILE && (
          <FieldContainer>
            {this.props.setGroups ===
              Common.type.PushNotificationScheduleToPeople.MEMBER && (
              <React.Fragment>
                <Select
                  placeholder={screenPlaceholder}
                  options={clientOptions}
                  isDisabled={disabled}
                  onChange={this._onChangeDetailsDropdown}
                  value={clientOptions.find((opt) => opt.value === screen)}
                />
              </React.Fragment>
            )}
            {this.props.setGroups ===
              Common.type.PushNotificationScheduleToPeople.MERCHANT && (
              <React.Fragment>
                {/* <FieldLabel>{screenLabel}</FieldLabel> */}
                <Select
                  placeholder={screenPlaceholder}
                  options={driverOptions}
                  isDisabled={disabled}
                  onChange={this._onChangeDetailsDropdown}
                  value={driverOptions.find((opt) => opt.value === screen)}
                />
              </React.Fragment>
            )}
            <div style={{ paddingTop: '15px' }}>
              <ScreenParameterForm
                screenName={this.state.screen}
                parameters={this.state.parameters}
                onChange={this.setParameters}
                intl={intl}
              />
              {value.parameters &&
                !value.parameters._id &&
                touched &&
                ((error && (
                  <ErrorMessage>{error['parameters']}</ErrorMessage>
                )) ||
                  (warning && (
                    <ErrorMessage>{warning['parameters']}</ErrorMessage>
                  )))}
            </div>
          </FieldContainer>
        )}
      </React.Fragment>
    )
  }
}

const LinkParametersInput = (props) => (
  <ScreenParametersInput
    {...props}
    input={{
      value: props.input &&
        props.input.value && {
          ...props.input.value,
          screen: props.input.value.screen
          // details: props.notification.data.details,
          // parameters: props.notification.data.parameters
        },
      onChange: (value) =>
        props.input &&
        props.input.onChange({
          parameters: value.parameters,
          screen: value.screen
        })
    }}
  />
)

export default (props) => {
  return <Field component={LinkParametersInput} {...props} />
}
