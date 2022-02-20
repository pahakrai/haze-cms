import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '../Redux';

export default ({ children }) => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  );
};
