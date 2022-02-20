import React from 'react';
import styled from 'styled-components';

import { List, Pagination } from 'antd';

import PolicyCardItem from './PolicyCardItem';
import PolicyCardItemTitle from './PolicyCardItemTitle';

const ListFooterWarp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;
class PolicyCardItemList extends React.PureComponent {
  static defaultProps = {
    policies: [],
    onItemClick: () => true,
    isNextPageLoading: false,
    isEnd: true,
    onLoadMore: () => true
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderItem = item => {
    const { onItemClick, intl } = this.props;
    return item === 'header' ? (
      <React.Fragment>
        <PolicyCardItemTitle intl={intl} key={item} />
      </React.Fragment>
    ) : (
      <PolicyCardItem
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
    const { policies } = this.props;
    return (
      <List
        dataSource={['header', ...policies]}
        renderItem={this._renderItem}
        footer={this._renderFooter()}
      />
    );
  }
}

export default PolicyCardItemList;
