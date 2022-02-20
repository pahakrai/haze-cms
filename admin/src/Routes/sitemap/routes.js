import React from 'react';
// defaul route
import { getRouteWithWenuFlow as getRoute } from '../../Lib/route';
// 403 page
import UnauthorizedPage from '../../Pages/Errors/403';
// Components
import Loading from '../../Components/Common/Loading';
// Layout
import FullLayout from '../../Layouts/FullLayout';
import AuthLayout from '../../Layouts/AuthLayout';
import ErrorLayout from '../../Layouts/ErrorLayout';
import Layout from '../../Layouts/Layout1';
import OrderFormLayout from '../../Containers/Order/OrderFormLayout';
import OrderListLayout from '../../Containers/Order/OrderListLayout';

// strategy
import RouteStrategy from '../RouteStrategyByWebMenu';
import VerifyTokenRouteStrategy from '../VerifyTokenRouteStrategy';
import SignUpConfirmVerifyTokenRouteStrategy from '../SignUpConfirmVerifyTokenRouteStrategy';
import ValidateUserByTokenRouteStrategy from '../ValidateUserByTokenRouteStrategy';
import NoFoundRouteStrategy from '../NoFoundRouteStrategy';

getRoute.Loading = () => <Loading full={true} isLoading={true} />;

export default {
  DefaultRoute: getRoute(RouteStrategy, null, {}, UnauthorizedPage),
  DefaultLayoutRoute: getRoute(RouteStrategy, Layout, {}, UnauthorizedPage),
  OrderFormLayoutRoute: getRoute(
    RouteStrategy,
    OrderFormLayout,
    {},
    UnauthorizedPage
  ),
  OrderListLayoutRoute: getRoute(
    RouteStrategy,
    OrderListLayout,
    {},
    UnauthorizedPage
  ),
  FullLayoutRoute: getRoute(RouteStrategy, FullLayout),
  ErrorLayoutRoute: getRoute(null, ErrorLayout),
  NoFoundLayoutRoute: getRoute(NoFoundRouteStrategy, ErrorLayout),
  AuthLayoutRoute: getRoute(RouteStrategy, AuthLayout),
  VerifyTokenRoute: getRoute(VerifyTokenRouteStrategy, FullLayout),
  SignUpConfirmVerifyTokenRoute: getRoute(
    SignUpConfirmVerifyTokenRouteStrategy,
    FullLayout
  ),
  ValidateUserByTokenRoute: getRoute(
    ValidateUserByTokenRouteStrategy,
    AuthLayout
  )
};
