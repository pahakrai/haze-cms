import React from 'react';
import styled from 'styled-components';

import { List, Pagination } from 'antd';

import CustomerEnquiryCardItem from './CustomerEnquiryCardItem';
import CustomerEnquiryCardItemTitle from './CustomerEnquiryCardItemTitle';

const ListFooterWarp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;
class ServiceList extends React.PureComponent {
  static defaultProps = {
    expenseTypes: [],
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
    const { intl, onFollow } = this.props;
    return item === 'header' ? (
      <CustomerEnquiryCardItemTitle intl={intl} key={item} />
    ) : (
      <CustomerEnquiryCardItem
        key={item._id}
        intl={intl}
        item={item}
        onFollow={item => onFollow(item)}
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
    const { customerEnquiries, header, gutter } = this.props;
    return (
      <List
        grid={{ gutter: gutter || 16, sm: 1, md: 1 }}
        dataSource={
          header ? ['header', ...customerEnquiries] : customerEnquiries
        }
        renderItem={this._renderItem}
        footer={this._renderFooter()}
      />
    );
  }
}

export default ServiceList;
