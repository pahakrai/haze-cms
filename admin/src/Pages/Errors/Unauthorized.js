/* @flow */

import React from 'react';
import Error from './Error';

export default () => (
  <Error title="401" message="Unauthorized" jumpUrl="/login" btText="Login" />
);
