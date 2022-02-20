import React from 'react';
import styled from 'styled-components';

import { List, Button } from 'antd';

import PageTemplateCardItem from './PageTemplateCardItem';
import PageTemplateCardItemTitle from './PageTemplateCardItemTitle';

const ListFooterWarp = styled.div`
  text-align: center;
  margin-top: 12px;
  height: 32px;
  line-height: 32px;
`;
class PageTemplateList extends React.PureComponent {
  static defaultProps = {
    pageTemplates: [],
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
      <PageTemplateCardItemTitle intl={intl} key={item} />
    ) : (
      <PageTemplateCardItem
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
    const { pageTemplates, header } = this.props;

    return (
      <List
        dataSource={header ? ['header', ...pageTemplates] : pageTemplates}
        renderItem={this._renderItem}
        footer={this._renderFooter()}
      />
    );
  }
}

export default PageTemplateList;
