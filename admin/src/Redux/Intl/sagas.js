import { all, takeLatest } from 'redux-saga/effects';
import { IntlTypes } from './actions';

import Api from '../../Lib/Api';

export function updateItl({ locale }) {
  // set locale to api here
  Api.locale = locale;
}

export default function* roots() {
  yield all([takeLatest(IntlTypes.UPDATE_INTL, updateItl)]);
}
