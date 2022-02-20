import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'raf/polyfill';
import 'url-search-params-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { unregister as unregisterServiceWorker } from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
unregisterServiceWorker();

if (process.env.NODE_ENV === 'production') {
  console.info = () => true;
  console.log = () => true;
}
