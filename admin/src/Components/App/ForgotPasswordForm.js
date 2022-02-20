import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';

import { toast } from '../../Lib/Toast';
import { appWorkspace } from '../../Lib/util';
import FormName from '../../Constants/Form';

import { AccountActions } from '../../Redux/Account/actions';

import Button from '../../Components/Common/Button';

import TextInput from '../Form/TextInput';
import Form from '../Form/Form';
// import Errors from '../Form/Errors';

const validate = values => {
  const errors = {};
  const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
  if (!values.input) {
    errors.input = <FormattedMessage id={'error.required'} />;
  } else if (!reg.test(values.input)) {
    errors.input = <FormattedMessage id={'error.format'} />;
  }
  return errors;
};

class ForgotPasswordForm extends React.PureComponent {
  componentDidMount() {
    const { headerWorkspace, history } = this.props;
    if (!appWorkspace && !headerWorkspace) {
      history.push('/login');
    }
  }
  onSubmitSuccess = () => {
    const { history } = this.props;
    history.push('/auth/send-mail-successfully');
  };
  onSubmitFail = err => {
    toast.error(
      <FormattedMessage id="display_forgot_password_sent_to_email_failure" />
    );
  };
  onSubmit = form => {
    const { forgotPassword, headerWorkspace } = this.props;
    forgotPassword({ ...form, headerWorkspace });
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
          name="input"
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
const ForgotPasswordFormContainer = reduxForm({
  form: FormName.FORGOT_PASSWORD,
  validate
})(ForgotPasswordForm);
const mapStateToProps = state => ({
  headerWorkspace: state.account.loginFromHeaderWorkspace
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { forgotPassword: AccountActions.forgotPassword },
    dispatch
  );
export default injectIntl(
  withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordFormContainer)
  )
);
