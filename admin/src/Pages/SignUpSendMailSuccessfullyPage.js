/* @flow */
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { withRouter } from 'react-router';

import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';
import Content from '../Components/App/ResetPassword/Content';
import Header from '../Components/Common/Header';
import Button from '../Components/Common/Button';
import H3 from '../Components/Common/H3';
import H5 from '../Components/Common/H5';

export default injectIntl(
  withRouter(({ history, intl }) => (
    <DocumentTitle title={intl.formatMessage({ id: 'sign_up' })}>
      <ContentContainer>
        <Content>
          <Header>
            <H3>
              <FormattedMessage id="sign_up" />
            </H3>
          </Header>
          <H5>
            <FormattedMessage id="display_sign_up_sent_to_email" />
          </H5>
          <Button.Primary onClick={() => history.push('/')}>
            {intl.formatMessage(
              { id: 'back_to' },
              { name: intl.formatMessage({ id: 'login' }) }
            )}
          </Button.Primary>
        </Content>
      </ContentContainer>
    </DocumentTitle>
  ))
);
