import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Modal } from 'antd';

import DropzoneFileList from './DropzoneFileList';

export const UPLOAD_ZONE_ACCEPT_TYPE = {
  IMAGE: '.png, .jpeg, .jpg',
  HTML: '.html',
  AVC: '.mp4, .ac3, .mov, .mp3, .avi',
  PDF: '.pdf',
  EXCEL: '.xlsx'
};

export default class Uploadzone extends React.PureComponent {
  static propTypes = {
    onUploadClick: PropTypes.func,
    onDropRejected: PropTypes.func,
    accept: PropTypes.string,
    _key: PropTypes.number,
    multiple: PropTypes.bool,
    isMain: PropTypes.bool,
    renderDropzoneContent: PropTypes.func
  };
  static defaultProps = {
    previewFiles: [],
    filemetaFiles: [],
    onUploadClick: () => true,
    onDropRejected: rejectedFiles => true,
    renderDropzoneContent: (
      intl,
      previewFiles,
      filemetaFiles,
      onRemoveFile,
      accept,
      fileMaxSize,
      multiple,
      isMain,
      labelFile
    ) =>
      DropzoneFileList(
        intl,
        previewFiles,
        filemetaFiles,
        onRemoveFile,
        accept,
        fileMaxSize,
        isMain,
        labelFile
      )
  };

  onDrop(acceptedFiles, rejectedFiles) {
    const { onDropRejected, onDrop } = this.props;
    if (rejectedFiles.length > 0) {
      onDropRejected(rejectedFiles);
    }
    if (onDrop) {
      onDrop(
        acceptedFiles.map(acceptedFile => {
          acceptedFile.preview = URL.createObjectURL(acceptedFile);
          return acceptedFile;
        })
      );
    }
  }
  renderDropzoneChildren = ({
    // isDragActive,
    // isDragReject,
    getRootProps,
    getInputProps
  }) => {
    const {
      intl,
      previewFiles,
      filemetaFiles,
      accept,
      _key,
      onRemoveFile,
      renderDropzoneContent,
      onRemoveFileByKey,
      maxSize,
      multiple,
      isMain,
      labelFile
    } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 150,
          borderWidth: 2,
          borderColor: '#eee',
          borderStyle: 'dashed',
          borderRadius: 10,
          outline: 'none',
          marginTop: 20,
          width: 150,
          height: 150,
          position: 'relative',
          cursor: 'pointer'
        }}
        // isDragActive={isDragActive}
        // isDragReject={isDragReject}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {renderDropzoneContent.bind(
          this,
          intl,
          previewFiles,
          filemetaFiles,
          (index, file) => {
            onRemoveFile(index, file);
          },
          accept,
          maxSize,
          multiple,
          isMain,
          labelFile
        )()}
        <div
          style={{
            position: 'absolute',
            top: 5,
            right: 7,
            border: '1px solid #eee',
            borderRadius: '50%',
            width: 23,
            textAlign: 'center',
            color: '#fff',
            backgroundColor: 'rgba(0,0,0,0.5)',
            cursor: 'pointer',
            display:
              previewFiles.length === 0 && filemetaFiles.length === 0
                ? 'none'
                : ''
          }}
          onClick={e => {
            e.stopPropagation();
            const splitFormatArray =
              (previewFiles && previewFiles[0]?.name?.split('.')) ||
              (filemetaFiles &&
                filemetaFiles[0]?.fileMeta?.displayName?.split('.'));
            const format =
              splitFormatArray && splitFormatArray[splitFormatArray.length - 1];
            const title =
              UPLOAD_ZONE_ACCEPT_TYPE.IMAGE.indexOf(format) >= 0
                ? intl.formatMessage({ id: 'msg.remove_photo' })
                : intl.formatMessage({ id: 'msg.remove_file' });
            Modal.confirm({
              title: title,
              okText: intl.formatMessage({ id: 'confirm' }),
              cancelText: intl.formatMessage({ id: 'cancel' }),
              onOk: () => {
                onRemoveFileByKey({}, _key);
                return Promise.resolve();
              }
            });
          }}
        >
          x
        </div>
      </div>
    );
  };

  render() {
    const {
      accept,
      multiple,
      disabled,
      maxSize,
      onRejected,
      labelFile
    } = this.props;
    return (
      <Dropzone
        disabled={disabled}
        accept={accept}
        multiple={multiple}
        labelFile={labelFile}
        onDrop={this.onDrop.bind(this)}
        maxSize={maxSize}
        onDropRejected={onRejected}
      >
        {this.renderDropzoneChildren}
      </Dropzone>
    );
  }
}
