import React from 'react';
import { injectIntl } from 'react-intl';
import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';
import CalendarContainer from '../Containers/Calendar/CalendarContainer';

export default injectIntl(({ intl }) => (
  <DocumentTitle
    title={intl && intl.formatMessage({ id: 'nav.public_holiday' })}
  >
    <ContentContainer>
      <CalendarContainer intl={intl} />
    </ContentContainer>
  </DocumentTitle>
));
