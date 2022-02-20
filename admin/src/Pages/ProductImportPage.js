/* @flow */

import React from 'react';
import { injectIntl } from 'react-intl';

import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';
import Title from '../Components/Common/Title';

import ProductImportContainer from '../Containers/Product/ProductImport';

export default injectIntl(({ intl, ...props }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'nav.product_import' })}>
    <ContentContainer>
      <Title.Wrapper>
        <Title>{intl.formatMessage({ id: 'nav.product_import' })}</Title>
        <Title.Right />
      </Title.Wrapper>
      <ProductImportContainer intl={intl} />
    </ContentContainer>
  </DocumentTitle>
));
