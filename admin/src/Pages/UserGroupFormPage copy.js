import React from 'react';
import { injectIntl } from 'react-intl';

import UserGroupFormContainer from '../Containers/UserGroup/UserGroupForm';

// import Breadcrumb from '../Components/Common/Breadcrumb';
import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';

export default injectIntl(({ intl, userGroupId }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'post.title' })}>
    <ContentContainer>
      <UserGroupFormContainer userGroupId={userGroupId} intl={intl} />
    </ContentContainer>
  </DocumentTitle>
));
