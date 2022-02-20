import React from 'react';
import styled from 'styled-components';
import { List, Pagination } from 'antd';

import UserSchedulePermissionCardItem from './UserSchedulePermissionCardItem';
import UserSchedulePermissionCardItemTitle from './UserSchedulePermissionCardItemTitle';

const ListFooterWarp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

class UserSchedulePermissionList extends React.PureComponent {
  static defaultProps = {
    userSchedulePermissions: [],
    isNextPageLoading: false,
    isEnd: true,
    onItemToggle: () => true,
    onLoadMore: () => true
  };

  _renderItem = item => {
    const { onItemToggle, userScheduleStatusLoading, intl } = this.props;
    return item === 'header' ? (
      <UserSchedulePermissionCardItemTitle key={item} intl={intl} />
    ) : (
      <UserSchedulePermissionCardItem
        key={item._id}
        intl={intl}
        data={item}
        userScheduleStatusLoading={userScheduleStatusLoading}
        onToggle={onItemToggle}
      />
    );
  };

  _renderFooter = () => {
    const { pagination, intl } = this.props;

    return (
      <ListFooterWarp>
        <Pagination {...pagination} />
        <span style={{ marginLeft: 10 }}>
          {intl.formatMessage(
            { id: 'display_page.total_record' },
            { n: pagination.total }
          )}
        </span>
      </ListFooterWarp>
    );
  };

  render() {
    const { userSchedulePermissions } = this.props;

    return (
      <List
        grid={{ gutter: 16, sm: 1 }}
        dataSource={['header', ...userSchedulePermissions]}
        renderItem={this._renderItem}
        footer={this._renderFooter()}
      />
    );
  }
}

export default UserSchedulePermissionList;
