import React from 'react';
import PropTypes from 'prop-types';
export default ComponentToWrap => {
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
