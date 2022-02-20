import React from 'react';
import styled from 'styled-components';

import { List, Pagination } from 'antd';

import PageCardItem from './PageSectionCardItem';
import PageCardItemTitle from './PageSectionCardItemTitle';

const ListFooterWarp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

class PageList extends React.PureComponent {
  static defaultProps = {
    pages: [],
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
    const { onItemEdit, type, intl, isSeo, isSection } = this.props;

    return item === 'header' ? (
      <PageCardItemTitle intl={intl} key={item} type={type} />
    ) : (
      <PageCardItem
        key={item._id}
        intl={intl}
        item={item}
        isSeo={isSeo}
        isSection={isSection}
        onEdit={() => onItemEdit(item)}
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
    const { pages, header } = this.props;

    return (
      <List
        dataSource={header ? ['header', ...pages] : pages}
        renderItem={this._renderItem}
        footer={this._renderFooter()}
      />
    );
  }
}

export default PageList;
