import React from 'react';
import { injectIntl } from 'react-intl';

// import Breadcrumb from '../Components/Common/Breadcrumb';
import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import ProductFormContainer from '../Containers/Product/ProductForm';

export default injectIntl(({ intl, productId }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'nav.products' })}>
    <ContentContainer>
      <ProductFormContainer productId={productId} intl={intl} />
    </ContentContainer>
  </DocumentTitle>
));
