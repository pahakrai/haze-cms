import { createActions } from 'reduxsauce';

export const {
  Types: UserCreditTypes,
  Creators: UserCreditActions
} = createActions(
  {
    /* ------------- Sagas ------------- */
    getUserAllCreditByUId: ['uid'],
    getUserCreditByUId: ['uid'],
    getUserCredits: ['querys', 'opts'],
    createUserCredit: ['form'],

    /* ------------- Reducers ------------- */
    mergeResults: ['results'],
    setResults: ['results'],
    setCredit: ['uid', 'credit'],
    deleteCredit: ['uid'],
    // set credit list
    setCredits: ['uid', 'credits']
  },
  { prefix: 'UserCredit/' }
);
