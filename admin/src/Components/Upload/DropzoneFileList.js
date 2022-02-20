import React from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

import Image from '../Common/Image';
import ImageDisplayModal from '../ImageDisplayModal';
import FileMetaImage from '../../Containers/FileMetaImage';
// upload accept
import { UPLOAD_ZONE_ACCEPT_TYPE } from './Uploadzone';

const EmptyUploadContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Main = styled.span`
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  background-color: #5f5f5f;
  color: #fff;
`;

const FileMetaWrapper = styled.div`
  width: 140px;
  height: 140px;
  line-height: 140px;
  display: flex;
  justify-content: center;
`;

const TitleCenter = styled.div`
  text-align: center;
`;

const imageStyle = {
  margin: 0,
  padding: 0,
  height: 140,
  width: 140
};

class FileCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openImageModal: false,
      showIndex: 0
    };
  }
  onClickCard = index => {
    const { fileMeta, accept = UPLOAD_ZONE_ACCEPT_TYPE.IMAGE } = this.props;
    if (!accept || accept === UPLOAD_ZONE_ACCEPT_TYPE.IMAGE) {
      this.setState({
        openImageModal: true,
        showIndex: index
      });
    } else if (accept === UPLOAD_ZONE_ACCEPT_TYPE.HTML) {
      window.open(fileMeta.uri);
    }
  };
  onCancel = e => {
    e.stopPropagation();
    this.setState({
      openImageModal: false,
      showIndex: 0
    });
  };
  render() {
    const { fileMeta, index = 0 } = this.props;
    const { openImageModal, showIndex } = this.state;

    const thumbnailUri =
      fileMeta && fileMeta.length !== 0
        ? fileMeta.thumbnailUri || fileMeta.uri
        : 'https://s3.amazonaws.com/iconbros/icons/icon_pngs/000/000/288/original/file-empty.png?1510679782';

    const splitFormatArray = fileMeta?.displayName?.split('.');
    const format =
      splitFormatArray && splitFormatArray[splitFormatArray.length - 1];
    return (
      <div
        style={{ width: 140 }}
        onClick={e => {
          e.stopPropagation();
          this.onClickCard(index);
        }}
      >
        <div>
          {UPLOAD_ZONE_ACCEPT_TYPE.IMAGE.indexOf(format) >= 0 && (
            <img
              src={thumbnailUri}
              style={{
                width: 140,
                height: 140,
                objectFit: 'contain'
              }}
              alt="No Found"
            />
          )}

          {UPLOAD_ZONE_ACCEPT_TYPE.PDF.indexOf(format) >= 0 && (
            <TitleCenter>PDF</TitleCenter>
          )}
          {UPLOAD_ZONE_ACCEPT_TYPE.EXCEL.indexOf(format) >= 0 && (
            <TitleCenter>EXCEL</TitleCenter>
          )}
        </div>

        <ImageDisplayModal
          fileMetas={fileMeta ? [fileMeta] : []}
          shouldOpenModal={openImageModal}
          showIndex={showIndex}
          onCancel={this.onCancel}
        />
      </div>
    );
  }
}

export default (
  intl,
  previewFiles,
  filemetaFiles,
  onRemoveFile,
  accept = UPLOAD_ZONE_ACCEPT_TYPE.IMAGE,
  fileMaxSize = 0,
  isMain = false,
  labelFile = false
) => {
  if (
    previewFiles &&
    previewFiles.length === 0 &&
    filemetaFiles &&
    filemetaFiles.length === 0
  ) {
    return (
      <EmptyUploadContent>
        <div style={{ height: 65, marginTop: 15 }}>
          <img
            src="/images/icons/upload.png"
            alt="icon"
            style={{ height: '100%' }}
          />
        </div>
        <span style={{ color: '#a2a2a2', marginTop: 15 }}>
          {labelFile
            ? intl.formatMessage({ id: 'upload_file' })
            : intl.formatMessage({ id: 'upload_image' })}
        </span>
        {isMain && (
          <Main>{intl.formatMessage({ id: 'display_media_main' })}</Main>
        )}
      </EmptyUploadContent>
    );
  }
  return (
    <EmptyUploadContent>
      {previewFiles &&
        previewFiles.length > 0 &&
        previewFiles.map((file, index) => {
          const splitFormatArray = file.name.split('.');
          const format = splitFormatArray[splitFormatArray.length - 1];
          let content = null;

          if (UPLOAD_ZONE_ACCEPT_TYPE.IMAGE.indexOf(format) >= 0) {
            content = <Image style={imageStyle} src={file.preview} />;
          }
          if (UPLOAD_ZONE_ACCEPT_TYPE.AVC.indexOf(format) >= 0) {
            content = (
              <ReactPlayer
                width="100%"
                height="100%"
                url={file.preview}
                controls
              />
            );
          }
          if (UPLOAD_ZONE_ACCEPT_TYPE.PDF.indexOf(format) >= 0) {
            content = <div>pdf</div>;
          }
          if (UPLOAD_ZONE_ACCEPT_TYPE.EXCEL.indexOf(format) >= 0) {
            content = <div>excel</div>;
          }
          return (
            <FileMetaWrapper key={index} onClick={e => e.stopPropagation()}>
              {content}
            </FileMetaWrapper>
          );
        })}

      {filemetaFiles &&
        filemetaFiles.length > 0 &&
        filemetaFiles.map((file, index) => {
          return (
            <FileMetaWrapper key={index} onClick={e => e.stopPropagation()}>
              {/* <Image style={imageStyle} src={file.fileMeta.uri} /> */}

              <FileMetaImage
                component={FileCard}
                fileMetaId={file.fileMeta}
                fileMeta={undefined}
              />
            </FileMetaWrapper>
          );
        })}
      {isMain && (
        <Main>{intl.formatMessage({ id: 'display_media_main' })}</Main>
      )}
    </EmptyUploadContent>
  );
};
