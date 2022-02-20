import { createBrowserHistory as createHistory } from 'history';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import immutablePersistenceTransform from './persist/immutablePersistenceTransform';
import storage from 'redux-persist/lib/storage';
import createStore from './store';
import rootSaga from './sagas';
import rootReducer from './reducers';
import migrations from './_persistMigrations';

export const browserHistory = createHistory();
const persistConfig = {
  version: 0,
  key: 'root',
  storage,
  transforms: [immutablePersistenceTransform],
  whitelist: ['app', 'account', 'intl'],
  migrate: createMigrate(migrations, { debug: false })
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer(browserHistory)
);
export const store = createStore(persistedReducer, rootSaga, browserHistory);
export const persistor = persistStore(store);
