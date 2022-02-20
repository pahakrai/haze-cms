import React from 'react';
import Modal from 'react-modal';

import ModalStyle from './ModalStyle';

export default ({ appendStyle, ...props }) => {
  const style_content = ModalStyle.content;
  const style_overlay = ModalStyle.overlay;
  if (props.width) {
    style_content.width = props.width;
  }
  return (
    <Modal
      style={{
        content: { ...style_content, ...appendStyle },
        overlay: style_overlay
      }}
      appElement={document.getElementById('root')}
      shouldCloseOnOverlayClick={true}
      {...props}
    />
  );
};
