import React, { PureComponent } from 'react';
// antd
import { Table, Tooltip, Button } from 'antd';
// Time
import moment from 'moment';

export class DriverFeedback extends PureComponent {
  _getColumns = () => {
    const { intl } = this.props;
    return [
      {
        title: 'ID',
        dataIndex: '_id',
        key: '_id',
        align: 'center',
        render: v => (
          <Tooltip placement="top" title={v}>
            {(v || '').slice(0, 4)}
          </Tooltip>
        )
      },
      {
        title: intl && intl.formatMessage({ id: 'display_tag_text' }),
        dataIndex: 'text',
        align: 'center',
        key: 'text'
      },
      {
        title: intl && intl.formatMessage({ id: 'display_tag_link' }),
        render: v => (
          <Button
            onClick={() => {
              if (v.refType === 'Recruitments') {
                window.location.href = `/recruitment-posts/${v.ref}`;
              } else {
                window.location.href = `/${v.refType
                  .split(/(?=[A-Z])/)
                  .join('-')
                  .toLowerCase()}/${v.ref}`;
              }
            }}
          >
            {intl.formatMessage({ id: 'display_tag_link' })}
          </Button>
        )
      },
      {
        title: intl && intl.formatMessage({ id: 'display_createAt' }),
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: value => moment(value).format('YYYY-MM-DD HH:mm:ss'),
        align: 'center'
      }
    ];
  };
  render() {
    const { tagsText, loading, pagination } = this.props;
    const columns = this._getColumns();

    return (
      <Table
        pagination={pagination}
        loading={loading}
        rowKey={record => record._id}
        dataSource={tagsText}
        columns={columns}
      />
    );
  }
}

export default DriverFeedback;
