import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Image from '../../Components/Common/Image';

const Logo = styled(Image)`
  background-position: left center;
  height: 100%;
  flex: 1;
`;

const WorkspaceLogoContainer = ({ logo, style }) => {
  return logo ? (
    <Logo src={logo} style={{ height: '100%', ...(style || {}) }} />
  ) : (
    <div />
  );
};
const mapStateToProps = state => ({
  logo: state.page.loginPageData.loginLogo2
});
export default connect(mapStateToProps, {})(WorkspaceLogoContainer);
