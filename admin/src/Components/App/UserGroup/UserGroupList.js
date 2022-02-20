import React from 'react';
import styled from 'styled-components';
import { List, Pagination } from 'antd';

import UserGroupCardItem from './UserGroupCardItem';
import UserGroupCardItemTitle from './UserGroupCardItemTitle';

const ListFooterWarp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

class UserGroupList extends React.PureComponent {
  static defaultProps = {
    userGroups: [],
    isNextPageLoading: false,
    isEnd: true,
    onItemClick: () => true,
    onItemToggle: () => true,
    onItemDelete: () => true,
    onLoadMore: () => true
  };

  state = {
    dataSource: []
  };

  componentDidUpdate(prevProps) {
    const { userGroups } = this.props;
    if (prevProps.userGroups !== userGroups) {
      this.setState({
        dataSource: ['header', ...(userGroups || [])].filter(v => v)
      });
    }
  }

  _renderItem = item => {
    const { onItemClick, onItemToggle, onItemDelete, intl } = this.props;
    return item === 'header' ? (
      <UserGroupCardItemTitle key={item} intl={intl} />
    ) : (
      <UserGroupCardItem
        key={item._id}
        intl={intl}
        data={item}
        onToggle={() => onItemToggle(item)}
        onDelete={() => onItemDelete(item)}
        onClick={() => onItemClick(item)}
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
    const { loading } = this.props;
    const { dataSource } = this.state;

    return (
      <List
        grid={{ gutter: 16, sm: 1 }}
        dataSource={dataSource}
        renderItem={this._renderItem}
        loading={loading}
        footer={this._renderFooter()}
      />
    );
  }
}

export default UserGroupList;
