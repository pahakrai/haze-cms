import React from 'react';
import { List } from 'antd';

import QuotationCardItem from './QuotationCardItem';
import QuotationCardItemTitle from './QuotationCardItemTitle';

class QuotationList extends React.PureComponent {
  static defaultProps = {
    quotations: [],
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
      <QuotationCardItemTitle intl={intl} key={item} />
    ) : (
      <QuotationCardItem key={item._id} intl={intl} item={item} />
    );
  };

  _renderFooter = () => {
    const { renderFooter } = this.props;

    return renderFooter ? renderFooter() : null;
  };

  render() {
    const { quotations, header, gutter, loading } = this.props;

    return (
      <List
        loading={loading}
        grid={{ gutter: gutter || 0, sm: 1, md: 1 }}
        dataSource={header ? ['header', ...quotations] : quotations}
        renderItem={this._renderItem}
        footer={this._renderFooter()}
      />
    );
  }
}

export default QuotationList;
