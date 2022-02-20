import React from 'react';
import { List, Button, Spin } from 'antd';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import EcommCommonType from '@golpasal/common';

import UserListItem from './UserListItem';

const { UserType } = EcommCommonType.type;

const UserListWrapper = styled.div`
  border-radius: 4px;
  overflow: auto;
  padding: 8px 5px;
  height: 600px;
`;

const SpinWarp = styled.div`
  bottom: 40px;
  width: 100%;
  text-align: center;
`;

const ListFooterWarp = styled.div`
  text-align: center;
  margin-top: 12px;
  height: 32px;
  line-height: 32px;
`;

const UserList = ({
  users,
  members,
  selected,
  intl,
  initLoading = users.length <= 0,
  onItemClick,
  isNextPageLoading,
  isNextPageMemberLoading,
  userType,
  currentWorkspace,
  onLoadMore = () => {},
  pagination = { isEnd: false },
  paginationMembers = { isEnd: false }
}) => {
  const paginationUser = pagination.isEnd ? (
    <span>{intl.formatMessage({ id: 'msg.no_more_data' })}</span>
  ) : (
    <Button onClick={onLoadMore}>
      {isNextPageLoading
        ? intl.formatMessage({ id: 'loading' })
        : intl.formatMessage({ id: 'load_more' })}
    </Button>
  );
  const paginationMember = paginationMembers.isEnd ? (
    <span>{intl.formatMessage({ id: 'msg.no_more_data' })}</span>
  ) : (
    <Button onClick={onLoadMore}>
      {isNextPageMemberLoading
        ? intl.formatMessage({ id: 'loading' })
        : intl.formatMessage({ id: 'load_more' })}
    </Button>
  );
  const userLoading = isNextPageLoading && (
    <SpinWarp>
      <Spin />
    </SpinWarp>
  );
  const memberLoading = isNextPageMemberLoading && (
    <SpinWarp>
      <Spin />
    </SpinWarp>
  );
  return (
    <UserListWrapper>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        intl={intl}
        loadMore={() => true}
        hasMore={
          userType === UserType.MEMBER
            ? paginationMembers.isEnd
            : pagination.isEnd
        }
        useWindow={false}
      >
        <List
          dataSource={userType === UserType.MEMBER ? members : users}
          footer={
            <ListFooterWarp>
              {userType === UserType.MEMBER ? paginationMember : paginationUser}
            </ListFooterWarp>
          }
          renderItem={item => (
            <UserListItem
              selected={selected}
              onItemClick={onItemClick}
              key={item._id}
              user={userType === UserType.MEMBER ? item && item.user : item}
              currentWorkspace={currentWorkspace}
            />
          )}
        >
          {userType === UserType.MEMBER ? memberLoading : userLoading}
        </List>
      </InfiniteScroll>
    </UserListWrapper>
  );
};

export default UserList;
