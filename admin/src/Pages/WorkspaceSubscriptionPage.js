import React from 'react';
import { injectIntl } from 'react-intl';

import MyWorkspaceSubscriptionPageListContainer from '../Containers/WorkspaceSubscription/WorkspaceSubscriptionList';
import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import FilterLayout from '../Components/Common/FilterLayout';

export default injectIntl(({ intl, onClick }) => (
  <DocumentTitle
    title={intl.formatMessage({ id: 'nav.workspace_phone_region' })}
  >
    <ContentContainer>
      <FilterLayout bp={{ xl: 8 }} noSearch={true}>
        <React.Fragment />
        <React.Fragment>
          <MyWorkspaceSubscriptionPageListContainer
            intl={intl}
            onClick={onClick}
          />
        </React.Fragment>
      </FilterLayout>
    </ContentContainer>
  </DocumentTitle>
));
