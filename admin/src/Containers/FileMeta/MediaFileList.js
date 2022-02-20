import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { toast } from '../../Lib/Toast';

import { FileMetaActions } from '../../Redux/FileMeta/actions';
import { getFileMetas } from '../../Redux/selectors';

import MediaFileList from '../../Components/App/FileMeta/MediaFileList';

class MetaFileListContainer extends React.PureComponent {
  componentDidMount() {
    const { fetchFileMetas } = this.props;
    fetchFileMetas();
  }

  onDeleteClick = _id => {
    const { deleteFileMeta } = this.props;
    deleteFileMeta(_id);
  };

  onItemClick = (fileMeta, _id) => {
    const { history, setSelected } = this.props;
    setSelected(_id);
    history.push(`/files/${_id}`);
  };

  componentDidUpdate(prevProps) {
    const { deleted, deleteFileMetaError } = this.props;
    if (deleted && deleted !== prevProps.deleted) {
      toast.success('Delete success');
    }
    if (deleteFileMetaError) {
      toast.error(deleteFileMetaError.message);
    }
  }

  onSearch = q => {
    const { fetchFileMetas } = this.props;

    fetchFileMetas({ q });
  };

  render() {
    const {
      intl,
      fileMetas,
      selectedIds,
      pageSize,
      onItemClick,
      onDeleteClick,
      disableDelete,
      loading
    } = this.props;

    return (
      <MediaFileList
        intl={intl}
        loading={loading}
        pageSize={pageSize}
        selectedIds={selectedIds}
        fileMetas={fileMetas}
        disableDelete={disableDelete}
        onItemClick={onItemClick || this.onItemClick}
        onDeleteClick={onDeleteClick || this.onDeleteClick}
        onSearch={this.onSearch}
      />
    );
  }
}
const mapStateToProps = state => ({
  loading: state.loading.getFileMetas,
  fileMetas: getFileMetas(state),
  deleteFileMetaError: state.error.deleteFileMeta,
  deleted: state.fileMeta.deleted
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchFileMetas: FileMetaActions.getFileMetas,
      deleteFileMeta: FileMetaActions.deleteFileMeta,
      setSelected: FileMetaActions.setSelected
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MetaFileListContainer)
);
