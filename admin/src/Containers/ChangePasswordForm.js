import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';

import { toast } from '../Lib/Toast';

import { AccountActions } from '../Redux/Account/actions';
import AccountSelector from '../Redux/Account/selectors';

import ChangePasswordForm from '../Components/App/ChangePasswordForm';
// import Card from '../Components/Common/Card';

class ChangePasswordFormContainer extends React.PureComponent {
  onSubmitSuccess = () => {
    toast.success(<FormattedMessage id="display_change_password_success" />);
  };
  onSubmitFail = err => {
    toast.success(<FormattedMessage id="display_change_password_failed" />);
  };
  onSubmit = form => {
    const { changePassword, user } = this.props;
    changePassword({ password: form.password }, user._id);
  };
  render() {
    const { onSubmitSuccess, onSubmitFail, onSubmit } = this;
    const { intl } = this.props;

    return (
      <ChangePasswordForm
        intl={intl}
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFail={onSubmitFail}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: AccountSelector.getCurrentUser(state)
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { changePassword: AccountActions.changePassword },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChangePasswordFormContainer)
);
