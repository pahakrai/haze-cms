import React from 'react';
import UserName from '../../../Containers/User/UserName';
import H2 from '../../Common/H2';

export default ({ comment, ...props }) => {
  return (
    <UserName user={comment ? comment.user : null} component={H2} {...props} />
  );
};
