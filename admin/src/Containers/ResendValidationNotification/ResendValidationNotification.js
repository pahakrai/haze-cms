import React from 'react';
import { injectIntl } from 'react-intl';
import { Input, Button, Form } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Regex from '../../Constants/Regex';

import { AccountActions } from '../../Redux/Account/actions';

import BackButton from './BackButton';

const FormItem = Form.Item;
const InputWrap = styled.div`
  margin-top: 20px;
`;
const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const SuccessMessage = styled.div`
  margin-top: 20px;
`;

class ResendValidationNotification extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      displaySuccessMessage: false,
      emailOrPhone: '',
      inputError: false,
      isPhone: false
    };
  }

  _onInputChange = e => this.setState({ emailOrPhone: e.currentTarget.value });

  _onConfirm = () => {
    const { emailOrPhone } = this.state;
    const { resendValidateUserNotification } = this.props;
    const isPhone = Regex.phone.test(emailOrPhone);
    const isEmail = Regex.email.test(emailOrPhone);

    if (!isEmail && !isPhone) {
      this.setState({ inputError: true });
    } else {
      this.setState({
        inputError: false,
        displaySuccessMessage: true
      });
      resendValidateUserNotification({
        [isPhone ? 'phone' : 'email']: emailOrPhone
      });
    }
  };

  render() {
    const { intl } = this.props;
    const { inputError, emailOrPhone, displaySuccessMessage } = this.state;

    return !displaySuccessMessage ? (
      <div>
        <InputWrap>
          <FormItem
            wrapperCol={{ md: 24 }}
            hasFeedback={inputError}
            validateStatus={inputError ? 'error' : 'success'}
            help={
              inputError
                ? intl.formatMessage({
                    id: 'resend_validation_notification.eamil_or_phone_va_error'
                  })
                : ''
            }
          >
            <Input
              placeholder={intl.formatMessage({
                id: 'resend_validation_notification.input_placeholder'
              })}
              size="large"
              value={emailOrPhone || ''}
              id={inputError ? 'error' : ''}
              onChange={this._onInputChange}
              onPressEnter={this._onConfirm}
            />
          </FormItem>
        </InputWrap>
        <ButtonGroup>
          <BackButton linkTo="/login" intl={intl} intlId="login" />
          <Button type="primary" onClick={this._onConfirm}>
            {intl.formatMessage({ id: 'confirm' })}
          </Button>
        </ButtonGroup>
      </div>
    ) : (
      <div>
        <SuccessMessage>
          {intl.formatMessage({
            id: 'resend_validation_notification.resend_success'
          })}
        </SuccessMessage>
        <ButtonGroup>
          <BackButton linkTo="/" intl={intl} intlId="home" />
        </ButtonGroup>
      </div>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      resendValidateUserNotification:
        AccountActions.resendValidateUserNotification
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(ResendValidationNotification));
