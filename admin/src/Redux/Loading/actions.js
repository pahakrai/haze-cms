import { createActions } from 'reduxsauce';

export const { Types: LoadingTypes, Creators: LoadingActions } = createActions(
  {
    setLoading: ['field', 'isLoading']
  },
  { prefix: 'Loading/' }
);
