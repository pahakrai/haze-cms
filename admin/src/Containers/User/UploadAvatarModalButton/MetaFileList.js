import React, { PureComponent } from 'react';
import styled from 'styled-components';
import FileMetaModal from '../../../Containers/FileMeta/FileMetaModal';

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export class MetaFileList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedFileMeta: []
    };
  }
  onFileMetaItemClick = fileMeta => {
    const { accept } = this.props;
    if (accept.indexOf(fileMeta.fileExtension) < 0) {
      return false;
    }
    if (!this.props.multiple) {
      this.setState({ selectedFileMeta: [fileMeta] });
      return;
    }
    const newSelected = [...this.state.selectedFileMeta];
    const index = newSelected.findIndex(fm => fm._id === fileMeta._id);
    if (index > -1) {
      // remove from array
      newSelected.splice(index, 1);
    } else {
      newSelected.push(fileMeta);
    }
    this.setState({ selectedFileMeta: newSelected });
  };
  onDone = () => {
    const { selectedFileMeta } = this.state;
    const { onDone } = this.props;
    onDone(selectedFileMeta.map(fileMeta => ({ fileMeta })));
  };
  render() {
    const { selectedFileMeta } = this.state;

    return (
      <Content>
        <FileMetaModal
          disableDelete
          onItemClick={this.onFileMetaItemClick}
          selectedIds={selectedFileMeta.map(fm => fm._id)}
          onDone={this.onDone}
        />
      </Content>
    );
  }
}

export default MetaFileList;
