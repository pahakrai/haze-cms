import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';

import { toast } from '../Lib/Toast';
import { AccountActions } from '../Redux/Account/actions';

import ResetPasswordForm from '../Components/App/ResetPasswordForm';
import Loading from '../Components/Common/Loading';

class ResetPasswordFormContainer extends React.PureComponent {
  onSubmitSuccess = () => {
    const { history } = this.props;
    toast.success(<FormattedMessage id="display_change_password_success" />);
    history.push('/login');
  };
  onSubmitFail = err => {
    toast.error(<FormattedMessage id="display_change_password_failed" />);
  };
  onSubmit = form => {
    const { resetPassword, setPassword, location, isVerifyUser } = this.props;
    const values = {
      password: form.password,
      passcodeToken: queryString.parse(location.search).token,
      updateUserVerify: isVerifyUser
    };

    if (isVerifyUser) {
      setPassword(values);
    } else {
      resetPassword(values);
    }
  };
  render() {
    const { loading } = this.props;
    const { onSubmitSuccess, onSubmitFail, onSubmit } = this;

    return (
      <React.Fragment>
        <Loading fill isLoading={loading} style={{ top: '35%' }} />
        <ResetPasswordForm
          onSubmit={onSubmit}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading.resetPassword
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      resetPassword: AccountActions.resetPassword,
      setPassword: AccountActions.setPassword
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResetPasswordFormContainer)
);
