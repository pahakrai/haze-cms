import React from 'react';
import { injectIntl } from 'react-intl';

// import Breadcrumb from '../Components/Common/Breadcrumb';
import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import QuotationFormContainer from '../Containers/Quotation/QuotationForm';

export default injectIntl(({ intl, quotationId }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'nav.quotation' })}>
    <ContentContainer>
      <QuotationFormContainer quotationId={quotationId} intl={intl} />
    </ContentContainer>
  </DocumentTitle>
));
