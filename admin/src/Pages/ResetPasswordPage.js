/* @flow */
import React from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import queryString from 'query-string';

import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';
import Header from '../Components/Common/Header';
import H3 from '../Components/Common/H3';
import Content from '../Components/App/ResetPassword/Content';

import ResetPasswordForm from '../Containers/ResetPasswordForm';

export default injectIntl(
  withRouter(({ location, intl }) => {
    const isVerifyUser = Boolean(
      queryString.parse(location.search).isVerifyUser || false
    );
    const title = intl.formatMessage({
      id: isVerifyUser ? 'login.set_password' : 'login.reset_password'
    });

    return (
      <DocumentTitle title={title}>
        <ContentContainer>
          <Content>
            <Header>
              <H3>{title}</H3>
            </Header>
            <ResetPasswordForm isVerifyUser={isVerifyUser} />
          </Content>
        </ContentContainer>
      </DocumentTitle>
    );
  })
);
