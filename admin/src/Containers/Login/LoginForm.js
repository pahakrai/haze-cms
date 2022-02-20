import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { injectIntl } from 'react-intl';

import { toast } from '../../Lib/Toast';
import { ecommApi } from '../../Services/APIs';
import { appWorkspace, appAllowloginUserTypes } from '../../Lib/util';
import FormName from '../../Constants/Form';

import { AccountActions } from '../../Redux/Account/actions';

import LoginForm, { LoginFromMode } from '../../Components/App/Login/LoginForm';

class LoginFormContainer extends React.PureComponent {
  componentDidMount = () => {
    const { setLoginFromMode } = this.props;

    if (appWorkspace) {
      setLoginFromMode(LoginFromMode.INIT);
    } else {
      setLoginFromMode(LoginFromMode.WORKSPACE_CODE);
      this.setHeaderWorkspace(null);
    }
  };

  getRedirectFromLocation(location) {
    const params = new URLSearchParams(location.search);
    return params.get('redirect');
  }

  onSubmitSuccess = () => {
    const { loginFromMode, setLoginFromMode } = this.props;
    if (loginFromMode === LoginFromMode.LOGIN) {
      const { getRedirectFromLocation } = this;
      const { location, history } = this.props;
      const redirect = getRedirectFromLocation(location);
      history.push(redirect || '/');
    } else {
      setLoginFromMode(LoginFromMode.LOGIN);
    }
  };
  onSubmitFail = err => {};

  onSubmit = form => {
    const {
      onLogin,
      loginFromMode,
      getOneTimePassword,
      setLoginFromMode,
      intl,
      headerWorkspace
    } = this.props;
    const userTypes = appAllowloginUserTypes;
    if (loginFromMode === LoginFromMode.LOGIN) {
      onLogin(form.username, form.password, userTypes, {
        rememberMe: form.rememberMe,
        headerWorkspace: headerWorkspace
      });
    } else {
      if (process.env.REACT_APP_AUTH_USER_ONE_TIME_PASSWORD === 'true') {
        toast.success(intl.formatMessage({ id: 'send_password_success' }));
        getOneTimePassword(form.username);
      } else {
        setLoginFromMode(LoginFromMode.LOGIN);
      }
    }
  };

  setHeaderWorkspace = workspace => {
    const { _id, secret } = workspace || {};
    const { setLoginFromHeaderWorkspace } = this.props;
    const safeKey = ecommApi.safeKeyManager;
    setLoginFromHeaderWorkspace(_id);
    if (_id && secret) {
      setLoginFromHeaderWorkspace(_id);
      safeKey.generate(_id, secret);
    } else {
      setLoginFromHeaderWorkspace(null);
      safeKey.clear();
    }
  };

  render() {
    const {
      onSubmitSuccess,
      onSubmitFail,
      onSubmit,
      setHeaderWorkspace
    } = this;
    const {
      loginFromMode,
      setLoginFromMode,
      style,
      form,
      headerWorkspace
    } = this.props;

    return (
      <div style={style}>
        <LoginForm
          form={form}
          mode={loginFromMode}
          headerWorkspace={headerWorkspace}
          onSubmit={onSubmit}
          onSubmitFail={onSubmitFail}
          onSubmitSuccess={onSubmitSuccess}
          setLoginFromMode={setLoginFromMode}
          setHeaderWorkspace={setHeaderWorkspace}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const form = FormName.LOGIN;
  return {
    form,
    formSucceed: state.form.login && state.form.login.submitSucceeded,
    loginFromMode: state.account.loginFromMode,
    headerWorkspace: state.account.loginFromHeaderWorkspace
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onLogin: AccountActions.login,
      setLoginFromMode: AccountActions.setLoginFromMode,
      setLoginFromHeaderWorkspace: AccountActions.setLoginFromHeaderWorkspace,
      getOneTimePassword: AccountActions.getOneTimePassword
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(injectIntl(LoginFormContainer))
);
