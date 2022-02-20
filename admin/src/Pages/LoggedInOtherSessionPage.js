/* @flow */

import React from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';

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

export default () => {
  const history = useHistory();
  const intl = useIntl();

  const title = intl.formatMessage({ id: 'msg.logged_in_other_session' });
  const content = intl.formatMessage({ id: 'msg.logout_and_try_again' });

  return (
    <DocumentTitle title={title}>
      <Content>
        <Subtitle>{title}</Subtitle>
        <Text>{content}</Text>
        <Button.Primary onClick={() => history.push('/')}>
          {intl.formatMessage(
            { id: 'back_to' },
            { name: intl.formatMessage({ id: 'home' }) }
          )}
        </Button.Primary>
      </Content>
    </DocumentTitle>
  );
};
