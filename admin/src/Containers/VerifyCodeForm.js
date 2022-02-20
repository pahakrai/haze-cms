import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { AccountActions } from '../Redux/Account/actions';
import VerifyCodeForm from '../Components/App/VerifyCodeForm';

class VerifyCodeFormContainer extends React.PureComponent {
  onSubmitSuccess = () => {
    // console.log('onSubmitSuccess container');
  };
  onSubmitFail = err => {
    // console.log('onSubmitFail container', err);
  };
  componentDidUpdate() {
    const { verifyToken, history } = this.props;
    if (verifyToken) {
      history.push('/auth/reset-password/' + verifyToken);
    }
  }
  onSubmit = form => {
    const { onVerifyCode } = this.props;
    onVerifyCode(form.email, form.code);
  };
  render() {
    const { onSubmitSuccess, onSubmitFail, onSubmit } = this;

    return (
      <VerifyCodeForm
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFail={onSubmitFail}
      />
    );
  }
}

const mapStateToProps = state => ({
  verifyToken: state.account.verifyCodeToken
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ onVerifyCode: AccountActions.verifyCode }, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VerifyCodeFormContainer)
);
