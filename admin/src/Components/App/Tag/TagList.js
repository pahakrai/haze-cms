import React from 'react';
import styled from 'styled-components';

import { List, Pagination } from 'antd';

import TagCardItem from './TagCardItem';
import TagCardItemTitle from './TagCardItemTitle';

const ListFooterWarp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;
class TagList extends React.PureComponent {
  static defaultProps = {
    tags: [],
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
    const { intl } = this.props;
    return item === 'header' ? (
      <TagCardItemTitle intl={intl} key={item} />
    ) : (
      <TagCardItem key={item._id} intl={intl} item={item} />
    );
  };

  _renderFooter = () => {
    const { pagination, intl } = this.props;
    return (
      <ListFooterWarp>
        <Pagination {...pagination} />
        <span style={{ marginLeft: 10 }}>
          {intl.formatMessage({ id: 'display_page.total_record' }, { n: 1 })}
        </span>
      </ListFooterWarp>
    );
  };

  render() {
    const { tags, header, gutter, loading } = this.props;

    return (
      <List
        loading={loading}
        grid={{ gutter: gutter || 16, sm: 1, md: 1 }}
        dataSource={header ? ['header', ...tags] : tags}
        renderItem={this._renderItem}
        footer={this._renderFooter()}
      />
    );
  }
}

export default TagList;
