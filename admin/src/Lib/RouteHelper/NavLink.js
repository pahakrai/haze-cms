import React from 'react';
import { Link as OriginalNavLink } from 'react-router-dom';
import withRouteStrategy from './withRouteStrategy';
export default withRouteStrategy(({ routeStrategy, auth, ...rest }) => {
  return routeStrategy.authenticate(auth) ? (
    <OriginalNavLink {...rest} />
  ) : null;
});
