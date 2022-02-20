import { createSelector } from 'reselect';

export const getEmployeeByUserId = createSelector(
  state => state.resources.employee,
  (state, userId) => userId,
  (employee, user) => {
    return Object.values(employee).find(
      v => v.user === user || (v.user && v.user._id === user)
    );
  }
);

export default { getEmployeeByUserId };
