import React from 'react';
import { injectIntl } from 'react-intl';
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import Header from '../../Components/Common/Header';
import H3 from '../../Components/Common/H3';
import Link from '../../Components/Common/Link';
import P from '../../Components/Common/P';

class ValidateUserFailure extends React.PureComponent {
  static propTypes = {};

  render() {
    const { intl } = this.props;

    return (
      <div>
        <Header>
          <H3>{intl.formatMessage({ id: 'validate_user_failure.title' })}</H3>
        </Header>
        <P> {intl.formatMessage({ id: 'validate_user_failure.message' })}</P>
        <Link to="/">
          <Button type="primary">
            <LeftOutlined />
            {intl.formatMessage(
              { id: 'back_to' },
              { name: intl.formatMessage({ id: 'home' }) }
            )}
          </Button>
        </Link>
      </div>
    );
  }
}

export default injectIntl(ValidateUserFailure);
