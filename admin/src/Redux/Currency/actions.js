import { createActions } from 'reduxsauce';

export const {
  Types: CurrencyTypes,
  Creators: CurrencyActions
} = createActions(
  {
    getCurrencies: null,
    setResults: ['results']
  },
  { prefix: 'Currency/' }
);
