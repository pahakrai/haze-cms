import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import styled, { withTheme } from 'styled-components';
import { FaBars } from 'react-icons/fa';

import { isMultiLanguage } from '../../Lib/util';

import { AppActions } from '../../Redux/App/actions';
import AccountSelector from '../../Redux/Account/selectors';

import LocaleSwitcher from '../../Containers/LocaleSwitcher';
import WorkspaceDropdown from '../../Containers/Workspace/WorkspaceDropdown';

import NavBar from '../../Components/Common/NavBar';
import Link from '../../Components/Common/Link';
import Spacer from '../../Components/Common/Spacer';
import UserAvatar from '../../Containers/User/UserAvatar';

const Container = styled(NavBar)`
  display: flex;
  justify-content: space-between;
`;

const HeaderLeftSide = styled.div`
  display: flex;
`;

const HeaderRightSide = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

class Header extends React.PureComponent {
  _isUseLink = () => process.env.REACT_APP_USER_AVATAR_ENABLE === 'true';
  _renderLeft = () => {
    const { currentUser } = this.props;
    const isDisplayFullName = !!(
      currentUser &&
      currentUser.lastName &&
      currentUser.firstName
    );

    return (
      <UserAvatar
        userId={currentUser && currentUser._id}
        name={
          (isDisplayFullName
            ? currentUser.firstName + ' ' + currentUser.lastName
            : currentUser.username) || ''
        }
        avatarStyle={{
          height: 30,
          width: 30,
          borderRadius: 15
        }}
      />
    );
  };
  render() {
    const { theme, toggleSidebarOpen } = this.props;
    return (
      <Container>
        <HeaderLeftSide>
          <Link round onClick={toggleSidebarOpen.bind(this, undefined)}>
            <FaBars
              color={
                theme.color?.hyberlink
                  ? theme.color.hyberlink
                  : theme.color?.primaryHighlight
              }
            />
          </Link>
          <Spacer width={10} />
          <WorkspaceDropdown />
        </HeaderLeftSide>
        <HeaderRightSide>
          {this._isUseLink() ? (
            <Link to="/profile">{this._renderLeft()}</Link>
          ) : (
            this._renderLeft()
          )}
          {isMultiLanguage && <LocaleSwitcher />}
        </HeaderRightSide>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return _state => {
    const currentUser = AccountSelector.getCurrentUser(_state) || {};

    return {
      currentUser
    };
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleSidebarOpen: AppActions.toggleSidebarOpen
    },
    dispatch
  );
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTheme
)(Header);
