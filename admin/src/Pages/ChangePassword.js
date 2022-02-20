/* @flow */

import React from 'react';
import { injectIntl } from 'react-intl';
import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';
import ChangePasswordForm from '../Containers/ChangePasswordForm';
import Title from '../Components/Common/Title';

export default injectIntl(({ intl }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'display_change_password' })}>
    <ContentContainer>
      <Title.Wrapper>
        <Title>{intl.formatMessage({ id: 'display_change_password' })}</Title>
        <Title.Right />
      </Title.Wrapper>
      <ChangePasswordForm intl={intl} />
    </ContentContainer>
  </DocumentTitle>
));
