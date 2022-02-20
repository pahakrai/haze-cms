import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import {
  handleResponse,
  getErrorFromResponse,
  handlePaginate
} from '../utils/saga';
import { entities as Schemas } from '../../Services/Schemas';
import { EdmTypes, EdmActions } from './actions';
import { appendQueryWorkspace } from '../utils';
// import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
// form
import { startSubmit, stopSubmit, setSubmitSucceeded, reset } from 'redux-form';
import Form from '../../Constants/Form';

// export function* getEmailTemplates(api, { query }) {
//   const response = yield call(api.getEmailTemplates, query);
//   function* onSuccess(data) {
//     if (data && Array.isArray(data) && data.length === 1) {
//       yield put(EmailActions.setEdmTemplates(data[0]));
//     } else {
//       yield put(EmailActions.setEdmTemplates(data));
//     }
//   }

//   function* onFailed(data) {
//     // no do
//     // yield put(ErrorActions.setGetTagsErrors(data));
//   }
//   yield handleResponse(response)(onSuccess, onFailed);
// }

export function* createEdm(api, { edm }) {
  yield put(startSubmit(Form.EDM_CREATE));
  const response = yield call(api.createEdm, edm);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.EDM_CREATE));
    yield put(stopSubmit(Form.EDM_CREATE));
    yield put(reset(Form.EDM_CREATE));
  }
  function* onFailed(data) {
    yield put(stopSubmit(Form.EDM_CREATE, getErrorFromResponse(null, data)));
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

// updateEdm
export function* updateEdm(api, { edm }) {
  yield put(startSubmit(Form.EDM_UPDATE));
  const response = yield call(api.updateEdm, edm);
  function* onSuccess(data) {
    const { entities } = yield normalize([data], [Schemas.edmSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(setSubmitSucceeded(Form.EDM_UPDATE));
    yield put(stopSubmit(Form.EDM_UPDATE));
    // yield put(reset(Form.EDM_UPDATE));
  }
  function* onFailed(data) {
    yield put(stopSubmit(Form.EDM_UPDATE, getErrorFromResponse(null, data)));
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

export function* sendEdms(api, { edm }) {
  yield put(startSubmit(Form.SEND_EMAIL));
  const response = yield call(api.sendEdms, edm);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.SEND_EMAIL));
    yield put(reset(Form.SEND_EMAIL));
  }
  function* onFailed(data) {
    yield put(stopSubmit(Form.SEND_EMAIL, getErrorFromResponse(null, data)));
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

// getAllEdms
export function* getAllEdms(api, { query }) {
  const response = yield call(api.getEdms, query);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [Schemas.edmSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(EdmActions.setResults(result));
  }
  function* onFailed(data) {
    // no do
    // yield put(stopSubmit(Form.EDM_CREATE, getErrorFromResponse(null, data)));
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

export const getEdms = handlePaginate('edms', {
  call: function* (api, action, paginate) {
    const { query = {} } = action.opts;
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    return yield call(api.getEdms, {
      ...appendQueryWorkspace(state, {
        offset,
        limit,
        sort: '-createdAt',
        localize: true,
        paginate: true,
        ...query
      })
    });
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [Schemas.edmSchema]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(EdmActions.mergeResults(result));
    } else {
      yield put(EdmActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    // yield put(ErrorActions.setGetCouponsErrors(data));
  }
});
export function* findEdmById(api, { id }) {
  const response = yield call(api.findEdmById, id);
  function* onSuccess(data) {
    const { entities } = yield normalize([data], [Schemas.edmSchema]);
    yield put(ResourceActions.addEntities(entities));
  }
  function* onFailed(data) {
    // no do
    // yield put(stopSubmit(Form.EDM_CREATE, getErrorFromResponse(null, data)));
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateEdmStatus(api, { _id, isActive }) {
  const response = yield call(api.updateEdmStatus, _id, isActive);
  function* onSuccess(data) {
    const { entities } = yield normalize([data], [Schemas.edmSchema]);
    yield put(ResourceActions.addEntities(entities));
  }
  function* onFailed(data) {
    // no do
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* delectEdm(api, { _id }) {
  const response = yield call(api.delectEdm, _id);
  function* onSuccess(data) {
    //  del id
    yield put(EdmActions.getEdms());
  }
  function* onFailed(data) {
    // no do
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(edmService) {
  yield all([
    takeLatest(EdmTypes.DELECT_EDM, delectEdm, edmService),
    takeLatest(EdmTypes.UPDATE_EDM_STATUS, updateEdmStatus, edmService),
    takeLatest(EdmTypes.UPDATE_EDM, updateEdm, edmService),
    takeLatest(EdmTypes.FIND_EDM_BY_ID, findEdmById, edmService),
    takeLatest(EdmTypes.SEND_EDMS, sendEdms, edmService),
    takeLatest(EdmTypes.CREATE_EDM, createEdm, edmService),
    takeLatest(EdmTypes.GET_ALL_EDMS, getAllEdms, edmService),
    takeLatest(EdmTypes.GET_EDMS, getEdms, edmService)
  ]);
}
