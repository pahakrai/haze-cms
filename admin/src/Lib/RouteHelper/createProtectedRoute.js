import React, { PureComponent } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import LayoutProvider from './LayoutProvider';
import RouteStrategy from './RouteStrategy';
export default (RouteStrategy_ = RouteStrategy, layout = null) =>
  class ProtectedRoute extends PureComponent {
    _buildInnerComponent = (Component, props, routeStrategy) => {
      const Layout = layout;
      return (
        <LayoutProvider routeStrategy={routeStrategy}>
          {Layout ? (
            <Layout>
              <Component {...props} />
            </Layout>
          ) : (
            <Component />
          )}
        </LayoutProvider>
      );
    };
    render() {
      const routeStrategy = new RouteStrategy_();
      const { auth, render, component: Component, ...rest } = this.props;
      return (
        <Route
          {...rest}
          render={renderProps => {
            if (auth) {
              if (routeStrategy.authenticate(auth, rest)) {
                return this._buildInnerComponent(
                  Component,
                  renderProps,
                  routeStrategy
                );
              } else {
                const RedirectComponent = withRouter(({ location }) => (
                  <Redirect
                    to={{
                      pathname: `${routeStrategy.unAuthRedirect}`,
                      search: `?redirect=${location.pathname}`,
                      state: { requiredRoles: auth }
                    }}
                  />
                ));
                return <RedirectComponent />;
              }
            } else {
              return this._buildInnerComponent(
                Component || render,
                renderProps,
                layout
              );
            }
          }}
        />
      );
    }
  };
