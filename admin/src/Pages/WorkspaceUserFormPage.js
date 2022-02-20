import React from 'react';
import { injectIntl } from 'react-intl';

// import Breadcrumb from '../Components/Common/Breadcrumb';
import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import WorkspaceUserFormContainer from '../Containers/Workspace/WorkspaceUserForm';

export default injectIntl(({ intl, workspaceCode }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'workspace.title' })}>
    <ContentContainer>
      <WorkspaceUserFormContainer workspaceCode={workspaceCode} intl={intl} />
    </ContentContainer>
  </DocumentTitle>
));
