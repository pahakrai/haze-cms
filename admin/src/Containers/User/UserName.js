import React from 'react';

import ContentLoader from '../../Components/Common/ContentLoader';
import H2 from '../../Components/Common/H2';

export default ({ user, component: Comp = H2, ...props }) => {
  return user && user.username ? (
    <Comp {...props}>{user.username}</Comp>
  ) : (
    <div style={{ width: '100%' }}>
      <ContentLoader
        height={16}
        width={250}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <rect x="0" y="9" rx="4" ry="4" width="100" height="5" />
      </ContentLoader>
    </div>
  );
};
