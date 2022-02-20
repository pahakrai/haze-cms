import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Common from '@golpasal/common'
import Loading from '../../Components/Common/Loading'
import PostList from '../../Components/App/Post/PostList'
import { PostActions } from '../../Redux/Post/actions'
import AccountSelector from '../../Redux/Account/selectors'
import { getPosts /*, getPost */ } from '../../Redux/selectors'
import { withRouter } from 'react-router-dom'

class PostListContainer extends React.PureComponent {
  componentDidMount() {
    const { fetchPosts, currentUser } = this.props
    const query =
      currentUser.userType !== Common.type.UserType.PROVIDER
        ? { createdBy: currentUser._id }
        : {}
    fetchPosts && fetchPosts({ refresh: true, ...query })
  }

  filterPosts = (posts, searchTerm = '') => {
    if (!searchTerm) {
      return posts
    }
    const { intl } = this.props
    const sTerm = searchTerm.toLowerCase()
    return posts.filter((post) => {
      const { type, title, snippets } = post
      return [type, title[intl.locale], snippets[intl.locale]].some((v) =>
        v.toLowerCase().includes(sTerm)
      )
    })
  }

  _onLoadMore = () => {
    const { fetchPosts, currentUser } = this.props
    const query =
      currentUser.userType !== Common.type.UserType.PROVIDER
        ? { createdBy: currentUser._id }
        : {}
    fetchPosts && fetchPosts({ append: true, ...query })
  }

  render() {
    const { filterPosts } = this
    const {
      selectedId,
      setSelected,
      intl,
      searchTerm,
      posts,
      onItemClick,
      pagination: { fetching, isEnd }
    } = this.props
    const isLoading = false // dummy var
    // filter post with searchTerm
    const filteredPosts = filterPosts(posts, searchTerm)

    const combinationItemClick =
      onItemClick ||
      ((_id) => {
        setSelected(_id)
        const { history } = this.props
        history.push(`/posts/${_id}`)
      })

    return isLoading ? (
      <Loading />
    ) : (
      <PostList
        intl={intl}
        isNextPageLoading={fetching}
        isEnd={isEnd}
        onLoadMore={this._onLoadMore}
        className={'test'}
        posts={filteredPosts}
        selected={selectedId}
        onItemClick={(post) => combinationItemClick(post._id)}
        onDeleteClick={(post) => true}
      />
    )
  }
}
const mapStateToProps = (state) => ({
  currentUser: AccountSelector.getCurrentUser(state),
  posts: getPosts(state),
  pagination: state.pagination.posts,
  selectedId: state.post.selected,
  searchTerm: state.post.searchTerm
})
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setSelected: PostActions.setSelected,
      fetchPosts: PostActions.getPosts
    },
    dispatch
  )
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostListContainer)
)
