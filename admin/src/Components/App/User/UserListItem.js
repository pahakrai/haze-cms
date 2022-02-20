import React from 'react'
import styled from 'styled-components'
import Common from '@golpasal/common'

import { formatUserName } from '../../../Lib/util'

import Card from '../../Common/Card'
import H6 from '../../Common/H6'
import P from '../../Common/P'
import UserAvatar from '../../../Containers/User/UserAvatar'

const UserCard = styled(Card)`
  flex-direction: column;
  cursor: pointer;
  box-shadow: none;
  margin: 0 0 -1px 0;
  display: flex;
  justify-content: space-between;
  background-color: ${(props) =>
    props.selected ? 'rgba(0, 0, 0, 0.05)' : '#fff'};
  & p,
`
const UserCardLeft = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  margin: 0;
  border-top-width: 0.1px;
`

export default ({
  user,
  onItemClick,
  selected,
  style,
  param,
  currentWorkspace
}) => {
  return (
    <UserCard
      style={style}
      selected={selected === user._id}
      onClick={() => onItemClick(user)}
    >
      <UserCardLeft>
        <H6>
          {currentWorkspace.type === Common.type.WorkspaceType.EDUCATION ||
          currentWorkspace.type === Common.type.WorkspaceType.LOGISTICS
            ? formatUserName(user)
            : user.name}
        </H6>
        <UserAvatar
          userId={user && user._id}
          avatarStyle={{
            height: 40,
            width: 40,
            borderRadius: 20
          }}
        />
      </UserCardLeft>
      <P>{user.email}</P>
      <P>{user.phone}</P>
    </UserCard>
  )
}
