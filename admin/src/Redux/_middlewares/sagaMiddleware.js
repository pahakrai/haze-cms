import createSagaMiddleware from 'redux-saga';
import { isDevelopmentEnv } from '../../Lib/util';

// handleError
const onHandleSageError = error => {
  console.warn(error);
};

// default
const defaultOptions = {};

// options
const options = isDevelopmentEnv
  ? // Development Env
    { ...defaultOptions }
  : // Production Env
    {
      ...defaultOptions,
      onError: onHandleSageError
    };

// create
const sagaMiddleware = createSagaMiddleware(options);

// export
export default sagaMiddleware;
