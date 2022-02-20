import React from 'react';
import { reduxForm } from 'redux-form';
import Button from '../Common/Button';
import TextInput from '../Form/TextInput';
import Form from '../Form/Form';
import Errors from '../Form/Errors';
import { FormattedMessage } from 'react-intl';
import FormName from '../../Constants/Form';

const validate = values => {
  const errors = {};

  if (!values.code) {
    errors.code = <FormattedMessage id={'error.required'} />;
  }
  if (!values.email) {
    errors.email = <FormattedMessage id={'error.required'} />;
  }
  return errors;
};

const VerifyCodeForm = ({
  onSubmit,
  form,
  onSubmitSuccess,
  onSubmitFail = () => true
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
    >
      <Errors />
      <TextInput name="email" label="Email" />
      <TextInput name="code" label="Verify Code" />
      <Button.Primary type="submit">Verify</Button.Primary>
    </Form>
  );
};

export default reduxForm({
  form: FormName.VERIFY_CODE,
  validate
})(VerifyCodeForm);
