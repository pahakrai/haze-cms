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

  if (!values.password) {
    errors.password = <FormattedMessage id={'error.required'} />;
  } else if (values.password.length < 8) {
    errors.password = <FormattedMessage id={'error.password_at_least_8'} />;
  }
  return errors;
};

class SignUpConfirmForm extends React.PureComponent {
  onSubmitSuccess = () => {
    const { history } = this.props;
    history.push('/');
  };
  onSubmitFail = err => {
    toast.error(
      <FormattedMessage id="display_sign_up_sent_to_email_failure" />
    );
  };
  onSubmit = formValues => {
    const { signUpConfirm } = this.props;
    signUpConfirm(window.location.search, formValues);
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
        {/* <Errors /> */}
        <TextInput
          name="code"
          type="text"
          label={intl.formatMessage({ id: 'sign_up.code' })}
        />
        <TextInput
          name="name"
          type="text"
          label={intl.formatMessage({ id: 'sign_up.name' })}
        />
        <TextInput
          name="password"
          type="password"
          label={intl.formatMessage({ id: 'sign_up.password' })}
        />
        <Button.Primary disabled={invalid || submitting} type="submit">
          <FormattedMessage id="display_submit" />
        </Button.Primary>
      </Form>
    );
  }
}
const SignUpConfirmFormContainer = reduxForm({
  form: FormName.SIGN_UP_CONFIRM,
  validate
})(SignUpConfirmForm);
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signUpConfirm: AccountActions.signUpConfirm,
      setLoginFromHeaderWorkspace: AccountActions.setLoginFromHeaderWorkspace
    },
    dispatch
  );
export default injectIntl(
  withRouter(
    connect(mapStateToProps, mapDispatchToProps)(SignUpConfirmFormContainer)
  )
);
