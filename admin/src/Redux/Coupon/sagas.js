// import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import {
  all,
  takeLatest,
  call,
  put,
  select,
  takeLeading
} from 'redux-saga/effects';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { hasIn } from 'lodash';
import { CouponActions, CouponTypes } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';

// import { toast } from '../../Lib/Toast';
import { handleResponse, handlePaginate } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import { LoadingActions } from '../Loading/actions';

import { getErrorFromResponse } from '../utils/saga';
import Form from '../../Constants/Form';
import { appendQueryWorkspace } from '../utils';

export let getCoupons = handlePaginate('coupons', {
  call: function* (api, { opts = { query: {}, page: 1 } }, paginate) {
    let { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    const query = appendQueryWorkspace(state, {
      offset,
      limit,
      paginate: true,
      sort: '-createdAt',
      ...opts.query,
      populates: [
        'workspace',
        'images',
        '$criteria.products',
        ...(opts.query.populates || [])
      ]
    });
    const result = yield call(api.getCoupons, query);
    return result;
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [Schemas.couponSchema]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(CouponActions.mergeResults(result));
    } else {
      yield put(CouponActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetCouponsErrors(data));
  }
});

export function* createCoupon(api, { couponForm, files }) {
  const formName = Form.COUPON_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createCoupon, couponForm, files);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.couponSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(ResourceActions.setSelected(data._id));
    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getCouponById(api, { id, query }) {
  const response = yield call(api.getCouponById, id, {
    ...query,
    populates: ['$criteria.products']
  });
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.couponSchema);
    yield put(ResourceActions.addEntities(entities));
    yield put(CouponActions.setEditForm(data));
    yield put(CouponActions.setSelected(data._id));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetCouponErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateCoupon(api, { couponForm, files }) {
  const formName = Form.COUPON_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(
    api.updateCoupon,
    couponForm._id,
    couponForm,
    files
  );
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

export function* initSearchCoupons(api, { query }) {
  yield put(LoadingActions.setLoading('searchCoupons', true));
  const state = yield select(state => state);
  const response = yield call(
    api.getCoupons,
    appendQueryWorkspace(state, {
      offset: 0,
      limit: query.limit || 5,
      paginate: true,
      sort: '-createdAt'
    })
  );
  function* onSuccess(data) {
    data = hasIn(data, 'docs') ? data.docs : [];
    const { entities, result } = yield normalize(data, [Schemas.couponSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(CouponActions.setSearchResults(result));
    yield put(CouponActions.mergeAllResults(result));
    yield put(LoadingActions.setLoading('searchCoupons', false));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setSearchCouponsErrors(data));
    yield put(LoadingActions.setLoading('searchCoupons', false));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* searchCoupons(api, { q }) {
  yield put(LoadingActions.setLoading('searchCoupons', true));
  const state = yield select(state => state);
  const response = yield call(
    api.getCoupons,
    appendQueryWorkspace(state, { title: q })
  );
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [Schemas.couponSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(CouponActions.setSearchResults(result));
    yield put(CouponActions.mergeAllResults(result));
    yield put(LoadingActions.setLoading('searchCoupons', false));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setSearchCouponsErrors(data));
    yield put(LoadingActions.setLoading('searchCoupons', false));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLeading(CouponTypes.GET_COUPONS, getCoupons, api),
    takeLatest(CouponTypes.CREATE_COUPON, createCoupon, api),
    takeLatest(CouponTypes.UPDATE_COUPON, updateCoupon, api),
    takeLatest(CouponTypes.GET_COUPON_BY_ID, getCouponById, api),
    takeLeading(CouponTypes.INIT_SEARCH_COUPONS, initSearchCoupons, api),
    takeLatest(CouponTypes.SEARCH_COUPONS, searchCoupons, api)
  ]);
}
