import React from 'react';
import { injectIntl } from 'react-intl';

import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import ProductTypeFormContainer from '../Containers/ProductType/ProductTypeForm';

export default injectIntl(({ intl, productTypeId }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'display_type' })}>
    <ContentContainer>
      <ProductTypeFormContainer productTypeId={productTypeId} intl={intl} />
    </ContentContainer>
  </DocumentTitle>
));
