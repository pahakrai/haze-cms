import React from 'react'
import { reduxForm } from 'redux-form'
import styled from 'styled-components'
import * as Common from '@golpasal/common'
import { Row, Col } from 'react-flexa'
import { FormattedMessage } from 'react-intl'
import _ from 'lodash'

import { isMultiLanguagePaymentMethod } from '../../../Lib/util'

import useAntdBreakpoint from '../../../Lib/common/useAntdBreakpoint'
import Title from '../../Common/Title'
import Button from '../../Common/Button'
import Errors from '../../Form/Errors'
import { isURL } from '../../../Constants/Regex'

import MultiLanguageTextInput, {
  validateMTField
} from '../../Form/MultiLanguageTextInput'
import Form from '../../Form/Form'
import Dropdown from '../../Form/Dropdown'
import TextInput from '../../Form/TextInput'
import Switch from '../../Form/Switch'
import SelectPaymenntMethod from './SelectPaymenntMethod'
import CurrencyDropdowm from './CurrencyDropdowm'

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const validate = (values, { workspacePaymentMethods, updateMode }) => {
  const errors = {
    paymentMethodModel: {
      name: null,
      code: null
    }
  }
  const required = <FormattedMessage id={'error.required'} />
  const paymentMethodModel = values.paymentMethodModel || {}
  const nameError = validateMTField(
    paymentMethodModel.name || {},
    isMultiLanguagePaymentMethod
  )
  if (values.url && !isURL(values.url)) {
    errors.url = <FormattedMessage id={'error.format'} />
  }
  if (!values.platforms) {
    errors.platforms = required
  }
  if (!values.defaultCurrency) {
    errors.defaultCurrency = required
  }
  if (_.isNil(values.chargeValue)) {
    errors.chargeValue = required
  }
  if (_.isNil(values.adminCharge)) {
    errors.adminCharge = required
  }
  if (values.chargeValue && parseInt(values.chargeValue) < 0) {
    errors.chargeValue = <FormattedMessage id={'error.number.gtezero'} />
  }
  if (values.adminCharge && parseInt(values.adminCharge) < 0) {
    errors.adminCharge = <FormattedMessage id={'error.number.gtezero'} />
  }
  if (!paymentMethodModel.code) {
    errors.paymentMethodModel.code = required
  }
  if (paymentMethodModel.code && !updateMode) {
    const redundant = workspacePaymentMethods.filter(
      (v) => v.paymentMethod.code === paymentMethodModel.code
    )
    if (redundant.length) {
      errors.paymentMethodModel.code = (
        <FormattedMessage id={'error.code_duplicate'} />
      )
    }
  }

  if (nameError) {
    errors.paymentMethodModel.name = nameError
  }
  return errors
}

const Platforms = ({ intl }) => {
  const breakpoint = useAntdBreakpoint()

  return (
    <>
      <div
        style={{
          marginBottom: 20,
          height: 43,
          visibility: 'hidden',
          display: breakpoint.lg || breakpoint.md ? '' : 'none'
        }}
      ></div>
      <Dropdown
        isMulti
        label={intl.formatMessage({
          id: 'display_platform_types'
        })}
        name="platforms"
        options={Common.helpers
          .getConstants('type', 'PlatformType', intl.locale)
          .map((status) => ({
            label: status.text,
            value: status.value
          }))}
      />
    </>
  )
}

class WorkspacePaymentMethodForm extends React.PureComponent {
  renderButtons() {
    const { intl, pristine, submitting, updateMode } = this.props
    if (updateMode) {
      return (
        <ButtonWrapper>
          <Button.Primary disabled={pristine || submitting} type="submit">
            {intl.formatMessage({
              id: 'update_btn'
            })}
          </Button.Primary>
        </ButtonWrapper>
      )
    }
    return (
      <ButtonWrapper>
        <Button.Primary disabled={submitting} type="submit">
          {intl.formatMessage({
            id: 'create_btn'
          })}
        </Button.Primary>
      </ButtonWrapper>
    )
  }

  render() {
    const {
      // workspaces,
      // locale,
      onSubmit,
      // form,
      // initialValues,
      onSubmitSuccess,
      onSubmitFail = () => true,
      updateMode,
      intl
    } = this.props
    const inputConent = (
      <React.Fragment>
        <Row>
          <Col xs={12} sm={6} md={6} lg={6}>
            <SelectPaymenntMethod
              intl={intl}
              name="paymentMethodModel.code"
              label={intl.formatMessage({
                id: 'display_workspace_code'
              })}
              disabled={updateMode}
            />
          </Col>
          <Col xs={12} sm={6} md={6} lg={6}>
            <Switch
              type="number"
              name="isActive"
              label={intl.formatMessage({
                id: 'display_pushnotificationschedule_isActive'
              })}
            />
          </Col>
          <Col xs={12} sm={6} md={6} lg={6}>
            <MultiLanguageTextInput
              intl={intl}
              isMultiLanguage={isMultiLanguagePaymentMethod}
              name="paymentMethodModel.name"
              label={intl.formatMessage({
                id: 'display_name'
              })}
              disabled
            />
          </Col>
          <Col xs={12} sm={6} md={6} lg={6}>
            <Platforms intl={intl} />
          </Col>
          <Col xs={12} sm={6} md={6} lg={6}>
            <TextInput
              name="url"
              label={intl.formatMessage({
                id: 'display_url'
              })}
            />
          </Col>
          <Col xs={12} sm={6} md={6} lg={6}>
            <CurrencyDropdowm
              name="defaultCurrency"
              label={intl.formatMessage({
                id: 'currency'
              })}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={4} md={4} lg={4}>
            <TextInput
              name="chargeSymbol"
              label={intl.formatMessage({
                id: 'display_charge_symbol'
              })}
              disabled
            />
          </Col>
          <Col xs={12} sm={4} md={4} lg={4}>
            <TextInput
              name="chargeValue"
              label={intl.formatMessage({
                id: 'display_charge_value'
              })}
              type="number"
            />
          </Col>
          <Col xs={12} sm={4} md={4} lg={4}>
            <TextInput
              name="adminCharge"
              label={intl.formatMessage({
                id: 'display_charge_admin'
              })}
              type="number"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <TextInput
              name="credential.publicKey"
              label={intl.formatMessage({
                id: 'display_workspace_publicKey'
              })}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <TextInput
              name="credential.secretKey"
              label={intl.formatMessage({
                id: 'display_workspace_hook_secret'
              })}
            />
          </Col>
        </Row>
      </React.Fragment>
    )

    return (
      <Form
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFail={onSubmitFail}
      >
        <Errors />
        <Title.Wrapper>
          <Title>{intl.formatMessage({ id: 'payment_method_display' })}</Title>
          <Title.Right>{this.renderButtons()}</Title.Right>
        </Title.Wrapper>
        <div>{inputConent}</div>
      </Form>
    )
  }
}
export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {}
})(WorkspacePaymentMethodForm)
