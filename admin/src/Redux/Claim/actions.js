import { createActions } from 'reduxsauce';

export const { Types: ClaimTypes, Creators: ClaimActions } = createActions(
  {
    /* ------------- Sagas ------------- */
    getClaims: ['opts'],
    getClaimById: ['id', 'query'],
    updateClaim: ['formValues'],
    createClaim: ['formValues'],
    approveClaim: ['id'],
    rejectClaim: ['id', 'formValues'],
    appealClaim: ['id'],
    getExamineClaim: ['id', 'examine'],
    deleteExpense: ['claimId', 'expenseId'],
    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'Claim/' }
);
