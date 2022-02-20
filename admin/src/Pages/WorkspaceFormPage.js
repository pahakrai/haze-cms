import React from 'react';
import { injectIntl } from 'react-intl';

// import Breadcrumb from '../Components/Common/Breadcrumb';
import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import WorkspaceFormContainer from '../Containers/Workspace/WorkspaceForm';

export default injectIntl(({ intl, workspaceId }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'workspace.title' })}>
    <ContentContainer>
      <WorkspaceFormContainer workspaceId={workspaceId} intl={intl} />
    </ContentContainer>
  </DocumentTitle>
));
