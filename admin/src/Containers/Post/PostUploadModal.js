import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from '../../../Lib/Toast';
import Modal from '../../Components/Modal';
import Button from '../../Components/Common/Button';
import Uploadzone from '../../Components/Upload/Uploadzone';
import FileList from '../../Components/Upload/FileList';
import { MdCloudUpload } from 'react-icons/md';
import { withRouter } from 'react-router-dom';

class PostUploadButtonContainer extends React.PureComponent {
  render() {
    const {
      files,
      uploadedFiles,
      onDrop,
      onRemoveFile,
      onDeleteClick,
      intl
    } = this.props;
    return (
      <Modal.Button
        text={intl.formatMessage({ id: 'upload_btn' })}
        title={'Upload Form'}
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
              noNeedUploadBtn={true}
              files={files}
              accept=".png, .jpeg, .jpg"
              onDropRejected={rejectedFiles => {
                toast.error(
                  `${rejectedFiles.map(f => f.name).join(',\n')} rejected`
                );
              }}
            />
            <FileList files={uploadedFiles} onDeleteClick={onDeleteClick} />
          </div>
        )}
      />
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostUploadButtonContainer)
);
