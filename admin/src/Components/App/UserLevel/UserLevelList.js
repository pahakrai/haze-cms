import React from 'react';
import styled from 'styled-components';
import { List, Button } from 'antd';
import UserLevelCardItem from './UserLevelCardItem';
import UserLevelCardItemTitle from './UserLevelCardItemTitle';

const ListFooterWarp = styled.div`
  text-align: center;
  margin-top: 12px;
  height: 32px;
  line-height: 32px;
`;

class UserLevelList extends React.PureComponent {
  static defaultProps = {
    onLoadMore: () => true,
    pageSize: 10,
    selectedIds: []
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderItem = item => {
    const { intl } = this.props;
    return item === 'header' ? (
      <UserLevelCardItemTitle intl={intl} key={item} />
    ) : (
      <UserLevelCardItem key={item._id} intl={intl} item={item} />
    );
  };

  _renderFooter = () => {
    const {
      isEnd,
      isNextPageLoading,
      onLoadMore,
      intl,
      renderFooter
    } = this.props;

    return renderFooter ? (
      renderFooter()
    ) : (
      <ListFooterWarp>
        {isEnd ? (
          <span>{intl.formatMessage({ id: 'msg.no_more_data' })}</span>
        ) : (
          <Button onClick={onLoadMore}>
            {isNextPageLoading
              ? intl.formatMessage({ id: 'loading' })
              : intl.formatMessage({ id: 'load_more' })}
          </Button>
        )}
      </ListFooterWarp>
    );
  };

  render() {
    const { userLevels, header, gutter } = this.props;
    return (
      <List
        grid={{ gutter: gutter || 16, sm: 1, md: 1 }}
        dataSource={header ? ['header', ...userLevels] : userLevels}
        renderItem={this._renderItem}
        footer={this._renderFooter()}
      />
    );
  }
}

export default UserLevelList;
