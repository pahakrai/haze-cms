import styled from 'styled-components';

export default styled.h1`
  display: block;
  font-family: ${props => props.theme.fonts.fontFamily};
  font-size: ${props => props.theme.fonts.size.h1};
  font-weight: ${props => props.theme.fonts.fontWeight.h1};
  margin: ${props => props.theme.fonts.margin.h1};
  color: ${props => props.theme.fonts.color.h1};
  ${props => (props.noTopMargin ? 'margin-top: 0;' : '')};
  ${props => (props.noBottomMargin ? 'margin-top: 0;' : '')};
`;
