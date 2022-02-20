import React from 'react';
import { reduxForm } from 'redux-form';
import { FormattedMessage, injectIntl } from 'react-intl';

import Button from '../Common/Button';
import TextInput from '../Form/TextInput';
import Form from '../Form/Form';
import Errors from '../Form/Errors';
import FormName from '../../Constants/Form';

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
      errors.confirmPassword = 'passowrd not match!';
    }
  }
  return errors;
};

const VerifyCodeForm = ({
  onSubmit,
  form,
  onSubmitSuccess,
  onSubmitFail = () => true,
  intl
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
    >
      <Errors />
      <TextInput
        name="password"
        type="password"
        label={intl.formatMessage({ id: 'display_label_password' })}
      />
      <TextInput
        name="confirmPassword"
        type="password"
        label={intl.formatMessage({ id: 'display_label_confirm_password' })}
      />
      <Button.Primary type="submit">
        <FormattedMessage id="login.set_password" />
      </Button.Primary>
    </Form>
  );
};

export default reduxForm({
  form: FormName.RESET_PASSWORD,
  validate
})(injectIntl(VerifyCodeForm));
