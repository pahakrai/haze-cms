import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { IntlTypes } from './actions';

export const INITIAL_STATE = Immutable({
  defaultLocale: process.env.REACT_APP_DEFAULT_LANGUAGE,
  locale: process.env.REACT_APP_DEFAULT_LANGUAGE,
  formats: {},
  // messages: en,
  defaultFormats: {},
  textComponent: 'span'
});

export default createReducer(INITIAL_STATE, {
  [IntlTypes.UPDATE_INTL]: (state, { locale }) => {
    return state.set('locale', locale);
    // .set('messages', languages[locale.replace('-', '_')]);
  }
});
