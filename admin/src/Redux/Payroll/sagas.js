import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed
} from 'redux-form';
import { normalize } from 'normalizr';

import { toast } from '../../Lib/Toast';
import { entities as Schemas } from '../../Services/Schemas';
import { handleResponse, handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';
import { ErrorActions } from '../Error/actions';
import { LoadingActions } from '../Loading/actions';
import ResourceActions from '../Resources/actions';
import { getErrorFromResponse } from '../utils/saga';
import Form from '../../Constants/Form';

import { PayrollActions, PayrollTypes } from './actions';

export let getPayrolls = handlePaginate('payrolls', {
  call: function* (api, { opts = { filterValues: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const query = opts && opts.query ? opts.query : {};
    const state = yield select(state => state);
    if (query.q === null) query.q = '';
    if (query.dateFr === '') query.dateFr = undefined;
    if (query.dateTo === '') query.dateTo = undefined;
    return yield call(
      api.getPayroll,
      appendQueryWorkspace(state, {
        offset,
        limit,
        localize: true,
        paginate: true,
        sort: '-createdAt',
        ...query,
        page: query.page || 1,
        populates: [
          'payee',
          '$details.event.eventCampaign',
          '$details.event.eventCampaign.product',
          ...(query.populates || [])
        ]
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [Schemas.payrollSchema]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(PayrollActions.mergeResults(result));
    } else {
      yield put(PayrollActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.getErrorFromResponse(data));
  }
});

export function* getPayrollById(api, { id }) {
  const response = yield call(api.getPayrollById, id, {
    populates: [
      '$details.event.eventCampaign',
      '$details.event.eventCampaign.product'
    ]
  });
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.payrollSchema);
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.getErrorFromResponse(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getPayeeUserType(api, { id }) {
  const response = yield call(api.getPayeeUserType);
  function* onSuccess(data) {
    // NOTE: set payee user type here
    yield put(PayrollActions.setPayeeUserType(data));
  }

  function* onFailed(data) {
    yield put(ErrorActions.getErrorFromResponse(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* approvePayroll(api, { id, status }) {
  yield put(LoadingActions.setLoading('approvePayroll', true));
  const response = yield call(api.approvePayroll, id, status);
  function* onSuccess(data) {
    yield put(
      PayrollActions.getPayrollById(id, {
        populates: ['payee']
      })
    );
    yield put(LoadingActions.setLoading('approvePayroll', false));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetExpensesErrors(data));
    yield put(LoadingActions.setLoading('approvePayroll', false));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updatePayrollById(api, { formValues }) {
  const { id, value } = formValues;
  const toastId = toast.info(
    <span>
      <FormattedMessage id="uploading" />
      ...0%
    </span>,
    { autoClose: false }
  );
  yield put(startSubmit(Form.PAYROLL_UPDATE));
  const state = yield select(state => state);
  const response = yield call(
    api.updatePayrollById,
    appendQueryWorkspace(state, { id, value })
  );
  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="updated_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(Form.PAYROLL_UPDATE));
    yield put(ResourceActions.updatePost(data));
    yield put(stopSubmit(Form.PAYROLL_UPDATE));
  }

  function* onFailed(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="updated_failure" />,
      type: toast.TYPE.ERROR,
      autoClose: 3000
    });
    yield put(setSubmitFailed(Form.PAYROLL_UPDATE));
    yield put(stopSubmit(Form.POST, getErrorFromResponse(Form.POST, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createPayroll(api, { formValues }) {
  const toastId = toast.info(
    <span>
      <FormattedMessage id="uploading" />
      ...0%
    </span>,
    { autoClose: false }
  );
  const onUploadProgress = ({ loaded, total }) => {
    const progress = (loaded / total) * 100;
    toast.update(toastId, {
      render: (
        <span>
          <FormattedMessage id="uploading" />
          ...{progress.toFixed(2)}%
        </span>
      )
    });
  };
  yield put(startSubmit(Form.PAYROLL_CREATE));
  const state = yield select(state => state);
  const response = yield call(
    api.createPayroll,
    appendQueryWorkspace(state, { ...formValues }),
    onUploadProgress
  );

  function* onSuccess(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="create_payroll_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
    yield put(setSubmitSucceeded(Form.PAYROLL_CREATE));
    const { entities } = yield normalize([data], [Schemas.payrollSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(stopSubmit(Form.PAYROLL_CREATE));
  }
  function* onFailed(data) {
    toast.update(toastId, {
      render: <FormattedMessage id="created_failure" />,
      type: toast.TYPE.ERROR,
      autoClose: 3000
    });
    yield put(setSubmitFailed(Form.PAYROLL_CREATE));
    yield put(
      stopSubmit(Form.PAYROLL_CREATE, getErrorFromResponse(null, data))
    );
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

export function* changePayrollStatus(api, { formValues }) {
  const response = yield call(
    api.changeStatus,
    formValues.id,
    formValues.status
  );
  function* onSuccess(data) {
    yield put(
      PayrollActions.getPayrollById(formValues.id, {
        populates: ['payee']
      })
    );
    toast.success('Change status Successfully');
  }
  function onFailed(data, response) {
    toast.error(`Change status failed with error status `);
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* calculateAmount(api, { formValues }) {
  yield put(LoadingActions.setLoading('calculateAmount', true));
  const response = yield call(api.calculateAmount, { ...formValues });

  function* onSuccess(data) {
    yield put(PayrollActions.setSummary(data));
    yield put(LoadingActions.setLoading('calculateAmount', false));
  }
  function* onFailed(data) {
    yield put(setSubmitFailed(Form.PAYROLL_CREATE));
    yield put(
      stopSubmit(Form.PAYROLL_CREATE, getErrorFromResponse(null, data))
    );
    yield put(LoadingActions.setLoading('calculateAmount', false));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(PayrollTypes.GET_PAYEE_USER_TYPE, getPayeeUserType, api)
  ]);
  yield all([takeLatest(PayrollTypes.GET_PAYROLLS, getPayrolls, api)]);
  yield all([takeLatest(PayrollTypes.GET_PAYROLL_BY_ID, getPayrollById, api)]);
  yield all([takeLatest(PayrollTypes.CREATE_PAYROLL, createPayroll, api)]);
  yield all([
    takeLatest(PayrollTypes.UPDATE_PAYROLL_BY_ID, updatePayrollById, api)
  ]);
  yield all([
    takeLatest(PayrollTypes.CHANGE_PAYROLL_STATUS, changePayrollStatus, api)
  ]);
  yield all([takeLatest(PayrollTypes.APPROVE_PAYROLL, approvePayroll, api)]);
  yield all([takeLatest(PayrollTypes.CALCULATE_AMOUNT, calculateAmount, api)]);
}
