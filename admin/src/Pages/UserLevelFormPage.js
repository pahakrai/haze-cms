import React from 'react';
import { injectIntl } from 'react-intl';

// import Breadcrumb from '../Components/Common/Breadcrumb';
import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';
import UserLevelFormContainer from '../Containers/UserLevel/UserLevelForm';

export default injectIntl(({ intl, userLevelId }) => (
  <DocumentTitle
    title={intl.formatMessage({ id: 'nav.user_level_management' })}
  >
    <ContentContainer>
      <UserLevelFormContainer userLevelId={userLevelId} intl={intl} />
    </ContentContainer>
  </DocumentTitle>
));
