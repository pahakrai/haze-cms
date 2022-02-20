import React, { useCallback } from 'react';

import { FormattedMessage, injectIntl } from 'react-intl';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';
import { FaPen } from 'react-icons/fa';

import { appWorkspace } from '../../../Lib/util';

import Checkbox from '../../Form/Checkbox';
import TextInput, { TextInputNoField } from '../../Form/TextInput';
import Form from '../../Form/Form';
import Errors from '../../Form/Errors';

import Button from '../../Common/Button';
import Link from '../../Common/Link';

import {
  useLoginFormHooks,
  LoginFromMode as _LoginFromMode
} from './LoginFormUtils';

const LinksWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const LoginFromMode = _LoginFromMode;

/**
 * login(get one time password after)，init(need get password)
 */
const validate = (values, props) => {
  const errors = {};
  if (!values.username) {
    errors.username = <FormattedMessage id={'error.required'} />;
  }
  if (props.mode === LoginFromMode.LOGIN) {
    if (!values.password) {
      errors.password = <FormattedMessage id={'error.required'} />;
    }
  }
  return errors;
};

const LoginForm = ({
  intl,
  form,
  mode,
  invalid,
  onSubmit,
  onSubmitFail,
  onSubmitSuccess,
  setLoginFromMode,
  setHeaderWorkspace,
  headerWorkspace
}) => {
  const initState = mode !== LoginFromMode.LOGIN;
  const workspaceState = mode === LoginFromMode.WORKSPACE_CODE;
  const {
    workspaceCode,
    checkWorkspaceCode,
    getWorkspaceLoading,
    styles,
    commonInputProps,
    workspaceCodeInputProps
  } = useLoginFormHooks({
    mode,
    setLoginFromMode,
    setHeaderWorkspace
  });
  const _onSubmit = useCallback(
    (...args) => {
      if (mode === LoginFromMode.WORKSPACE_CODE) {
        checkWorkspaceCode(...args);
      } else {
        onSubmit(...args);
      }
    },
    [onSubmit, checkWorkspaceCode, mode]
  );
  const showForgotPassword = !appWorkspace ? headerWorkspace : true;

  return (
    <Form
      onSubmit={_onSubmit}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
    >
      <Errors />
      {!appWorkspace && (
        <TextInputNoField
          noLabel
          inputProps={commonInputProps}
          disabled={!workspaceState}
          label={intl.formatMessage({ id: 'login.workspace_code' })}
          accessory={!workspaceState && <FaPen size={16} />}
          {...workspaceCodeInputProps}
        />
      )}
      {!workspaceState && (
        <TextInput
          noLabel
          inputProps={commonInputProps}
          name="username"
          label={intl.formatMessage({ id: 'display_username' })}
          disabled={!initState}
          accessory={!initState && <FaPen size={16} />}
          onAccessoryClick={() => {
            setLoginFromMode(LoginFromMode.INIT);
          }}
          accessoryContainerStyle={{ right: 16, top: 13 }}
        />
      )}
      {!initState && (
        <TextInput
          autoFocus
          noLabel
          inputProps={commonInputProps}
          name="password"
          label={intl.formatMessage({ id: 'display_user_password' })}
          type="password"
        />
      )}
      <LinksWrap>
        <Checkbox
          style={{ marginBottom: 0 }}
          name="rememberMe"
          labelIndent={3}
          label={intl.formatMessage({ id: 'remember_me' })}
        />
        {showForgotPassword && (
          <Link to="/auth/forgot-password">
            {intl.formatMessage({ id: 'login.forgot_password' })}
          </Link>
        )}
        {!showForgotPassword && (
          <Link to="/auth/sign-up">
            {intl.formatMessage({ id: 'sign_up' })}
          </Link>
        )}
      </LinksWrap>
      {mode === LoginFromMode.WORKSPACE_CODE ? (
        <Button.Primary
          full
          type="button"
          onClick={checkWorkspaceCode}
          disabled={getWorkspaceLoading || !workspaceCode}
          style={styles.submitButton}
        >
          {intl.formatMessage({ id: 'sign_continue' })}
        </Button.Primary>
      ) : (
        <Button.Primary
          full
          type="submit"
          disabled={invalid}
          style={styles.submitButton}
        >
          {mode === LoginFromMode.LOGIN
            ? intl.formatMessage({ id: 'sign_in' })
            : intl.formatMessage({ id: 'sign_continue' })}
        </Button.Primary>
      )}
    </Form>
  );
};

export default reduxForm({
  validate,
  shouldValidate: ({ props, nextProps }) => {
    return (
      (props && !nextProps) ||
      (props && nextProps && props.values !== nextProps.values) ||
      (props && nextProps && props.mode !== nextProps.mode)
    );
  },
  initialValues: {
    rememberMe: true
  }
})(injectIntl(LoginForm));
