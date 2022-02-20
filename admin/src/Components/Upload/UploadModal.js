import React from 'react';
import { Button as AntButton } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { toast } from '../../../Lib/Toast';
import Modal from '../../Components/Modal';
import Button from '../../Components/Common/Button';
import Uploadzone from '../../Components/Upload/Uploadzone';
import MdCloudUpload from 'react-icons/lib/md/cloud-upload';
import styled from 'styled-components';
import H3 from '../Common/H3';
import FileList from './FileList';

const ModalHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: -32px;
  margin-bottom: 30px;
  padding: 10px 32px;
  border-bottom: 1px solid rgb(226, 226, 226);
  align-items: center;
`;

const ModalFooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
  padding: 10px 32px;
  border-top: 1px solid rgb(226, 226, 226);
  align-items: center;
`;

const ModalHeader = ({ title, closeModal, clearFiles }) => {
  return (
    <ModalHeaderContainer>
      <H3>{title}</H3>
      <AntButton
        type="primary"
        danger
        icon={<CloseOutlined />}
        onClick={() => {
          clearFiles();
          closeModal();
        }}
      />
    </ModalHeaderContainer>
  );
};

const ModalFooter = ({ closeModal }) => {
  return (
    <ModalFooterContainer>
      <AntButton type="primary" onClick={closeModal}>
        <FormattedMessage id={'upload_btn'} />
      </AntButton>
    </ModalFooterContainer>
  );
};

export default class UploadModalContainer extends React.PureComponent {
  render() {
    const {
      title,
      files,
      onDrop,
      onRemoveFile,
      onDeleteClick,
      onUploadClick,
      intl,
      accept,
      uploadedFiles,
      noNeedUploadBtn,
      clearFiles
    } = this.props;
    return (
      <Modal.Button
        header={({ title, closeModal }) =>
          ModalHeader({ title, closeModal, clearFiles })
        }
        footer={({ closeModal }) => ModalFooter({ closeModal })}
        showFooter={true}
        text={intl.formatMessage({ id: 'upload_btn' })}
        title={title ? title : 'Upload Form'}
        button={openModal => (
          <Button type="button" onClick={openModal}>
            <MdCloudUpload size={30} />
          </Button>
        )}
        content={closeModal => (
          <div>
            <Uploadzone
              onRemoveFile={onRemoveFile}
              onDrop={onDrop}
              noNeedUploadBtn={noNeedUploadBtn}
              files={files}
              accept={accept}
              onDropRejected={rejectedFiles => {
                toast.error(
                  `${rejectedFiles.map(f => f.name).join(',\n')} rejected`
                );
              }}
              onUploadClick={onUploadClick}
              onDeleteClick={onDeleteClick}
            />
            {uploadedFiles && (
              <FileList files={uploadedFiles} onDeleteClick={onDeleteClick} />
            )}
          </div>
        )}
      />
    );
  }
}
