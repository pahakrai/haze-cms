/* @flow */

import React from 'react';
import { injectIntl } from 'react-intl';

import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';
import H1 from '../Components/Common/H1';

export default injectIntl(({ intl }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'privacy_policy' })}>
    <ContentContainer>
      <H1>{intl.formatMessage({ id: 'privacy_policy' })}</H1>
    </ContentContainer>
  </DocumentTitle>
));
