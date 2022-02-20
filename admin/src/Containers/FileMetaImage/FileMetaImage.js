import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// redux
import { FileMetaActions } from '../../Redux/FileMeta/actions';

import VideoPreviewImage from './VideoPreviewImage';

const Image = ({ fileMeta, getFileMetaById, ...props }) => (
  <img {...props} alt={props.alt} />
);
class FileMetaImage extends PureComponent {
  componentDidMount() {
    const { fileMeta, fileMetaId, getFileMetaById } = this.props;
    if (!fileMeta && fileMetaId) {
      // function to get fileMeta if fileMeta not in the resources or schema is old
      getFileMetaById([fileMetaId]);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { fileMeta, fileMetaId, getFileMetaById } = this.props;
    if (!fileMeta && fileMetaId !== prevProps.fileMetaId) {
      // function to get fileMeta if fileMeta not in the resources or schema is old
      getFileMetaById([fileMetaId]);
    }
  }
  render() {
    const {
      uri,
      srcPropsName = 'src',
      fileMetaPropsName = 'fileMeta',
      component: _Comp = Image,
      thumbnailUri,
      fileMeta,
      fileMetaId,
      defaultImage = null,
      ...props
    } = this.props;
    let Comp = _Comp;

    if (fileMeta && /video/.test(fileMeta.mimetype || '') && Comp === Image) {
      Comp = VideoPreviewImage;
    }
    return (
      <Comp
        {...{
          [srcPropsName]: uri ? uri : defaultImage,
          [fileMetaPropsName]: fileMeta,
          ...props
        }}
      />
    );
  }
}
// fileMeta @object
// fileMetaId @string
// thumbnail @boolean
const mapStateToProps = (state, ownProps) => {
  let fileMeta = ownProps.fileMeta;
  let uri = undefined;
  if (!fileMeta) {
    // string
    if (typeof ownProps.fileMetaId === 'string')
      fileMeta = state.resources.fileMetas[ownProps.fileMetaId];
    // Object
    else fileMeta = ownProps.fileMetaId;
  }
  if (fileMeta) {
    uri =
      fileMeta[ownProps.thumbnail ? 'thumbnailUri' : 'uri'] || fileMeta['uri'];
  }

  return {
    uri,
    fileMeta
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getFileMetaById: FileMetaActions.getFileMetaById
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(FileMetaImage);
