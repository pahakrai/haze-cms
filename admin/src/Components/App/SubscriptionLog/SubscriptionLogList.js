import React from 'react';
import styled from 'styled-components';

import { List, Card, Pagination } from 'antd';
import moment from 'moment';

const ListFooterWarp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const RowContainer = styled.div``;
const TextContainer = styled.p`
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  color: black;
`;
class SubscriptionLogList extends React.PureComponent {
  static defaultProps = {
    subscriptionLogs: [],
    onItemClick: () => true,
    isNextPageLoading: false,
    isEnd: true,
    onLoadMore: () => true,
    header: true
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

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

  _renderItem = item => {
    const { intl } = this.props;
    if (!item) {
      return null;
    }
    const time = moment(item.time).format('YYYY-MM-DD HH:mm:ss');
    return (
      <List.Item>
        <Card>
          <RowContainer>
            {intl.formatMessage({ id: 'device.create_time' })}
            <TextContainer rows={1}>{time}</TextContainer>
          </RowContainer>
          <RowContainer>
            {intl.formatMessage({ id: 'display_data' })}
            <TextContainer rows={6}>{JSON.stringify(item?.data)}</TextContainer>
          </RowContainer>
        </Card>
      </List.Item>
    );
  };

  render() {
    const { subscriptionLogs } = this.props;
    return (
      <List
        grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
        dataSource={subscriptionLogs}
        renderItem={this._renderItem}
        footer={this._renderFooter()}
      />
    );
  }
}

export default SubscriptionLogList;
