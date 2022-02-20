import React from 'react';
import { injectIntl } from 'react-intl';

// import Breadcrumb from '../Components/Common/Breadcrumb';
import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import MyWorkspacePaymentMethodListContainer from '../Containers/WorkspacePaymentMethod/MyWorkspacePaymentMethodList';
import FilterLayout from '../Components/Common/FilterLayout';

import WorkspacePaymentMethodCreateButtonContainer from '../Containers/WorkspacePaymentMethod/WorkspacePaymentMethodCreateButton';

export default injectIntl(({ intl }) => (
  <DocumentTitle
    title={intl.formatMessage({ id: 'nav.workspace_payment_method' })}
  >
    <ContentContainer>
      <FilterLayout bp={{ xl: 8 }} noSearch={true}>
        <React.Fragment />
        <React.Fragment>
          <FilterLayout.ButtonFloatLayout marginRight={16}>
            <WorkspacePaymentMethodCreateButtonContainer intl={intl} />
          </FilterLayout.ButtonFloatLayout>
          <MyWorkspacePaymentMethodListContainer intl={intl} />
        </React.Fragment>
      </FilterLayout>
    </ContentContainer>
  </DocumentTitle>
));
