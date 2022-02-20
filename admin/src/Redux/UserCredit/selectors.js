import { createSelector } from 'reselect';

export const getUserCredits = createSelector(
  state => state.resources.userCredits,
  state => state.userCredit.results,
  (userCreditTransactions, ids) =>
    ids && Array.isArray(ids) && ids.map(id => userCreditTransactions[id])
);

export const getUserCreditByUId = createSelector(
  state => state.resources.userCredits,
  (state, uid) => uid,
  (credits, uid) => credits[uid]
);

export default { getUserCredits, getUserCreditByUId };
