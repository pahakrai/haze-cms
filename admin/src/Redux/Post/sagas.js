import React from 'react';
import { FormattedMessage } from 'react-intl';
import { all, put, takeLatest, call, select } from 'redux-saga/effects';
import { toast } from '../../Lib/Toast';
import { PostTypes, PostActions } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { normalize } from 'normalizr';
import { handleResponse } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import Form from '../../Constants/Form';
import { getErrorFromResponse, handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';

export function* createPost(api, { postForm, files, tags }) {
  const toastId = toast.info('Uploading...0%', { autoClose: false });
  const onUploadProgress = ({ loaded, total }) => {
    const progress = (loaded / total) * 100;
    toast.update(toastId, {
      render: `Uploading...${progress.toFixed(2)}%`
    });
  };
  yield put(startSubmit(Form.POST_CREATE));
  const response = yield call(
    api.createPost,
    postForm,
    files,
    onUploadProgress
  );
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="upload_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(Form.POST_CREATE));
    const { entities } = yield normalize([data], [Schemas.postSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(PostActions.setSelected(data._id));

    yield put(stopSubmit(Form.POST_CREATE));
  }

  function* onFailed(data) {
    toast.update(toastId, {
      render: `Upload failed ${JSON.stringify(data)}`,
      type: toast.TYPE.ERROR,
      autoClose: 3000
    });
    yield put(setSubmitFailed(Form.POST_CREATE));
    yield put(
      stopSubmit(
        Form.POST_CREATE,
        getErrorFromResponse(Form.POST_CREATE, response)
      )
    );
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* deletePost(api, { id }) {
  const response = yield call(api.deletePost, id);
  function* onSuccess(data) {
    yield put(PostActions.getPosts());
    yield put(PostActions.setDeleted(id));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setDeletePostErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* deleteFileMeta(api, { postId, fileMetaId }) {
  const response = yield call(api.deleteFileMeta, postId, fileMetaId);
  function* onSuccess(data) {
    toast.success('Delete file success');
    yield put(PostActions.getPostById(postId));
  }

  function* onFailed(data) {
    toast.error('Delete file failed with ' + data.message);
    yield put(ErrorActions.setDeletePostErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export let getPosts = handlePaginate('posts', {
  call: function* (api, { opts = { filterValues: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const query = opts && opts.query ? opts.query : {};
    if (query.q === null) query.q = '';
    const state = yield select(state => state);
    return yield call(
      api.getPosts,
      appendQueryWorkspace(state, {
        offset,
        limit,
        localize: true,
        paginate: true,
        sort: '-createdAt',
        ...query,
        page: query.page || 1
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [Schemas.postSchema]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(PostActions.mergeResults(result));
    } else {
      yield put(PostActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetPostsErrors(data));
  }
});

export function* getPostById(api, { id }) {
  const response = yield call(api.getPostById, id);
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.postSchema
    );

    yield put(ResourceActions.addEntities(entities));
    // yield put(CategoryActions.setResults(result));
    // yield put(PostActions.setEditForm(data));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetPostsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export function* updatePost(api, { postForm, files }) {
  const toastId = toast.info('Uploading...0%', { autoClose: false });
  const onUploadProgress = ({ loaded, total }) => {
    const progress = (loaded / total) * 100;
    toast.update(toastId, {
      render: `Uploading...${progress.toFixed(2)}%`
    });
  };
  yield put(startSubmit(Form.POST_UPDATE));
  const response = yield call(
    api.updatePost,
    postForm._id,
    postForm,
    files,
    onUploadProgress
  );
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="upload_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(Form.POST_UPDATE));
    yield put(ResourceActions.updatePost(data));
    yield put(stopSubmit(Form.POST_UPDATE));
  }

  function* onFailed(data) {
    toast.update(toastId, {
      render: `Upload failed ${JSON.stringify(data)}`,
      type: toast.TYPE.ERROR,
      autoClose: 3000
    });
    yield put(setSubmitFailed(Form.POST_UPDATE));
    yield put(stopSubmit(Form.POST, getErrorFromResponse(Form.POST, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(PostTypes.GET_POSTS, getPosts, api),
    takeLatest(PostTypes.UPDATE_POST, updatePost, api),
    takeLatest(PostTypes.CREATE_POST, createPost, api),
    takeLatest(PostTypes.GET_POST_BY_ID, getPostById, api),
    takeLatest(PostTypes.DELETE_FILE_META, deleteFileMeta, api)
  ]);
}
