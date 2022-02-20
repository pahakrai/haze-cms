import React from 'react';

import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';
import VerifyCodeForm from '../Containers/VerifyCodeForm';

export default () => (
  <DocumentTitle title={'Login Page'}>
    <ContentContainer>
      <VerifyCodeForm />
    </ContentContainer>
  </DocumentTitle>
);
