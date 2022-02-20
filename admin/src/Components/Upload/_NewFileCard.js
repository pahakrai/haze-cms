import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
// FIXME: DONT use antd Row Col
import { Tag, Modal } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';

import { humanFileSize } from '../../Lib/util';
import downloadFile from '../../Lib/common/downloadFile';

import H5 from '../Common/H5';
import Button from '../Common/Button';

import ImageDisplayModal from '../ImageDisplayModal';
import FileMetaImage from '../../Containers/FileMetaImage';

import { UPLOAD_ZONE_ACCEPT_TYPE } from './Uploadzone';

const ContainerWrapper = styled.div`
  position: relative;
  margin-top: 0;
  box-shadow: none;
  cursor: pointer;
  border: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  width: 280px;
`;

const FieldDisplay = styled(H5)`
  margin: 0 0 0 5px;
  word-wrap: break-word;
`;
const FileNameWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;
const ThumbnailContainer = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ThumbnailWrapper = styled.div`
  position: relative;
`;

const ThumbnailUrl = styled.img`
  max-width: 200px;
  background-color: white;
  margin: 3px;
  min-height: 30px;
  max-height: 180px;
`;

const ThumbnaiDiv = styled.div`
  max-width: 200px;
  background-color: white;
  margin: 3px;
  min-height: 30px;
  max-height: 180px;
`;

const DeleteButto = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  border: 1px solid rgb(238, 238, 238);
  border-radius: 50%;
  width: 23px;
  text-align: center;
  color: rgb(255, 255, 255);
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

