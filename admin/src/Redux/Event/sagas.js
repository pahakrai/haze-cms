import React from 'react';
import { all, put, takeLatest, call, select } from 'redux-saga/effects';

import { EventTypes, EventActions } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { FormattedMessage } from 'react-intl';

import { toast } from '../../Lib/Toast';
import { normalize } from 'normalizr';
import { handleResponse } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import { LoadingActions } from '../Loading/actions';
import Form from '../../Constants/Form';
import { getErrorFromResponse, handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';

export let getEvents = handlePaginate('events', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    const query = opts && opts.query ? opts.query : {};
    return yield call(
      api.getEvents,
      (state,
      {
        offset,
        limit,
        paginate: true,
        sort: '-createdAt',
        ...opts.query,
        populates: [
          'product',
          'productSKU',
          '$peopleInCharge.user',
          ...(query.populates || [])
        ]
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [Schemas.eventSchema]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(EventActions.mergeResults(result));
    } else {
      yield put(EventActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetEventsErrors(data));
    yield put(EventActions.setResults([]));
  }
});

export function* getEventById(api, { id }) {
  yield put(LoadingActions.setLoading('getEventById', true));
  yield put(ResourceActions.removeEvent(id));
  const response = yield call(api.getEventById, id, {
    populates: ['$peopleInCharge.user']
  });
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.eventSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetEventsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield put(LoadingActions.setLoading('getEventById', false));
}

export function* createEvent(api, { formValues }) {
  const formName = Form.EVENT_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createEvent, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.eventSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(EventActions.setSelected(data._id));

    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateEvent(api, { formValues }) {
  const formName = Form.EVENT_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateEvent, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.eventSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export let getMyEvents = handlePaginate('events', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    return yield call(
      api.getMyEvents,
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
    const { entities, result } = yield normalize(data, [Schemas.eventSchema]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(EventActions.mergeResults(result));
    } else {
      yield put(EventActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetEventsErrors(data));
    yield put(EventActions.setResults([]));
  }
});

export function* getAllEvent(api, { opts = { query: {}, refresh: true } }) {
  yield put(LoadingActions.setLoading('getAllEvent', true));
  const state = yield select(state => state);
  const response = yield call(
    api.getEvents,
    appendQueryWorkspace(state, {
      ...opts.query
    })
  );
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [Schemas.eventSchema]);
    yield put(EventActions.setAllResults(result));
    yield put(ResourceActions.addEntities(entities));
    yield put(LoadingActions.setLoading('getAllEvent', false));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetEventsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield put(LoadingActions.setLoading('getAllEvent', false));
}

export function* getCompleteEvent(
  api,
  { opts = { completeQuery: {}, refresh: true } }
) {
  const state = yield select(state => state);
  const response = yield call(
    api.getEvents,
    appendQueryWorkspace(state, {
      ...opts.completeQuery
    })
  );
  function* onSuccess(data) {
    yield put(EventActions.setCompleteResults(data));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetEventsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield put(LoadingActions.setLoading('getCompleteEvent', false));
}

export function* updateRemarks(api, { id, formValues }) {
  const response = yield call(api.updateRemarks, id, formValues);
  function* onSuccess(data) {
    toast.success(<FormattedMessage id="updated_successfully" />);
    yield put(EventActions.getEventById(id));
  }
  function onFailed(data) {
    toast.error(<FormattedMessage id="updated_failure" />);
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(EventTypes.GET_EVENTS, getEvents, api),
    takeLatest(EventTypes.GET_EVENT_BY_ID, getEventById, api),
    takeLatest(EventTypes.UPDATE_EVENT, updateEvent, api),
    takeLatest(EventTypes.CREATE_EVENT, createEvent, api),
    takeLatest(EventTypes.GET_MY_EVENTS, getMyEvents, api),
    takeLatest(EventTypes.GET_ALL_EVENT, getAllEvent, api),
    takeLatest(EventTypes.GET_COMPLETE_EVENT, getCompleteEvent, api),
    takeLatest(EventTypes.UPDATE_REMARKS, updateRemarks, api)
  ]);
}
