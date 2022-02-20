import React from 'react';
import styled from 'styled-components';

import { List, Pagination } from 'antd';

import ProductCardItem from './ProductCardItem';
import ProductCardItemTitle from './ProductCardItemTitle';

const ListFooterWarp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;
class ProductList extends React.PureComponent {
  static defaultProps = {
    products: [],
    isNextPageLoading: false,
    isEnd: true,
    header: true
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderItem = item => {
    const { intl } = this.props;
    return item === 'header' ? (
      <ProductCardItemTitle intl={intl} key={item} />
    ) : (
      <ProductCardItem key={item._id} intl={intl} item={item} />
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
    const { products, header, gutter, loading } = this.props;

    return (
      <List
        loading={loading}
        grid={{ gutter: gutter || 16, sm: 1, md: 1 }}
        dataSource={header ? ['header', ...products] : products}
        renderItem={this._renderItem}
        footer={this._renderFooter()}
      />
    );
  }
}

export default ProductList;
