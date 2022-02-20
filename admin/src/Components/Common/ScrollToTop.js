import React from 'react';
import { withRouter } from 'react-router';

class ScrollToTop extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const { containerId, location } = this.props;
    if (location !== prevProps.location) {
      setTimeout(() => {
        const container = document.getElementById(containerId);
        if (container) {
          container.scrollTo(0, 0);
        }
      }, 100);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
