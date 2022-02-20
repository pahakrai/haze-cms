// FIXME: DONT use antd Row Col
import { Row, Col, Tag, Modal, Button as AntdButton } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { FormattedMessage, injectIntl } from 'react-intl';

import { humanFileSize } from '../../Lib/util';
import downloadFile from '../../Lib/common/downloadFile';

import Button from '../Common/Button';
import Card_base from '../Common/Card';
import H5 from '../Common/H5';
import ImageDisplayModal from '../ImageDisplayModal';
import PropTypes from 'prop-types';
import React from 'react';
import Small from '../Common/Small';
import moment from 'moment';
import styled from 'styled-components';
import { UPLOAD_ZONE_ACCEPT_TYPE } from './Uploadzone';

const Card = styled(Card_base)`
  cursor: pointer;
  border: ${props => (props.selected ? '1px solid #51CBEE' : 0)};
`;
const ColWarp = styled(Col)`
  min-height: 80px !important;
  flex-direction: row;
  justify-content: flex-start;
`;

// styles for FileList
const FileListWrapper = styled.div``;

// styles for FileCard
const FileDeleteButtonWrapper = styled.div`
  color: red;
  font-size: 20px;
`;
const ThumbnailWrapper = styled.div`
  text-align: left;
`;
const Thumbnail = styled.img`
  max-height: 75px;
  max-width: 100px;
  background-color: white;
  margin: 3px;
  min-height: 30px;
`;

const ThumbnailDiv = styled.div`
  max-height: 75px;
  max-width: 100px;
  background-color: white;
  margin: 3px;
  min-height: 30px;
`;

const FieldDisplay = styled(H5)`
  max-width: 200px;
  word-wrap: break-word;
`;

class FileCard extends React.PureComponent {
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

  onClickCard(index) {
    this.setState({
      openImageModal: true,
      showIndex: index
    });
  }
  onCancel() {
    this.setState({
      openImageModal: false,
      showIndex: 0
    });
  }
  render() {
    const {
      fileMeta,
      onDeleteClick,
      onClick,
      disableDelete,
      index = 0,
      fileMetas = [],
      selected,
      uploadReview,
      intl
    } = this.props;
    const { openImageModal, showIndex } = this.state;
    if (fileMetas.length === 0) {
      fileMetas.push(fileMeta);
    }
    const thumbnailUri =
      fileMeta.thumbnailUri ||
      'https://s3.amazonaws.com/iconbros/icons/icon_pngs/000/000/288/original/file-empty.png?1510679782';

    const splitFormatArray = fileMeta?.displayName?.split('.');
    const format =
      splitFormatArray && splitFormatArray[splitFormatArray.length - 1];
    return (
      <FileListWrapper>
        <Card
          elevation={0}
          animateHover
          selected={selected}
          onClick={onClick.bind(this, fileMeta, fileMeta._id)}
        >
          <Row>
            <ColWarp xs={24} sm={24} md={12} lg={6} xl={6}>
              <ThumbnailWrapper>
                {UPLOAD_ZONE_ACCEPT_TYPE.IMAGE.indexOf(format) >= 0 && (
                  <Thumbnail
                    onClick={e => {
                      e.stopPropagation();
                      this.onClickCard(index);
                    }}
                    src={thumbnailUri}
                    alt="image not found"
                  />
                )}
                {UPLOAD_ZONE_ACCEPT_TYPE.PDF.indexOf(format) >= 0 && (
                  <ThumbnailDiv>PDF</ThumbnailDiv>
                )}
                {UPLOAD_ZONE_ACCEPT_TYPE.EXCEL.indexOf(format) >= 0 && (
                  <ThumbnailDiv>EXCEL</ThumbnailDiv>
                )}
                <Small>
                  <FormattedMessage id="display_file_size" />:{' '}
                  {fileMeta.size ? humanFileSize(fileMeta.size) : ' -- '}
                </Small>
              </ThumbnailWrapper>
            </ColWarp>
            <ColWarp xs={24} sm={24} md={12} lg={5} xl={5}>
              <Small>
                <FormattedMessage id="display_name" />
              </Small>
              <FieldDisplay>{fileMeta.originalName}</FieldDisplay>
            </ColWarp>

            <ColWarp xs={24} sm={24} md={12} lg={3} xl={3}>
              <Small>
                <FormattedMessage id="display_create_at" />
              </Small>
              <FieldDisplay>
                {fileMeta.createdAt &&
                  moment(fileMeta.createdAt).format('YYYY-MM-DD HH:mm')}
              </FieldDisplay>
            </ColWarp>
            <ColWarp
              xs={fileMeta.tags && fileMeta.tags.length ? 24 : 0}
              sm={fileMeta.tags && fileMeta.tags.length ? 24 : 0}
              md={12}
              lg={2}
              xl={2}
            >
              {fileMeta.tags
                ? fileMeta.tags.map(tag => <Tag key={fileMeta._id}>{tag}</Tag>)
                : null}
            </ColWarp>
            <ColWarp xs={24} sm={24} md={12} lg={5} xl={5}>
              <Button
                style={{ marginRight: 10 }}
                primary
                onClick={e => {
                  e.stopPropagation();
                  downloadFile(fileMeta.uri);
                }}
              >
                <FormattedMessage id="display_download" />
              </Button>
              <Button
                primary
                onClick={e => {
                  e.stopPropagation();
                  downloadFile(thumbnailUri);
                }}
              >
                <FormattedMessage id="display_download" />{' '}
                <FormattedMessage id="display_thumbnail" />
              </Button>
            </ColWarp>
            <ColWarp xs={24} sm={24} md={12} lg={2} xl={2}>
              {!disableDelete && !uploadReview && !fileMeta.isSystemFile && (
                <FileDeleteButtonWrapper>
                  <AntdButton
                    ghost
                    style={{ border: 0, boxShadow: 'unset' }}
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={e => {
                      e.stopPropagation();
                      Modal.confirm({
                        title: `Are you sure delete ${fileMeta.originalName}?`,
                        okText: intl.formatMessage({ id: 'display_yes' }),
                        cancelText: intl.formatMessage({ id: 'cancel' }),
                        onOk: () => {
                          onDeleteClick(fileMeta._id);
                          return Promise.resolve();
                        }
                      });
                    }}
                  />
                </FileDeleteButtonWrapper>
              )}
              {uploadReview && (
                <FileDeleteButtonWrapper>
                  <AntdButton
                    ghost
                    style={{ border: 0, boxShadow: 'unset' }}
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={e => {
                      e.stopPropagation();
                      Modal.confirm({
                        title: `Are you sure remove ${fileMeta.originalName}?`,
                        okText: intl.formatMessage({ id: 'display_yes' }),
                        cancelText: intl.formatMessage({ id: 'cancel' }),
                        onOk: () => {
                          onDeleteClick(fileMeta._id);
                          return Promise.resolve();
                        }
                      });
                    }}
                  />
                </FileDeleteButtonWrapper>
              )}
            </ColWarp>
          </Row>
        </Card>
        <ImageDisplayModal
          fileMetas={fileMetas}
          shouldOpenModal={openImageModal}
          showIndex={showIndex}
          onCancel={this.onCancel.bind(this)}
        />
      </FileListWrapper>
    );
  }
}

export default injectIntl(FileCard);
