import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
// FIXME: DONT use antd Row Col
import { Tag, Modal, Button as AntdButton } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { FormattedMessage, injectIntl } from 'react-intl';

import { humanFileSize } from '../../Lib/util';
import downloadFile from '../../Lib/common/downloadFile';

import H5 from '../Common/H5';
import Small from '../Common/Small';
import Button from '../Common/Button';

import Card_base from '../Common/Card';
import FileMetaImage from '../../Containers/FileMetaImage';
import ImageDisplayModal from '../ImageDisplayModal';

import { UPLOAD_ZONE_ACCEPT_TYPE } from './Uploadzone';

const Card = styled(Card_base)`
  cursor: pointer;
  border: ${props => (props.selected ? '1px solid #51CBEE' : 0)};
`;
const ContentWrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// styles for FileCard
const FileDeleteButtonWrapper = styled.div`
  display: inline-block;
  margin: 5px 15px;
  color: red;
  font-size: 20px;
`;
const ThumbnailWrapper = styled.div``;
const Thumbnail = styled.img`
  height: 100px;
  max-width: 100%;
  background-color: white;
`;
const FieldDisplay = styled(H5)`
  margin: 0px;
  word-wrap: break-word;
`;
const FileNameWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

/*                                                     */
/* This component just changes the layout of "./FileCard" */
/* the others should be the same as the original component */
/*                                                     */
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
    const {
      fileMeta,
      onDeleteClick,
      onClick,
      disableDelete = true,
      index = 0,
      fileMetas = [],
      selected,
      uploadReview,
      intl
      // accept = UPLOAD_ZONE_ACCEPT_TYPE.IMAGE
    } = this.props;
    const { openImageModal, showIndex } = this.state;
    if (fileMetas.length === 0) {
      fileMetas.push(fileMeta);
    }
    const thumbnailUri =
      fileMeta.thumbnailUri ||
      'https://s3.amazonaws.com/iconbros/icons/icon_pngs/000/000/288/original/file-empty.png?1510679782';
    const isDisplayFileDeleteButton =
      !disableDelete || (!uploadReview && !fileMeta.isSystemFile);

    return (
      <React.Fragment>
        <ContentWrapper
          elevation={0}
          animateHover
          selected={selected}
          onClick={onClick.bind(this, fileMeta, fileMeta._id)}
          styl
        >
          <ThumbnailWrapper>
            <Thumbnail
              onClick={e => {
                e.stopPropagation();
                this.onClickCard(index);
              }}
              src={thumbnailUri}
              alt="image not found"
            />
            <Small>
              <FormattedMessage id="display_file_size" />:{' '}
              {fileMeta.size ? humanFileSize(fileMeta.size) : ' -- '}
            </Small>
          </ThumbnailWrapper>
          <FileNameWrapper>
            <Small>
              <FormattedMessage id="display_name" />
            </Small>
            <FieldDisplay>{fileMeta.originalName}</FieldDisplay>
          </FileNameWrapper>
          {fileMeta.tags
            ? fileMeta.tags.map(tag => <Tag key={fileMeta._id}>{tag}</Tag>)
            : null}
          <FileNameWrapper>
            <Small>
              <FormattedMessage id="display_create_at" />
            </Small>
            <FieldDisplay>
              {fileMeta.createdAt &&
                moment(fileMeta.createdAt).format('YYYY-MM-DD HH:mm')}
            </FieldDisplay>
          </FileNameWrapper>
          <ButtonsContainer>
            <Button
              style={{ marginRight: 10 }}
              hyberlink
              onClick={e => {
                e.stopPropagation();
                downloadFile(fileMeta.uri || thumbnailUri);
              }}
            >
              <FormattedMessage id="display_download" />
            </Button>
            <Button
              hyberlink
              onClick={e => {
                e.stopPropagation();
                downloadFile(thumbnailUri);
              }}
            >
              <FormattedMessage id="display_download" />{' '}
              <FormattedMessage id="display_thumbnail" />
            </Button>
            {isDisplayFileDeleteButton && (
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
          </ButtonsContainer>
        </ContentWrapper>
        <ImageDisplayModal
          fileMetas={fileMetas}
          shouldOpenModal={openImageModal}
          showIndex={showIndex}
          onCancel={this.onCancel}
        />
      </React.Fragment>
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
