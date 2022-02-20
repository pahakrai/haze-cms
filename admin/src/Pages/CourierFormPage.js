import React from 'react';
import { injectIntl } from 'react-intl';

import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import CourierFormContainer from '../Containers/Courier/CourierForm';

export default injectIntl(({ intl, courierId }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'nav.couriers' })}>
    <ContentContainer>
      <CourierFormContainer courierId={courierId} intl={intl} />
    </ContentContainer>
  </DocumentTitle>
));
