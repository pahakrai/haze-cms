/* @flow */
import React from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';

import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';
import Header from '../Components/Common/Header';
import H3 from '../Components/Common/H3';
import Content from '../Components/App/ResetPassword/Content';

import ResetPasswordForm from '../Containers/ResetPasswordForm';

export default injectIntl(
  withRouter(({ location, intl }) => {
    const title = intl.formatMessage({
      id: 'login.set_password'
    });

    return (
      <DocumentTitle title={title}>
        <ContentContainer>
          <Content>
            <Header>
              <H3>{title}</H3>
            </Header>
            <ResetPasswordForm isVerifyUser={true} />
          </Content>
        </ContentContainer>
      </DocumentTitle>
    );
  })
);
