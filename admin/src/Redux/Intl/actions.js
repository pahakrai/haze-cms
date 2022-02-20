import { createActions } from 'reduxsauce';

export const { Types: IntlTypes, Creators: IntlActions } = createActions(
  {
    updateIntl: ['locale']
  },
  { prefix: 'Intl/' }
);
