import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import DropzoneFileList from '../Upload/DropzoneFileList'

export const UPLOAD_ZONE_ACCEPT_TYPE = {
  IMAGE: '.png, .jpeg, .jpg'
}

export default class Uploadzone extends React.PureComponent {
  static propTypes = {
    onUploadClick: PropTypes.func,
    onDropRejected: PropTypes.func,
    accept: PropTypes.string,
    renderDropzoneContent: PropTypes.func
  }
  static defaultProps = {
    files: [],
    onUploadClick: () => true,
    onDropRejected: (rejectedFiles) => true,
    renderDropzoneContent: (files, onRemoveFile, accept, fileMaxSize) =>
      DropzoneFileList(files, onRemoveFile, accept, fileMaxSize)
  }

  onDrop(acceptedFiles, rejectedFiles) {
    const { onDropRejected, onDrop } = this.props
    if (rejectedFiles.length > 0) {
      onDropRejected(rejectedFiles)
    }
    if (onDrop) {
      onDrop(
        acceptedFiles.map((acceptedFile) => {
          acceptedFile.preview = URL.createObjectURL(acceptedFile)
          return acceptedFile
        })
      )
    }
  }
  renderDropzoneChildren = ({
    // isDragActive,
    // isDragReject,
    getRootProps,
    getInputProps
  }) => {
    const {
      files,
      accept,
      onRemoveFile,
      renderDropzoneContent,
      renderDropzoneChildren,
      childrenContainerStyle,
      maxSize
    } = this.props

    return (
      <div style={childrenContainerStyle} {...getRootProps()}>
        <input {...getInputProps()} />
        {renderDropzoneChildren
          ? renderDropzoneChildren
          : renderDropzoneContent.bind(
              this,
              files,
              (index, file) => {
                onRemoveFile(index, file)
              },
              accept,
              maxSize
            )()}
      </div>
    )
  }

  render() {
    const { accept, multiple, disabled, maxSize, onRejected } = this.props

    return (
      <Dropzone
        disabled={disabled}
        accept={accept}
        multiple={multiple}
        maxSize={maxSize}
        onDrop={this.onDrop.bind(this)}
        onDropRejected={onRejected}
      >
        {this.renderDropzoneChildren}
      </Dropzone>
    )
  }
}
