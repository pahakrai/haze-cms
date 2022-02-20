import { all, put, takeLatest, call, select } from 'redux-saga/effects';

import { UnitOfMeasureTypes, UnitOfMeasureActions } from './actions';
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

export let getUnitOfMeasures = handlePaginate('unitOfMeasures', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    return yield call(
      api.getUnitOfMeasures,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-createdAt',
        ...opts.query
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.unitOfMeasureSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(UnitOfMeasureActions.mergeResults(result));
    } else {
      yield put(UnitOfMeasureActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetUnitOfMeasuresErrors(data));
    yield put(UnitOfMeasureActions.setResults([]));
  }
});

export function* getAllUnitOfMeasure(api, { query }) {
  const response = yield call(api.getUnitOfMeasures, query);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.unitOfMeasureSchema
    ]);
    yield put(UnitOfMeasureActions.setAllResults(result));
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetUnitOfMeasuresErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}
export function* getUnitOfMeasureById(api, { id }) {
  const response = yield call(api.getUnitOfMeasureById, id);
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.unitOfMeasureSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetUnitOfMeasuresErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createUnitOfMeasure(api, { formValues }) {
  const formName = Form.UNIT_OF_MEASURE_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createUnitOfMeasure, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.unitOfMeasureSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(UnitOfMeasureActions.setSelected(data._id));

    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateUnitOfMeasure(api, { formValues }) {
  const formName = Form.UNIT_OF_MEASURE_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateUnitOfMeasure, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.unitOfMeasureSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(UnitOfMeasureTypes.GET_UNIT_OF_MEASURES, getUnitOfMeasures, api),
    takeLatest(
      UnitOfMeasureTypes.GET_ALL_UNIT_OF_MEASURE,
      getAllUnitOfMeasure,
      api
    ),
    takeLatest(
      UnitOfMeasureTypes.GET_UNIT_OF_MEASURE_BY_ID,
      getUnitOfMeasureById,
      api
    ),
    takeLatest(
      UnitOfMeasureTypes.UPDATE_UNIT_OF_MEASURE,
      updateUnitOfMeasure,
      api
    ),
    takeLatest(
      UnitOfMeasureTypes.CREATE_UNIT_OF_MEASURE,
      createUnitOfMeasure,
      api
    )
  ]);
}
