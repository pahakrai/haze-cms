import React from 'react';
import styled from 'styled-components';

import { List, Pagination } from 'antd';

import ServiceCardItem from './ServiceCardItem';
import ServiceCardItemTitle from './ServiceCardItemTitle';

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
    const { onItemClick, intl, serviceTypes, currentWorkspace } = this.props;
    const hasPricing = currentWorkspace?.preferences?.service?.pricing;
    return item === 'header' ? (
      <ServiceCardItemTitle intl={intl} key={item} hasPricing={hasPricing} />
    ) : (
      <ServiceCardItem
        key={item._id}
        intl={intl}
        item={item}
        hasPricing={hasPricing}
        serviceTypes={serviceTypes}
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
    const { services, header, gutter } = this.props;
    return (
      <List
        grid={{ gutter: gutter || 16, xs: 1, sm: 1, md: 1 }}
        dataSource={header ? ['header', ...services] : services}
        renderItem={this._renderItem}
        footer={this._renderFooter()}
      />
    );
  }
}

export default ServiceList;
