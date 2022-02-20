import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Logo = styled.img`
  width: 200px;
  position: relative;
  top: 50px;
  left: 80px;
  z-index: 0;
`;

const WorkspaceLoginLogoContainer = ({ logo }) => {
  return logo ? <Logo src={logo} /> : <div />;
};

const mapStateToProps = state => ({
  logo: state.page.loginPageData.loginLogo
});

export default connect(mapStateToProps, {})(WorkspaceLoginLogoContainer);
