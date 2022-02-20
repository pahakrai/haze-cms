import React from 'react';
import { injectIntl } from 'react-intl';

import PostFormContainer from '../Containers/Post/PostForm';

// import Breadcrumb from '../Components/Common/Breadcrumb';
import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';

export default injectIntl(({ intl, postId }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'post.title' })}>
    <ContentContainer>
      {/* <Breadcrumb
        items={[
          { name: 'Home', to: '/' },
          { name: 'Posts', to: '/posts' },
          { name: postId ? 'Edit' : 'Create' }
        ]}
      /> */}
      <PostFormContainer postId={postId} intl={intl} />
    </ContentContainer>
  </DocumentTitle>
));
