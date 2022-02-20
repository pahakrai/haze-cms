import React from 'react';
import { injectIntl } from 'react-intl';

import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import CandidateDetail from '../Containers/Candidate/CandidateDetail';

class Page extends React.PureComponent {
  render() {
    const { intl, candidateId } = this.props;
    return (
      <DocumentTitle title={intl.formatMessage({ id: 'nav.candidate_detail' })}>
        <ContentContainer>
          <CandidateDetail intl={intl} candidateId={candidateId} />
        </ContentContainer>
      </DocumentTitle>
    );
  }
}
export default injectIntl(Page);
