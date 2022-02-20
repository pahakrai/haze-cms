import React from 'react';
import { injectIntl } from 'react-intl';
import FileMetaFormContainer from '../Containers/FileMeta/FileMetaForm';
import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';

export default injectIntl(({ intl, fileMetaId }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'fileMeta.title' })}>
    <ContentContainer>
      <FileMetaFormContainer fileMetaId={fileMetaId} intl={intl} />
    </ContentContainer>
  </DocumentTitle>
));
