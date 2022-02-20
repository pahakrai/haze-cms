import React, { useCallback, useMemo, useState } from 'react';
import { Checkbox } from 'antd';
import styled from 'styled-components';
import { Table, Input } from 'antd';
import { Row, Col } from 'react-flexa';

import { formatUserName } from '../../../../Lib/util';
import UserAvatar from '../../../User/UserAvatar';
import Button from '../../../../Components/Common/Button';

const ModalWrapper = styled.div`
  width: 100%;
`;
const TableHeader = styled.div`
  min-height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ModalContent = ({
  selected: _selected,
  intl,
  onConfirm,
  control,
  loading,
  allData,
  searchData,
  searchUser,
  confirmButton = true,
  onChange = () => {},
  disabled,
  placeholder
}) => {
  const [_value, _setValue] = useState(_selected || []);
  const setValue = confirmButton ? _setValue : onChange;
  const value = confirmButton ? _value : _selected;
  // table props
  const selected = useMemo(() => (value && value.length ? value : []), [value]);
  const table_columns1 = useMemo(
    () =>
      getTableColumns({
        intl,
        selected,
        onChange: setValue,
        control,
        disabled
      }),
    [intl, selected, setValue, control, disabled]
  );
  const table_columns2 = useMemo(
    () =>
      getTableColumns({
        intl,
        selected,
        onChange: setValue,
        control,
        disabled,
        selectedType: true
      }),
    [intl, selected, setValue, control, disabled]
  );
  const table_rowKey = useCallback(record => record._id, []);
  const _onConfirm = useCallback(() => {
    onConfirm(value);
  }, [value, onConfirm]);

  return (
    <ModalWrapper>
      <Row>
        <Col xs={12} md={7}>
          <TableHeader>
            <Input.Search
              placeholder={
                placeholder || intl.formatMessage({ id: 'search_user' })
              }
              onSearch={value => searchUser(value)}
              enterButton
            />
          </TableHeader>
          <Table
            loading={loading}
            rowKey={table_rowKey}
            columns={table_columns1}
            dataSource={searchData}
            pagination={{ defaultPageSize: 5 }}
            scroll={{ x: 800 }}
          />
        </Col>
        <Col xs={12} md={5}>
          <TableHeader>
            {intl.formatMessage({ id: 'selected' }) + `(${selected.length})`}
          </TableHeader>
          <Table
            rowKey={table_rowKey}
            columns={table_columns2}
            pagination={{ defaultPageSize: 5 }}
            dataSource={selected.reduce(
              (r, v) =>
                allData[control.get(v)] ? [...r, allData[control.get(v)]] : r,
              []
            )}
            scroll={{ x: 300 }}
          />
        </Col>
      </Row>
      {confirmButton && (
        <Button.Center topMargin>
          <Button.Primary onClick={_onConfirm}>
            {intl.formatMessage({ id: 'confirm' })}
          </Button.Primary>
        </Button.Center>
      )}
    </ModalWrapper>
  );
};

const getTableColumns = ({
  intl,
  selected,
  onChange,
  control,
  selectedType,
  disabled
}) => {
  const t = v => intl.formatMessage({ id: v });
  const columns = [
    {
      title: t('display_user_avatar'),
      dataIndex: 'avatars',
      align: 'center',
      key: 'avatars',
      render: avatars =>
        avatars && avatars[0] ? (
          <UserAvatar
            avatarStyle={{
              height: 40,
              width: 40,
              borderRadius: 20,
              margin: 0,
              border: '1px solid #eee'
            }}
            fileMetaId={avatars[0].fileMeta}
          />
        ) : (
          <div
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              border: '1px solid #eee',
              margin: '0 auto'
            }}
          />
        ),
      width: 100
    },
    {
      title: t('display_user_name'),
      dataIndex: 'name',
      width: 130,
      render: (text, data) => formatUserName(data),
      key: 'name'
    }
  ];

  const action = {
    title: t('actions'),
    key: 'operation',
    align: 'center',
    fixed: 'left',
    width: 82,
    render: (text, user) => {
      const data = selected.find(v => control.get(v) === user._id);
      const checked = !!data;
      return (
        <Checkbox
          disabled={disabled}
          checked={checked}
          onChange={e =>
            onChange(
              checked
                ? selected.filter(v => control.get(v) !== user._id)
                : [...selected, control.set(user, data || {})]
            )
          }
        />
      );
    }
  };
  const others = [
    {
      title: t('display_phone'),
      dataIndex: 'phone',
      key: 'phone',
      width: 130
    },
    {
      title: t('display_email'),
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: t('display_description'),
      dataIndex: 'description',
      key: 'description'
    }
  ];

  return [action].concat(selectedType ? columns : [...columns, ...others]);
};

export default ModalContent;
