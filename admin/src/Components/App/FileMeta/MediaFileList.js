import React, { useState } from 'react';
import { List, Space } from 'antd';

import FileCard from '../../Upload/FileCard';
import Button from '../../Common/Button';
import TextInput from '../../Common/TextInput';

class MediaFileList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static defaultProps = {
    onItemClick: () => true,
    pageSize: 10,
    selectedIds: []
  };

  _renderItem(fileMeta) {
    const {
      disableDelete,
      onDeleteClick,
      onItemClick,
      selectedIds
    } = this.props;
    const selected = selectedIds.includes(fileMeta._id);

    return (
      <FileCard
        disableDelete={disableDelete}
        onDeleteClick={onDeleteClick}
        onClick={onItemClick}
        fileMeta={fileMeta}
        selected={selected}
      />
    );
  }

  render() {
    const { fileMetas, pageSize, intl, onSearch, loading } = this.props;

    return (
      <List
        itemLayout="vertical"
        size="large"
        loading={loading}
        header={<Header onSearch={onSearch} intl={intl} />}
        dataSource={fileMetas}
        renderItem={this._renderItem.bind(this)}
        pagination={{
          onChange: page => {},
          pageSize
        }}
      />
    );
  }
}

const Header = ({ onSearch, intl }) => {
  const [value, setValue] = useState('');

  return (
    <Space>
      <TextInput
        placeholder={intl.formatMessage({ id: 'search_placeholder' })}
        value={value}
        onChange={setValue}
      />
      <Button.Primary onClick={() => onSearch?.(value)} margin={false}>
        {intl.formatMessage({
          id: 'search'
        })}
      </Button.Primary>
    </Space>
  );
};

export default MediaFileList;
