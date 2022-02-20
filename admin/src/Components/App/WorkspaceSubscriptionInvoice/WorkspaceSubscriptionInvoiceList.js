import React from 'react';
import styled from 'styled-components';
import { List, Pagination } from 'antd';

import WorkspaceSubscriptionInvoiceCardItem from './WorkspaceSubscriptionInvoiceCardItem';
import WorkspaceSubscriptionInvoiceCardItemTitle from './WorkspaceSubscriptionInvoiceCardItemTitle';

const ListFooterWarp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

class WorkspaceSubscriptionInvoiceList extends React.PureComponent {
  static defaultProps = {
    WorkspaceSubscriptionInvoices: [],
    isNextPageLoading: false,
    isEnd: true,
    onItemClick: () => true,
    onLoadMore: () => true,
    header: true
  };

  _renderItem = item => {
    const { intl, onItemClick } = this.props;
    return item === 'header' ? (
      <WorkspaceSubscriptionInvoiceCardItemTitle key={item} intl={intl} />
    ) : (
      <WorkspaceSubscriptionInvoiceCardItem
        key={item._id}
        intl={intl}
        item={item}
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
    const { workspaceSubscriptionInvoices, header, gutter } = this.props;

    return (
      <List
        grid={{ gutter: gutter || 16, sm: 1, md: 1 }}
        dataSource={
          header
            ? ['header', ...workspaceSubscriptionInvoices]
            : workspaceSubscriptionInvoices
        }
        renderItem={this._renderItem}
        footer={this._renderFooter()}
      />
    );
  }
}

export default WorkspaceSubscriptionInvoiceList;