export class FileCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openImageModal: false,
      showIndex: 0
    };
  }
  static propTypes = {
    fileMeta: PropTypes.shape({
      _id: PropTypes.string,
      uri: PropTypes.string,
      thumbnailUri: PropTypes.string,
      fileExtension: PropTypes.string,
      displayName: PropTypes.string,
      size: PropTypes.number
    }),
    onDeleteClick: PropTypes.func,
    onClick: PropTypes.func,
    selected: PropTypes.bool
  };
  static defaultProps = {
    fileMeta: {},
    selected: false,
    onClick: () => true,
    onDeleteClick: () => true
  };

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
  onCancel = () => {
    this.setState({
      openImageModal: false,
      showIndex: 0
    });
  };
  render() {
    const { openImageModal, showIndex } = this.state;
    const {
      intl,
      fileMeta,
      index = 0,
      fileMetas = [],
      selected,
      showThumbnail,
      isFilePageList, // file page list use
      // _key,
      // onRemoveFileByKey,
      showDeleteButton = true,
      onClick,
      onDeleteClick
    } = this.props;
    if (fileMetas.length === 0) {
      fileMetas.push(fileMeta);
    }
    const thumbnailUri =
      fileMeta.thumbnailUri ||
      'https://s3.amazonaws.com/iconbros/icons/icon_pngs/000/000/288/original/file-empty.png?1510679782';

    const splitFormatArray = fileMeta?.displayName?.split('.');
    const format =
      splitFormatArray && splitFormatArray[splitFormatArray.length - 1];

    const title =
      UPLOAD_ZONE_ACCEPT_TYPE.IMAGE.indexOf(format) >= 0
        ? intl.formatMessage({ id: 'msg.remove_photo' })
        : intl.formatMessage({ id: 'msg.remove_file' });

    const DeleteButton = () => {
      return showDeleteButton ? (
        <DeleteButto
          onClick={e => {
            e.stopPropagation();
            Modal.confirm({
              title: title,
              okText: intl.formatMessage({ id: 'confirm' }),
              cancelText: intl.formatMessage({ id: 'cancel' }),
              onOk: () => {
                onDeleteClick(fileMeta._id);
                // onRemoveFileByKey({}, _key);
                return Promise.resolve();
              }
            });
          }}
        >
          x
        </DeleteButto>
      ) : null;
    };
    return (
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        {showThumbnail && (
          <ThumbnailWrapper>
            <ThumbnailContainer>
              <div
                style={{
                  position: 'relative',
                  minWidth: 50,
                  minHeight: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <DeleteButton />
                {UPLOAD_ZONE_ACCEPT_TYPE.IMAGE.indexOf(format) >= 0 && (
                  <ThumbnailUrl
                    onClick={e => {
                      e.stopPropagation();
                      this.onClickCard(index);
                    }}
                    src={thumbnailUri}
                    alt="image not found"
                  />
                )}

                {UPLOAD_ZONE_ACCEPT_TYPE.PDF.indexOf(format) >= 0 && (
                  <ThumbnaiDiv>PDF</ThumbnaiDiv>
                )}
                {UPLOAD_ZONE_ACCEPT_TYPE.EXCEL.indexOf(format) >= 0 && (
                  <ThumbnaiDiv>EXCEL</ThumbnaiDiv>
                )}
              </div>
            </ThumbnailContainer>
          </ThumbnailWrapper>
        )}

        {isFilePageList && (
          <ThumbnailWrapper>
            <ThumbnailContainer>
              <div style={{ position: 'relative' }}>
                {!fileMeta.isSystemFile && <DeleteButton />}
                <ThumbnailUrl
                  onClick={e => {
                    e.stopPropagation();
                    this.onClickCard(index);
                  }}
                  src={thumbnailUri}
                  alt="image not found"
                />
              </div>
            </ThumbnailContainer>
          </ThumbnailWrapper>
        )}

        <ContainerWrapper
          elevation={0}
          animateHover
          selected={selected}
          onClick={onClick.bind(this, fileMeta, fileMeta._id)}
          styl
        >
          <FileNameWrapper>
            <FieldDisplay>
              <FormattedMessage id="display_name" />
            </FieldDisplay>
            <FieldDisplay style={{ wordBreak: 'break-all' }}>
              {fileMeta.originalName}
            </FieldDisplay>
          </FileNameWrapper>
          <FileNameWrapper>
            <FieldDisplay>
              <FormattedMessage id="display_file_size" />:{' '}
              {fileMeta.size ? humanFileSize(fileMeta.size) : ' -- '}
            </FieldDisplay>
          </FileNameWrapper>
          {fileMeta.tags
            ? fileMeta.tags.map(tag => <Tag key={fileMeta._id}>{tag}</Tag>)
            : null}
          <FileNameWrapper>
            <FieldDisplay>
              <FormattedMessage id="display_create_at" />:
            </FieldDisplay>
            <FieldDisplay>
              {fileMeta.createdAt &&
                moment(fileMeta.createdAt).format('YYYY-MM-DD HH:mm')}
            </FieldDisplay>
          </FileNameWrapper>
          <ButtonsContainer>
            <Button
              type="button"
              hyberlink
              style={{
                marginRight: 10
              }}
              onClick={e => {
                e.stopPropagation();
                downloadFile(fileMeta.uri || thumbnailUri);
              }}
            >
              <FormattedMessage id="display_download" />
            </Button>
            <Button
              type="button"
              hyberlink
              onClick={e => {
                e.stopPropagation();
                downloadFile(thumbnailUri);
              }}
            >
              <FormattedMessage id="display_download" />{' '}
              <FormattedMessage id="display_thumbnail" />
            </Button>
          </ButtonsContainer>
        </ContainerWrapper>
        <ImageDisplayModal
          fileMetas={fileMetas}
          shouldOpenModal={openImageModal}
          showIndex={showIndex}
          onCancel={this.onCancel}
        />
      </div>
    );
  }
}

export default injectIntl(props => {
  return typeof props.fileMeta === 'string' ? (
    <FileMetaImage
      component={FileCard}
      fileMetaId={props.fileMeta}
      {...props}
      fileMeta={undefined}
    />
  ) : (
    <FileCard {...props} />
  );
});
