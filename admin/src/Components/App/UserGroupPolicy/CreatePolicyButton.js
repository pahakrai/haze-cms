import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default props => (
  <Button icon={<PlusOutlined />} shape="circle" {...props} />
);
