import styled from 'styled-components';

export default styled.small`
  display: block;
  font-family: ${props => props.theme.fonts.fontFamily};
  font-size: ${props => props.theme.fonts.size.small};
  font-weight: ${props => props.theme.fonts.fontWeight.small};
  color: ${props => props.theme.fonts.color.small};
`;
