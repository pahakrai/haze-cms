import React from 'react';
import { List } from 'antd';

import CouponCardItem from './CouponCardItem';
import CouponCardItemTitle from './CouponCardItemTitle';

class CouponList extends React.PureComponent {
  static defaultProps = {
    coupons: [],
    isEnd: true,
    onLoadMore: () => true,
    header: true
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderItem = item => {
    const { intl, isProvider } = this.props;
    return item === 'header' ? (
      <CouponCardItemTitle intl={intl} key={item} isProvider={isProvider} />
    ) : (
      <CouponCardItem
        key={item._id}
        intl={intl}
        item={item}
        isProvider={isProvider}
      />
    );
  };

  _renderFooter = () => {
    const {
      // isEnd,
      // onLoadMore,
      renderFooter
    } = this.props;

    return renderFooter ? renderFooter() : null;
  };

  render() {
    const { coupons, header, gutter, loading } = this.props;

    return (
      <List
        loading={loading}
        grid={{ gutter: gutter || 0, sm: 1, md: 1 }}
        dataSource={header ? ['header', ...coupons] : coupons}
        renderItem={this._renderItem}
        footer={this._renderFooter()}
      />
    );
  }
}

export default CouponList;
