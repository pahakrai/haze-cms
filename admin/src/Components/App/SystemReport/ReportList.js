import React from 'react';
import styled from 'styled-components';

import { List, Pagination } from 'antd';

import ReportCardItem from './ReportCardItem';
import ReportCardItemTitle from './ReportCardItemTitle';

const ListFooterWarp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;
class ReportList extends React.PureComponent {
  static defaultProps = {
    reports: [],
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
      <ReportCardItemTitle intl={intl} key={item} />
    ) : (
      <ReportCardItem key={item._id} intl={intl} item={item} />
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
    const { reports, header, gutter, loading } = this.props;

    return (
      <List
        loading={loading}
        grid={{ gutter: gutter || 16, sm: 1, md: 1 }}
        dataSource={header ? ['header', ...reports] : reports}
        renderItem={this._renderItem}
        footer={this._renderFooter()}
      />
    );
  }
}

export default ReportList;
