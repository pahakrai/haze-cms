import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import styled from 'styled-components';

import { toast } from '../../Lib/Toast';
import FormName from '../../Constants/Form';
import { AccountActions } from '../../Redux/Account/actions';
import Button from '../../Components/Common/Button';
import DocumentTitle from '../../Components/Common/DocumentTitle';
import Form from '../Form/Form';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Subtitle = styled.h2`
  margin-top: 100px;
  font-size: 17pt;
  color: #636363;
  text-align: center;
`;

const Text = styled.p`
  padding: 0 20px;
  font-size: 30pt;
  color: #000;
  font-family: fantasy;
  text-align: center;
  margin-top: 40px;
  line-height: 60px;
`;

class SignUpConfirmExpiredForm extends React.PureComponent {
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
    signUp({
      email: window.localStorage.getItem('signUpUser')
    });
  };

  render() {
    const { onSubmitSuccess, onSubmitFail, onSubmit } = this;
    const { intl } = this.props;

    return (
      <Form
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFail={onSubmitFail}
      >
        <DocumentTitle
          title={intl.formatMessage({ id: 'display_connect_expired_title' })}
        >
          <Content>
            <Subtitle>
              {intl.formatMessage({ id: 'display_connect_expired_title' })}
            </Subtitle>
            <Text>{intl.formatMessage({ id: 'display_register_again' })}</Text>
            <Button.Primary>
              {intl.formatMessage({ id: 'resend' })}
            </Button.Primary>
          </Content>
        </DocumentTitle>
      </Form>
    );
  }
}
const SignUpConfirmExpiredFormContainer = reduxForm({
  form: FormName.SIGN_UP
})(SignUpConfirmExpiredForm);
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signUp: AccountActions.signUp
    },
    dispatch
  );
export default injectIntl(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(SignUpConfirmExpiredFormContainer)
  )
);
