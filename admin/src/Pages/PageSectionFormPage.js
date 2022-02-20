import React from 'react';
import { injectIntl } from 'react-intl';

import PageForm from '../Containers/PageSection/PageForm';

// import Breadcrumb from '../Components/Common/Breadcrumb';isTemplate
import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';

export default injectIntl(({ intl, pageId, isSeo, isSection }) => (
  <DocumentTitle
    title={intl.formatMessage({
      id: isSection ? 'nav.pageSection' : 'nav.pageSeo'
    })}
  >
    <ContentContainer>
      <PageForm
        pageId={pageId}
        intl={intl}
        type="content"
        isSection={isSection}
        isSeo={isSeo}
      />
    </ContentContainer>
  </DocumentTitle>
));
