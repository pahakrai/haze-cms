import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import { NavLink as OriginalNavLink } from 'react-router-dom';
import { Redirect } from 'react-router';
// import { store } from '../Redux';

// Strategy that manages the behaviour of the route, such as its authenticate process
export const RouteStrategy = class RouteStrategy {
  unAuthRedirect = '/login';
  // auth => groups => policies
  authenticate(policies: Array<string>): boolean {
    // const user = store.getState().account.user; // Get current user
    // if (!user) return false; // If the user does not exist, no entry is allowed
    // if (!user.groups) return false;
    // const userRoleSet = new Set(user.groups);
    // if (groups.filter(x => userRoleSet.has(x)).length > 0) return true; // If roles intersect, entry is allowed
    // return false;
    if (!policies || !policies.length) return true;
    return false;
  }
};

export const withRouteStrategy = ComponentToWrap => {
  return class RouteStrategyComponent extends React.PureComponent {
    // let’s define what’s needed from the `context`
    static contextTypes = {
      routeStrategy: PropTypes.object.isRequired
    };
    render() {
      const { routeStrategy } = this.context;
      // what we do is basically rendering `ComponentToWrap`
      // with an added `routeStrategy` prop, like a hook
      return <ComponentToWrap {...this.props} routeStrategy={routeStrategy} />;
    }
  };
};

/**
 * For menu item and menu group
 */
export const withAuthStrategy = ComponentToWrap => {
  return withRouteStrategy(
    class AuthStrategyComponent extends React.PureComponent {
      state = {
        authenticated: false
      };
      async componentDidMount() {
        const { routeStrategy, auth, ...rest } = this.props;
        const authenticated = await routeStrategy.authenticate(auth, rest);
        this.setState({ authenticated });
      }
      render() {
        const { authenticated } = this.state;
        const { alwaysShown } = this.props;
        // if alwaysShown true, display true
        const display = authenticated || alwaysShown;
        return (
          !!display && (
            <ComponentToWrap {...this.props} authenticated={authenticated} />
          )
        );
      }
    }
  );
};

export const NavLink = withAuthStrategy(OriginalNavLink);

class LayoutProvider extends React.PureComponent {
  static childContextTypes = {
    routeStrategy: PropTypes.object.isRequired
  };
  getChildContext() {
    return { routeStrategy: this.props.routeStrategy };
  }
  render() {
    // `Children.only` enables us not to add a <div /> for nothing
    return Children.only(this.props.children);
  }
}

// Factory that generates a Route with specified strategy and layout
export const getRoute = (
  RouteStrategy_ = RouteStrategy,
  layout: any = null,
  layoutProps: object = {},
  UnauthorizedPage = () => <h1>403</h1>
): Function => {
  const routeStrategy = new (RouteStrategy_ || RouteStrategy)();
  const returnRoute = (Component, props, Layout, innerLayoutProps) => {
    return (
      <LayoutProvider routeStrategy={routeStrategy}>
        {Layout ? (
          <Layout {...layoutProps} {...innerLayoutProps}>
            <Component {...props} />
          </Layout>
        ) : (
          <Component {...props} />
        )}
      </LayoutProvider>
    );
  };

  return class extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        authenticated: false,
        loading: true
      };
    }

    componentDidMount() {
      const { auth, ...rest } = this.props;
      this.callAuthenticate(auth, rest);
    }
    componentDidUpdate(prevProps) {
      const { auth, ...rest } = this.props;
      if (auth !== prevProps.auth) {
        this.callAuthenticate(auth, rest);
      }
    }
    callAuthenticate = async (auth, rest) => {
      if (auth) {
        this.setState({
          loading: true
        });
        const authenticated = await routeStrategy.authenticate(auth, rest);
        this.setState({
          authenticated,
          loading: false
        });
      }
    };
    render() {
      const {
        auth,
        // when authenticated false and alwaysShown true , display 403 error page
        alwaysShown,
        render,
        component: Component,
        layoutProps,
        ...rest
      } = this.props;
      const { loading, authenticated } = this.state;
      return (
        <Route
          {...rest}
          render={renderProps => {
            // route need auth action
            // TODO maybe workspaceType or workspaceAccess
            if (auth) {
              if (authenticated === 403) {
                return returnRoute(
                  UnauthorizedPage,
                  renderProps,
                  layout,
                  layoutProps
                );
              }
              if (authenticated) {
                return returnRoute(
                  Component || render,
                  renderProps,
                  layout,
                  layoutProps
                );
              } else {
                if (loading) {
                  const Loading = getRoute.Loading || <div>loading</div>;
                  return <Loading />;
                }
                if (alwaysShown) {
                  return returnRoute(
                    UnauthorizedPage,
                    renderProps,
                    layout,
                    layoutProps
                  );
                }
                // jumpe unAuthRedirect
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
              return returnRoute(
                Component || render,
                renderProps,
                layout,
                layoutProps
              );
            }
          }}
        />
      );
    }
  };
};

