import { all, put, takeLatest, call, select } from 'redux-saga/effects';

import { RecruitmentPostTypes, RecruitmentPostActions } from './actions';
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

export let getRecruitmentPosts = handlePaginate('recruitmentPosts', {
  call: function* (api, { opts = { query: {} } }, paginate) {
    const { offset = 0, limit } = paginate;
    const state = yield select(state => state);
    return yield call(
      api.getRecruitmentPosts,
      appendQueryWorkspace(state, {
        offset,
        limit,
        paginate: true,
        sort: '-createdAt',
        ...opts.query,
        populates: ['category', 'candidates', 'publisher']
      })
    );
  },
  onSuccess: function* (data, paginate) {
    const { entities, result } = yield normalize(data, [
      Schemas.recruitmentPostSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    if (paginate.append) {
      yield put(RecruitmentPostActions.mergeResults(result));
    } else {
      yield put(RecruitmentPostActions.setResults(result));
    }
  },
  onFailed: function* (data) {
    yield put(ErrorActions.setGetRecruitmentPostsErrors(data));
    yield put(RecruitmentPostActions.setResults([]));
  }
});

export function* getRecruitmentPostById(api, { id }) {
  const response = yield call(api.getRecruitmentPostById, id, {
    populates: ['category']
  });
  function* onSuccess(data) {
    const { entities /*, result */ } = yield normalize(
      data,
      Schemas.recruitmentPostSchema
    );

    yield put(ResourceActions.addEntities(entities));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetRecruitmentPostsErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* createRecruitmentPost(api, { formValues }) {
  const formName = Form.RECRUITMENT_POST_CREATE;
  yield put(startSubmit(formName));
  const response = yield call(api.createRecruitmentPost, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize(
      [data],
      [Schemas.recruitmentPostSchema]
    );
    yield put(ResourceActions.addEntities(entities));
    yield put(RecruitmentPostActions.setSelected(data._id));

    yield put(stopSubmit(formName));
  }

  function* onFailed(data) {
    yield put(setSubmitFailed(formName));
    yield put(stopSubmit(formName, getErrorFromResponse(formName, response)));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export function* updateRecruitmentPost(api, { formValues }) {
  const formName = Form.RECRUITMENT_POST_UPDATE;
  yield put(startSubmit(formName));
  const response = yield call(api.updateRecruitmentPost, formValues);
  function* onSuccess(data) {
    yield put(setSubmitSucceeded(formName));
    const { entities } = yield normalize(
      [data],
      [Schemas.recruitmentPostSchema]
    );
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
    takeLatest(
      RecruitmentPostTypes.GET_RECRUITMENT_POSTS,
      getRecruitmentPosts,
      api
    ),
    takeLatest(
      RecruitmentPostTypes.GET_RECRUITMENT_POST_BY_ID,
      getRecruitmentPostById,
      api
    ),
    takeLatest(
      RecruitmentPostTypes.UPDATE_RECRUITMENT_POST,
      updateRecruitmentPost,
      api
    ),
    takeLatest(
      RecruitmentPostTypes.CREATE_RECRUITMENT_POST,
      createRecruitmentPost,
      api
    )
  ]);
}
