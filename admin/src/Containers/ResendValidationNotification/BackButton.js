import React from 'react';
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import Link from '../../Components/Common/Link';

export default ({ linkTo, intl, intlId }) => (
  <Link to={linkTo}>
    <Button type="primary">
      <LeftOutlined />
      {intl.formatMessage(
        { id: 'back_to' },
        { name: intl.formatMessage({ id: 'login' }) }
      )}
    </Button>
  </Link>
);
