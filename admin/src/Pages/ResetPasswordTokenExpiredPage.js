/* @flow */

import React from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';

import DocumentTitle from '../Components/Common/DocumentTitle';
import Button from '../Components/Common/Button';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Subtitle = styled.h2`
  margin-top: 100px;
  font-size: 17pt;
  color: #636363;
  text-align: center;
`;

const Text = styled.p`
  padding: 0 20px;
  font-size: 30pt;
  color: #000;
  font-family: fantasy;
  text-align: center;
  margin-top: 40px;
  line-height: 60px;
`;

export default injectIntl(({ intl }) => (
  <DocumentTitle
    title={intl.formatMessage({ id: 'display_connect_expired_title' })}
  >
    <Content>
      <Subtitle>
        {intl.formatMessage({ id: 'display_connect_expired_title' })}
      </Subtitle>
      <Text>
        {intl.formatMessage({ id: 'display_connect_expired_content' })}
      </Text>
      <Button.Primary onClick={() => (window.location = '/')}>
        {intl.formatMessage(
          { id: 'back_to' },
          { name: intl.formatMessage({ id: 'home' }) }
        )}
      </Button.Primary>
    </Content>
  </DocumentTitle>
));
