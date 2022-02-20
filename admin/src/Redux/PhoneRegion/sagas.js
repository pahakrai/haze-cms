import { call, put, all, takeEvery } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { entities as Schemas } from '../../Services/Schemas';

import { handleResponse } from '../utils/saga';
import ResourceActions from '../Resources/actions';
import PhoneRegionActions, { PhoneRegionTypes } from './actions';

function* getAllPhoneRegions(api) {
  const response = yield call(api.getAllPhoneRegions);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.phoneRegionSchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    yield put(PhoneRegionActions.setAllPhoneRegions(result));
  }
  function onFailed() {}

  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* regionSagas(api) {
  yield all([
    takeEvery(PhoneRegionTypes.GET_ALL_PHONE_REGIONS, getAllPhoneRegions, api)
  ]);
}
