import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { humanFileSize } from '../../../../../Lib/util';
import { toast } from '../../../../../Lib/Toast';

import FileMetaImage from '../../../../../Containers/FileMetaImage';
import FileMetaModal from '../../../../../Containers/FileMeta/FileMetaModal';

import Uploadzone from '../../../../Common/Uploadzone';

const EmptyUploadContent = styled('div')`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-right: 15px;
  background-color: #efefef;
`;
const fileMaxSize = 819200;
const Accept = '.png, .jpeg, .jpg';

class ProductSpecIcon extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedFileMeta: []
    };
  }
  onRejected = rejectedFiles => {
    const { intl } = this.props;
    const rejectedFile = rejectedFiles && rejectedFiles[0];
    if (rejectedFile) {
      if (rejectedFile.size > fileMaxSize) {
        toast.warn(
          intl.formatMessage(
            {
              id: 'upload.images.error'
            },
            { size: humanFileSize(fileMaxSize) }
          )
        );
      } else {
        toast.warn(
          intl.formatMessage(
            {
              id: 'error.file.reject_file'
            },
            { name: rejectedFile.name }
          )
        );
      }
    }
  };
  onDone = files => {
    const {
      input: { onChange }
    } = this.props;
    if (files[0]) {
      onChange(files[0]);
    }
  };
  onDone2 = files => {
    const {
      input: { onChange }
    } = this.props;
    if (files[0]) {
      this.setState({ selectedFileMeta: [files[0].fileMeta] });
      onChange(files[0].fileMeta);
    }
  };
  onFileMetaItemClick = fileMeta => {
    if (Accept.indexOf(fileMeta.fileExtension) < 0) {
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
  render() {
    const {
      input: { value },
      intl
    } = this.props;
    const { selectedFileMeta } = this.state;
    const preview = value && value.preview ? value.preview : null;
    const imageProps = {};
    if (preview) {
      imageProps.src = preview;
    } else if (value) {
      imageProps.fileMetaId = value;
    }
    return (
      <div>
        <Uploadzone
          accept={Accept}
          multiple={false}
          maxSize={fileMaxSize}
          onDrop={this.onDone}
          onRejected={this.onRejected}
          childrenContainerStyle={{ height: '100%' }}
          renderDropzoneChildren={
            <React.Fragment>
              {imageProps.fileMetaId || imageProps.src ? (
                <FileMetaImage
                  height={50}
                  alt="sku"
                  // defaultImage={'images/not_found.png'}
                  // fileMetaId={value}
                  style={{ objectFit: 'cover', maxWidth: '100%' }}
                  {...imageProps}
                />
              ) : (
                <EmptyUploadContent>
                  <span
                    style={{
                      width: '80%',
                      textAlign: 'center',
                      whiteSpace: 'break-spaces'
                    }}
                  >
                    <FormattedMessage style id={'upload_image'} />
                  </span>
                </EmptyUploadContent>
              )}
            </React.Fragment>
          }
        />
        <FileMetaModal
          label={intl.formatMessage({
            id: 'display_media_library_selection'
          })}
          disableDelete={true}
          selectedIds={selectedFileMeta.map(fm => fm._id)}
          onItemClick={this.onFileMetaItemClick}
          onDone={this.onDone2.bind(
            this,
            selectedFileMeta.map(fileMeta => ({ fileMeta }))
          )}
        />
      </div>
    );
  }
}

export default ProductSpecIcon;
