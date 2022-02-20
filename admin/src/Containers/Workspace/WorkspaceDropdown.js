import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineUserSwitch
} from 'react-icons/ai';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import hasIn from 'lodash/hasIn';
import {
  getCurrentWorkspace,
  getCurrentUser
} from '../../Redux/Account/selectors';
import { AccountActions } from '../../Redux/Account/actions';
import P from '../../Components/Common/P';
import Loading from '../../Components/Common/Loading';
import { toast } from '../../Lib/Toast';
import WorkspaceMenuItem from './WorkspaceMenuItem';

const Container = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
`;
const SubP = styled(P)`
  margin: 0;
`;
const FaviconIcon = styled.img`
  width: 18px;
  margin-right: 6px;
`;

const Styles = {
  icon: {
    paddingTop: 3,
    marginLeft: 3,
    marginRight: 3
  }
};

class WorkspaceDropdownContainer extends React.PureComponent {
  state = {
    // Dropdown Visible
    visible: false
  };

  componentDidMount() {
    const {
      currentWorkspace,
      getAccountWorkspace,
      fetchWorkspaceLoading
    } = this.props;
    if (!currentWorkspace && getAccountWorkspace && !fetchWorkspaceLoading)
      getAccountWorkspace();
  }

  _onSwitchWorkspaceItem = workspaceId => {
    const { changeAccountWorkspace } = this.props;
    if (changeAccountWorkspace) {
      changeAccountWorkspace(workspaceId);
    }
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.changWorkspaceError !== this.props.changWorkspaceError &&
      this.props.changWorkspaceError
    ) {
      toast.error(this.props.changWorkspaceError.message);
    }
  }

  _onDropdownVisibleChange = visible => {
    this.setState({ visible });
  };

  _onJumpMyProfile = () => {
    const { history } = this.props;
    history.push('/profile');
  };
  _onJumpMyWorkspace = () => {
    const { history } = this.props;
    history.push('/my-workspace');
  };

  _onMenuClick = menuItem => {
    const { key } = menuItem;
    switch (key) {
      case 'profile':
        this._onJumpMyProfile();
        break;
      case 'account_setting':
        this._onJumpMyWorkspace();
        break;
      default:
    }
    // clear visible state
    this.setState({ visible: false });
  };

  _renderDropdownContainer = () => {
    const { currentWorkspace } = this.props;
    const { visible } = this.state;
    return (
      <Container>
        <SubP>{currentWorkspace && currentWorkspace.name}</SubP>
        {!visible && <AiFillCaretDown style={Styles.icon} />}
        {visible && <AiFillCaretUp style={Styles.icon} />}
      </Container>
    );
  };

  _renderDropdownOverlay = () => {
    const { currentWorkspace, currentUser } = this.props;

    const selectWorkspaces = (Array.isArray(
      currentUser && currentUser.workspaces
    )
      ? currentUser.workspaces
      : []
    ).filter(w => w && currentWorkspace && w !== currentWorkspace._id);

    return (
      <Menu onClick={this._onMenuClick}>
        <Menu.Item key="profile">
          <AiOutlineUser style={Styles.icon} />
          <FormattedMessage id="display_profile" />
        </Menu.Item>
        {currentUser.actions.allows.includes('MyWorkspace:View') && (
          <Menu.Item key="account_setting">
            <AiOutlineSetting style={Styles.icon} />
            <FormattedMessage id="display_account_setting" />
          </Menu.Item>
        )}
        {!!selectWorkspaces.length && <Menu.Divider />}
        {!!selectWorkspaces.length && (
          <Menu.SubMenu
            title={
              <React.Fragment>
                <AiOutlineUserSwitch style={Styles.icon} />
                <FormattedMessage id="display_switch_workspace" />
              </React.Fragment>
            }
          >
            {selectWorkspaces.map(w => (
              <Menu.Item key={w} onClick={() => this._onSwitchWorkspaceItem(w)}>
                <WorkspaceMenuItem workspaceId={w}>
                  {workspace => (
                    <React.Fragment>
                      {hasIn(workspace, 'setting.favicon.thumbnailUri') && (
                        <FaviconIcon
                          src={workspace.setting.favicon.thumbnailUri}
                          alt="workspace favicon"
                        />
                      )}
                      {workspace && workspace.name}
                      <Loading
                        fill={false}
                        width={20}
                        height={20}
                        isLoading={!workspace}
                      />
                    </React.Fragment>
                  )}
                </WorkspaceMenuItem>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        )}
      </Menu>
    );
  };

  render() {
    return (
      <Dropdown
        onVisibleChange={this._onDropdownVisibleChange}
        trigger={['click']}
        overlay={this._renderDropdownOverlay}
      >
        {this._renderDropdownContainer()}
      </Dropdown>
    );
  }
}
const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
  currentWorkspace: getCurrentWorkspace(state),
  fetchWorkspaceLoading: state.loading.accountWorkspace,
  changWorkspaceError: state.error.changeWorkspace
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAccountWorkspace: AccountActions.getAccountWorkspace,
      changeAccountWorkspace: AccountActions.changeAccountWorkspace
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WorkspaceDropdownContainer)
);
