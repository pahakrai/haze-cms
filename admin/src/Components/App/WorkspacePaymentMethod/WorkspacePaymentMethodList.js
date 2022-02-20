import React from 'react';
import styled from 'styled-components';
import { List, Pagination } from 'antd';

import WorkspacePaymentMethodCardItem from './WorkspacePaymentMethodCardItem';
import WorkspacePaymentMethodCardItemTitle from './WorkspacePaymentMethodCardItemTitle';

const ListFooterWarp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

class WorkspacePaymentMethodList extends React.PureComponent {
  static defaultProps = {
    workspacePaymentMethods: [],
    isNextPageLoading: false,
    isEnd: true,
    onItemToggle: () => true,
    onItemClick: () => true,
    onLoadMore: () => true
  };

  _renderItem = item => {
    const { onItemToggle, intl, onItemDelete, onItemClick } = this.props;
    return item === 'header' ? (
      <WorkspacePaymentMethodCardItemTitle key={item} intl={intl} />
    ) : (
      <WorkspacePaymentMethodCardItem
        key={item._id}
        intl={intl}
        item={item}
        onClick={() => onItemClick(item)}
        onItemDelete={onItemDelete}
        onItemToggle={onItemToggle}
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
    const { workspacePaymentMethods, gutter } = this.props;

    return (
      <List
        grid={{ gutter: gutter || 16, sm: 1, md: 1 }}
        dataSource={['header', ...workspacePaymentMethods]}
        renderItem={this._renderItem}
        footer={this._renderFooter()}
      />
    );
  }
}

export default WorkspacePaymentMethodList;
