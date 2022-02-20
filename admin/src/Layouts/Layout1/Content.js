import styled from 'styled-components';

export default styled.div`
  -webkit-overflow-scrolling: touch;
  flex: 1;
  overflow: auto;
  background-color: ${props => props.theme.color.background};
`;
