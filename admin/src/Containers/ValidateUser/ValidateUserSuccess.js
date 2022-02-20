import React from 'react';
import { injectIntl } from 'react-intl';
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import Header from '../../Components/Common/Header';
import H3 from '../../Components/Common/H3';
import Link from '../../Components/Common/Link';

class ValidateUserSuccess extends React.PureComponent {
  static propTypes = {};

  render() {
    const { intl } = this.props;

    return (
      <div>
        <Header>
          <H3>{intl.formatMessage({ id: 'validate_user_success.title' })}</H3>
        </Header>
        <Link to="/login">
          <Button type="primary">
            <LeftOutlined />
            {intl.formatMessage(
              { id: 'back_to' },
              { name: intl.formatMessage({ id: 'login' }) }
            )}
          </Button>
        </Link>
      </div>
    );
  }
}

export default injectIntl(ValidateUserSuccess);
