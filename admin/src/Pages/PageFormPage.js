import React from 'react';
import { injectIntl } from 'react-intl';

import PageForm from '../Containers/Page/PageForm';

// import Breadcrumb from '../Components/Common/Breadcrumb';isTemplate
import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';

export default injectIntl(({ intl, pageId, isTemplate, isSection, isSeo }) => (
  <DocumentTitle
    title={intl.formatMessage({
      id: isTemplate
        ? 'nav.pageTemplates'
        : isSection
        ? 'nav.pageSection'
        : isSeo
        ? 'nav.pageSeo'
        : 'nav.pages'
    })}
  >
    <ContentContainer>
      <PageForm
        pageId={pageId}
        intl={intl}
        type="content"
        isSection={isSection}
        isSeo={isSeo}
        isTemplate={isTemplate}
      />
    </ContentContainer>
  </DocumentTitle>
));
