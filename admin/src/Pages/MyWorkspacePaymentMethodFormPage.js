import React from 'react';
import { injectIntl } from 'react-intl';

// import Breadcrumb from '../Components/Common/Breadcrumb';
import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import WorkspacePaymentMethodFormContainer from '../Containers/WorkspacePaymentMethod/WorkspacePaymentMethodForm';

export default injectIntl(({ intl, workspacePaymentMethodId }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'workspace.title' })}>
    <ContentContainer>
      <WorkspacePaymentMethodFormContainer
        workspacePaymentMethodId={workspacePaymentMethodId}
        intl={intl}
      />
    </ContentContainer>
  </DocumentTitle>
));
