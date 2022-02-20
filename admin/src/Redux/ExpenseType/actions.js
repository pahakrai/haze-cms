import { createActions } from 'reduxsauce';

export const {
  Types: ExpenseTypeTypes,
  Creators: ExpenseTypeActions
} = createActions(
  {
    // sagas
    getExpenseTypes: ['opts'],
    getAllExpenseTypes: ['opts'],
    createExpenseType: ['expenseType'],
    updateExpenseType: ['id', 'expenseType'],
    getExpenseTypeById: ['id'],

    // reducers
    setResults: ['results'],
    setAllResults: ['allResults'],
    mergeResults: ['results'],
    setSelected: ['id'],
    setCreated: ['id'],
    setSearchTerm: ['searchTerm'],
    reset: null
  },
  { prefix: 'ExpenseType/' }
);
