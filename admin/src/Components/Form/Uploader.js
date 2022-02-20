import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cloneDeep from 'lodash/cloneDeep';

import FileMetaModal from '../../Containers/FileMeta/FileMetaModal';

import { toast } from '../../Lib/Toast';
import { humanFileSize } from '../../Lib/util';
import Uploadzone, { UPLOAD_ZONE_ACCEPT_TYPE } from '../Upload/Uploadzone';
import FileList from '../Upload/FileList';

import { ErrorMessage } from './Errors';
import { FieldLabel } from './form.styled';

export const UPLOAD_ACCEPT_TYPE = UPLOAD_ZONE_ACCEPT_TYPE;

const NewUploadHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e4e4e4;
  padding-bottom: 10px;
`;

const NewUploadTitle = styled.div`
  margin-right: 20px;
`;
const NewUploadPlaceholder = styled.div`
  flex: 1;
  color: #a2a2a2;
  font-size: 12px;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-flow: wrap;
`;

class Uploader extends React.PureComponent {
  static propTypes = {
    onDrop: PropTypes.func,
    accept: PropTypes.string,
    multiple: PropTypes.bool
  };
  static defaultProps = {
    accept: `${UPLOAD_ACCEPT_TYPE.IMAGE},${UPLOAD_ACCEPT_TYPE.AVC},${UPLOAD_ACCEPT_TYPE.HTML},${UPLOAD_ACCEPT_TYPE.PDF},${UPLOAD_ACCEPT_TYPE.EXCEL}`,
    onDrop: () => true,
    multiple: false,
    fileMaxSize: 1050000 // 1mb
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedFileMeta: []
    };
  }

  onDone = _files => {
    const {
      multiple,
      input: { onChange, onBlur, onFocus, value: files }
    } = this.props;
    onFocus();
    onChange(multiple ? files.concat(_files) : _files);
    this.setState({ selectedFileMeta: [] });
    onBlur();
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

  onFileMetaItemClick = fileMeta => {
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
  };

  onRemoveDropzoneFile = file => {
    const {
      input: { onChange, value: files }
    } = this.props;
    const newFiles = files.filter(f => f.preview !== file.preview);
    onChange(newFiles);
  };

  onRemoveFileByKey = (file, key) => {
    const {
      input: { onChange, value: files }
    } = this.props;
    let newFiles = cloneDeep(files);
    newFiles.splice(key, 1);
    onChange(newFiles);
  };

  onRemoveFilelistFile = (file, key) => {
    const {
      input: { onChange, value: files }
    } = this.props;
    const newFiles = files.filter(f => {
      if (file.fileMeta && file.fileMeta._id) {
        return f.fileMeta._id !== file.fileMeta._id;
      } else {
        return f.fileMeta !== file.fileMeta;
      }
    });
    onChange(newFiles);
  };
  render() {
    const { formatMulti, formatExcel } = this.props;
    let type = ' jpg / jpeg / png ';
    if (formatMulti) {
      type = ' jpg / jpeg / png / pdf / xlsx ';
    }
    if (formatExcel) {
      type = ' xlsx ';
    }
    const {
      intl,
      label,
      fileMaxSize,
      placeholder = intl.formatMessage(
        {
          id: 'display_media_placeholder'
        },
        {
          type: type,
          size: humanFileSize(fileMaxSize)
        }
      ),
      noLabel,
      noPlaceHolder = false,
      multiple = false,
      labelFile,
      accept,
      uploadReview,
      disableDelete,
      fileCardListItemComponent,
      meta: { touched, error, warning },
      input: { value: files = [] }
    } = this.props;
    const { selectedFileMeta } = this.state;
    let cloneFiles = [];
    if (files && files.length > 1) {
      cloneFiles = cloneDeep(files);
      cloneFiles.splice(0, 1);
    }

    return (
      <div style={{ marginBottom: 20 }}>
        {multiple ? (
          <div>
            {/* header */}
            <div>
              <NewUploadHeaderWrapper>
                {!noLabel && (
                  <NewUploadTitle>
                    <FieldLabel style={{ fontSize: '16px' }}>
                      {label}
                    </FieldLabel>
                  </NewUploadTitle>
                )}

                {!noPlaceHolder && (
                  <NewUploadPlaceholder>{placeholder}</NewUploadPlaceholder>
                )}

                <FileMetaModal
                  label={intl.formatMessage({
                    id: 'display_media_library_selection'
                  })}
                  disableDelete={true}
                  selectedIds={selectedFileMeta.map(fm => fm._id)}
                  onItemClick={this.onFileMetaItemClick}
                  onDone={this.onDone.bind(
                    this,
                    selectedFileMeta.map(fileMeta => ({ fileMeta }))
                  )}
                />
              </NewUploadHeaderWrapper>
            </div>
            {touched &&
              ((error && <ErrorMessage>{error}</ErrorMessage>) ||
                (warning && <ErrorMessage>{warning}</ErrorMessage>))}
            {/* picture */}
            {files && files.length > 0 && (
              <ImageWrapper>
                <div style={{ display: 'flex', marginRight: 10 }}>
                  <div style={{ width: 150 }}>
                    <Uploadzone
                      intl={intl}
                      accept={accept}
                      _key={0}
                      multiple={true}
                      labelFile={labelFile}
                      onDrop={this.onDone}
                      previewFiles={
                        files && files[0]
                          ? [files[0]].filter(i => i.hasOwnProperty('preview'))
                          : []
                      }
                      filemetaFiles={
                        files && files[0]
                          ? [files[0]].filter(i => i.hasOwnProperty('fileMeta'))
                          : []
                      }
                      isMain={true}
                      onRejected={this.onRejected}
                      onRemoveFile={this.onRemoveDropzoneFile}
                      onRemoveFileByKey={this.onRemoveFileByKey}
                      maxSize={fileMaxSize}
                    />
                  </div>
                  <FileList
                    uploadReview={uploadReview}
                    files={
                      files && files[0]
                        ? [files[0]].filter(i => i.hasOwnProperty('fileMeta'))
                        : []
                    }
                    onDeleteClick={this.onRemoveFilelistFile}
                    itemComponent={fileCardListItemComponent}
                    disableDelete={disableDelete}
                  />
                </div>
              </ImageWrapper>
            )}

            <ImageWrapper>
              {cloneFiles.map((v, key) => {
                return (
                  <div style={{ display: 'flex', marginRight: 10 }} key={key}>
                    <div style={{ width: 150 }}>
                      <Uploadzone
                        intl={intl}
                        accept={accept}
                        _key={key + 1}
                        multiple={true}
                        labelFile={labelFile}
                        onDrop={this.onDone}
                        previewFiles={
                          cloneFiles && cloneFiles[key]
                            ? [cloneFiles[key]].filter(i =>
                                i.hasOwnProperty('preview')
                              )
                            : []
                        }
                        filemetaFiles={
                          cloneFiles && cloneFiles[key]
                            ? [cloneFiles[key]].filter(i =>
                                i.hasOwnProperty('fileMeta')
                              )
                            : []
                        }
                        onRejected={this.onRejected}
                        onRemoveFile={this.onRemoveDropzoneFile}
                        onRemoveFileByKey={this.onRemoveFileByKey}
                        maxSize={fileMaxSize}
                      />
                    </div>
                    <FileList
                      uploadReview={uploadReview}
                      files={
                        cloneFiles && cloneFiles[key]
                          ? [cloneFiles[key]].filter(i =>
                              i.hasOwnProperty('fileMeta')
                            )
                          : []
                      }
                      onDeleteClick={this.onRemoveFilelistFile}
                      itemComponent={fileCardListItemComponent}
                      disableDelete={disableDelete}
                    />
                  </div>
                );
              })}
              {/* alway exists when multiple choice, only upload  */}
              <Uploadzone
                intl={intl}
                accept={accept}
                multiple={true}
                labelFile={labelFile}
                onDrop={this.onDone}
                previewFiles={[]}
                filemetaFiles={[]}
                isMain={false}
                onRejected={this.onRejected}
                onRemoveFile={this.onRemoveDropzoneFile}
                onRemoveFileByKey={this.onRemoveFileByKey}
                maxSize={fileMaxSize}
              />
            </ImageWrapper>
          </div>
        ) : (
          <div>
            {/* header */}
            <div>
              <NewUploadHeaderWrapper>
                {!noLabel && (
                  <NewUploadTitle>
                    <FieldLabel style={{ fontSize: '16px' }}>
                      {label}
                    </FieldLabel>
                  </NewUploadTitle>
                )}

                {!noPlaceHolder && (
                  <NewUploadPlaceholder>{placeholder}</NewUploadPlaceholder>
                )}

                <div
                  style={{
                    display: 'flex',
                    flex: 1,
                    aligiitems: 'flex-end',
                    justifyContent: 'flex-end'
                  }}
                >
                  <FileMetaModal
                    label={intl.formatMessage({
                      id: 'display_media_library_selection'
                    })}
                    disableDelete={true}
                    selectedIds={selectedFileMeta.map(fm => fm._id)}
                    onItemClick={this.onFileMetaItemClick}
                    onDone={this.onDone.bind(
                      this,
                      selectedFileMeta.map(fileMeta => ({ fileMeta }))
                    )}
                  />
                </div>
              </NewUploadHeaderWrapper>
            </div>
            {touched &&
              ((error && <ErrorMessage>{error}</ErrorMessage>) ||
                (warning && <ErrorMessage>{warning}</ErrorMessage>))}
            {/* upload */}
            <div style={{ display: 'flex' }}>
              {!files && (
                <div style={{ paddingTop: 10, width: 150 }}>
                  <Uploadzone
                    intl={intl}
                    accept={accept}
                    _key={0}
                    multiple={multiple}
                    labelFile={labelFile}
                    onDrop={this.onDone}
                    previewFiles={
                      files
                        ? files.filter(i => i.hasOwnProperty('preview'))
                        : []
                    }
                    filemetaFiles={
                      files
                        ? files.filter(i => i.hasOwnProperty('fileMeta'))
                        : []
                    }
                    onRejected={this.onRejected}
                    onRemoveFile={this.onRemoveDropzoneFile}
                    onRemoveFileByKey={this.onRemoveFileByKey}
                    maxSize={fileMaxSize}
                  />
                </div>
              )}
              {files &&
                files.filter(i => i.hasOwnProperty('fileMeta')).length ===
                  0 && (
                  <div style={{ paddingTop: 10, width: 150 }}>
                    <Uploadzone
                      intl={intl}
                      accept={accept}
                      _key={0}
                      multiple={multiple}
                      labelFile={labelFile}
                      onDrop={this.onDone}
                      previewFiles={
                        files
                          ? files.filter(i => i.hasOwnProperty('preview'))
                          : []
                      }
                      filemetaFiles={
                        files
                          ? files.filter(i => i.hasOwnProperty('fileMeta'))
                          : []
                      }
                      onRejected={this.onRejected}
                      onRemoveFile={this.onRemoveDropzoneFile}
                      onRemoveFileByKey={this.onRemoveFileByKey}
                      maxSize={fileMaxSize}
                    />
                  </div>
                )}
              <FileList
                intl={intl}
                uploadReview={uploadReview}
                files={
                  files ? files.filter(i => i.hasOwnProperty('fileMeta')) : []
                }
                _key="0"
                showThumbnail={true}
                onDeleteClick={this.onRemoveFilelistFile}
                onRemoveFileByKey={this.onRemoveFileByKey}
                itemComponent={fileCardListItemComponent}
                disableDelete={disableDelete}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default props => {
  return <Field {...props} component={Uploader} />;
};
