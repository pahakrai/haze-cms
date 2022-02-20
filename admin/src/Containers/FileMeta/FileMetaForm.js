import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import FileMetaForm from '../../Components/App/FileMeta/FileMetaForm';
import Loading from '../../Components/Common/Loading';
import { getFileMetaById } from '../../Redux/selectors';
import { FileMetaActions } from '../../Redux/FileMeta/actions';
import { getCurrentWorkspace } from '../../Redux/Account/selectors';
import FormName from '../../Constants/Form';

class FileMetaContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }
  static defaultProps = {
    onSubmitSuccess: () => true
  };

  componentDidMount() {
    const { fileMetaId, fetchFileMetaById } = this.props;
    if (fileMetaId) {
      fetchFileMetaById(fileMetaId);
    }
  }

  onSubmit(fileMeta) {
    let formatFileMeta = Object.assign({}, fileMeta);
    const newImages = [];
    const { createFileMeta, updateFileMeta } = this.props;
    const fn = formatFileMeta._id ? updateFileMeta : createFileMeta;
    if (fileMeta.files.length) {
      if (fileMeta.files[0].fileMeta) {
        formatFileMeta.uri = fileMeta.files[0].fileMeta.uri;
        formatFileMeta.folder = fileMeta.files[0].fileMeta.folder;
        formatFileMeta.thumbnailUri = fileMeta.files[0].fileMeta.thumbnailUri;
        formatFileMeta.fileExtension = fileMeta.files[0].fileMeta.fileExtension;
      } else {
        newImages.push(fileMeta.files[0]);
      }
    }
    fn(formatFileMeta, newImages);
  }

  onSubmitSuccess() {
    const { onSubmitSuccess, fetchFileMetas, history } = this.props;
    fetchFileMetas();
    onSubmitSuccess();
    history.push('/files');
  }
  render() {
    let isLoading = true; // dummy
    let initialValues = {};
    const {
      intl,
      locale,
      fileMetaId,
      currentFileMeta,
      isUpdateForm,
      form,
      currentWorkspaceId
    } = this.props;
    if (currentFileMeta) {
      isLoading = false;
      initialValues = Object.assign({}, currentFileMeta, {
        files: [{ fileMeta: currentFileMeta }]
      });
    }
    if (!fileMetaId) {
      isLoading = false;
    }
    return isLoading ? (
      <Loading />
    ) : (
      <FileMetaForm
        intl={intl}
        locale={locale}
        form={form}
        isUpdateForm={isUpdateForm}
        initialValues={
          fileMetaId
            ? initialValues
            : {
                files: [],
                folder: `${process.env.REACT_APP_UPLOAD_FOLDER}/${currentWorkspaceId}`
              }
        }
        onSubmit={this.onSubmit.bind(this)}
        onSubmitSuccess={this.onSubmitSuccess.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { FILE_UPDATE, FILE_CREATE } = FormName;
  const isUpdateForm = Boolean(ownProps.fileMetaId);
  const form = isUpdateForm ? FILE_UPDATE : FILE_CREATE;
  const currentWorkspace = getCurrentWorkspace(state);
  return {
    locale: state.intl.locale,
    currentFileMeta: getFileMetaById(state, ownProps.fileMetaId),
    fileMetaId: ownProps.fileMetaId,
    isUpdateForm,
    form,
    currentWorkspaceId:
      currentWorkspace && currentWorkspace._id
        ? currentWorkspace._id
        : undefined
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createFileMeta: FileMetaActions.createFileMeta,
      updateFileMeta: FileMetaActions.updateFileMeta,
      fetchFileMetas: FileMetaActions.getFileMetas,
      fetchFileMetaById: FileMetaActions.getFileMetaById
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FileMetaContainer)
);
