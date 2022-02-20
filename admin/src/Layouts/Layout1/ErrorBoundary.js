import React from 'react';
import { withRouter } from 'react-router-dom';
import { isDevelopmentEnv } from '../../Lib/util';

class ErrorBoundary extends React.PureComponent {
  // React Error Catch
  componentDidCatch(error, errorInfo) {
    if (!isDevelopmentEnv) {
      const { history } = this.props;
      // log
      console.warn(error);
      // jump error page
      history.push('/error');
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
