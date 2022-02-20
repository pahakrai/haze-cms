import { createSelector } from 'reselect';

export const getExpenseByIds = createSelector(
  state => state.resources.expense,
  state => state.resources.employee,
  state => state.resources.expenseType,
  (state, formExpenses) => formExpenses,
  (expense, employee, expenseType, _id) => {
    let getExpenses;
    if (_id) {
      getExpenses = Object.values(expense).filter(v => _id.includes(v._id));
      getExpenses = getExpenses.map(key => ({ ...key }));
      getExpenses.map(
        key =>
          (key.employee = Object.values(employee).find(
            key2 => key2._id === key.employee
          ))
      );
      getExpenses.map(
        key =>
          (key.type = Object.values(expenseType).find(
            key2 => key2._id === key.type
          ))
      );
    }

    return getExpenses;
  }
);

export const getExpenseByEmployee = createSelector(
  state => state.resources.expense,
  state => state.resources.employee,
  state => state.resources.expenseType,
  state => state.resources.claim,
  (state, formEmployee) => formEmployee,
  (state, formEmployee, claimId) => claimId,
  (expense, employee, expenseType, claim, formEmployee, claimId) => {
    let getExpenses;
    if (!claimId) {
      const claims = Object.values(claim).filter(
        f => f.employee === formEmployee
      );
      const cc = claims.reduce((r, d) => [...r, ...(d.expenses || [])], []);
      expense = expense
        ? Object.values(expense).filter(v => !cc.includes(v._id))
        : [];
    }
    if (claimId) {
      // 当前选中用户的报销单
      const claims = Object.values(claim).filter(
        f => f.employee === formEmployee
      );
      // 当前选中用户所有报销单选中的费用
      const cc = claims.reduce((r, d) => [...r, ...(d.expenses || [])], []);

      const claimValues = Object.values(claim).find(
        f => f.employee === formEmployee && f._id === claimId
      );

      const claimExpense = expense
        ? Object.values(expense).filter(
            v => claimValues && claimValues.expenses.includes(v._id)
          )
        : [];

      // 当前不属于选中用户的报销单的费用
      expense = expense
        ? Object.values(expense).filter(v => !cc.includes(v._id))
        : [];
      // 当前报销单的费用

      expense = [...claimExpense, ...expense];
    }
    if (formEmployee) {
      getExpenses = Object.values(expense).filter(
        v =>
          (v.employee === formEmployee && v.status === 0) ||
          (v.employee === formEmployee && v.status === 10)
      );
      getExpenses = getExpenses.map(key => ({ ...key }));
      getExpenses.map(
        key =>
          (key.employee = Object.values(employee).find(
            key2 => key2._id === key.employee
          ))
      );
      getExpenses.map(
        key =>
          (key.type = Object.values(expenseType).find(
            key2 => key2._id === key.type
          ))
      );
    }

    return getExpenses;
  }
);

export default {
  getExpenseByIds,
  getExpenseByEmployee
};
