import React from 'react';
import styled from 'styled-components';

import { List, Pagination } from 'antd';

import ProductTypeCardItem from './ProductTypeCardItem';
import ProductTypeCardItemTitle from './ProductTypeCardItemTitle';

const ListFooterWarp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;
class ProductTypeList extends React.PureComponent {
  static defaultProps = {
    expenseTypes: [],
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

  _renderItem = item => {
    const { onItemClick, intl } = this.props;
    return item === 'header' ? (
      <ProductTypeCardItemTitle intl={intl} key={item} />
    ) : (
      <ProductTypeCardItem
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
    const { productTypes, header, gutter } = this.props;
    return (
      <List
        grid={{ gutter: gutter || 16, sm: 1, md: 1 }}
        dataSource={header ? ['header', ...productTypes] : productTypes}
        renderItem={this._renderItem}
        footer={this._renderFooter()}
      />
    );
  }
}

export default ProductTypeList;
