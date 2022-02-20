import { assign } from 'lodash';

import AccountSelector from '../../Redux/Account/selectors';
import * as _reducer from './reducer';

export const setArray = field => (Array.isArray(field) ? field : [field]);

export const getFieldVal = (state, field) => {
  if (Array.isArray(field)) {
    return field.reduce((a, b) => {
      return a[b];
    }, state);
  } else {
    return state[field];
  }
};

export const getNavRouteByName = (routes, routeName) => {
  return routes
    ? routes.find(r => r.routeName === routeName) ||
        routes
          .map(r => getNavRouteByName(r.routes, routeName))
          .filter(r => r !== null && r !== undefined)[0]
    : null;
};
export const appendQueryWorkspace = (state, oldQuery) => {
  const workspaceId = AccountSelector.getCurrentWorkspaceId(state);
  // const user = AccountSelector.getCurrentUser(state);
  // const userType = user ? user.userType : null;
  // const workspace = user ? user.workspace : '';
  let query = {
    ...oldQuery
  };
  // if (userType === ChangeCommon.type.UserType.USER) {
  //   query = assign({}, query, {
  //     workspace: workspace
  //   });
  // }
  if (workspaceId) {
    query = assign({}, query, {
      workspace: workspaceId
    });
  }
  return query;
};
export const reducer = _reducer;
