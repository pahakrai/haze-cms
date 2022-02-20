import React from 'react';
import styled from 'styled-components';

import H3 from '../Common/H3';
import Button from '../Common/Button';

const ModalHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: -32px;
  margin-bottom: 30px;
  padding: 10px 32px;
  border-bottom: 1px solid rgb(226, 226, 226);
  align-items: center;
`;
const RightWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const IconButton = styled(Button)`
  padding: 10px 14px;
  display: block;
  position: relative;
  width: auto;
  min-width: auto;
  margin-right: ${({ rightSpace }) => rightSpace || 0}px;
`;

export default ({ title, onCloseClick, renderRight, buttons = [] }) => (
  <ModalHeaderContainer>
    <H3>{title}</H3>
    <RightWrapper>
      {renderRight}
      {buttons &&
        buttons.map((button, index) => (
          <IconButton
            key={index}
            type="button"
            onClick={button && button.onClick}
            rightSpace={10}
          >
            {button && button.label}
          </IconButton>
        ))}
      <IconButton type="button" onClick={onCloseClick}>
        x
      </IconButton>
    </RightWrapper>
  </ModalHeaderContainer>
);
