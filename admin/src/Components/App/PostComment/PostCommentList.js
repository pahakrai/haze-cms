import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getPostComments } from '../../../Redux/selectors';
import { PostCommentActions } from '../../../Redux/PostComment/actions';

import Comments from '../Comment/Comments';

class PostCommentList extends React.PureComponent {
  componentDidMount() {
    const { getCommentsByPostId, postId, isUpdateForm } = this.props;
    isUpdateForm && getCommentsByPostId({ refresh: true }, postId);
  }

  _onEndReached = ({ previousPosition, currentPosition, event }) => {
    const { getCommentsByPostId, postId } = this.props;
    getCommentsByPostId({ append: true }, postId);
  };
  _onDeleteClick = comment => {
    const { deletePostCommenById } = this.props;
    deletePostCommenById(comment._id);
  };

  render() {
    const {
      comments,
      pagination: { isEnd, fetching }
    } = this.props;
    const { _onEndReached, _onDeleteClick } = this;

    return (
      <Comments
        comments={comments}
        isEnd={isEnd}
        fetching={fetching}
        onEndReached={_onEndReached}
        onDeleteClick={_onDeleteClick}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  comments: ownProps.isUpdateForm ? getPostComments(state) : [],
  pagination: state.pagination.postComments
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCommentsByPostId: PostCommentActions.getCommentsByPostId,
      deletePostCommenById: PostCommentActions.deleteComment
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(PostCommentList));
