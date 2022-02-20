import React from 'react';
import { injectIntl } from 'react-intl';

import WorkspaceAppFormContainer from '../Containers/WorkspaceApp/WorkspaceAppForm';
import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';

export default injectIntl(({ intl, workspaceAppId }) => {
  return (
    <DocumentTitle title={intl.formatMessage({ id: 'nav.workspace_app' })}>
      <ContentContainer>
        <WorkspaceAppFormContainer
          workspaceAppId={workspaceAppId}
          intl={intl}
        />
      </ContentContainer>
    </DocumentTitle>
  );
});
