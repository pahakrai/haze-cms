import React from 'react';
import { Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export default ({
  confirm,
  cancel,
  onClick,
  onVisibleChange,
  okText = 'Yes',
  cancelText = 'No',
  deleteText = 'Delete',
  title = 'Are you sure delete this task?',
  content
}) => {
  if (!content) {
    content = () => <DeleteOutlined type="delete" />;
  }
  return (
    <Popconfirm
      onClick={onClick}
      title={title}
      onVisibleChange={onVisibleChange}
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      {content()}
    </Popconfirm>
  );
};
