import React from 'react';
import { reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Col, Row } from 'react-flexa';

import Button from '../Common/Button';
import TextInput from '../Form/TextInput';
import Form from '../Form/Form';
import Errors from '../Form/Errors';
import FormName from '../../Constants/Form';
import Card from '../Common/Card';

const validate = values => {
  const errors = {};
  const { password, confirmPassword } = values;
  if (!password) {
    errors.password = <FormattedMessage id={'error.required'} />;
  }
  if (!confirmPassword) {
    errors.confirmPassword = <FormattedMessage id={'error.required'} />;
  }
  if (confirmPassword && password) {
    if (confirmPassword !== password) {
      errors.confirmPassword = (
        <FormattedMessage id={'error.password_not_match'} />
      );
    }
  }
  return errors;
};

const ChangePasswordForm = ({
  onSubmit,
  form,
  onSubmitSuccess,
  intl,
  onSubmitFail = () => true
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
        <Col xs={12} sm={12} md={6} alignSelf="flex-start">
          <Card>
            <TextInput
              name="password"
              type="password"
              label={intl.formatMessage({ id: 'display_label_password' })}
            />
            <TextInput
              name="confirmPassword"
              type="password"
              label={intl.formatMessage({
                id: 'display_label_confirm_password'
              })}
            />
          </Card>
          <Button.Primary type="submit">
            {<FormattedMessage id={'display_btn_change_password'} />}
          </Button.Primary>
        </Col>
      </Row>
    </Form>
  );
};

export default reduxForm({
  form: FormName.CHANGE_PASSWORD,
  validate
})(ChangePasswordForm);
