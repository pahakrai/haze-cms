import React from 'react';
import PropTypes from 'prop-types';

import MediaFileList from './MediaFileList';
import Modal from '../../Components/Modal';
import Button from '../../Components/Common/Button';
import { injectIntl } from 'react-intl';

class FileMetaModal extends React.PureComponent {
  static propTypes = {
    disableDelete: PropTypes.bool,
    onDeleteClick: PropTypes.func,
    onItemClick: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.string)
  };
  static defaultProps = {
    selectedIds: [],
    disableDelete: false
  };

  render() {
    const {
      intl,
      label,
      onDone,
      selectedIds,
      onItemClick,
      onDeleteClick,
      disableDelete,
      text,
      title,
      modalContentStyle
    } = this.props;
    return (
      <Modal.Button
        text={text || intl.formatMessage({ id: 'display_media_library' })}
        title={title || intl.formatMessage({ id: 'display_media_library' })}
        modalContentStyle={modalContentStyle}
        button={openModal => (
          <div style={{ cursor: 'pointer' }} onClick={() => openModal()}>
            <img
              src="/images/icons/fold.png"
              alt="icon"
              style={{ width: 20, marginRight: 10 }}
            />
            {label}
          </div>
        )}
        content={closeModal => (
          <MediaFileList
            intl={intl}
            pageSize={4}
            selectedIds={selectedIds}
            onItemClick={onItemClick}
            onDeleteClick={onDeleteClick}
            disableDelete={disableDelete}
          />
        )}
        footer={({ closeModal }) => (
          <Button.Primary
            disabled={selectedIds.length === 0}
            onClick={() => {
              onDone();
              closeModal();
            }}
          >
            {intl.formatMessage({ id: 'done' })}
          </Button.Primary>
        )}
      />
    );
  }
}

export default injectIntl(FileMetaModal);
