import { createActions } from 'reduxsauce';

export const { Types: ExpenseTypes, Creators: ExpenseActions } = createActions(
  {
    /* ------------- Sagas ------------- */
    getExpenseAll: ['opts'],
    getExpenses: ['opts'],
    updateExpense: ['expenseForm', 'files'],
    createExpense: ['expenseForm', 'files'],
    deleteFileMeta: ['expenseId', 'fileMetaId'],
    getExpenseById: ['id', 'query', 'opts'],
    claimExpense: ['id'],
    rejectExpense: ['id', 'options'],
    appealExpense: ['id'],
    updateStatus: ['id', 'status'],
    updateExpenseStatus: ['id', 'status'],
    /* ------------- Reducers ------------- */
    setResults: ['results'],
    mergeResults: ['results'],
    setSelected: ['id'],
    setCreated: ['id'],
    setDeleted: ['id'],
    reset: null
  },
  { prefix: 'Expense/' }
);
