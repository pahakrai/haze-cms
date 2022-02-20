/* @flow */

import React from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';

import { useWorkspaceName } from '../../Containers/Workspace/hooks';

const versionNo = require('../../../package.json').version;

const FooterContainer = styled.div`
  padding: ${props => 25 * props.theme.unit + 'px'};
  background-color: ${props => props.theme.contentBackground};
  text-align: center;
  border-top-color: rgba(0, 0, 0, 0.1);
  border-top-width: ${props => 1 * props.theme.unit + 'px'};
  border-top-style: solid;
`;

export default injectIntl(({ intl }) => {
  const workspaceName = useWorkspaceName();
  return (
    <FooterContainer>
      {intl.formatMessage(
        { id: 'copyright' },
        {
          date: new Date().getFullYear(),
          app: workspaceName,
          version: versionNo
        }
      )}
    </FooterContainer>
  );
});
