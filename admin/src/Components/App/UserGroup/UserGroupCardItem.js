import React from 'react';
import styled from 'styled-components';
// Time
import moment from 'moment';
// antd ui
import { Button, Modal, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
// auth
import withAuthActions from '../../../Containers/Ac/withAuthActions';

const DeleteButton = withAuthActions(['UserGroup:Delete'])(
  ({ wrapAuth, intl, title, onConfirm, onCancel }) =>
    !!wrapAuth && !wrapAuth.auth ? (
      <Button type="primary" danger icon={<DeleteOutlined />} disabled />
    ) : (
      <Button
        type="primary"
        danger
        icon={<DeleteOutlined />}
        onClick={() =>
          Modal.confirm({
            title: title,
            okText: intl.formatMessage({ id: 'display_yes' }),
            cancelText: intl.formatMessage({ id: 'cancel' }),
            onOk: () => {
              onConfirm();
              return Promise.resolve();
            },
            onCancel: onCancel
          })
        }
      />
    )
);

export const Wrapper = styled.div`
  width: 100%;
  padding: 15px 5px;
  border: 1px solid #ddd;
  display: table;
  table-layout: fixed;
  margin-bottom: -1px;
`;

export const Item = styled.div`
  font-size: ${props => props.theme.fonts.size.h5};
  text-align: center;
  display: table-cell;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  display: table-cell;
  cursor: pointer;
`;

export const HiddenItem = styled(Item)`
  @media (max-width: ${props => props.theme.flexa.breakpoints.md}rem) {
    display: none;
  }
`;

export const ActionsItem = styled(Item)`
  min-width: 94px;
`;

export default ({ data, intl, onClick, onCancel, onDelete, onToggle }) => {
  return (
    <Wrapper>
      {/* <Item onClick={onClick}>{data._id}</Item> */}
      <Item onClick={onClick}>{data.name}</Item>
      <Item onClick={onClick}>{data.users && data.users.length}</Item>
      {/* <Item onClick={onClick}>
        <Switch value={data.isActive} onToggle={onToggle} />
      </Item> */}
      <Item onClick={onClick}>
        {moment(data.createdAt).format('YYYY-MM-DD')}
      </Item>
      <ActionsItem>
        <Space size={0}>
          <DeleteButton
            forceWrapAuth
            intl={intl}
            title={intl.formatMessage({ id: 'display_del_hint_messages' })}
            onConfirm={() => onDelete && onDelete(data)}
            onCancel={() => onCancel && onCancel(data)}
          />
        </Space>
      </ActionsItem>
    </Wrapper>
  );
};
