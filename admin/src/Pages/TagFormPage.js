import React from 'react';
import { injectIntl } from 'react-intl';

// import Breadcrumb from '../Components/Common/Breadcrumb';
import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import TagFormContainer from '../Containers/Tag/TagForm';

export default injectIntl(({ intl, text }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'nav.tag' })}>
    <ContentContainer>
      <TagFormContainer text={text} intl={intl} />
    </ContentContainer>
  </DocumentTitle>
));
