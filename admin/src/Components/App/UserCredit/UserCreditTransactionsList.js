import React from 'react'
// common
import * as Common from '@golpasal/common'
// antd
import { Table } from 'antd'
// Time
import moment from 'moment'

class UserCreditTransactionsList extends React.PureComponent {
  static defaultProps = {
    selectedRowKeys: [],
    onSelectChange: () => false,
    rowSelection: {},
    disabledSelected: true,
    disabledDelete: false
  }

  _getColumns = () => {
    const { intl, amountType } = this.props
    return [
      {
        title:
          intl && intl.formatMessage({ id: 'display_userGroupPolicy_code' }),
        dataIndex: '_id',
        key: '_id',
        render: (value) => !!value && !!value.slice && value.slice(-4)
      },
      {
        title: intl && intl.formatMessage({ id: 'display_user_credit_type' }),
        dataIndex: 'transactionType',
        key: 'transactionType',
        render: (value) =>
          (
            Common.helpers.getConstantByValue(
              'type',
              'TransactionType',
              value,
              intl.locale
            ) || { text: value }
          ).text,
        align: 'center'
      },
      {
        title:
          intl && intl.formatMessage({ id: 'display_user_credit_description' }),
        dataIndex: 'description',
        key: 'description',
        align: 'center',
        ellipsis: true,
        width: '30%'
      },
      {
        title:
          intl &&
          intl.formatMessage({
            id:
              amountType === Common.default.type.AmountType.CASH
                ? 'display_user_credit_cash'
                : 'display_user_credit_point'
          }),
        dataIndex: 'amount',
        render: (value, { transactionType }) => {
          return transactionType === Common.default.type.TransactionType.OUT
            ? `-${value}`
            : value
        },
        key: 'amount',
        align: 'center'
      },
      {
        title:
          intl && intl.formatMessage({ id: 'display_user_credit_balance' }),
        dataIndex: 'balance',
        key: 'balance',
        align: 'center'
      },
      {
        title:
          intl &&
          intl.formatMessage({ id: 'display_user_credit_transactionDate' }),
        dataIndex: 'transactionDate',
        key: 'transactionDate',
        render: (value) => moment(value).format('YYYY-MM-DD HH:mm:ss'),
        align: 'center'
      }
    ]
  }

  render() {
    const {
      dataSource,
      selectedRowKeys = [],
      onSelectChange,
      rowSelection,
      disabledSelected,
      onItemClick,
      ...res
    } = this.props
    const rowSelectionObj = !disabledSelected && {
      rowSelection: {
        selectedRowKeys,
        onChange: onSelectChange,
        ...rowSelection
      }
    }
    const columns = this._getColumns()

    return (
      <Table
        pagination={dataSource && dataSource.length > 5 && { pageSize: 5 }}
        {...rowSelectionObj}
        rowKey={(record) => record._id}
        dataSource={dataSource}
        columns={columns}
        onRow={(record) => {
          return {
            onClick: () => onItemClick(record._id)
          }
        }}
        {...res}
      />
    )
  }
}

export default UserCreditTransactionsList
