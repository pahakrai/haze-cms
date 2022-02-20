import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { humanFileSize } from '../../../../../Lib/util';
import { toast } from '../../../../../Lib/Toast';

import FileMetaImage from '../../../../../Containers/FileMetaImage';

import { ErrorMessage } from '../../../../../Components/Form/Errors';
import Button from '../../../../../Components/Common/Button';
import Uploadzone from '../../../../../Components/Common/Uploadzone';
import ImageDisplayModalComponent from '../../../../../Components/ImageDisplayModal';

import VideoPreviewImage from '../../../../../Containers/FileMetaImage/VideoPreviewImage';

const EmptyUploadContent = styled('div')`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100px;
  background-color: #efefef;
`;
const FileAccept = '.png, .jpeg, .jpg, .mp4, .avi, .wmv, .mov';

class MediaImageInput extends PureComponent {
  defaultProps = {
    fileMaxSize: 1050000 * 20
  };
  state = {
    shouldOpenModal: false
  };
  onRejected = rejectedFiles => {
    const { intl, fileMaxSize } = this.props;
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
  onDone = (files, rejectedFiles) => {
    const {
      input: { onChange }
    } = this.props;
    if (files && files[0]) {
      onChange(files[0]);
    }
  };
  onCloseModal = () => {
    this.setState({
      shouldOpenModal: false
    });
  };
  render() {
    const { shouldOpenModal } = this.state;
    const {
      input: { value },
      meta: { error, touched },
      fileMaxSize
    } = this.props;
    const preview = value && value.preview ? value.preview : null;
    const isVideo = /video/.test(value.type);
    const imageProps = {};

    if (preview) {
      imageProps.src = preview;
    } else if (value) {
      imageProps.fileMetaId = value;
    }
    return (
      <div>
        <Uploadzone
          accept={FileAccept}
          multiple={false}
          maxSize={fileMaxSize}
          onDrop={this.onDone}
          onRejected={this.onRejected}
          childrenContainerStyle={{ height: '100%' }}
          renderDropzoneChildren={
            <React.Fragment>
              {imageProps.fileMetaId || imageProps.src ? (
                <FileMetaImage
                  alt="media image"
                  style={{ objectFit: 'cover', width: 100, height: 100 }}
                  component={isVideo ? VideoPreviewImage : undefined}
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
                    <FormattedMessage style id={'msg.upload_file'} />
                  </span>
                </EmptyUploadContent>
              )}
            </React.Fragment>
          }
        />
        {error && touched && <ErrorMessage>{error}</ErrorMessage>}
        {imageProps.fileMetaId && (
          <>
            <Button
              type="button"
              onClick={() => this.setState({ shouldOpenModal: true })}
            >
              <FormattedMessage style id={'preview'} />
            </Button>
            <ImageDisplayModal
              fileMeta={imageProps.fileMetaId}
              shouldOpenModal={shouldOpenModal}
              onCancel={this.onCloseModal}
            />
          </>
        )}
      </div>
    );
  }
}
export default props => {
  return <Field component={MediaImageInput} {...props} />;
};

const _ImageDisplayModal = ({ fileMeta, ...props }) => (
  <ImageDisplayModalComponent
    fileMetas={fileMeta ? [fileMeta] : []}
    {...props}
  />
);
const ImageDisplayModal = props => (
  <FileMetaImage
    component={_ImageDisplayModal}
    fileMetaId={props.fileMeta}
    {...props}
    fileMeta={undefined}
  />
);
