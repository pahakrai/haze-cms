import React from 'react';
import moment from 'moment';

import ContentLoader from '../../Common/ContentLoader';
import P from '../../Common/P';

export default ({ comment, component: Comp = P, ...props }) => {
  return comment && comment.createdAt ? (
    <Comp {...props}>{moment(comment.createdAt).fromNow()}</Comp>
  ) : (
    <ContentLoader
      height={15}
      width={250}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="0" y="0" rx="4" ry="4" width="117" height="11" />
    </ContentLoader>
  );
};
