import React from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';

import Loading from '../../Common/Loading';
import Button from '../../Common/Button';
import P from '../../Common/P';

import Comment from './Comment';

const CommentsWrapper = styled.div`
  margin: 3.2rem 0;
`;

const HorizontallyWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const LoadMore = styled(Button.Primary)`
  padding-left: 70px;
  padding-right: 70px;
`;
const NoMore = styled(P)`
  margin-top: 1.6rem;
  text-align: center;
`;

class Comments extends React.PureComponent {
  render() {
    const {
      comments,
      intl,
      isEnd,
      fetching,
      onEndReached,
      onDeleteClick
    } = this.props;

    return (
      <CommentsWrapper>
        {comments.map((comment, commentIndex, _comments) => (
          <div key={comment._id}>
            <Comment
              key={comment._id}
              comment={comment}
              showSeparator={commentIndex < _comments.length - 1}
              onDeleteClick={onDeleteClick}
              intl={intl}
            />
          </div>
        ))}
        {!isEnd && (
          <HorizontallyWrap>
            <LoadMore onClick={onEndReached}>
              {intl.formatMessage({ id: 'load_more' })}
            </LoadMore>
          </HorizontallyWrap>
        )}
        {isEnd && <NoMore>{intl.formatMessage({ id: 'msg.no_more' })}</NoMore>}
        {fetching && <Loading />}
      </CommentsWrapper>
    );
  }
}

export default injectIntl(Comments);
