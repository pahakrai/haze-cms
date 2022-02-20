import React from 'react';
import { injectIntl } from 'react-intl';

import WorkspaceSubscriptionInvoiceListContainer from '../Containers/WorkspaceSubscriptionInvoice/WorkspaceSubscriptionInvoiceList';
import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import FilterLayout from '../Components/Common/FilterLayout';

export default injectIntl(({ intl }) => (
  <DocumentTitle
    title={intl.formatMessage({ id: 'display_subscription_invoice' })}
  >
    <ContentContainer>
      <FilterLayout bp={{ xl: 8 }} noSearch={true}>
        <React.Fragment />
        <React.Fragment>
          <WorkspaceSubscriptionInvoiceListContainer intl={intl} />
        </React.Fragment>
      </FilterLayout>
    </ContentContainer>
  </DocumentTitle>
));
