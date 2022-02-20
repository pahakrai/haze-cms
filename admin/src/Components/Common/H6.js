import styled from 'styled-components';

export default styled.h6`
  display: block;
  font-family: ${props => props.theme.fonts.fontFamily};
  font-size: ${props => props.theme.fonts.size.h6};
  font-weight: ${props => props.theme.fonts.fontWeight.h6};
  margin: ${props => props.theme.fonts.margin.h6};
  color: ${props => props.theme.fonts.color.h6};
  ${props => (props.noTopMargin ? 'margin-top: 0;' : '')};
  ${props => (props.noBottomMargin ? 'margin-top: 0;' : '')};
`;
