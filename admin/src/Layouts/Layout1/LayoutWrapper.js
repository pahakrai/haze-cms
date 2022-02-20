import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  font-family: ${props => props.theme.fonts.fontFamily};
  font-size: 13px;
  line-height: 20px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
`;
