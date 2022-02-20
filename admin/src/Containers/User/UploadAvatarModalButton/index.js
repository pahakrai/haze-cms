import React, { useState, useEffect, useCallback } from 'react';
import { normalize } from 'normalizr';
import { useDispatch } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import ImageEditor from 'react-cropper';
import Dropzone from 'react-dropzone';
import { FormattedMessage } from 'react-intl';

import { updateUserAvatar } from '../../../Services/APIServices/UserService';
import { entities as Schemas } from '../../../Services/Schemas';
import ResourceActions from '../../../Redux/Resources/actions';
import { humanFileSize, base64ToFile } from '../../../Lib/util';
import { toast } from '../../../Lib/Toast';

import Modal from '../../../Components/Modal';
import Button from '../../../Components/Common/Button';
import Loading from '../../../Components/Common/Loading';

import MetaFileList from './MetaFileList';

const Accept = '.png, .jpeg, .jpg';
const fileMaxSize = 1050000 * 2;

const UploadAvatarModalButton = ({ renderButton, intl, userId, theme }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageEditor, setImageEditor] = useState();
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (modalOpen) {
      setPreview('');
    }
  }, [modalOpen]);

  const onDropRejected = files => {
    const file = files && files[0];
    if (file) {
      if (file.size > fileMaxSize) {
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
            { name: file.name }
          )
        );
      }
    }
  };

  const onConfirm = async () => {
    setLoading(true);
    try {
      if (typeof imageEditor !== 'undefined') {
        const file = base64ToFile(
          imageEditor.getCroppedCanvas().toDataURL(),
          Date.now() + '.png'
        );
        const result = await updateUserAvatar(userId, [file]);
        if (result && result.data && result.data._id) {
          const { entities } = normalize([result.data], [Schemas.userSchema]);
          dispatch(ResourceActions.addEntities(entities));
          toast.success(<FormattedMessage id="updated_successfully" />);
        } else {
          toast.error(<FormattedMessage id="updated_failure" />);
        }
      }
    } catch (e) {
      toast.error(<FormattedMessage id="updated_failure" />);
    } finally {
      setLoading(false);
      setModalOpen(false);
    }
  };

  const onDone = async files => {
    if (files[0] && files[0].fileMeta) {
      const file = files[0].fileMeta;

      setPreview(file.uri);
    } else if (files[0]) {
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  const onEditorInitialized = useCallback(instance => {
    setImageEditor(instance);
  }, []);

  const onClear = () => {
    if (imageEditor) {
      imageEditor.clear();
      imageEditor.reset();
    }
    setPreview('');
  };

  return (
    <div>
      {renderButton && renderButton(() => setModalOpen(true))}
      <Modal.Default
        shouldOpenModal={modalOpen}
        title={intl.formatMessage({
          id: 'display_user_avatar'
        })}
        contentStyle={{ width: '100%', maxWidth: 600 }}
        onModalClose={() => setModalOpen(false)}
        content={() => {
          if (loading) {
            return (
              <LoadingWrapper>
                <Loading isLoading fill={false} />
              </LoadingWrapper>
            );
          }
          return (
            <Content>
              <UploadContent>
                <div style={{ width: 240 }}>
                  <Dropzone
                    onDrop={onDone}
                    onDropRejected={onDropRejected}
                    maxSize={fileMaxSize}
                    disableClick={!!preview}
                    accept=".png, .jpeg, .jpg"
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps({
                          onClick: event => preview && event.stopPropagation()
                        })}
                        style={{
                          outline: 'none',
                          border: 'none'
                        }}
                      >
                        <EditorWraper>
                          {preview && (
                            <ImageEditor
                              crossOrigin="anonymous"
                              src={preview}
                              preview=".img-preview"
                              className="avatar-editor"
                              zoomable={false}
                              viewMode={2}
                              aspectRatio={1}
                              onInitialized={onEditorInitialized}
                            />
                          )}
                        </EditorWraper>
                        <input {...getInputProps()} />
                      </div>
                    )}
                  </Dropzone>
                  <div>
                    {intl.formatMessage(
                      {
                        id: 'display_upload_photo_format_info'
                      },
                      { size: humanFileSize(fileMaxSize) }
                    )}
                  </div>
                </div>
                <div style={{ marginLeft: 10 }}>
                  <ImagePreview>
                    {preview && <div className="img-preview" />}
                  </ImagePreview>
                  <div style={{ margin: '15px 0px', textAlign: 'center' }}>
                    or
                  </div>
                  <MetaFileList accept={Accept} onDone={onDone} />
                </div>
              </UploadContent>
              <Button.Center topMargin>
                <Button.Primary
                  disabled={!preview}
                  onClick={() => {
                    onConfirm();
                  }}
                >
                  {intl.formatMessage({ id: 'update_btn' })}
                </Button.Primary>
                <Button.Secondary style={{ marginLeft: 20 }} onClick={onClear}>
                  {intl.formatMessage({ id: 'clear_up' })}
                </Button.Secondary>
              </Button.Center>
            </Content>
          );
        }}
      />
    </div>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 347px;
`;
const UploadContent = styled.div`
  display: flex;
  flex-direction: row;
`;
const EditorWraper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  backgroundcolor: grey;
  height: 240px;
  width: 240px;
  overflow: hidden;
  background-image: url('/images/gray_grid.png');
  & .cropper-bg,
  & .avatar-editor {
    background-image: unset;
  }
  & .avatar-editor {
    height: 240px;
    width: 240px;
  }
`;
const ImagePreview = styled('div')`
  overflow: hidden;
  width: 120px;
  height: 120px;
  background-image: url('/images/gray_grid.png');
  border: 1px solid #efefef;
  border-radius: 50%;
  & > .img-preview {
    width: 100%;
    height: 100%;
  }
`;

export default withTheme(UploadAvatarModalButton);
