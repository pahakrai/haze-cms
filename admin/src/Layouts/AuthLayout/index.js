import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { appWorkspace } from '../../Lib/util';
import AccountService from '../../Services/APIServices/AccountService';
import { PageActions } from '../../Redux/Page/actions';

import WorkspaceLoginBackgroundImage from '../../Containers/Workspace/WorkspaceLoginBackgroundImage';
import WorkspaceLoginLogo from '../../Containers/Workspace/WorkspaceLoginLogo';

import _Layout from './Layout';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;
const ContentWrapper = styled.div`
  position: absolute;
  background-color: #fff;
  width: 470px;
  height: 100%;
  right: 0;
`;
const ContentWrapper2 = styled.div`
  position: absolute;
  background-color: #fff;
  width: 100%;
  height: 100%;
  right: 0;
`;
const Layout = styled(_Layout)`
  height: 100%;
`;

export default ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const request = async () => {
      const result = await AccountService.getWorkspaceById(appWorkspace, {
        populates: [
          '$setting.logo',
          '$setting.favicon',
          '$setting.headerLogo',
          '$setting.loginBackgroundImage'
        ]
      });
      result &&
        result.data &&
        dispatch(PageActions.setLoginPageData({ workspace: result.data }));
    };
    if (appWorkspace) {
      request();
    } else {
      dispatch(PageActions.setLoginPageData());
    }
  }, [dispatch]);

  return (
    <Layout>
      <Container>
        <WorkspaceLoginBackgroundImage>
          <WorkspaceLoginLogo />
        </WorkspaceLoginBackgroundImage>
        {document.body.offsetWidth > 500 && (
          <ContentWrapper>{children}</ContentWrapper>
        )}
        {document.body.offsetWidth < 500 && (
          <ContentWrapper2>{children}</ContentWrapper2>
        )}
      </Container>
    </Layout>
  );
};
