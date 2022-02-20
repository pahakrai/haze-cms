/* @flow */

import React from 'react';

import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';
import H1 from '../Components/Common/H1';

export default () => (
  <DocumentTitle title={'About Page'}>
    <ContentContainer>
      <H1>About Page</H1>
    </ContentContainer>
  </DocumentTitle>
);
