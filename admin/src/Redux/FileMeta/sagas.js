import React from 'react';
import { FormattedMessage } from 'react-intl';
import { all, takeLatest, call, put, takeEvery } from 'redux-saga/effects';
import { toast } from '../../Lib/Toast';
import {
  startSubmit,
  stopSubmit,
  setSubmitFailed,
  setSubmitSucceeded
} from 'redux-form';
import { FileMetaActions, FileMetaTypes } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import { handleResponse } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import { getErrorFromResponse } from '../utils/saga';
import { LoadingActions } from '../Loading/actions';
import ResourceActions from '../Resources/actions';
import Form from '../../Constants/Form';

export function* createFileMeta(api, { fileMeta, files }) {
  const toastId = toast.info('Uploading...0%', { autoClose: false });
  const onUploadProgress = ({ loaded, total }) => {
    const progress = (loaded / total) * 100;
    toast.update(toastId, {
      render: `Uploading...${progress.toFixed(2)}%`
    });
  };
  yield put(startSubmit(Form.FILE_CREATE));
  const response = yield call(
    api.createFileMeta,
    fileMeta,
    files,
    onUploadProgress
  );
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="upload_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    const { entities } = yield normalize([data], [Schemas.fileMetaSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(setSubmitSucceeded(Form.FILE_CREATE));
    yield put(stopSubmit(Form.FILE_CREATE));
  }

  function* onFailed(data) {
    toast.update(toastId, {
      render: `Upload failed ${JSON.stringify(data)}`,
      type: toast.TYPE.ERROR,
      autoClose: 3000
    });
    yield put(setSubmitFailed(Form.FILE_CREATE));
    yield put(
      stopSubmit(
        Form.FILE_CREATE,
        getErrorFromResponse(Form.FILE_CREATE, response)
      )
    );
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateFileMeta(api, { fileMeta, files }) {
  const toastId = toast.info('Uploading...0%', { autoClose: false });
  const onUploadProgress = ({ loaded, total }) => {
    const progress = (loaded / total) * 100;
    toast.update(toastId, {
      render: `Uploading...${progress.toFixed(2)}%`
    });
  };
  yield put(startSubmit(Form.FILE_UPDATE));
  const response = yield call(
    api.updateFileMeta,
    fileMeta,
    files,
    onUploadProgress
  );
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="upload_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    const { entities } = yield normalize([data], [Schemas.fileMetaSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(setSubmitSucceeded(Form.FILE_UPDATE));
    yield put(stopSubmit(Form.FILE_UPDATE));
  }

  function* onFailed(data) {
    toast.update(toastId, {
      render: `Upload failed ${JSON.stringify(data)}`,
      type: toast.TYPE.ERROR,
      autoClose: 3000
    });
    yield put(setSubmitFailed(Form.FILE_UPDATE));
    yield put(
      stopSubmit(
        Form.FILE_UPDATE,
        getErrorFromResponse(Form.FILE_UPDATE, response)
      )
    );
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getFileMetaById(api, { id }) {
  const response = yield call(api.getFileMetaById, id);
  function* onSuccess(data) {
    if (!data) return;
    const { entities } = yield normalize(data, Schemas.fileMetaSchema);
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetFileMetasErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getFileMetas(api, { query }) {
  yield put(LoadingActions.setLoading('getFileMetas', true));
  const response = yield call(api.getFileMetas, query);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.fileMetaSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    yield put(FileMetaActions.setResults(result));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetFileMetasErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield put(LoadingActions.setLoading('getFileMetas', false));
}

export function* deleteFileMeta(api, { id }) {
  const response = yield call(api.deleteFileMeta, id);
  function* onSuccess(data) {
    yield put(FileMetaActions.setDeleted(id));
    yield put(FileMetaActions.getFileMetas());
  }

  function* onFailed(data) {
    yield put(ErrorActions.setDeleteFileMetaErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getAllSvgFileMeta(api) {
  const response = yield call(api.getFileMetas, { fileExtension: '.svg' });
  function* onSuccess(data) {
    const { entities } = yield normalize(data, [Schemas.fileMetaSchema]);
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetFileMetasErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* findFileMetas(api, { opts = { query: {} } }) {
  const response = yield call(api.findFileMetas, { ...opts.query });
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.fileMetaSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    yield put(FileMetaActions.setResults(result));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetFileMetasErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(FileMetaTypes.GET_FILE_METAS, getFileMetas, api),
    takeLatest(FileMetaTypes.CREATE_FILE_META, createFileMeta, api),
    takeLatest(FileMetaTypes.UPDATE_FILE_META, updateFileMeta, api),
    takeEvery(FileMetaTypes.GET_FILE_META_BY_ID, getFileMetaById, api),
    takeLatest(FileMetaTypes.DELETE_FILE_META, deleteFileMeta, api),
    takeLatest(FileMetaTypes.GET_ALL_SVG_FILE_META, getAllSvgFileMeta, api),
    takeLatest(FileMetaTypes.FIND_FILE_METAS, findFileMetas, api)
  ]);
}