// default loading componet
// when wait auth , display loading
getRoute.Loading = () => <div>loading</div>;

// Factory that generates a Route with specified strategy and layout
export const getRouteWithWenuFlow = (
  RouteStrategy_ = RouteStrategy,
  layout: any = null,
  layoutProps: object = {},
  UnauthorizedPage = () => <h1>403</h1>
): Function => {
  const routeStrategy = new (RouteStrategy_ || RouteStrategy)();
  const returnRoute = (Component, props, Layout, innerLayoutProps) => {
    return (
      <LayoutProvider routeStrategy={routeStrategy}>
        {Layout ? (
          <Layout {...layoutProps} {...innerLayoutProps}>
            <Component {...props} />
          </Layout>
        ) : (
          <Component {...props} />
        )}
      </LayoutProvider>
    );
  };

  class AuthRenderForWebMenu extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        authenticated: false,
        loading: true
      };
    }

    componentDidMount() {
      const { auth, ...rest } = this.props;
      this.callAuthenticate(auth, rest);
    }
    componentDidUpdate(prevProps) {
      const { auth, ...rest } = this.props;
      if (auth !== prevProps.auth) {
        this.callAuthenticate(auth, rest);
      }
    }
    callAuthenticate = async (auth, rest) => {
      this.setState({
        loading: true
      });
      const authenticated = await routeStrategy.authenticate(auth, rest);
      this.setState({
        authenticated,
        loading: false
      });
    };
    render() {
      const {
        render,
        component: Component,
        layoutProps,
        renderProps
      } = this.props;
      const { authenticated, loading } = this.state;
      if (loading) {
        const Loading = getRouteWithWenuFlow.Loading || <div>loading</div>;
        return <Loading />;
      }
      // if authenticated === true , display page
      if (!Number.isInteger(authenticated) && authenticated) {
        return returnRoute(
          Component || render,
          renderProps,
          layout,
          layoutProps
        );
      }
      // if authenticated === false , jump 401
      if (!Number.isInteger(authenticated) && !authenticated) {
        const RedirectComponent = withRouter(({ location }) => {
          // if current route === unAuthRedirect route
          const isSameRoute =
            routeStrategy.unAuthRedirect === location.pathname;
          // if true, need display page
          if (isSameRoute) {
            return returnRoute(
              Component || render,
              renderProps,
              layout,
              layoutProps
            );
          }
          return (
            <Redirect
              to={{
                pathname: `${routeStrategy.unAuthRedirect}`,
                search: `?redirect=${location.pathname}`
              }}
            />
          );
        });
        return <RedirectComponent />;
      }
      switch (authenticated) {
        case 401:
          const RedirectComponent = withRouter(({ location }) => (
            <Redirect
              to={{
                pathname: `${routeStrategy.unAuthRedirect}`,
                search: `?redirect=${location.pathname}`
              }}
            />
          ));
          return <RedirectComponent />;
        case 403:
          return (
            <Redirect
              to={{
                pathname: `${
                  routeStrategy.forbiddenRedirect ||
                  routeStrategy.unAuthRedirect
                }`
              }}
            />
          );
        case 404:
        default:
          return (
            <Redirect
              to={{
                pathname: `${routeStrategy.notFoundRedirect}`
              }}
            />
          );
      }
    }
  }

  return props => {
    const { render, component, ...rest } = props;
    return (
      <Route
        {...rest}
        render={renderProps => (
          <AuthRenderForWebMenu {...props} renderProps={renderProps} />
        )}
      />
    );
  };
};

// default loading componet
// when wait auth , display loading
getRouteWithWenuFlow.Loading = () => <div>loading</div>;
