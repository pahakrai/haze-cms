import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FileCard from './_NewFileCard';

const FileListWrapper = styled.div``;
export default class FileList extends React.PureComponent {
  static propTypes = {
    // files should be array of FileMeta documents
    files: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        uri: PropTypes.string,
        thumbnailUri: PropTypes.string,
        fileExtension: PropTypes.string,
        displayName: PropTypes.string,
        size: PropTypes.number
      })
    ),
    onDeleteClick: PropTypes.func
  };
  static defaultProps = {
    files: [],
    onDeleteClick: () => true,
    itemComponent: FileCard
  };
  render() {
    const {
      intl,
      files,
      onDeleteClick,
      onRemoveFileByKey,
      disableDelete,
      uploadReview,
      itemComponent: ItemComponent,
      _key = 0,
      showThumbnail = false
    } = this.props;
    return (
      <FileListWrapper>
        {files.map((file, index) => (
          <ItemComponent
            intl={intl}
            key={index}
            uploadReview={uploadReview}
            fileMeta={file.fileMeta ? file.fileMeta : file}
            index={index}
            _key={_key}
            showThumbnail={showThumbnail}
            disableDelete={disableDelete}
            onDeleteClick={onDeleteClick.bind(this, file)}
            onRemoveFileByKey={onRemoveFileByKey}
          />
        ))}
      </FileListWrapper>
    );
  }
}
