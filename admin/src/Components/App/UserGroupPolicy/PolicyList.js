import React from 'react';
// antd
import { Table, Modal, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
// Time
import moment from 'moment';
// react view lib
import ReactJson from 'react-json-view';

class PolicyList extends React.PureComponent {
  static defaultProps = {
    selectedRowKeys: [],
    onSelectChange: () => false,
    rowSelection: {},
    showHeader: false,
    disabledSelected: true,
    disabledDelete: false
  };

  _getColumns = () => {
    const { intl, disabledDelete, onItemDelete } = this.props;
    const deleteObj = !disabledDelete && [
      {
        title: 'Action',
        key: 'operation',
        render: (value, row) => (
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() =>
              Modal.confirm({
                title: intl.formatMessage({
                  id: 'display_del_hint_messages'
                }),
                okText: intl.formatMessage({ id: 'display_yes' }),
                cancelText: intl.formatMessage({ id: 'cancel' }),
                onOk: () => {
                  onItemDelete && onItemDelete(row);
                  return Promise.resolve();
                }
              })
            }
          />
        )
      }
    ];
    return [
      {
        title: intl.formatMessage({ id: 'display_userGroup_name' }),
        dataIndex: 'name',
        key: 'name',
        width: '30%'
        // render: value => !!value && !!value.slice && value.slice(-4)
      },
      {
        title: intl.formatMessage({ id: 'display_userGroupPolicy_policy' }),
        dataIndex: 'Statement',
        key: 'Statement',
        width: '40%',
        render: value => (
          <ReactJson
            name="Statement"
            src={value}
            shouldCollapse={() => true}
            enableClipboard={false}
          />
        )
      },
      {
        title: intl.formatMessage({ id: 'display_userGroupPolicy_createdAt' }),
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: '30%',
        render: value => moment(value).format('YYYY-MM-DD')
      },
      ...(deleteObj || [])
    ];
  };

  render() {
    const {
      dataSource,
      selectedRowKeys = [],
      onSelectChange,
      rowSelection,
      disabledSelected,
      pageSize,
      ...res
    } = this.props;
    const rowSelectionObj = !disabledSelected && {
      rowSelection: {
        selectedRowKeys: [...selectedRowKeys],
        onChange: onSelectChange,
        ...rowSelection
      }
    };
    const columns = this._getColumns();
    return (
      <Table
        pagination={
          dataSource && dataSource.length > pageSize
            ? pageSize
            : 5 && { pageSize: pageSize ? pageSize : 5 }
        }
        {...rowSelectionObj}
        rowKey={record => record._id}
        dataSource={dataSource}
        columns={columns}
        {...res}
      />
    );
  }
}

export default PolicyList;
