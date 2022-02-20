import React from 'react';
import styled from 'styled-components';
import { List, Pagination } from 'antd';

import WorkspacePhoneRegionCardItem from './WorkspacePhoneRegionCardItem';
import WorkspacePhoneRegionCardItemTitle from './WorkspacePhoneRegionCardItemTitle';

const ListFooterWarp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

class WorkspacePhoneRegionList extends React.PureComponent {
  static defaultProps = {
    workspacePhoneRegions: [],
    isNextPageLoading: false,
    isEnd: true,
    onItemClick: () => true,
    onLoadMore: () => true
  };

  _renderItem = item => {
    const { intl, onItemDelete, onItemClick } = this.props;
    return item === 'header' ? (
      <WorkspacePhoneRegionCardItemTitle key={item} intl={intl} />
    ) : (
      <WorkspacePhoneRegionCardItem
        key={item._id}
        intl={intl}
        item={item}
        onClick={() => onItemClick(item)}
        onItemDelete={onItemDelete}
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
    const { workspacePhoneRegions, gutter } = this.props;

    return (
      <List
        grid={{ gutter: gutter || 16, sm: 1, md: 1 }}
        dataSource={['header', ...workspacePhoneRegions]}
        renderItem={this._renderItem}
        footer={this._renderFooter()}
      />
    );
  }
}

export default WorkspacePhoneRegionList;
