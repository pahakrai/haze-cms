import { all, takeEvery, call, put, takeLatest } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import { ErrorActions } from '../Error/actions';
import { handlePaginate, handleResponse } from '../utils/saga';
import { entities as Schemas } from '../../Services/Schemas';

import ResourceActions from '../Resources/actions';
import { PostCommentActions, PostCommentTypes } from './actions';

export const getCommentsByPostId = handlePaginate('postComments', {
  call: function* (postCommentService, action, paginate) {
    const { offset, limit } = paginate;
    const { postId } = action;
    return yield call(postCommentService.getCommentsByPostId, postId, {
      offset,
      limit,
      localize: true,
      sort: '-createdAt'
    });
  },
  onSuccess: function* (data, paginate, action) {
    const { entities, result } = yield normalize(data, [
      Schemas.postCommentSchema
    ]);
    // store in resources
    yield put(ResourceActions.addEntities(entities));

    // if append, add to results array, else replace results array
    if (paginate.append) {
      yield put(PostCommentActions.mergeResultIds(result));
    } else {
      yield put(PostCommentActions.setResultIds(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetPostCommentsErrors(data));
  }
});

export function* deleteComment(postCommentService, { id }) {
  const response = yield call(postCommentService.deleteComment, id);
  function* onSuccess(data) {
    yield put(PostCommentActions.deleteResultId(id));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setDeleteCommentErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* findByPost(postCommentService, { id }) {
  const response = yield call(postCommentService.findByPost, id);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data.docs, [
      Schemas.postCommentSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    yield put(PostCommentActions.setResultIds(result));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setDeleteCommentErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(postCommentService, UserService) {
  yield all([
    takeEvery(
      PostCommentTypes.GET_COMMENTS_BY_POST_ID,
      getCommentsByPostId,
      postCommentService
    ),
    takeEvery(
      PostCommentTypes.DELETE_COMMENT,
      deleteComment,
      postCommentService
    ),
    takeLatest(PostCommentTypes.FIND_BY_POST, findByPost, postCommentService)
  ]);
}
