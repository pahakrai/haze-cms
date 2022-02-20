import React from 'react';
import { injectIntl } from 'react-intl';

// import Breadcrumb from '../Components/Common/Breadcrumb';
import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import ReportFormContainer from '../Containers/SystemReport/ReportForm';

export default injectIntl(({ intl, reportId }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'nav.reports' })}>
    <ContentContainer>
      <ReportFormContainer reportId={reportId} intl={intl} />
    </ContentContainer>
  </DocumentTitle>
));
