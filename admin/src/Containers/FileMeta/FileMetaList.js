import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { toast } from '../../Lib/Toast';

import { FileMetaActions } from '../../Redux/FileMeta/actions';
import { getFileMetas } from '../../Redux/selectors';

import Loading from '../../Components/Common/Loading';
import FileMetaList from '../../Components/App/FileMeta/FileMetaList';

class FileMetaListContainer extends React.PureComponent {
  componentDidMount() {
    const { fetchFileMetas } = this.props;
    fetchFileMetas();
  }

  filter = (fileMetas, searchTerm = '') => {
    if (!searchTerm) {
      return fileMetas;
    }
    const sTerm = searchTerm.toLowerCase();
    return fileMetas.filter(fileMeta => {
      // filtering logic with searchTerm
      const { displayName, uri, originalName } = fileMeta;
      return [displayName, uri, originalName].some(v =>
        v.toLowerCase().includes(sTerm)
      );
    });
  };

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

  render() {
    let isLoading = true; // dummy var
    const {
      intl,
      fileMetas,
      searchTerm,
      selectedIds,
      pageSize,
      onItemClick,
      onDeleteClick,
      disableDelete
    } = this.props;
    // filter fileMeta with searchTerm
    const filteredFileMetas = this.filter(fileMetas, searchTerm);
    if (fileMetas) {
      isLoading = false;
    }
    return isLoading ? (
      <Loading />
    ) : (
      <FileMetaList
        intl={intl}
        pageSize={pageSize}
        selectedIds={selectedIds}
        fileMetas={filteredFileMetas}
        disableDelete={disableDelete}
        onItemClick={onItemClick || this.onItemClick}
        onDeleteClick={onDeleteClick || this.onDeleteClick}
      />
    );
  }
}
const mapStateToProps = state => ({
  fileMetas: getFileMetas(state),
  searchTerm: state.fileMeta.searchTerm,
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
  connect(mapStateToProps, mapDispatchToProps)(FileMetaListContainer)
);
