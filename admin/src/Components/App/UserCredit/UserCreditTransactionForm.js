import React from 'react'
import { reduxForm } from 'redux-form'
import { Row, Col } from 'react-flexa'
import { FormattedMessage } from 'react-intl'
// common
import * as Common from '@golpasal/common'
// components
import Button from '../../Common/Button'
// Form components
import Dropdown from '../../Form/Dropdown'
import Form from '../../Form/Form'
import Errors from '../../Form/Errors'
import TextInput from '../../Form/TextInput'
import DatePicker from '../../Form/DatePicker'

const validate = (values, { formValueAmountType }) => {
  const errors = {}
  const requiredError = <FormattedMessage id={'error.required'} />
  if (!values.description) errors.description = requiredError
  if (!values.transactionType) errors.transactionType = requiredError
  if (!values.amountType) errors.amountType = requiredError
  if (!values.amount) {
    errors.amount = <FormattedMessage id={'error.number.gtzero'} />
  } else if (
    !/^[0-9]+.?[0-9]*$/.test(values.amount + '') ||
    Number(values.amount) <= 0
  ) {
    errors.amount = <FormattedMessage id={'error.number.gtzero'} />
  }
  if (
    formValueAmountType === Common.default.type.AmountType.CASH &&
    !values.currency
  )
    errors.currency = requiredError

  return errors
}

const UserCreditTransactionForm = ({
  error,
  intl,
  form,
  invalid,
  submitting,
  pristine,
  onSubmit,
  onSubmitSuccess,
  initialValues,
  onSubmitFail = () => true,
  updateMode,
  workspaces,
  displayWorkspaces,
  currencies,
  formValueAmountType,
  amountType
}) => {
  const transactionTypes = Common.helpers
    .getConstants('type', 'TransactionType', intl.locale)
    .map((t) => ({
      label: t.text,
      value: t.value
    }))
  const amountTypes = Common.helpers
    .getConstants('type', 'AmountType', intl.locale)
    .map((t) => ({
      label: t.text,
      value: t.value
    }))
  const currencyOptions = []
  if (currencies) {
    currencies.forEach((currency) => {
      currencyOptions.push({
        label: currency.code,
        value: currency.code
      })
    })
  }
  const displayCurrency =
    formValueAmountType === Common.default.type.AmountType.CASH

  return (
    <Form
      name={form}
      onSubmit={onSubmit}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
    >
      <Errors />
      <Row>
        <Col xs={12}>
          {updateMode && (
            <DatePicker
              label={intl.formatMessage({
                id: 'display_user_credit_transactionDate'
              })}
              name="transactionDate"
              dateFormat="yyyy-MM-dd HH:mm:ss"
              disabled
            />
          )}
          <Dropdown
            name="transactionType"
            label={intl.formatMessage({
              id: 'display_user_credit_type'
            })}
            options={transactionTypes}
            disabled={updateMode}
          />
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Dropdown
            name="amountType"
            label={intl.formatMessage({
              id: 'display_user_credit_amount_type'
            })}
            options={amountTypes}
            disabled
          />
        </Col>
        {displayCurrency && (
          <Col xs={12} sm={12} md={3}>
            <Dropdown
              name="currency"
              label={intl.formatMessage({
                id: 'currency'
              })}
              options={currencyOptions}
              disabled={updateMode}
            />
          </Col>
        )}
        <Col xs={12} sm={12} md={displayCurrency ? 3 : 6}>
          <TextInput
            name="amount"
            label={intl.formatMessage({
              id:
                amountType === Common.default.type.AmountType.CASH
                  ? 'display_user_credit_cash'
                  : 'display_user_credit_point'
            })}
            disabled={updateMode}
          />
        </Col>
        {/* <Col xs={12} sm={12} md={6}>
          {updateMode && (
            <TextInput
              name="balance"
              label={intl.formatMessage({
                id: 'display_user_credit_balance'
              })}
              disabled
            />
          )}
        </Col> */}
        <Col xs={12}>
          <TextInput
            rows={5}
            name="description"
            label={intl.formatMessage({
              id: 'display_user_credit_description'
            })}
            disabled={updateMode}
          />
        </Col>
      </Row>
      {!updateMode && (
        <Row>
          <Col xs={12} display="flex" style={{ justifyContent: 'flex-end' }}>
            <Button.Primary
              disabled={updateMode ? pristine || submitting : submitting}
              type="submit"
            >
              {updateMode
                ? intl.formatMessage({ id: 'update_btn' })
                : intl.formatMessage({ id: 'create_btn' })}
            </Button.Primary>
          </Col>
        </Row>
      )}
    </Form>
  )
}

export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false
})(UserCreditTransactionForm)
