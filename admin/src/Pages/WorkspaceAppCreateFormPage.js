import React from 'react';
import { injectIntl } from 'react-intl';

import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import WorkspaceAppCreateFormContainer from '../Containers/WorkspaceApp/WorkspaceAppCreateForm';

export default injectIntl(({ intl }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'nav.workspace_app' })}>
    <ContentContainer>
      <WorkspaceAppCreateFormContainer intl={intl} />
    </ContentContainer>
  </DocumentTitle>
));
