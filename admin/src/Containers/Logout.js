import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import { AccountActions } from '../Redux/Account/actions';
import AccountSelector from '../Redux/Account/selectors';
// antd
import { Modal } from 'antd';

class LogoutContainer extends React.PureComponent {
  componentDidMount() {
    const { user } = this.props;
    if (user) {
      this._logout();
    } else {
      this._redirectToNextPage();
    }
  }
  componentDidUpdate() {
    const { user } = this.props;
    if (!user) {
      this._redirectToNextPage();
    }
  }
  _logout = () => {
    const { logout, history, intl } = this.props;
    Modal.confirm({
      title: intl.formatMessage({ id: 'display_logout_hint_messages' }),
      okType: 'danger',
      okText: intl.formatMessage({ id: 'display_yes' }),
      cancelText: intl.formatMessage({ id: 'cancel' }),
      onOk: () => {
        if (logout) logout();
      },
      onCancel: () => history.goBack()
    });
  };
  _redirectToNextPage = () => {
    const { history } = this.props;
    history.push('/login');
  };
  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  user: AccountSelector.getCurrentUser(state)
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ logout: AccountActions.logout }, dispatch);
export default withRouter(
  injectIntl(connect(mapStateToProps, mapDispatchToProps)(LogoutContainer))
);
