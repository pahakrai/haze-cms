import React from 'react';
import { Helmet } from 'react-helmet';

class Viewport extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      iphone: false
    };
  }

  componentDidMount() {
    const userAgent =
      window && window.navigator ? window.navigator.userAgent : '';

    // if iphone
    if (/iphone/gi.test(userAgent)) {
      this.setState({
        iphone: true
      });
    }
  }

  render() {
    const { iphone } = this.state;

    return (
      <Helmet>
        {iphone && (
          <meta
            name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
          />
        )}
      </Helmet>
    );
  }
}

export default Viewport;
