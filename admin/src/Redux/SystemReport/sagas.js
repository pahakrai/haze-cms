import { all, put, takeLatest, call, select } from 'redux-saga/effects';

import { SystemReportTypes, SystemReportActions } from './actions';
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

export let getSystemReports = handlePaginate('systemReports', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    return yield call(
      api.getSystemReports,
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
      Schemas.systemReportSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(SystemReportActions.mergeResults(result));
    } else {
      yield put(SystemReportActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetSystemReportsErrors(data));
    yield put(SystemReportActions.setResults([]));
  }
});

export function* getReportsWorkspaceAllowToAccess(
  api,
  { opts = { query: {}, refresh: true } }
) {
  const response = yield call(api.getReportsWorkspaceAllowToAccess, {
    ...opts.query
  });
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.systemReportSchema
    ]);
    if (opts.refresh) {
      yield put(SystemReportActions.setAllResults(result));
    } else {
      yield put(SystemReportActions.mergeAllResults(result));
    }

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetSystemReportsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getSystemReportById(api, { id }) {
  const response = yield call(api.getSystemReportById, id);
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.systemReportSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetSystemReportsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getSystemReportByParameter(api, { url, parameters }) {
  const response = yield call(api.getSystemReportByParameter, url, parameters);
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.systemReportSchema
    );
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetSystemReportsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getSystemReportByName(
  api,
  { reportName, format, parameters }
) {
  const response = yield call(
    api.getSystemReportByName,
    reportName,
    format,
    parameters
  );
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.systemReportSchema
    );
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetSystemReportsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createSystemReport(api, { formValues }) {
  const formName = Form.REPORT_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createSystemReport, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.systemReportSchema]);
    yield put(ResourceActions.addEntities(entities));
    yield put(SystemReportActions.setSelected(data._id));

    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateSystemReport(api, { formValues }) {
  const formName = Form.REPORT_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateSystemReport, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize([data], [Schemas.systemReportSchema]);
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
    takeLatest(SystemReportTypes.GET_SYSTEM_REPORTS, getSystemReports, api),
    takeLatest(
      SystemReportTypes.GET_REPORTS_WORKSPACE_ALLOW_TO_ACCESS,
      getReportsWorkspaceAllowToAccess,
      api
    ),
    takeLatest(
      SystemReportTypes.GET_SYSTEM_REPORT_BY_ID,
      getSystemReportById,
      api
    ),
    takeLatest(
      SystemReportTypes.GET_SYSTEM_REPORT_BY_PARAMETER,
      getSystemReportByParameter,
      api
    ),
    takeLatest(
      SystemReportTypes.GET_SYSTEM_REPORT_BY_NAME,
      getSystemReportByName,
      api
    ),

    takeLatest(SystemReportTypes.UPDATE_SYSTEM_REPORT, updateSystemReport, api),
    takeLatest(SystemReportTypes.CREATE_SYSTEM_REPORT, createSystemReport, api)
  ]);
}
