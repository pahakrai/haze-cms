import styled from 'styled-components';

export default styled.h3`
  display: block;
  font-family: ${props => props.theme.fonts.fontFamily};
  font-size: ${props => props.theme.fonts.size.h3};
  font-weight: ${props => props.theme.fonts.fontWeight.h3};
  margin: ${props => props.theme.fonts.margin.h3};
  color: ${props => props.theme.fonts.color.h3};
  ${props => (props.noTopMargin ? 'margin-top: 0;' : '')};
  ${props => (props.noBottomMargin ? 'margin-top: 0;' : '')};
`;
