import { gql } from "@apollo/client";

export const QUERY_POSTS = (fields = POST_ITEM_FIELDS) => gql`
  query Posts($query:PostSearchQuery,$paginate:Paginate){
    posts(query:$query,paginate:$paginate){
      nodes{
        _id
        ${fields}
      }
      startCursor
      endCursor
      nodeCount
      total
      isEnd
    }
  }
`;
export const POST_ITEM_FIELDS = `
      _id
      type
      title
      postDate
      snippets
      likes{
          _id
      }
      images{
          _id,
          fileMeta{
              uri
          }
      }
      content
      priority
      isActive
      createdBy{
          _id
      }
      createDate
      likeCount
      commentCount
      tags
      platformTypes
      createdAt
      updatedAt
`;

export const POST_DETAIL_FIELDS = `
    _id
    type
    title
    postDate
    snippets
    likes{
        _id
    }
    images{
        _id,
        fileMeta{
            uri
        }
    }
    content
    priority
    isActive
    createdBy{
        _id
    }
    createDate
    likeCount
    commentCount
    tags
    platformTypes
    createdAt
    updatedAt
`;

export const QUERY_POST = (fields = POST_ITEM_FIELDS) => gql`
  query Post($id:String!){
    post(id:$id,){
        _id
        ${fields}
    }
  }
`;
export const POST_COMMENT_CREATE_FIELDS = `
    user{
      _id
      name
    }
    post{
      _id
    }
    comment
`;

export const POST_COMMENT_CREATE = (fields = POST_COMMENT_CREATE_FIELDS) => gql`
  mutation PostCommentCreate(
    $postCommentForm: PostCommentForm!
    ) {
      postCommentCreate(postCommentForm:$postCommentForm) {
      ${fields}
    }
  }
`;

export const POST_COMMENT_ITEM_FIELDS = `
    _id
    comment
    post{
      _id
    }
    user{
      _id
      name
    }
    createdAt
`;

export const QUERY_COMMENTS = (fields = POST_COMMENT_ITEM_FIELDS) => gql`
  query PostComments($postId:ID!,$paginate:Paginate){
    postComments(postId:$postId,paginate:$paginate){
      nodes{
        _id
        ${fields}
      }
      startCursor
      endCursor
      nodeCount
      total
      isEnd
    }
  }
`;
