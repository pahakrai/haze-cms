const {
  name: { uc, fu },
  type,
  action,
  schema,
  paginate,
  uploadFile
} = require('../../constant');

const e = (module.exports = {});

const create_update_saga = uploadFile
  ? `
export function* create${uc}(api, { formValues, files }) {
  const formName = Form.${fu}_CREATE;
  const toastId = toast.info('Uploading...0%', { autoClose: false });
  const onUploadProgress = ({ loaded, total }) => {
    const progress = (loaded / total) * 100;
    toast.update(toastId, {
      render: \`Uploading...$\{progress.toFixed(2)}%\`
    });
  };
  yield put(startSubmit(formName));
  const response = yield call(
    api.create${uc},
    formValues,
    files,
    onUploadProgress
  );
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="upload_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.${schema}]);
    yield put(ResourceActions.addEntities(entities));
    yield put(${action}.setSelected(data._id));

    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    toast.update(toastId, {
      render: \`Upload failed $\{JSON.stringify(data)}\`,
      type: toast.TYPE.ERROR,
      autoClose: 3000
    });
    yield put(setSubmitFailed(formName));
    yield put(
      stopSubmit(
        formName,
        getErrorFromResponse(formName, response)
      )
    );
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* update${uc}(api, { formValues, files }) {
  const formName = Form.${fu}_UPDATE;
  const toastId = toast.info('Uploading...0%', { autoClose: false });
  const onUploadProgress = ({ loaded, total }) => {
    const progress = (loaded / total) * 100;
    toast.update(toastId, {
      render: \`Uploading...$\{progress.toFixed(2)}%\`
    });
  };
  yield put(startSubmit(formName));
  const response = yield call(
    api.update${uc},
    formValues,
    files,
    onUploadProgress
  );
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="upload_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(formName));
    yield put(ResourceActions.update${uc}(data));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    toast.update(toastId, {
      render: \`Upload failed $\{JSON.stringify(data)}\`,
      type: toast.TYPE.ERROR,
      autoClose: 3000
    });
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}`
  : `
export function* create${uc}(api, { formValues }) {
  const formName = Form.${fu}_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.create${uc}, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.${schema}]);
    yield put(ResourceActions.addEntities(entities));
    yield put(${action}.setSelected(data._id));

    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(
      stopSubmit(
        formName,
        getErrorFromResponse(formName, response)
      )
    );
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* update${uc}(api, { formValues }) {
  const formName = Form.${fu}_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.update${uc}, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data],[Schemas.${schema}]);
    yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}`;

// ------------- content -------------

e.content = `
import { all, put, takeLatest, call, select } from 'redux-saga/effects';
${uploadFile ? `import { toast } from '../../Lib/Toast';` : ''}
import { ${type}, ${action} } from './actions';
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

export let get${uc}s = handlePaginate('${paginate}', {
  call: function*(api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    return yield call(
      api.get${uc}s,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-createdAt',
        ...opts.query
      })
    );
  },
  onSuccess: function*(data, paginate) {
    const { entities, result } = yield normalize(data, [Schemas.${schema}]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(${action}.mergeResults(result));
    } else {
      yield put(${action}.setResults(result));
    }
  },
  onFailed: function*(data) {
    yield put(ErrorActions.setGet${uc}sErrors(data));
    yield put(${action}.setResults([]));
  }
});

export function* get${uc}ById(api, { id }) {
  const response = yield call(api.get${uc}ById, id);
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.${schema}
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGet${uc}sErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
${create_update_saga}

export default function* roots(api) {
  yield all([
    takeLatest(${type}.GET_${fu}S, get${uc}s, api),
    takeLatest(${type}.GET_${fu}_BY_ID, get${uc}ById, api),
    takeLatest(${type}.UPDATE_${fu}, update${uc}, api),
    takeLatest(${type}.CREATE_${fu}, create${uc}, api)
  ]);
}
`.replace(/^\s/, '');
