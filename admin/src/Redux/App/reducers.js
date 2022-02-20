import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { AppTypes } from './actions';
import { reset, toggleField, setField, resetField } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  token: null,
  // current logined user id
  userId: null,
  workspaceId: null,
  isSidebarOpen: true,
  openedNavItemGroups: []
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

const setOpenedNavItemGroups = (state, { newItems: item }) => {
  const newItem = item[0]; // @string
  const oldItems = state.openedNavItemGroups;
  let newItems = oldItems;

  if (typeof newItem === 'string') {
    if (!oldItems.includes(newItem)) {
      const items = newItem.split('.');
      newItems = [items.shift()];
      while (items.length !== 0) {
        const currItem = items.shift();
        newItems.push(`${newItems[newItems.length - 1]}.${currItem}`);
      }
    } else {
      newItems = oldItems.slice(0, oldItems.indexOf(newItem));
    }
  }

  return setField('openedNavItemGroups', 'newItems')(state, { newItems });
};

export default createReducer(INITIAL_STATE, {
  [AppTypes.SET_TOKEN]: setField('token', 'token'),
  [AppTypes.SET_CURRENT_USER_ID]: setField('userId', 'userId'),
  [AppTypes.SET_CURRENT_WORKSPACE_ID]: setField('workspaceId', 'workspaceId'),
  [AppTypes.TOGGLE_SIDEBAR_OPEN]: toggleField('isSidebarOpen', 'isOpen'),
  [AppTypes.SET_OPENED_NAV_ITEM_GROUPS]: setOpenedNavItemGroups,
  [AppTypes.RESET_OPENED_NAV_ITEM_GROUPS]: state =>
    resetField(INITIAL_STATE)(state, { field: 'openedNavItemGroups' }),
  [AppTypes.RESET]: reset(INITIAL_STATE)
});
