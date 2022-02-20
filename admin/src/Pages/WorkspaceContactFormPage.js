import React from 'react';
import { injectIntl } from 'react-intl';

import WorkspaceContactFormContainer from '../Containers/WorkspaceContact/WorkspaceContactForm';

// import Breadcrumb from '../Components/Common/Breadcrumb';
import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';

export default injectIntl(({ intl, workspaceId, contactId }) => {
  return (
    <DocumentTitle title={intl.formatMessage({ id: 'display_contacts' })}>
      <ContentContainer>
        {workspaceId && (
          <WorkspaceContactFormContainer
            workspaceId={workspaceId}
            contactId={contactId}
            intl={intl}
          />
        )}
      </ContentContainer>
    </DocumentTitle>
  );
});
