import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';

import { List, Pagination } from 'antd';

import ClaimCardItem from './ClaimCardItem';
import ClaimCardItemTitle from './ClaimCardItemTitle';

const ListFooterWarp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;
class ClaimList extends React.PureComponent {
  static defaultProps = {
    expenseTypes: [],
    onItemClick: () => true,
    onLoadMore: () => true,
    header: true
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  _onItemClick = claim => {
    window.open('/claims/' + claim?._id);
  };
  _renderItem = item => {
    const { intl } = this.props;
    return item === 'header' ? (
      <ClaimCardItemTitle intl={intl} key={item} />
    ) : (
      <ClaimCardItem
        key={item._id}
        intl={intl}
        item={item}
        onClick={this._onItemClick}
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
    const { claims, header, gutter, loading } = this.props;
    return (
      <List
        grid={{ gutter: gutter || 16, sm: 1, md: 1 }}
        dataSource={header ? ['header', ...claims] : claims}
        renderItem={this._renderItem}
        footer={this._renderFooter()}
        loading={loading}
      />
    );
  }
}

export default withRouter(ClaimList);
