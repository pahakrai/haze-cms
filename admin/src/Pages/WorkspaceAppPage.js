import React from 'react';
import { injectIntl } from 'react-intl';

import WorkspaceAppListContainer from '../Containers/WorkspaceApp/WorkspaceAppList';
import WorkspaceAppCreateButtonContainer from '../Containers/WorkspaceApp/WorkspaceAppCreateButton';

import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import FilterLayout from '../Components/Common/FilterLayout';

export default injectIntl(({ intl }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'nav.workspace_app' })}>
    <ContentContainer>
      <FilterLayout bp={{ xl: 8 }} noSearch={true}>
        <React.Fragment />
        <React.Fragment>
          <FilterLayout.ButtonFloatLayout marginRight={16}>
            <WorkspaceAppCreateButtonContainer intl={intl} />
          </FilterLayout.ButtonFloatLayout>
          <WorkspaceAppListContainer intl={intl} />
        </React.Fragment>
      </FilterLayout>
    </ContentContainer>
  </DocumentTitle>
));
