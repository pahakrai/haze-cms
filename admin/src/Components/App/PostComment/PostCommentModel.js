import React from 'react';
import Modal from '../../Modal';
import Button from '../../Common/Button';
import PostCommentList from './PostCommentList';
import styled from 'styled-components';

const DivWarp = styled.div`
  height: 500px;
  @media (max-width: 788px) {
    height: 200px;
  }
`;
export default class CommentModel extends React.PureComponent {
  render() {
    const { postId, intl, postCommentCount, ...props } = this.props;
    return (
      <Modal.Button
        text={intl.formatMessage({ id: 'display_comment' })}
        title={intl.formatMessage({ id: 'display_comment' })}
        button={openModal => (
          <Button type="button" onClick={openModal}>
            {intl.formatMessage({ id: 'display_comment' }) +
              ' ' +
              postCommentCount}
          </Button>
        )}
        content={closeModal => (
          <DivWarp>
            <PostCommentList intl={intl} postId={postId} {...props} />
          </DivWarp>
        )}
      />
    );
  }
}
