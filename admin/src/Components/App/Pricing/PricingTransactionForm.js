import React from 'react';
import { reduxForm } from 'redux-form';
import { Row, Col } from 'react-flexa';
import { FormattedMessage } from 'react-intl';
// components
import Button from '../../Common/Button';
// Form components
import Form from '../../Form/Form';
import Errors from '../../Form/Errors';
import TextInput from '../../Form/TextInput';

const validate = (values, { formValueAmountType }) => {
  const errors = {};
  if (values.pricing) {
    if (!/^[0-9]+.?[0-9]*$/.test(values.pricing.amount)) {
      errors.pricing = errors.pricing || {};
      errors.pricing.amount = (
        <FormattedMessage
          id={'display_fare_management_error_cannot_negative'}
        />
      );
    }
  }
  return errors;
};

const PricingTransactionForm = ({
  error,
  intl,
  form,
  submitting,
  pristine,
  onSubmit,
  initialValues,
  onSubmitSuccess,
  onSubmitFail = () => true,
  updateMode,
  formValueAmountType
}) => {
  return (
    <Form
      name={form}
      onSubmit={onSubmit}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
    >
      <Errors />

      <Row>
        <Col xs={12} sm={12}>
          <TextInput
            name="pricing.amount"
            label={intl.formatMessage({ id: 'display_cart_price' })}
            disabled={updateMode}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} display="flex" style={{ justifyContent: 'flex-end' }}>
          <Button.Primary type="submit">
            {intl.formatMessage({ id: 'update_btn' })}
          </Button.Primary>
        </Col>
      </Row>
    </Form>
  );
};

export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false
})(PricingTransactionForm);
