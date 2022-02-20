import React from 'react';

import ContentLoader from '../../Common/ContentLoader';
import H3 from '../../Common/H3';

export default ({ comment, component: Comp = H3, ...props }) => {
  return comment && comment.title ? (
    <Comp {...props}>{comment.title}</Comp>
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
