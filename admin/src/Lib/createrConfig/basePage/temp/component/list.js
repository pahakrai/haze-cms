const {
  name: { uc, lc }
} = require('../../../constant');

const e = (module.exports = {});

e.content = `
import React from 'react';
import styled from 'styled-components';

import { List, Button } from 'antd';

import ${uc}CardItem from './${uc}CardItem';
import ${uc}CardItemTitle from './${uc}CardItemTitle';

const ListFooterWarp = styled.div\`
  text-align: center;
  margin-top: 12px;
  height: 32px;
  line-height: 32px;
\`;
class ${uc}List extends React.PureComponent {
  static defaultProps = {
    ${lc}s: [],
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
    const { onItemClick, intl } = this.props;

    return item === 'header' ? (
      <${uc}CardItemTitle intl={intl} key={item} />
    ) : (
      <${uc}CardItem
        key={item._id}
        intl={intl}
        item={item}
        onClick={() => onItemClick(item)}
      />
    );
  };

  _renderFooter = () => {
    const {
      isEnd,
      isNextPageLoading,
      onLoadMore,
      intl,
      renderFooter
    } = this.props;

    return renderFooter ? (
      renderFooter()
    ) : (
      <ListFooterWarp>
        {isEnd ? (
          <span>{intl.formatMessage({ id: 'msg.no_more_data' })}</span>
        ) : (
          <Button onClick={onLoadMore}>
            {isNextPageLoading
              ? intl.formatMessage({ id: 'loading' })
              : intl.formatMessage({ id: 'load_more' })}
          </Button>
        )}
      </ListFooterWarp>
    );
  };

  render() {
    const { ${lc}s, header, gutter } = this.props;

    return (
      <List
        grid={{ gutter: gutter || 16, sm: 1, md: 1 }}
        dataSource={header ? ['header', ...${lc}s] : ${lc}s}
        renderItem={this._renderItem}
        footer={this._renderFooter()}
      />
    );
  }
}

export default ${uc}List;
`.replace(/^\s/, '');
