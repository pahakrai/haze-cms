import React from 'react';
import styled from 'styled-components';

import { List, Pagination } from 'antd';

import OrderCardItem from './OrderCardItem';
import OrderCardItemTitle from './OrderCardItemTitle';

const ListFooterWarp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;
class OrderList extends React.PureComponent {
  static defaultProps = {
    orders: [],
    isNextPageLoading: false,
    isEnd: true,
    onLoadMore: () => true,
    header: true
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderItem = item => {
    const { intl, onItemPdfBtnClick, onItemEyeBtnClick } = this.props;

    return item === 'header' ? (
      <OrderCardItemTitle intl={intl} key={item} />
    ) : (
      <OrderCardItem
        key={item._id}
        intl={intl}
        item={item}
        onEyeBtnClick={onItemEyeBtnClick}
        onPdfBtnClick={onItemPdfBtnClick}
      />
    );
  };

  _renderFooter = () => {
    const { pagination, intl } = this.props;

    // return renderFooter ? (
    //   renderFooter()
    // ) : (
    //   <ListFooterWarp>
    //     {isEnd ? (
    //       <span>{intl.formatMessage({ id: 'msg.no_more_data' })}</span>
    //     ) : (
    //       <Button onClick={onLoadMore}>
    //         {isNextPageLoading
    //           ? intl.formatMessage({ id: 'loading' })
    //           : intl.formatMessage({ id: 'load_more' })}
    //       </Button>
    //     )}
    //   </ListFooterWarp>
    // );
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
    const { orders, header, gutter, loading } = this.props;

    return (
      <List
        loading={loading}
        grid={{ gutter: gutter || 16, sm: 1, md: 1 }}
        dataSource={header ? ['header', ...orders] : orders}
        renderItem={this._renderItem}
        footer={this._renderFooter()}
      />
    );
  }
}

export default OrderList;
