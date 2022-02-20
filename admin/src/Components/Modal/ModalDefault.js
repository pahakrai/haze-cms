import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Modal from './Modal';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';

const Container = styled.div``;

export default class ModalButton extends React.PureComponent {
  static propTypes = {
    shouldOpenModal: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.func.isRequired,
    showHeader: PropTypes.bool,
    showFooter: PropTypes.bool
  };

  static defaultProps = {
    shouldOpenModal: false,
    title: '',
    content: () => true,
    showHeader: true,
    showFooter: true
  };
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: Boolean(props.initialModalOpen)
    };
  }

  componentDidMount() {
    const { shouldOpenModal } = this.props;
    if (
      shouldOpenModal !== null &&
      shouldOpenModal !== undefined &&
      shouldOpenModal
    ) {
      this.openModal();
    }
  }

  componentDidUpdate(prevProps) {
    const { shouldOpenModal } = this.props;
    const { modalOpen } = this.state;

    if (shouldOpenModal !== null && shouldOpenModal !== undefined) {
      if (shouldOpenModal && !modalOpen) {
        this.openModal();
      } else if (!shouldOpenModal && modalOpen) {
        this.closeModal();
      }
    }
  }

  closeModal = () => {
    const { onModalClose } = this.props;

    onModalClose && onModalClose();
    this.setState({
      modalOpen: false
    });
  };

  openModal = () => {
    this.setState({
      modalOpen: true
    });
  };

  render() {
    const { closeModal } = this;
    const { modalOpen } = this.state;

    const {
      title,
      content,
      contentStyle,
      showFooter,
      showHeader,
      headerButtons
    } = this.props;

    return (
      <Container>
        <Modal
          isOpen={modalOpen}
          closeTimeoutMS={100}
          contentLabel="Modal"
          appendStyle={contentStyle}
        >
          {showHeader && (
            <ModalHeader
              title={title}
              onCloseClick={closeModal}
              buttons={headerButtons}
            />
          )}
          {content(closeModal)}
          {showFooter && <ModalFooter />}
        </Modal>
      </Container>
    );
  }
}
