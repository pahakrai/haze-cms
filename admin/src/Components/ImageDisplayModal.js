import React from 'react';
import { Modal } from 'antd';
import ReactPlayer from 'react-player';
import { Carousel } from 'react-responsive-carousel';
import { FormattedMessage } from 'react-intl';

import { toast } from '../Lib/Toast';

import Image from './Common/Image';
import TextInput from './Common/TextInput';
import Button from './Common/Button';

export const FILE_TYPE = {
  IMAGE: '.png, .jpeg, .jpg',
  HTML: '.html',
  AVC: '.mp4, .ac3, .mov, .mp3, .avi'
};

export default class ImageDisplayModal extends React.PureComponent {
  onCopyImageUri = idName => {
    var e = document.getElementById(idName);
    e.select(); // select obj
    document.execCommand('Copy');
    toast.success(<FormattedMessage id={'display_copy_success'} />, {
      position: 'top-center',
      autoClose: 1000
    });
  };
  render() {
    const { shouldOpenModal, fileMetas, onCancel, showIndex } = this.props;
    return (
      <Modal
        width="60%"
        visible={shouldOpenModal}
        footer={null}
        onCancel={onCancel}
      >
        <Carousel
          selectedItem={showIndex}
          showThumbs={false}
          showIndicators={false}
        >
          {fileMetas.map((fileMeta, index) => {
            const uri = fileMeta.fileMeta
              ? fileMeta.fileMeta.uri
              : fileMeta.uri;
            if (FILE_TYPE.IMAGE.indexOf(fileMeta.fileExtension) >= 0) {
              return (
                <div key={index}>
                  <Image
                    height={800}
                    alt={
                      fileMeta.fileMeta
                        ? fileMeta.fileMeta.originalName
                        : fileMeta.originalName
                    }
                    src={uri}
                  />
                  <TextInput
                    onChange={() => true}
                    id={uri}
                    style={{ height: 0, position: ' absolute', left: -10000 }}
                    value={uri}
                  />
                  <Button.Default
                    style={{
                      backgroundColor: ' #fff !important',
                      color: '#fff',
                      marginBottom: ' 10px'
                    }}
                    onClick={this.onCopyImageUri.bind(this, uri)}
                  >
                    <FormattedMessage id={'display_copy_file'} />
                  </Button.Default>
                </div>
              );
            }
            if (FILE_TYPE.AVC.indexOf(fileMeta.fileExtension) >= 0) {
              return (
                <div
                  key={index}
                  style={{ position: 'relative', paddingTop: '56.25%' }}
                >
                  <ReactPlayer
                    style={{ position: 'absolute', top: '0', left: '0' }}
                    url={fileMeta.uri}
                    controls
                    playing={shouldOpenModal}
                    width="100%"
                    height="100%"
                  />
                </div>
              );
            }
            return null;
          })}
        </Carousel>
      </Modal>
    );
  }
}
