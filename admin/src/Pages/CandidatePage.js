import React from 'react';
import { injectIntl } from 'react-intl';
import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';
import CandidateContainer from '../Containers/Candidate/CandidateList';

export default injectIntl(({ intl, recruitmentPostId }) => (
  <DocumentTitle title={intl && intl.formatMessage({ id: 'nav.candidate' })}>
    <ContentContainer>
      <CandidateContainer intl={intl} recruitmentPostId={recruitmentPostId} />
    </ContentContainer>
  </DocumentTitle>
));
