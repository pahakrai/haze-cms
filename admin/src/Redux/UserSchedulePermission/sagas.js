import React from 'react';
import { all, put, takeLatest, call, select } from 'redux-saga/effects';
import { FormattedMessage } from 'react-intl';
import {
  UserSchedulePermissionTypes,
  UserSchedulePermissionActions
} from './actions';
import { entities as Schemas } from '../../Services/Schemas';

import { normalize } from 'normalizr';
import { handleResponse } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';
import { LoadingActions } from '../Loading/actions';
import { toast } from '../../Lib/Toast';
import { handlePaginate } from '../utils/saga';
import { appendQueryWorkspace } from '../utils';

export const getUserSchedulePermissions = handlePaginate(
  'userSchedulePermissions',
  {
    call: function* (api, { opts = { query: {} } }, paginate) {
      const { offset = 0, limit } = paginate;
      const state = yield select(state => state);
      const query = opts && opts.query ? opts.query : {};
      return yield call(
        api.getUserSchedulePermissions,
        appendQueryWorkspace(state, {
          offset,
          limit,
          paginate: true,
          sort: '-createdAt',
          ...opts,
          page: query.page || 1,
          populates: ['user']
        })
      );
    },
    onSuccess: function* (data, paginate) {
      const { entities, result } = yield normalize(data, [
        Schemas.userSchedulePermissionSchema
      ]);
      yield put(ResourceActions.addEntities(entities));
      if (paginate.append) {
        yield put(UserSchedulePermissionActions.mergeResults(result));
      } else {
        yield put(UserSchedulePermissionActions.setResults(result));
      }
    },
    onFailed: function* (data) {
      yield put(ErrorActions.setUserSchedulePermissionErrors(data));
    }
  }
);

export function* changeUserScheduleStatus(api, { value }) {
  const toastId = toast.info('Update...0%', { autoClose: false });
  yield put(LoadingActions.setLoading('userScheduleStatusLoading', true));
  const response = yield call(api.changeUserScheduleStatus, {
    id: value.id,
    status: value.status
  });
  function* onSuccess(data) {
    yield put(
      UserSchedulePermissionActions.getUserSchedulePermissionById(value.id)
    );
    yield put(LoadingActions.setLoading('userScheduleStatusLoading', false));

    toast.update(toastId, {
      render: <FormattedMessage id="updated_successfully" />,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });
  }

  function* onFailed(data) {
    yield put(ErrorActions.setUserSchedulePermissionErrors(data));
    yield put(LoadingActions.setLoading('userScheduleStatusLoading', false));
    toast.update(toastId, {
      render: <FormattedMessage id="updated_failure" />,
      type: toast.TYPE.WARNING,
      autoClose: 3000
    });
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* getUserSchedulePermissionById(api, { id }) {
  const response = yield call(api.getUserSchedulePermissionById, id, {
    populates: ['user']
  });
  function* onSuccess(data) {
    const { entities } = yield normalize(
      data,
      Schemas.userSchedulePermissionSchema
    );
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.getErrorFromResponse(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(
      UserSchedulePermissionTypes.GET_USER_SCHEDULE_PERMISSIONS,
      getUserSchedulePermissions,
      api
    ),
    takeLatest(
      UserSchedulePermissionTypes.CHANGE_USER_SCHEDULE_STATUS,
      changeUserScheduleStatus,
      api
    ),
    takeLatest(
      UserSchedulePermissionTypes.GET_USER_SCHEDULE_PERMISSION_BY_ID,
      getUserSchedulePermissionById,
      api
    )
  ]);
}
