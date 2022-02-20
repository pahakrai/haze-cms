import React from 'react';
import { all, put, takeLatest, call, select } from 'redux-saga/effects';
import { entities as Schemas } from '../../Services/Schemas';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { normalize } from 'normalizr';
import { FormattedMessage } from 'react-intl';
import { handleResponse, handlePaginate } from '../utils/saga';

import ResourceActions from '../Resources/actions';
import { ErrorActions } from '../Error/actions';
import Form from '../../Constants/Form';
import { toast } from '../../Lib/Toast';

import { getErrorFromResponse } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';
import { CustomerEnquiryTypes, CustomerEnquiryActions } from './actions';

export let getCustomerEnquiries = handlePaginate('customerEnquiries', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    const query = opts && opts.query ? opts.query : {};
    return yield call(
      api.getCustomerEnquiries,
      appendQueryWorkspace(state, {
        offset,
        limit,
        localize: true,
        paginate: true,
        sort: '-createdAt',
        ...query,
        page: query.page,
        populates: ['whoFollow', ...(query.populates || [])]
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.customerEnquirySchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(CustomerEnquiryActions.mergeResults(result));
    } else {
      yield put(CustomerEnquiryActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetCustomerEnquiriesErrors(data));
  }
});

export function* getCustomerEnquiryById(api, { id }) {
  const state = yield select(state => state);
  const response = yield call(
    api.getCustomerEnquiryById,
    id,
    appendQueryWorkspace(state, {
      populates: ['']
    })
  );
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.customerEnquirySchema);
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetCustomerEnquiriesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createCustomerEnquiry(api, { formValues }) {
  const toastId = toast.info(
    <span>
      <FormattedMessage id="uploading" />
      ...0%
    </span>,
    { autoClose: false }
  );
  yield put(startSubmit(Form.CUSTOMER_ENQUIRY_CREATE));
  const state = yield select(state => state);
  const response = yield call(
    api.createCustomerEnquiry,
    appendQueryWorkspace(state, { ...formValues })
  );
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="created_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    const { entities } = yield normalize(
      [data],
      [Schemas.customerEnquirySchema]
    );
    yield put(ResourceActions.addEntities(entities));
    yield put(CustomerEnquiryActions.setCreated(data._id));
    yield put(CustomerEnquiryActions.setSelected(data._id));
    yield put(setSubmitSucceeded(Form.CUSTOMER_ENQUIRY_CREATE));
    yield put(stopSubmit(Form.CUSTOMER_ENQUIRY_CREATE));
  }
  function* onFailed(data) {
    yield put(setSubmitFailed(Form.CUSTOMER_ENQUIRY_CREATE));
    yield put(
      stopSubmit(Form.CUSTOMER_ENQUIRY_CREATE, getErrorFromResponse(null, data))
    );
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateCustomerEnquiry(api, { id, formValues }) {
  const toastId = toast.info(
    <span>
      <FormattedMessage id="uploading" />
      ...0%
    </span>,
    { autoClose: false }
  );
  yield put(startSubmit(Form.CUSTOMER_ENQUIRY_UPDATE));
  const response = yield call(api.updateCustomerEnquiry, id, formValues);
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="updated_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(Form.CUSTOMER_ENQUIRY_UPDATE));
    // yield put(ResourceActions.updatePost(data));
    yield put(stopSubmit(Form.CUSTOMER_ENQUIRY_UPDATE));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(Form.CUSTOMER_ENQUIRY_UPDATE));
    yield put(stopSubmit(Form.POST, getErrorFromResponse(Form.POST, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateToFollow(api, { id }) {
  const response = yield call(api.updateToFollow, id);
  function* onSuccess(data) {
    toast.success(<FormattedMessage id="updated_successfully" />);
    const { entities } = yield normalize(
      [data],
      [Schemas.customerEnquirySchema]
    );
    yield put(ResourceActions.addEntities(entities));
    yield put(CustomerEnquiryActions.getCustomerEnquiries());
  }
  function onFailed(data, response) {
    toast.error(`Change status failed with error code ${response.status}`);
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(
      CustomerEnquiryTypes.GET_CUSTOMER_ENQUIRIES,
      getCustomerEnquiries,
      api
    )
  ]);
  yield all([
    takeLatest(
      CustomerEnquiryTypes.GET_CUSTOMER_ENQUIRY_BY_ID,
      getCustomerEnquiryById,
      api
    )
  ]);
  yield all([
    takeLatest(
      CustomerEnquiryTypes.CREATE_CUSTOMER_ENQUIRY,
      createCustomerEnquiry,
      api
    )
  ]);
  yield all([
    takeLatest(
      CustomerEnquiryTypes.UPDATE_CUSTOMER_ENQUIRY,
      updateCustomerEnquiry,
      api
    )
  ]);
  yield all([
    takeLatest(CustomerEnquiryTypes.UPDATE_TO_FOLLOW, updateToFollow, api)
  ]);
}
