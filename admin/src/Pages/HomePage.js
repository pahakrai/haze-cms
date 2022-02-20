import React from 'react';
import { injectIntl } from 'react-intl';
import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';
import H1 from '../Components/Common/H1';
import Dashboard from '../Containers/Dashboard';

export default injectIntl(({ intl }) => (
  <DocumentTitle title={intl && intl.formatMessage({ id: 'nav.dashboard' })}>
    <ContentContainer>
      <Dashboard
        intl={intl}
        title={
          <H1 noTopMargin style={{ marginLeft: 6 }}>
            {intl && intl.formatMessage({ id: 'nav.dashboard' })}
          </H1>
        }
      />
    </ContentContainer>
  </DocumentTitle>
));
