import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { injectIntl } from 'react-intl';
import Content from '../Components/Common/Content';
import H3 from '../Components/Common/H3';
import Link from '../Components/Common/Link';

class VerifyUserPage extends PureComponent {
  componentDidMount() {
    // const { history, location } = this.props;
    // history.push('/auth/set-password' + location.search + '&isVerifyUser=true');
  }
  render() {
    const { intl } = this.props;
    return (
      <Content>
        <H3>{intl.formatMessage({ id: 'msg.user_verified_redirecting' })}</H3>
        <Link to="/login">{intl.formatMessage({ id: 'login' })}</Link>
      </Content>
    );
  }
}

export default withRouter(injectIntl(VerifyUserPage));
