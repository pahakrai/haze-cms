// import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { startSubmit, stopSubmit, setSubmitSucceeded } from 'redux-form';

import { toast } from '../../Lib/Toast';
import { entities as Schemas } from '../../Services/Schemas';
import { ErrorActions } from '../Error/actions';
import {
  NotificationScheduleTypes,
  NotificationScheduleActions
} from './actions';
import ResourceActions from '../Resources/actions';
import { LoadingActions } from '../Loading/actions';
import { getErrorFromResponse } from '../utils/saga';
import Form from '../../Constants/Form';
import { appendQueryWorkspace } from '../utils';
import { handleResponse, handlePaginate } from '../utils/saga';

export let getNotificationSchedules = handlePaginate('notificationSchedules', {
  call: function* (api, action, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    return yield call(api.getNotificationSchedules, {
      ...appendQueryWorkspace(state, {
        sort: '-createdAt',
        localize: true,
        paginate: true,
        offset,
        limit,
        t: Date.now(),
        ...action.opts.query
      })
    });
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.notificationScheduleSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(NotificationScheduleActions.mergeResults(result));
    } else {
      yield put(NotificationScheduleActions.setResults(result));
    }
    // yield put(NotificationScheduleActions.setSearchResults(result));
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetNotificationSchedulesErrors(data));
  }
});

export function* getNotificationScheduleById(api, { id }) {
  const response = yield call(api.getNotificationScheduleById, id);
  function* onSuccess(data) {
    const { result, entities } = yield normalize(
      data,
      Schemas.notificationScheduleSchema
    );
    yield put(ResourceActions.addEntities(entities));
    yield put(NotificationScheduleActions.setResults([result]));
    yield put(NotificationScheduleActions.setSelected(data._id));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetNotificationSchedulesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createNotificationSchedule(
  api,
  { notificationScheduleForm, images }
) {
  yield put(LoadingActions.setLoading('notificationSchedules', true));
  yield put(startSubmit(Form.PUSH_NOTIFICATION_SCHEDULE_CREATE));
  const response = yield call(
    api.createNotificationSchedule,
    notificationScheduleForm,
    images
  );
  function* onSuccess(data) {
    const { entities } = yield normalize(
      data,
      Schemas.notificationScheduleSchema
    );
    yield put(setSubmitSucceeded(Form.PUSH_NOTIFICATION_SCHEDULE_CREATE));
    yield put(ResourceActions.addEntities(entities));
    yield put(LoadingActions.setLoading('notificationSchedules', false));
    yield put(stopSubmit(Form.PUSH_NOTIFICATION_SCHEDULE_CREATE));
    // getNotificationSchedules
    // yield put(
    //   NotificationScheduleActions.getNotificationSchedules({ refresh: true })
    // );
  }
  function* onFailed(data) {
    yield put(
      stopSubmit(
        Form.PUSH_NOTIFICATION_SCHEDULE_CREATE,
        getErrorFromResponse(null, data)
      )
    );
    yield put(LoadingActions.setLoading('notificationSchedules', false));
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateNotificationSchedule(
  api,
  { notificationScheduleForm, images }
) {
  yield put(startSubmit(Form.PUSH_NOTIFICATION_SCHEDULE_UPDATE));
  const response = yield call(
    api.updateNotificationSchedule,
    notificationScheduleForm,
    images
  );
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(Form.PUSH_NOTIFICATION_SCHEDULE_UPDATE));
    yield put(stopSubmit(Form.PUSH_NOTIFICATION_SCHEDULE_UPDATE));
    const { entities } = yield normalize(
      data,
      Schemas.notificationScheduleSchema
    );
    yield put(ResourceActions.removeNotificationSchedule(data._id));
    yield put(ResourceActions.addEntities(entities));
  }
  function* onFailed(data) {
    yield put(
      stopSubmit(
        Form.PUSH_NOTIFICATION_SCHEDULE_UPDATE,
        getErrorFromResponse(null, data)
      )
    );
  }

  yield handleResponse(response)(onSuccess, onFailed);
}

// export function* toggleActive(api, { id, isActive }) {
//   const response = yield call(api.toggleActive, id, isActive);
//   function* onSuccess(data) {
//     toast.success(
//       `Change ${data.statusCode} status to ${
//         data.isActive ? 'ACTIVE' : 'INACTIVE'
//       }`
//     );
//     const { entities } = yield normalize(
//       [data],
//       [Schemas.notificationScheduleSchema]
//     );
//     yield put(ResourceActions.addEntities(entities));
//   }
//   function onFailed(data, response) {
//     toast.error(`Change status failed with error code ${response.isActive}`);
//   }
//   yield handleResponse(response)(onSuccess, onFailed);
// }

export function* changeStatus(api, { id, status }) {
  const response = yield call(api.changeStatus, id, status);
  // const locale = yield select(state => state.intl.locale);
  function* onSuccess(data) {
    toast.success(`Change status Successfully`);
    const { entities } = yield normalize(
      [data],
      [Schemas.notificationScheduleSchema]
    );
    yield put(ResourceActions.addEntities(entities));
  }
  function onFailed(data, response) {
    toast.error(
      `Change status failed with error code ${JSON.stringify(response)}`
    );
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(
      NotificationScheduleTypes.GET_NOTIFICATION_SCHEDULES,
      getNotificationSchedules,
      api
    )
  ]);
  yield all([
    takeLatest(
      NotificationScheduleTypes.GET_NOTIFICATION_SCHEDULE_BY_ID,
      getNotificationScheduleById,
      api
    )
  ]);
  yield all([
    takeLatest(
      NotificationScheduleTypes.CREATE_NOTIFICATION_SCHEDULE,
      createNotificationSchedule,
      api
    )
  ]);
  yield all([
    takeLatest(
      NotificationScheduleTypes.UPDATE_NOTIFICATION_SCHEDULE,
      updateNotificationSchedule,
      api
    )
  ]);
  yield all([
    takeLatest(NotificationScheduleTypes.CHANGE_STATUS, changeStatus, api)
  ]);
  // yield all([
  //   takeLatest(NotificationScheduleTypes.TOGGLE_ACTIVE, toggleActive, api)
  // ]);
}
