import React from 'react';
import styled from 'styled-components';

import { List, Button } from 'antd';

import CandidateCardItem from './CandidateCardItem';
import CandidateCardItemTitle from './CandidateCardItemTitle';

const ListFooterWarp = styled.div`
  text-align: center;
  margin-top: 12px;
  height: 32px;
  line-height: 32px;
`;

class CandidateList extends React.PureComponent {
  static defaultProps = {
    candidate: [],
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
    const { intl, changeCandidateStatus, onItemClick } = this.props;
    return item === 'header' ? (
      <CandidateCardItemTitle intl={intl} key={item} />
    ) : (
      <CandidateCardItem
        key={item._id}
        intl={intl}
        item={item}
        onClick={() => onItemClick(item)}
        changeCandidateStatus={changeCandidateStatus}
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
    const { candidates, header, gutter } = this.props;
    return (
      <div style={{ background: '#fff', padding: '10px' }}>
        <List
          grid={{ gutter: gutter || 16, sm: 1, md: 1 }}
          dataSource={header ? ['header', ...candidates] : candidates}
          renderItem={this._renderItem}
          footer={this._renderFooter()}
        />
      </div>
    );
  }
}

export default CandidateList;
