/* @flow */

import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';
import Content from '../Components/App/ResetPassword/Content';
import SignUpConfirmForm from '../Components/App/SignUpConfirmForm';

import Header from '../Components/Common/Header';
import H3 from '../Components/Common/H3';
import Link from '../Components/Common/Link';

export default injectIntl(({ intl, ...props }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'sign_up' })}>
    <ContentContainer>
      <Content>
        <Header>
          <H3>
            <FormattedMessage id="sign_up" />
          </H3>
        </Header>
        <SignUpConfirmForm />
        <Link to="/login">
          {intl.formatMessage(
            { id: 'back_to' },
            { name: intl.formatMessage({ id: 'login' }) }
          )}
        </Link>
      </Content>
    </ContentContainer>
  </DocumentTitle>
));
