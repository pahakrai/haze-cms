import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { humanFileSize } from '../../../../Lib/util';
import { toast } from '../../../../Lib/Toast';

import FileMetaImage from '../../../../Containers/FileMetaImage';

import Uploadzone from '../../../../Components/Common/Uploadzone';

const EmptyUploadContent = styled('div')`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  padding-bottom: 15px;
  background-color: #efefef;
`;
const fileMaxSize = 819200;
const Accept = '.png, .jpeg, .jpg';
class ProductSkuImageInput extends PureComponent {
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
  render() {
    const {
      input: { value }
    } = this.props;
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
      </div>
    );
  }
}
export default props => {
  return <Field component={ProductSkuImageInput} {...props} />;
};
