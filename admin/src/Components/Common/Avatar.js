import React from 'react';
import styled from 'styled-components';
import P from './P';
// Containers
import FileMetaImage from '../../Containers/FileMetaImage';

const AvatarContainer = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: row;
`;
const Avatar = styled('div')`
  background-image: url('${props => props.src}');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: ${props => props.avatarStyle.width || 200}px;
  height: ${props => props.avatarStyle.height || 200}px;
  border-radius: ${props => props.avatarStyle.borderRadius || 100}px;
  margin: ${props => props.avatarStyle.margin || '0 auto'};
`;
const NameContainer = styled(P)`
  margin: 0 10px;
`;

const UserAvatar = ({
  src,
  name,
  fileMetaId,
  avatarStyle = {},
  nameComponent: NameComp = NameContainer,
  ...props
}) => {
  return (
    <AvatarContainer {...props}>
      {fileMetaId && (
        <FileMetaImage
          component={Avatar}
          avatarStyle={avatarStyle}
          fileMetaId={fileMetaId}
        />
      )}
      {!fileMetaId && <Avatar avatarStyle={avatarStyle} src={src ? src : ''} />}
      {name && <NameComp>{name}</NameComp>}
    </AvatarContainer>
  );
};

export default UserAvatar;
