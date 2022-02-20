import React from 'react';
import { injectIntl } from 'react-intl';

// import Breadcrumb from '../Components/Common/Breadcrumb';
import DocumentTitle from '../Components/Common/DocumentTitle';
import PageContentContainer from '../Containers/Page/PageContent';

export default injectIntl(
  ({ intl, pageId, type, pageTemplateId, isTemplate }) => (
    <DocumentTitle title={intl.formatMessage({ id: 'nav.pages' })}>
      <PageContentContainer
        pageTemplateId={pageTemplateId}
        isTemplate={isTemplate}
        pageId={pageId}
        type={type}
        intl={intl}
      />
    </DocumentTitle>
  )
);
