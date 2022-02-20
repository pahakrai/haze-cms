import React from 'react';
import { injectIntl } from 'react-intl';

import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import WorkspaceAppEditFormContainer from '../Containers/WorkspaceApp/WorkspaceAppEditForm';

export default injectIntl(({ intl, editType }) => {
  return (
    <DocumentTitle title={intl.formatMessage({ id: 'nav.workspace_app' })}>
      <ContentContainer>
        <WorkspaceAppEditFormContainer editType={editType} intl={intl} />
      </ContentContainer>
    </DocumentTitle>
  );
});
