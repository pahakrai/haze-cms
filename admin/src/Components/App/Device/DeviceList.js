import React from 'react';
import styled from 'styled-components';
import { List, Pagination } from 'antd';

import DeviceCardItem from './DeviceCardItem';
import DeviceCardItemTitle from './DeviceCardItemTitle';

const ListFooterWarp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;
class DeviceList extends React.PureComponent {
  static defaultProps = {
    expenseTypes: [],
    isNextPageLoading: false,
    isEnd: true,
    onLoadMore: () => true
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderItem = item => {
    const { intl, changeDeviceStatus } = this.props;
    return item === 'header' ? (
      <DeviceCardItemTitle intl={intl} key={item} />
    ) : (
      <DeviceCardItem
        key={item._id}
        intl={intl}
        item={item}
        changeDeviceStatus={changeDeviceStatus}
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
    const { devices } = this.props;
    return (
      <List
        dataSource={['header', ...devices]}
        renderItem={this._renderItem}
        footer={this._renderFooter()}
      />
    );
  }
}

export default DeviceList;
