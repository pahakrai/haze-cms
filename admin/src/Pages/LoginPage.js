/* @flow */

import React from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';

// import { appWorkspace } from '../Lib/util';
import LoginForm from '../Containers/Login/LoginForm';
import { useLoginPageWorkspaceName } from '../Containers/Login/hooks';
import LoginFormHeader from '../Containers/Login/LoginFormHeader';

import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';
// import Link from '../Components/Common/Link';

const versionNo = require('../../package.json').version;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const LinksWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const CopyRight = styled.div`
  width: 100%;
  text-align: center;
  padding: 0 10px 15px 10px;
`;

export default injectIntl(({ intl }) => {
  const workspaceName = useLoginPageWorkspaceName();

  return (
    <DocumentTitle title={'Login Page'}>
      {/* <Image src={BaseTheme.images.login_logo} height={100} /> */}
      <Container>
        <ContentContainer
          style={
            document.body.offsetWidth > 660
              ? { flex: 1, padding: '10% 55px' }
              : { flex: 1, padding: '9% 35px' }
          }
        >
          <LoginFormHeader intl={intl} />
          <LoginForm style={{ marginTop: 40 }} />
          {
            <LinksWrap>
              <a
                style={{ marginRight: 10 }}
                href="javacript:void(0);"
                onClick={() =>
                  window.open(
                    `${process.env.REACT_APP_WORKSPACE_BASE_DOMAIN}/privacy`
                  )
                }
              >
                {intl.formatMessage({ id: 'privacy_policy' })}{' '}
              </a>
              <a
                href="javacript:void(0);"
                onClick={() =>
                  window.open(
                    `${process.env.REACT_APP_WORKSPACE_BASE_DOMAIN}/terms`
                  )
                }
              >
                {intl.formatMessage({ id: 'user_notice' })}
              </a>
            </LinksWrap>
          }
        </ContentContainer>
        <CopyRight>
          {intl.formatMessage(
            { id: 'copyright' },
            {
              date: new Date().getFullYear(),
              app: workspaceName,
              version: versionNo
            }
          )}
        </CopyRight>
      </Container>
    </DocumentTitle>
  );
});
