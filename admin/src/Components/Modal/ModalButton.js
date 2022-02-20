import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import Button from '../Common/Button';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';

export const modalStyle = {
  content: {
    border: '0',
    borderRadius: '4px',
    bottom: 'auto',
    minHeight: '16rem',
    maxHeight: '95%',
    left: '50%',
    padding: '3.2rem',
    position: 'fixed',
    right: 'auto',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    minWidth: '32rem',
    width: '80%',
    maxWidth: '96rem'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
};

const Container = styled.div`
  display: ${props => (props.inline ? 'inline-block' : 'block')};
`;

export default class ModalButton extends React.PureComponent {
  static propTypes = {
    inline: PropTypes.bool,
    title: PropTypes.node,
    content: PropTypes.func.isRequired,
    button: PropTypes.func,
    showHeader: PropTypes.bool,
    showFooter: PropTypes.bool,
    afterCloseModal: PropTypes.func,
    onModalStateChange: PropTypes.func,
    onRef: PropTypes.func,
    btProps: PropTypes.shape({})
  };

  static defaultProps = {
    title: '',
    content: () => true,
    showHeader: true,
    showFooter: true,
    afterCloseModal: () => true
  };
  constructor(props) {
    super(props);
    if (props.onRef) props.onRef(this);
    this.state = {
      modalOpen: Boolean(props.initialModalOpen)
    };
  }

  closeModal = () => {
    const { afterCloseModal, onModalStateChange } = this.props;
    this.setState({
      modalOpen: false
    });
    afterCloseModal();
    onModalStateChange && onModalStateChange(false);
  };

  openModal = () => {
    const { onModalStateChange } = this.props;
    this.setState({
      modalOpen: true
    });
    onModalStateChange && onModalStateChange(true);
  };

  render() {
    const { closeModal, openModal } = this;
    const { modalOpen } = this.state;

    const {
      title,
      content,
      showFooter,
      showHeader,
      header,
      footer,
      button,
      disabled,
      text,
      btProps,
      inline,
      modalContentStyle = {}
    } = this.props;
    return (
      <Container inline={inline}>
        {button ? (
          button(openModal)
        ) : (
          <Button.Primary
            type="button"
            onClick={openModal}
            disabled={disabled}
            {...btProps}
          >
            {text}
          </Button.Primary>
        )}
        <Modal
          style={{
            ...modalStyle,
            content: { ...modalStyle.content, ...modalContentStyle }
          }}
          isOpen={modalOpen}
          closeTimeoutMS={100}
          contentLabel="Modal"
          ariaHideApp={false}
        >
          {showHeader &&
            (header ? (
              header({ title, closeModal })
            ) : (
              <ModalHeader title={title} onCloseClick={closeModal} />
            ))}
          {content(closeModal)}
          {showFooter && (footer ? footer({ closeModal }) : <ModalFooter />)}
        </Modal>
      </Container>
    );
  }
}
