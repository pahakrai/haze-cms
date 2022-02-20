import React, { useMemo } from 'react';
import styled from 'styled-components';

import { useLoginPageWorkspaceName } from '../Login/hooks';
import WorkspaceLogo from '../Workspace/WorkspaceLogo';

import LocaleSwitcher from '../LocaleSwitcher';

const Title = styled.div`
  font-size: 24px;
  font-family: sans-serif;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 33px;
`;
const WelCome = styled.div`
  font-size: 18px;
  font-family: sans-serif;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 25px;
  margin-top: 16px;
`;
const LocaleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
export const LoginFormHeader = ({ intl }) => {
  const workspaceName = useLoginPageWorkspaceName();
  const styles = useMemo(
    () => ({
      logo: {
        width: '100px',
        height: '100px',
        backgroundPosition: 'center'
      }
    }),
    []
  );
  return (
    <div>
      <LocaleWrapper>
        <LocaleSwitcher />
      </LocaleWrapper>
      <LogoWrapper>
        <WorkspaceLogo style={styles.logo} />
      </LogoWrapper>
      <Title>{intl.formatMessage({ id: 'sign_in' })}</Title>
      <WelCome>
        {intl.formatMessage(
          { id: 'login.welcome_title' },
          { 0: workspaceName }
        )}
      </WelCome>
    </div>
  );
};

export default LoginFormHeader;
