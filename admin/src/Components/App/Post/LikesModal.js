import React from 'react';
import Modal from '../../Modal';
import Button from '../../Common/Button';
import UserList from '../../App/User/UserList';

export default class LikesModal extends React.PureComponent {
  render() {
    const { likes = [], intl } = this.props;
    return (
      <Modal.Button
        text={intl.formatMessage({ id: 'display_likes_modal_title' })}
        title={intl.formatMessage({ id: 'display_likes_modal_title' })}
        button={openModal => (
          <Button type="button" onClick={openModal}>
            {intl.formatMessage({ id: 'display_likes_modal_title' }) +
              ' ' +
              likes.length}
          </Button>
        )}
        content={closeModal => (
          <div>
            <UserList
              width={100}
              users={likes}
              onItemClick={() => true}
              intl={intl}
            />
          </div>
        )}
      />
    );
  }
}
