import styled from 'styled-components';

export default styled.p`
  font-family: ${props => props.theme.fonts.fontFamily};
  font-size: ${props => props.theme.fonts.size.p};
  font-weight: ${props => props.theme.fonts.fontWeight.p};
  color: ${props => props.theme.fonts.color.p};
`;
