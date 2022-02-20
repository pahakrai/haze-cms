import React, { useCallback, useMemo, useState } from 'react';
import { Checkbox } from 'antd';
import styled from 'styled-components';
import { Table, Input } from 'antd';
import { Row, Col } from 'react-flexa';

import Button from '../../../Components/Common/Button';
import FileMetaImage from '../../../Containers/FileMetaImage';

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
  searchWorkspace,
  confirmButton = true,
  onChange = () => {},
  disabled,
  multiple
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
        disabled,
        multiple
      }),
    [intl, selected, setValue, control, disabled, multiple]
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
        <Col xs={12} md={6}>
          <TableHeader>
            <Input.Search
              placeholder={intl.formatMessage({ id: 'input_search_text' })}
              onSearch={value => searchWorkspace(value)}
              enterButton
            />
          </TableHeader>
          <Table
            loading={loading}
            rowKey={table_rowKey}
            columns={table_columns1}
            dataSource={searchData}
            pagination={{ defaultPageSize: 10 }}
            scroll={{ y: 400 }}
          />
        </Col>
        <Col xs={12} md={6}>
          <TableHeader>
            {intl.formatMessage({ id: 'selected' }) + `(${selected.length})`}
          </TableHeader>
          <Table
            rowKey={table_rowKey}
            columns={table_columns2}
            pagination={{ defaultPageSize: 10 }}
            dataSource={selected.reduce(
              (r, v) =>
                allData[control.get(v)] ? [...r, allData[control.get(v)]] : r,
              []
            )}
            scroll={{ y: 400 }}
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
  disabled,
  multiple
}) => {
  const t = v => intl.formatMessage({ id: v });
  const columns = [
    {
      title: t('label_images'),
      dataIndex: 'avatars',
      align: 'center',
      key: 'avatar',
      render: (avatar, data) => {
        const imageId = data && data.setting && data.setting.logo;
        return imageId ? (
          <FileMetaImage
            style={{
              height: 60,
              width: 60,
              margin: 0,
              borderRadius: 0,
              border: '1px solid #eee'
            }}
            fileMetaId={imageId}
          />
        ) : (
          <div
            style={{
              height: 60,
              width: 60,
              border: '1px solid #eee',
              margin: '0 auto'
            }}
          />
        );
      },
      width: 100
    },
    {
      title: t('display_name'),
      dataIndex: 'name',
      render: (text, data) => (data && data.name) || '',
      key: 'name'
    }
  ];

  const action = {
    title: t('actions'),
    key: 'operation',
    align: 'center',
    width: 82,
    render: (text, workspace) => {
      const data = selected.find(v => control.get(v) === workspace._id);
      const checked = !!data;
      return (
        <Checkbox
          disabled={disabled}
          checked={checked}
          onChange={e => {
            if (multiple) {
              onChange(
                checked
                  ? selected.filter(v => control.get(v) !== workspace._id)
                  : [...selected, control.set(workspace, data || {})]
              );
            } else {
              onChange([control.set(workspace, data || {})]);
            }
          }}
        />
      );
    }
  };

  return [action].concat(columns);
};

export default ModalContent;
