import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Core Utils
// import I18n from "~/I18n";
// Components and containers
import PostCardItem from '../../Components/App/Post/PostCardItem';

class _PostCardItem extends PureComponent {
  static propTypes = {
    postId: PropTypes.string
  };

  _prepareImageSource = post => {
    const hasImg =
      post && post.images && post.images.length && post.images[0].fileMeta;
    return hasImg ? post.images[0].fileMeta : null;
  };

  render() {
    const { post, ...props } = this.props;
    // image, description title
    return post ? (
      <PostCardItem
        image={this._prepareImageSource(post)}
        title={post.title_display && post.title_display.toUpperCase()}
        description={
          post.snippets_display && post.snippets_display.toUpperCase()
        }
        {...props}
      />
    ) : (
      <div />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  post: state.resources.posts[ownProps.postId]
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(_PostCardItem);
