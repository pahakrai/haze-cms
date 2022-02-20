import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const BackgroundWrapper = styled.div`
  background: url(${props => props.src}) no-repeat left center;
  background-size: cover;
  width: calc(100% - 470px);
`;
const WorkspaceLoginBackgroundImageContainer = ({ bgUrl, children }) => {
  return (
    <BackgroundWrapper background src={bgUrl}>
      {children}
    </BackgroundWrapper>
  );
};
const mapStateToProps = state => ({
  bgUrl: state.page.loginPageData.backgroundImage
});
export default connect(
  mapStateToProps,
  {}
)(WorkspaceLoginBackgroundImageContainer);
