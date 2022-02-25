import React from 'react'
import styled from 'styled-components'
import { List, Button } from 'antd'
import PostCardItem from './PostCardItem'

const ListFooterWarp = styled.div`
  text-align: center;
  margin-top: 12px;
  height: 32px;
  line-height: 32px;
`

class PostList extends React.PureComponent {
  static defaultProps = {
    posts: [],
    isNextPageLoading: false,
    isEnd: true,
    onItemClick: () => true,
    onLoadMore: () => true
  }

  _renderItem = (post) => {
    const { onItemClick, intl } = this.props
    return (
      <List.Item>
        <PostCardItem
          intl={intl}
          post={post}
          onClick={() => onItemClick(post)}
        />
      </List.Item>
    )
  }

  _renderFooter = () => {
    const { isEnd, isNextPageLoading, onLoadMore, intl } = this.props
    return (
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
    )
  }

  render() {
    const { posts } = this.props
    return (
      <List
        grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4 }}
        dataSource={posts}
        renderItem={this._renderItem}
        footer={this._renderFooter()}
      />
    )
  }
}

export default PostList
