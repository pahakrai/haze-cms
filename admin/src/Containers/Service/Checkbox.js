import React from 'react';
import styled, { withTheme } from 'styled-components';
import { FaCheck } from 'react-icons/fa';

const Container = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background-color: ${({ active, theme }) =>
    active ? theme.color.primary : '#fff'};
  border: 1px solid
    ${({ active, theme }) => (active ? theme.color.primary : '#999')};
  user-select: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default withTheme(({ active, onChange, disabled, theme }) => {
  return (
    <Container
      active={active}
      onClick={!disabled ? () => onChange && onChange(!active) : undefined}
    >
      {Boolean(active) && <FaCheck size={10} color={theme.color.primaryText} />}
    </Container>
  );
});
