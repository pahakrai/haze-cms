import React, { Children } from 'react';
import PropTypes from 'prop-types';
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
export default LayoutProvider;
