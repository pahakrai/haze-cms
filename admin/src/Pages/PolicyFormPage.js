import React from 'react';
import { injectIntl } from 'react-intl';

import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import PolicyForm from '../Containers/Policy/PolicyForm';

export default injectIntl(({ intl, policyId }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'nav.policies' })}>
    <ContentContainer>
      <PolicyForm policyId={policyId} />
    </ContentContainer>
  </DocumentTitle>
));
