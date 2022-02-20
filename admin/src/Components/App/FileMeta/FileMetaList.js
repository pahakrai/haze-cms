import React from 'react';
import { List } from 'antd';
import FileCard from '../../Upload/_NewFileCard';

class FileMetaList extends React.PureComponent {
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
        isFilePageList
      />
    );
  }

  render() {
    const { fileMetas, pageSize } = this.props;

    return (
      <List
        itemLayout="vertical"
        size="large"
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

export default FileMetaList;
