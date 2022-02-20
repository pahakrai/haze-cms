import React from 'react';
import { injectIntl } from 'react-intl';

// import Breadcrumb from '../Components/Common/Breadcrumb';
import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import NotificationScheduleFormContainer from '../Containers/NotificationSchedule/NotificationScheduleForm';

export default injectIntl(({ intl, id, history }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'nav.notificationSchedule' })}>
    <ContentContainer>
      <NotificationScheduleFormContainer id={id} intl={intl} />
    </ContentContainer>
  </DocumentTitle>
));
