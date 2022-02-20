import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';

import { toast } from '../../Lib/Toast';
import FormName from '../../Constants/Form';

import { AccountActions } from '../../Redux/Account/actions';

import Button from '../../Components/Common/Button';

import TextInput from '../Form/TextInput';
import Form from '../Form/Form';

const validate = values => {
  const errors = {};
  const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
  if (!values.email) {
    errors.email = <FormattedMessage id={'error.required'} />;
  } else if (!reg.test(values.email)) {
    errors.email = <FormattedMessage id={'error.format'} />;
  }
  return errors;
};

class SignUpForm extends React.PureComponent {
  onSubmitSuccess = () => {
    const { history } = this.props;
    history.push('/auth/sign-up-send-mail-successfully');
  };
  onSubmitFail = err => {
    toast.error(
      <FormattedMessage id="display_sign_up_sent_to_email_failure" />
    );
  };
  onSubmit = email => {
    const { signUp } = this.props;
    signUp(email);
  };
  render() {
    const { onSubmitSuccess, onSubmitFail, onSubmit } = this;
    const { invalid, submitting, intl } = this.props;

    return (
      <Form
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFail={onSubmitFail}
      >
        <TextInput
          name="email"
          type="text"
          label={intl.formatMessage({ id: 'display_email' })}
        />
        <Button.Primary disabled={invalid || submitting} type="submit">
          <FormattedMessage id="display_submit" />
        </Button.Primary>
      </Form>
    );
  }
}
const SignUpFormContainer = reduxForm({
  form: FormName.SIGN_UP,
  validate
})(SignUpForm);
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ signUp: AccountActions.signUp }, dispatch);
export default injectIntl(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpFormContainer))
);
