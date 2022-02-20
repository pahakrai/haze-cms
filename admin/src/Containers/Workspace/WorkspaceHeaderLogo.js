import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import styled, { withTheme } from 'styled-components';
import Image from '../../Components/Common/Image';

import { getCurrentWorkspace } from '../../Redux/Account/selectors';
import { AccountActions } from '../../Redux/Account/actions';

const Logo = styled(Image)`
  background-position: left center;
  height: 100%;
  flex: 1;
`;

class WorkspaceHeaderLogoContainer extends React.PureComponent {
  componentDidMount() {
    const {
      currentWorkspace,
      getAccountWorkspace,
      fetchWorkspaceLoading
    } = this.props;
    if (!currentWorkspace && getAccountWorkspace && !fetchWorkspaceLoading)
      getAccountWorkspace();
  }

  render() {
    const { currentWorkspace, theme } = this.props;
    const logo =
      (currentWorkspace &&
        currentWorkspace.setting &&
        currentWorkspace.setting.headerLogo &&
        currentWorkspace.setting.headerLogo.uri) ||
      theme.images.login_logo;
    return <Logo src={logo} style={{ height: '100%' }} />;
  }
}
const mapStateToProps = state => ({
  currentWorkspace: getCurrentWorkspace(state),
  fetchWorkspaceLoading: state.loading.accountWorkspace
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAccountWorkspace: AccountActions.getAccountWorkspace
    },
    dispatch
  );
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTheme
)(WorkspaceHeaderLogoContainer);
