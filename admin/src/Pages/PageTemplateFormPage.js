import React from 'react';
import { injectIntl } from 'react-intl';

// import Breadcrumb from '../Components/Common/Breadcrumb';
import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import PageTemplateFormContainer from '../Containers/PageTemplate/PageTemplateForm';

export default injectIntl(({ intl, pageTemplateId }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'nav.pageTemplates' })}>
    <ContentContainer>
      <PageTemplateFormContainer pageTemplateId={pageTemplateId} intl={intl} />
    </ContentContainer>
  </DocumentTitle>
));
