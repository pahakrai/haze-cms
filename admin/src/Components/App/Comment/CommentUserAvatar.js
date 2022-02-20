import React from 'react';
import UserAvatar from '../../Common/Avatar';
import styled from 'styled-components';
styled.div`
  display: inherit;
  @media (max-width: ${props => props.theme.flexa.breakpoints.md}rem) {
    display: none;
  }
`;

export default ({ comment, ...props }) => {
  return (
    <UserAvatar
      src={
        comment.user?.avatars && comment.user.avatars.length > 0
          ? comment?.user?.avatars[0]?.fileMeta.uri
          : null
      }
      user={comment ? comment.user : null}
      avatarStyle={{ height: 50, width: 50 }}
      {...props}
    />
  );
};
