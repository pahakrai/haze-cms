import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { isEmpty, find, create, map } from 'lodash';
// import { isEmpty, find, map } from 'lodash';
// import { isEqual } from 'lodash';
// import Immutable from 'seamless-immutable';
import Nav from './Nav';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { AppActions } from '../../Redux/App/actions';
import AccountSelector from '../../Redux/Account/selectors';
import NavBar from '../../Components/Common/NavBar';
import Link from '../../Components/Common/Link';
import WorkspaceHeaderLogo from '../../Containers/Workspace/WorkspaceHeaderLogo';

const SIDEBAR_WIDTH = 250;

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: ${props => SIDEBAR_WIDTH * props.theme.unit + 'px'};
  background-color: ${props => props.theme.color.backgroundDark};
  ${props => {
    if (props.isOpen) {
      return `
        display: flex;
        @media (max-width: 700px) {
          display: block;
          z-index: 10000;
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          &:before {
            content: '';
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.4);
            position: fixed;
            z-index: -1;
          }
        }
      `;
    } else {
      return `
        width: auto;
        @media (max-width: 700px) {
          display: none;
        }
      `;
    }
  }};
`;

const SideBarOverlay = styled.a`
  ${props => {
    if (props.isOpen) {
      return `
      @media (max-width: 700px) {
        &:before {
          content: '';
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          position: fixed;
          z-index: -1;
        }
      }`;
    }
  }};
`;

const SideBarHeader = styled(NavBar)`
  background-color: #fff;
  color: ${props => props.theme.color.primaryText};
  font-size: ${props => 17 * props.theme.unit + 'px'};
  padding: 8px ${props => props.theme.measurements.padding + 'px'};
`;

class Sidebar extends React.PureComponent {
  // _userTypeMached = (userType, userTypes) => {
  //   if (!userTypes || isEmpty(userTypes)) return true; // when userTypes is undefined open menu
  //   return find(userTypes, item => item === userType);
  // };
  // _prepareSitemap = sitemap => {
  //   const { currentUser } = this.props;
  //   if (!currentUser) return sitemap;
  //   sitemap.combineHideMenu =
  //     sitemap.hideMenu ||
  //     !this._userTypeMached(currentUser.userType, sitemap.userType);
  //   if (isEmpty(sitemap.items)) return sitemap;
  //   sitemap.items = map(sitemap.items, item => this._prepareSitemap(item));
  //   return sitemap;
  // };
  render() {
    const {
      isOpen,
      location,
      sitemap,
      toggleSidebarOpen,
      openedNavItemGroups,
      setOpenedNavItemGroups
    } = this.props;
    // const newSitemap = this._prepareSitemap(sitemap);
    return (
      <SideBarContainer isOpen={isOpen}>
        <SideBarHeader>
          <Link to="/">
            <WorkspaceHeaderLogo />
          </Link>
        </SideBarHeader>
        <Nav
          sitemap={sitemap}
          location={location}
          openedNavItemGroups={openedNavItemGroups}
          setOpenedNavItemGroups={setOpenedNavItemGroups}
          isOpen={isOpen}
        />
        <SideBarOverlay
          isOpen={isOpen}
          onClick={toggleSidebarOpen.bind(this, false)}
        />
      </SideBarContainer>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: AccountSelector.getCurrentUser(state),
  isOpen: state.app.isSidebarOpen,
  openedNavItemGroups: state.app.openedNavItemGroups
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleSidebarOpen: AppActions.toggleSidebarOpen,
      setOpenedNavItemGroups: AppActions.setOpenedNavItemGroups
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Sidebar)
);
