import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Immutable from 'seamless-immutable';
import PostForm, {
  statuOptionsHash as PostStatuOptionsHash
} from '../../Components/App/Post/PostForm';
import Loading from '../../Components/Common/Loading';
import { isMultiLanguagePost } from '../../Lib/util';
import { PostActions } from '../../Redux/Post/actions';
import { TagActions } from '../../Redux/Tag/actions';
import { PostCommentActions } from '../../Redux/PostComment/actions';
import { getCommentByPost } from '../../Redux/PostComment/selectors';
import { getPostById, getTags } from '../../Redux/selectors';
import FormName from '../../Constants/Form';

const FORM_DEFAULT_VALUE = {
  images: [],
  content: { en: '', 'zh-cn': '', 'zh-hk': '' },
  snippets: { en: '', 'zh-cn': '', 'zh-hk': '' },
  title: { en: '', 'zh-cn': '', 'zh-hk': '' },
  isActive: PostStatuOptionsHash.ACTIVE,
  postDate: new Date()
};
class PostFormContainer extends React.PureComponent {
  static defaultProps = {
    onSubmitSuccess: () => true
  };

  componentDidMount() {
    const {
      fetchTags,
      fetchTagsByPostId,
      fetchPostById,
      postId,
      fetchPostCommentCount,
      updateMode
    } = this.props;
    if (updateMode) {
      fetchPostById(postId);
      fetchTagsByPostId(postId);
      fetchPostCommentCount(postId);
    }
    fetchTags();
  }

  componentDidUpdate(prevProps) {
    const { fetchTagsByPostId, fetchTags, postId } = prevProps;
    if (postId && postId !== this.props.postId) {
      fetchTags();
      fetchTagsByPostId(postId);
    }
  }

  onSubmit(post) {
    const newImages = [];
    const fileMetas = [];
    const { createPost, updatePost } = this.props;
    const sycnLocale = field => {
      if (!post[field] || !post[field]['zh-hk']) return;
      if (post[field] && post[field].asMutable)
        post[field] = post[field].asMutable({ deep: true });
      post[field]['en'] = post[field]['zh-hk'];
      post[field]['zh-cn'] = post[field]['zh-hk'];
    };
    const fn = post._id ? updatePost : createPost;
    // sycn content、snippets、title
    if (!isMultiLanguagePost) {
      sycnLocale('content');
      sycnLocale('snippets');
      sycnLocale('title');
    }
    // handle image
    post.images.forEach(image => {
      if (image.fileMeta) {
        if (typeof image.fileMeta === 'string') {
          fileMetas.push(image);
        } else {
          fileMetas.push({ fileMeta: image.fileMeta._id });
        }
      } else {
        newImages.push(image);
      }
    });
    fn && fn({ ...post, images: fileMetas }, newImages);
  }

  onSubmitSuccess() {
    const { onSubmitSuccess, history } = this.props;
    onSubmitSuccess();
    history.push('/posts');
  }

  onSubmitFail() {}

  render() {
    const key = this.props.post ? this.props.post._id : 'new';
    let isLoading = true; // dummy
    const {
      post,
      postId,
      tags,
      tagsByPostId,
      updateMode,
      locale,
      intl,
      postCommentCount,
      getTagsLoading,
      tagsByPostIdLoading
    } = this.props;

    if (
      (!updateMode || (post && updateMode && tagsByPostId)) &&
      tags &&
      !tagsByPostIdLoading &&
      !getTagsLoading
    ) {
      isLoading = false;
    }
    const { POST_CREATE, POST_UPDATE } = FormName;
    const defaultPost = post
      ? post.asMutable
        ? post.asMutable({ deep: true })
        : post
      : null;
    const defaultTags = (tagsByPostId && updateMode
      ? Immutable.asMutable(tagsByPostId, { deep: true })
      : []
    ).map(v => v.text);

    return isLoading ? (
      <Loading />
    ) : (
      <PostForm
        initialValues={defaultPost || FORM_DEFAULT_VALUE}
        intl={intl}
        locale={locale}
        key={key}
        postId={postId}
        tags={tags.map(v => v.text)}
        tagsDisplay={defaultTags}
        updateMode={updateMode}
        form={updateMode ? POST_UPDATE : POST_CREATE}
        fetchTagsByPostId={this.props.fetchTagsByPostId.bind(this)}
        onSubmit={this.onSubmit.bind(this)}
        onSubmitFail={this.onSubmitFail.bind(this)}
        onSubmitSuccess={this.onSubmitSuccess.bind(this)}
        postCommentCount={updateMode ? postCommentCount : 0}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  error: state.error.getPosts,
  locale: state.intl.locale,
  post: getPostById(state, ownProps.postId),
  postType: state.post.postType,
  tags: state.tag.distinctResults,
  getTagsLoading: state.loading.getDistinctTags,
  tagsByPostId: getTags(state, state.tag.resultsByPostId),
  tagsByPostIdLoading: state.loading.getTagsByPostId,
  updateMode: ownProps.postId !== undefined && ownProps.postId !== 'create',
  postCommentCount: getCommentByPost(state).length
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createPost: PostActions.createPost,
      deleteFileMeta: PostActions.deleteFileMeta,
      fetchPostById: PostActions.getPostById,
      fetchTags: TagActions.getDistinctTags,
      fetchTagsByPostId: TagActions.getTagsByPostId,
      getPostType: PostActions.getPostType,
      updatePost: PostActions.updatePost,
      fetchPostCommentCount: PostCommentActions.findByPost
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostFormContainer)
);
