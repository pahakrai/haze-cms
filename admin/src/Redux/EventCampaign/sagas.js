import {
  all,
  put,
  takeLatest,
  call,
  select,
  takeLeading
} from 'redux-saga/effects';
import { toast } from '../../Lib/Toast';
import { EventCampaignTypes, EventCampaignActions } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { normalize } from 'normalizr';
import { handleResponse } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import { LoadingActions } from '../Loading/actions';
import Form from '../../Constants/Form';
import { getErrorFromResponse, handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';

export let getEventCampaigns = handlePaginate('eventCampaigns', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    const query = opts && opts.query ? opts.query : {};
    return yield call(
      api.getEventCampaigns,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-createdAt',
        ...query,
        page: query.page || 1,
        populates: [
          'product',
          'productSKU.$specs.spec',
          ...(query.populates || [])
        ]
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.eventCampaignSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(EventCampaignActions.mergeResults(result));
    } else {
      yield put(EventCampaignActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetEventCampaignsErrors(data));
    yield put(EventCampaignActions.setResults([]));
  }
});

export let getEventCampaignProgress = handlePaginate('eventCampaigns', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    const query = opts && opts.query ? opts.query : {};
    return yield call(
      api.getEventCampaignProgress,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-createdAt',
        ...query,
        page: query.page || 1,
        populates: [
          'product',
          'productSKU.$specs.spec',
          ...(query.populates || [])
        ]
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.eventCampaignSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(EventCampaignActions.mergeResults(result));
    } else {
      yield put(EventCampaignActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetEventCampaignsErrors(data));
    yield put(EventCampaignActions.setResults([]));
  }
});

export function* getEventCampaignById(api, { id, opts = {} }) {
  yield put(LoadingActions.setLoading('getEventCampaignById', true));
  const response = yield call(api.getEventCampaignById, id, {
    populates: ['events', 'product', 'productSKU.$specs.spec'],
    ...opts
  });
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.eventCampaignSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetEventCampaignsErrors(data));
  }
  yield put(LoadingActions.setLoading('getEventCampaignById', false));
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createEventCampaign(api, { formValues }) {
  yield put(EventCampaignActions.setSelected(''));
  const formName = Form.EVENT_CAMPAIGN_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createEventCampaign, formValues);
  function* onSuccess(data) {
    yield put(EventCampaignActions.setSelected(data._id));
    yield put(setSubmitSucceeded(formName));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateEventCampaign(api, { formValues }) {
  const formName = Form.EVENT_CAMPAIGN_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateEventCampaign, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateProgressEventCampaign(api, { id, formValues }) {
  const response = yield call(api.updateProgressEventCampaign, id, formValues);
  function* onSuccess(data) {
    toast.success(<FormattedMessage id="updated_successfully" />);
    yield put(EventCampaignActions.getEventCampaignProgress());
  }
  function onFailed(data) {
    toast.error(<FormattedMessage id="updated_failure" />);
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* searchEventCampaigns(api, { q, opts = {} }) {
  yield put(LoadingActions.setLoading('searchEventCampaigns', true));
  const response = yield call(api.searchEventCampaigns, {
    q,
    query: { ...opts, offset: 0, limit: 10, paginate: true }
  });
  function* onSuccess(reqResult) {
    const data = (reqResult && reqResult.docs) || [];
    const { entities, result } = yield normalize(data, [
      Schemas.eventCampaignSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    yield put(EventCampaignActions.setSearchResults(result));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setSearchEventCampaignsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield put(LoadingActions.setLoading('searchEventCampaigns', false));
}
export function* getEventCampaignsNotOrdered(api, { q, opts = {} }) {
  yield put(LoadingActions.setLoading('getEventCampaignsNotOrdered', true));
  const response = yield call(api.getEventCampaignsNotOrdered, {
    q,
    query: { ...opts, offset: 0, limit: 10, paginate: true }
  });
  function* onSuccess(reqResult) {
    const data = (reqResult && reqResult.docs) || [];
    const { entities, result } = yield normalize(data, [
      Schemas.eventCampaignSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    yield put(EventCampaignActions.setNotOrderedResults(result));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setSearchEventCampaignsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
  yield put(LoadingActions.setLoading('getEventCampaignsNotOrdered', false));
}

export default function* roots(api) {
  yield all([
    takeLatest(EventCampaignTypes.GET_EVENT_CAMPAIGNS, getEventCampaigns, api),
    takeLatest(
      EventCampaignTypes.GET_EVENT_CAMPAIGN_BY_ID,
      getEventCampaignById,
      api
    ),
    takeLatest(
      EventCampaignTypes.UPDATE_EVENT_CAMPAIGN,
      updateEventCampaign,
      api
    ),
    takeLatest(
      EventCampaignTypes.CREATE_EVENT_CAMPAIGN,
      createEventCampaign,
      api
    ),
    takeLatest(
      EventCampaignTypes.SEARCH_EVENT_CAMPAIGNS,
      searchEventCampaigns,
      api
    ),
    takeLatest(
      EventCampaignTypes.GET_EVENT_CAMPAIGNS_NOT_ORDERED,
      getEventCampaignsNotOrdered,
      api
    ),
    takeLatest(
      EventCampaignTypes.GET_EVENT_CAMPAIGN_PROGRESS,
      getEventCampaignProgress,
      api
    ),
    takeLeading(
      EventCampaignTypes.UPDATE_PROGRESS_EVENT_CAMPAIGN,
      updateProgressEventCampaign,
      api
    )
  ]);
}
