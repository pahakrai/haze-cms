import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { toast } from '../../Lib/Toast';

import FieldLabel from './FieldLabel';
import { ErrorMessage } from './Errors';
import FileList from '../Upload/FileList';
import Uploadzone, { UPLOAD_ZONE_ACCEPT_TYPE } from '../Upload/Uploadzone';
import FileMetaModal from '../../Containers/FileMeta/FileMetaModal';

export const UPLOAD_ACCEPT_TYPE = UPLOAD_ZONE_ACCEPT_TYPE;

class Uploader extends React.Component {
  static propTypes = {
    supportLink: PropTypes.bool,
    onDrop: PropTypes.func,
    accept: PropTypes.string,
    multiple: PropTypes.bool,
    disabled: PropTypes.bool,
    onRemoveDropzoneFile: PropTypes.func
  };
  static defaultProps = {
    supportLink: false,
    accept: `${UPLOAD_ACCEPT_TYPE.IMAGE},${UPLOAD_ACCEPT_TYPE.AVC}`,
    onDrop: () => true,
    multiple: false,
    disabled: false,
    onRemoveDropzoneFile: () => true
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedFileMeta: []
    };
  }

  onDone(_files) {
    const {
      multiple,
      input: { onChange, onBlur, onFocus, value: files }
    } = this.props;
    _files = Array.isArray(_files) ? _files : [_files];

    onFocus();
    onChange(multiple ? files.concat(_files) : _files);
    this.setState({ selectedFileMeta: [] });
    onBlur();
  }

  onDropRejected(rejectedImages) {
    toast.error(`${rejectedImages.map(f => f.name).join(',\n')} rejected`);
  }

  onFileMetaItemClick(fileMeta) {
    const { accept } = this.props;
    if (accept.indexOf(fileMeta.fileExtension) < 0) {
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
  }

  onRemoveDropzoneFile(index, file) {
    const {
      input: { onChange, value: files }
    } = this.props;
    const newFiles = files.filter(f => f.preview !== file.preview);
    onChange(newFiles);
  }

  onRemoveFilelistFile(file) {
    const {
      input: { onChange, value: files }
    } = this.props;
    const newFiles = files.filter(f => f.fileMeta !== file.fileMeta);
    onChange(newFiles);
  }

  render() {
    const {
      label,
      accept,
      uploadReview,
      multiple,
      intl,
      input: { value: files = [] },
      meta: { touched, error, warning },
      fileCardListItemComponent,
      displayFileMetas = true,
      disabled
    } = this.props;
    const { selectedFileMeta } = this.state;
    return (
      <React.Fragment>
        <FieldLabel>{`${label} (${files.length || 0})`}</FieldLabel>
        {touched &&
          ((error && <ErrorMessage>{error}</ErrorMessage>) ||
            (warning && <ErrorMessage>{warning}</ErrorMessage>))}
        <div>
          {displayFileMetas && (
            <FileMetaModal
              inline
              intl={intl}
              disabled={disabled}
              disableDelete={true}
              selectedIds={selectedFileMeta.map(fm => fm._id)}
              onItemClick={this.onFileMetaItemClick.bind(this)}
              onDone={this.onDone.bind(
                this,
                selectedFileMeta.map(fileMeta => ({ fileMeta }))
              )}
            />
          )}
          <span> </span>
        </div>
        <Uploadzone
          disabled={disabled}
          intl={intl}
          labelFile={true}
          accept={accept}
          multiple={multiple}
          onDrop={this.onDone.bind(this)}
          files={files ? files.filter(i => i.hasOwnProperty('preview')) : []}
          onDropRejected={this.onDropRejected.bind(this)}
          onRemoveFile={this.onRemoveDropzoneFile.bind(this)}
        />
        <FileList
          intl={intl}
          uploadReview={uploadReview}
          files={files ? files.filter(i => i.hasOwnProperty('fileMeta')) : []}
          onDeleteClick={this.onRemoveFilelistFile.bind(this)}
          itemComponent={fileCardListItemComponent}
        />
      </React.Fragment>
    );
  }
}

export default props => {
  return <Field {...props} component={Uploader} />;
};
