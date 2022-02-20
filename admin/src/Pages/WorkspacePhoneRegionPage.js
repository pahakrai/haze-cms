import React from 'react';
import { injectIntl } from 'react-intl';

import MyWorkspacePaymentMethodListContainer from '../Containers/WorkspacePhoneRegion/WorkspacePhoneRegionList';
import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import FilterLayout from '../Components/Common/FilterLayout';

import WorkspacePhoneRegionCreateButtonContainer from '../Containers/WorkspacePhoneRegion/WorkspacePhoneRegionCreateButton';

export default injectIntl(({ intl }) => (
  <DocumentTitle
    title={intl.formatMessage({ id: 'nav.workspace_phone_region' })}
  >
    <ContentContainer>
      <FilterLayout bp={{ xl: 8 }} noSearch={true}>
        <React.Fragment />
        <React.Fragment>
          <FilterLayout.ButtonFloatLayout marginRight={16}>
            <WorkspacePhoneRegionCreateButtonContainer intl={intl} />
          </FilterLayout.ButtonFloatLayout>
          <MyWorkspacePaymentMethodListContainer intl={intl} />
        </React.Fragment>
      </FilterLayout>
    </ContentContainer>
  </DocumentTitle>
));
