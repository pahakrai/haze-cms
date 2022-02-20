import { all, takeLatest, call, put, select } from 'redux-saga/effects';

import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { normalize } from 'normalizr';

import { entities as Schemas } from '../../Services/Schemas';
import { handleResponse, handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import { getErrorFromResponse } from '../utils/saga';
import Form from '../../Constants/Form';

import { SalesVolumeActions, SalesVolumeTypes } from './actions';
const formatIdWithoutData = (year, month) => {
  return `initialValues=${JSON.stringify({ year, month })}&&random=${
    Math.random() + ''
  }`;
};
export let getSalesVolumes = handlePaginate('salesVolumes', {
  call: function* (api, { opts = { filterValues: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const query = opts && opts.query ? opts.query : {};
    const state = yield select(state => state);
    return yield call(
      api.getSalesVolumes,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-createdAt',
        ...query,
        page: query.page || 1,
        populates: [...(query.populates || [])]
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.salesVolumeSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(SalesVolumeActions.mergeResults(result));
    } else {
      yield put(SalesVolumeActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.getErrorFromResponse(data));
  }
});

export function* getSalesVolumesByYear(api, { query = {} }) {
  const response = yield call(
    api.getSalesVolumesByYear,
    appendQueryWorkspace(yield select(state => state), query)
  );
  function* onSuccess(data) {
    const { entities, result } = yield normalize(
      data
        ? data.map(v => ({
            ...v,
            _id: v._id || formatIdWithoutData(v.year, v.month)
          }))
        : [],
      [Schemas.salesVolumeSchema]
    );
    yield put(ResourceActions.addEntities(entities));
    yield put(SalesVolumeActions.setAllResults(result));
  }

  function* onFailed(data) {
    yield put(ErrorActions.getErrorFromResponse(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export function* getSalesVolumesByMonth(api, { query = {} }) {
  const response = yield call(
    api.getSalesVolumesByMonth,
    appendQueryWorkspace(yield select(state => state), query)
  );
  function* onSuccess(data) {
    const { entities, result } = yield normalize(
      [
        {
          _id: formatIdWithoutData(query.year, query.month + 1),
          month: query.month + 1,
          year: query.year,
          ...data
        }
      ],
      [Schemas.salesVolumeSchema]
    );
    yield put(ResourceActions.addEntities(entities));
    yield put(SalesVolumeActions.setAllResults(result));
  }

  function* onFailed(data) {}
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getSalesVolumeById(api, { id, query }) {
  const response = yield call(api.getSalesVolumeById, id, { query });
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.salesVolumeSchema);
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.getErrorFromResponse(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateSalesVolume(api, { formValues }) {
  const formName = Form.SALES_VOLUME_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateSalesVolume, formValues);

  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    yield put(ResourceActions.updatePost(data));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(Form.POST, getErrorFromResponse(Form.POST, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createSalesVolume(api, { formValues }) {
  const formName = Form.SALES_VOLUME_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createSalesVolume, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.salesVolumeSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(formName));
  }
  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(null, data)));
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(SalesVolumeTypes.GET_SALES_VOLUMES, getSalesVolumes, api),
    takeLatest(
      SalesVolumeTypes.GET_SALES_VOLUMES_BY_YEAR,
      getSalesVolumesByYear,
      api
    ),
    takeLatest(
      SalesVolumeTypes.GET_SALES_VOLUMES_BY_MONTH,
      getSalesVolumesByMonth,
      api
    ),
    takeLatest(
      SalesVolumeTypes.GET_SALES_VOLUME_BY_ID,
      getSalesVolumeById,
      api
    ),
    takeLatest(SalesVolumeTypes.CREATE_SALES_VOLUME, createSalesVolume, api),
    takeLatest(SalesVolumeTypes.UPDATE_SALES_VOLUME, updateSalesVolume, api)
  ]);
}
