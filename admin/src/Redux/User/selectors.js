import { createSelector } from 'reselect';

export const getUsersFromRes = createSelector(
  state => state.resources.users,
  users => users && Object.keys(users).map(_id => users[_id])
);
