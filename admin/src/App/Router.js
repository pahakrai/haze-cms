/* @flow */

import React, { PureComponent } from 'react';
import AuthProvider from './AuthProvider';
import { ConnectedRouter } from 'connected-react-router';
import { browserHistory } from '../Redux';
import Routes from '../Routes';

export default class _Router extends PureComponent {
  static propTypes = {};

  render() {
    return (
      <ConnectedRouter history={browserHistory}>
        <AuthProvider history={browserHistory}>
          <Routes />
        </AuthProvider>
      </ConnectedRouter>
    );
  }
}
