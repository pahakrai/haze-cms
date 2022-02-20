/* @flow */

import React from 'react';
import Error from './Error';

export default () => (
  <Error
    title="400"
    message="Connect Expired"
    jumpUrl="/auth/forgot-password"
    btText="Forgot Password"
  />
);
