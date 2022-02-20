import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { List, Pagination } from 'antd';

import ProductsCardItem from './ProductsCardItem';
import ProductsCardItemTitle from './ProductsCardItemTitle';

const ListFooterWarp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

class DetailList extends React.PureComponent {
  static defaultProps = {
    onItemClick: () => true,
    isNextPageLoading: false,
    isEnd: true,
    onLoadMore: () => true,
    header: true
  };

  _deleteProduct = key => {
    const {
      input: { value: items = [], onChange }
      // changeFormValue
    } = this.props;
    let result = [];
    let ids = [];
    // changeFormValue(form, 'selectProductsId', newProductsId);

    result = items.filter(v => v._id !== key);
    result.forEach(v => ids.push(v._id));

    onChange(result);
  };

  _renderItem = item => {
    const { intl } = this.props;
    return item === 'header' ? (
      <ProductsCardItemTitle intl={intl} key={item} />
    ) : (
      <ProductsCardItem
        key={item._id}
        intl={intl}
        item={item}
        _deleteProduct={this._deleteProduct}
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
    const { formValueDetail, header, loading, gutter } = this.props;
    return (
      <div>
        {formValueDetail && formValueDetail.length > 0 && (
          <List
            loading={loading}
            grid={{ gutter: gutter || 16, sm: 1, md: 1 }}
            dataSource={
              header ? ['header', ...formValueDetail] : formValueDetail
            }
            renderItem={this._renderItem}
          />
        )}
      </div>
    );
  }
}

export default props => {
  return <Field {...props} component={DetailList} />;
};
