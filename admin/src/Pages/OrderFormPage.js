import React from 'react';
import { injectIntl } from 'react-intl';

// import Breadcrumb from '../Components/Common/Breadcrumb';
import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import OrderFormContainer from '../Containers/Order/OrderForm';

export default injectIntl(({ intl, orderId }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'nav.orders' })}>
    <ContentContainer>
      <OrderFormContainer orderId={orderId} intl={intl} />
    </ContentContainer>
  </DocumentTitle>
));
