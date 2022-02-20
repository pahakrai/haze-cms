import Immutable from 'seamless-immutable';

const migrations = {
  0: state => {
    return {
      ...state,
      app: {
        ...state.app,
        openedNavItemGroups: Immutable(state.app.openedNavItemGroups || [])
      }
    };
  }
};

export default migrations;
