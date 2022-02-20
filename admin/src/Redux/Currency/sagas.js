import { all, call, put, takeLeading } from 'redux-saga/effects';

import { CurrencyActions, CurrencyTypes } from './actions';
import { entities as Schemas } from '../../Services/Schemas';
import { normalize } from 'normalizr';
import { handleResponse } from '../utils/saga';
import { ErrorActions } from '../Error/actions';
import ResourceActions from '../Resources/actions';

export function* getCurrencies(api, { query }) {
  const currencyQuery = { isActive: true };
  const response = yield call(api.getCurrencies, currencyQuery);
  function* onSuccess(data) {
    const { entities, result } = yield normalize(data, [
      Schemas.currencySchema
    ]);
    yield put(ResourceActions.addEntities(entities));
    yield put(CurrencyActions.setResults(result));
  }

  function* onFailed(data) {
    yield put(ErrorActions.setGetCurrenciesErrors(data));
  }
  yield handleResponse(response)(onSuccess, onFailed);
}

export default function* roots(api) {
  yield all([takeLeading(CurrencyTypes.GET_CURRENCIES, getCurrencies, api)]);
}
