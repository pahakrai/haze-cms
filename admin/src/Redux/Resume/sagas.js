import { all, put, takeLatest, call, select } from 'redux-saga/effects';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import { handleResponse } from '../utils/saga';

import ResourceActions from '../Resources/actions';
import { ErrorActions } from '../Error/actions';

import { appendQueryWorkspace } from '../utils';
import { ResumeTypes } from './actions';

export function* getResumeByUserId(api, { id }) {
  const state = yield select(state => state);
  const response = yield call(
    api.getResumeByUserId,
    id,
    appendQueryWorkspace(state, {
      populates: ['user', '$educations.educationLevel', '$skills.skill', 'tags']
    })
  );
  function* onSuccess(data) {
    const { entities } = yield normalize(data, Schemas.resumeSchema);
    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetResumesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([
    takeLatest(ResumeTypes.GET_RESUME_BY_USER_ID, getResumeByUserId, api)
  ]);
}
