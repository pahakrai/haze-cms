/* @flow */

import React from 'react';
import { injectIntl } from 'react-intl';

import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';
import Title from '../Components/Common/Title';

import CategoryImportContainer from '../Containers/Category/CategoryImport';

export default injectIntl(({ userId, intl, ...props }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'nav.categories_import' })}>
    <ContentContainer>
      <Title.Wrapper>
        <Title>{intl.formatMessage({ id: 'nav.categories_import' })}</Title>
        <Title.Right />
      </Title.Wrapper>
      <CategoryImportContainer intl={intl} />
    </ContentContainer>
  </DocumentTitle>
));
